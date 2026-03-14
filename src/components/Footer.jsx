import { PROFILE, CONTACTS } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <div className="footer__name">{PROFILE.name}</div>
          <div className="footer__title">{PROFILE.title}</div>
        </div>
        <div className="footer__center">
          <div className="footer__links">
            {CONTACTS.map((c, i) => (
              <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="footer__link">
                {c.icon} {c.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__right">
          <div className="footer__copy">© {new Date().getFullYear()} {PROFILE.name}</div>
          <div className="footer__built">Built with React + Three.js</div>
        </div>
      </div>
    </footer>
  )
}
