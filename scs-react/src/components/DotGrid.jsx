import { useEffect, useRef } from 'react'

const SPACING = 28
const DOT_R = 1.5
const BG_OPACITY = 0.08
const HAND_OPACITY = 0.38
const HOVER_MAX = 0.88
const GLOW_RADIUS = 120
const FADE_DURATION = 1400

// Brand purple #b6a5eb = rgb(182, 165, 235)
const PR = 182, PG = 165, PB = 235

function buildMask(img, cw, ch, isRight) {
  const hw = Math.min(Math.max(220, cw * 0.32), 460)
  const hh = hw * (img.naturalHeight / img.naturalWidth)
  const ox = isRight ? cw - hw : 0
  const oy = ch / 2 - hh / 2

  const off = document.createElement('canvas')
  off.width = Math.round(hw)
  off.height = Math.round(hh)
  off.getContext('2d').drawImage(img, 0, 0, off.width, off.height)
  const { data } = off.getContext('2d').getImageData(0, 0, off.width, off.height)

  return { data, w: off.width, h: off.height, ox, oy }
}

function inMask(mask, dotX, dotY) {
  if (!mask) return false
  const px = Math.round(dotX - mask.ox)
  const py = Math.round(dotY - mask.oy)
  if (px < 0 || px >= mask.w || py < 0 || py >= mask.h) return false
  return mask.data[(py * mask.w + px) * 4 + 3] > 32
}

export default function DotGrid({ handsIn }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const masksRef = useRef(null)
  const imgsRef = useRef(null)
  const handProgressRef = useRef(0)
  const renderRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const render = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      const { x: mx, y: my } = mouseRef.current
      const hp = handProgressRef.current
      const masks = masksRef.current

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          const isHand = masks &&
            (inMask(masks.left, x, y) || inMask(masks.right, x, y))

          const dist = Math.hypot(mx - x, my - y)
          const hover = Math.max(0, 1 - dist / GLOW_RADIUS)

          const base = isHand ? HAND_OPACITY * hp : BG_OPACITY
          const opacity = Math.min(1, base + hover * (HOVER_MAX - base))

          // White → purple: hand dots tint purple, hover also tints purple
          const ct = Math.max(isHand ? hp * 0.65 : 0, hover)
          const r = Math.round(255 - ct * (255 - PR))
          const g = Math.round(255 - ct * (255 - PG))
          const b = Math.round(255 - ct * (255 - PB))

          ctx.beginPath()
          ctx.arc(x, y, DOT_R, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity.toFixed(3)})`
          ctx.fill()
        }
      }
    }

    renderRef.current = render

    const recomputeMasks = () => {
      const imgs = imgsRef.current
      if (!imgs) return
      // Hero uses right_hand.svg on left, left_hand.svg on right
      masksRef.current = {
        left: buildMask(imgs.right, canvas.width, canvas.height, false),
        right: buildMask(imgs.left, canvas.width, canvas.height, true),
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      recomputeMasks()
      render()
    }

    const loadImg = (src) =>
      new Promise((res) => {
        const img = new Image()
        img.onload = () => res(img)
        img.src = src
      })

    Promise.all([
      loadImg('/SVG/right_hand.svg'),
      loadImg('/SVG/left_hand.svg'),
    ]).then(([rightHand, leftHand]) => {
      imgsRef.current = { right: rightHand, left: leftHand }
      recomputeMasks()
      render()
    })

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      render()
    }

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
      render()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    resize()
    window.addEventListener('mousemove', onMouseMove)
    canvas.parentElement.addEventListener('mouseleave', onMouseLeave)

    return () => {
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Fade hand dots in when intro completes
  useEffect(() => {
    if (!handsIn) return
    const start = Date.now()

    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / FADE_DURATION)
      handProgressRef.current = t
      renderRef.current?.()
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [handsIn])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
