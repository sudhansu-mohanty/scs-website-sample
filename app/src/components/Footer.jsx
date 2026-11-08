export default function Footer() {
  return (
    <footer className="footer">

      {/* ── Main footer content ── */}
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <img src={`${import.meta.env.BASE_URL}logo_full.svg`} alt="SCS" className="footer-logo" />
          <p className="footer-tagline">
            Concordia's Computer Science<br />student society.
          </p>
          <p className="footer-copy">© {new Date().getFullYear()} SCS Concordia</p>
          <p className="footer-dev">
            Developed by{' '}
            <a href="https://www.sudhansumohanty.site" target="_blank" rel="noreferrer" className="footer-dev-link">
              Sudhansu
            </a>
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div className="footer-col">
            <h4 className="footer-col-heading">Navigate</h4>
            <a href="#" className="footer-link">Home</a>
            <a href="#weekly" className="footer-link">Weekly Events</a>
            <a href="#competitions" className="footer-link">Competitions</a>
            <a href="#academic" className="footer-link">Academic</a>
            <a href="#social" className="footer-link">Social</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-heading">Connect</h4>
            <a href="#" target="_blank" rel="noreferrer" className="footer-link">Instagram</a>
            <a href="#" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
            <a href="#" target="_blank" rel="noreferrer" className="footer-link">Discord</a>
            <a href="#" target="_blank" rel="noreferrer" className="footer-link">Facebook</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-heading">Get involved</h4>
            <a href="#" className="footer-link">Join the team</a>
            <a href="#" className="footer-link">Sponsor us</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>

      </div>


    </footer>
  )
}
