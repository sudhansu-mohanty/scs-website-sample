// Synthesized UI sound effects via Web Audio API — no audio files needed.
// AudioContext is created lazily on first call (satisfies browser autoplay policy).

let ctx = null
let muted = localStorage.getItem('scs-sfx-muted') === 'true'

export function isMuted() { return muted }

export function setMuted(val) {
  muted = val
  localStorage.setItem('scs-sfx-muted', val)
}

function ac() {
  if (!ctx) ctx = new AudioContext()
  // Resume if suspended (can happen after tab inactivity)
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Soft high-pitched tick — for hover
export function playHover() {
  if (muted) return
  try {
    const c = ac()
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(960, c.currentTime)
    osc.frequency.exponentialRampToValueAtTime(820, c.currentTime + 0.05)
    gain.gain.setValueAtTime(0.035, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.07)
    osc.start(c.currentTime)
    osc.stop(c.currentTime + 0.07)
  } catch (_) {}
}

// Slightly deeper, snappier click — for press
export function playClick() {
  if (muted) return
  try {
    const c = ac()
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(520, c.currentTime)
    osc.frequency.exponentialRampToValueAtTime(240, c.currentTime + 0.09)
    gain.gain.setValueAtTime(0.055, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.09)
    osc.start(c.currentTime)
    osc.stop(c.currentTime + 0.09)
  } catch (_) {}
}
