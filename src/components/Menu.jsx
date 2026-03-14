import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PROFILE, SKILLS, CONTACTS } from '../data'

export default function Menu({ isOpen, onClose, onNavClick }) {
  const rightRef = useRef()

  useEffect(() => {
    if (isOpen && rightRef.current) {
      const els = rightRef.current.querySelectorAll(
        '.menu__nav-link, .menu__skill-card, .menu__contact-link, .menu__section-title'
      )
      gsap.fromTo(
        els,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out', delay: 0.2 }
      )
    }
  }, [isOpen])

  const sections = [
    { label: 'Home', id: 'home' },
    { label: 'Projects', id: 'projects', count: '06' },
    { label: 'Skills', id: 'skills', count: '08' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <div className={`menu ${isOpen ? 'open' : ''}`}>
      <div className="menu__left">
        <div className="menu__left-visual">
          <div className="menu__left-name">{PROFILE.name}</div>
          <div className="menu__left-bio">{PROFILE.bio}</div>
        </div>
      </div>

      <div className="menu__right" ref={rightRef}>
        <div className="menu__section-title">Navigation</div>
        <nav className="menu__nav">
          {sections.map((s) => (
            <div
              key={s.id}
              className="menu__nav-link"
              onClick={() => {
                onNavClick?.(s.id)
                onClose?.()
              }}
            >
              {s.label}
              {s.count && <span>({s.count})</span>}
            </div>
          ))}
        </nav>

        <div className="menu__section-title">Skills & Technologies</div>
        <div className="menu__skills-grid">
          {SKILLS.map((skill, i) => (
            <div key={i} className="menu__skill-card">
              <h4>
                {skill.icon} {skill.name}
              </h4>
              <div className="techs">
                {skill.techs.map((t, j) => (
                  <span key={j} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="menu__section-title">Get in Touch</div>
        <div className="menu__contact-links">
          {CONTACTS.map((c, i) => (
            <a
              key={i}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="menu__contact-link"
            >
              {c.icon} {c.label}
            </a>
          ))}
        </div>

        <div className="menu__section-title">About</div>
        <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.7 }}>
          <p>📍 {PROFILE.location}</p>
          <p>🎓 {PROFILE.degree} @ {PROFILE.college}</p>
          <p>💼 {PROFILE.experience} of experience</p>
          <p style={{ marginTop: '1rem' }}>{PROFILE.bio}</p>
        </div>
      </div>
    </div>
  )
}
