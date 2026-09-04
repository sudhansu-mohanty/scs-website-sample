/*
  Hero receives two boolean props from App:
    - handsIn: when true, triggers the hand slide-in CSS animation
    - textIn:  when true, triggers the text fade-in CSS animation

  In vanilla JS we did: element.classList.add('hand-in')
  In React we do it declaratively: className={`hand ${handsIn ? 'hand-in' : ''}`}
  React updates the class in the DOM automatically when the prop changes.
*/
export default function Hero({ handsIn, textIn }) {
  return (
    <section className="hero">
      <img
        className={`hand hand-left${handsIn ? ' hand-in' : ''}`}
        src="/SVG/right_hand.svg"
        alt=""
      />

      <div className="hero-content">
        <div className="hero-logo-wrap">
          <img
            className="hero-logo-full"
            src="/logo_full.svg"
            alt="SCS Concordia"
          />
        </div>

        <div className={`body-text${textIn ? ' text-in' : ''}`}>
          <p>
            <strong>Welcome to SCS Concordia</strong>
            <br />
            <strong>Software Engineering and Computer Science Society</strong>
          </p>
        </div>
      </div>

      <img
        className={`hand hand-right${handsIn ? ' hand-in' : ''}`}
        src="/SVG/left_hand.svg"
        alt=""
      />
    </section>
  )
}
