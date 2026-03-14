import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PROFILE, CONTACTS, ACHIEVEMENTS } from '../data'

export default function AboutPanel({ visible, onClose }) {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return
    if (visible) {
      gsap.to(ref.current, { opacity: 1, duration: 0.5, ease: 'power3.out' })
      ref.current.style.pointerEvents = 'auto'
    } else {
      gsap.to(ref.current, { opacity: 0, duration: 0.3, ease: 'power2.in' })
      ref.current.style.pointerEvents = 'none'
    }
  }, [visible])

  return (
    <div className="about-panel" ref={ref} onMouseLeave={() => onClose?.()}>
      <div className="about-panel__inner">
        <button className="about-panel__close" onClick={() => onClose?.()}>✕</button>
        <div className="about-panel__header">
          <div className="about-panel__badge">ABOUT ME</div>
          <h2 className="about-panel__name">{PROFILE.name}</h2>
          <p className="about-panel__title">{PROFILE.title}</p>
        </div>

        <div className="about-panel__grid">
          <div className="about-panel__stat">
            <span className="about-panel__stat-label">Age</span>
            <span className="about-panel__stat-value">{PROFILE.age}</span>
          </div>
          <div className="about-panel__stat">
            <span className="about-panel__stat-label">Location</span>
            <span className="about-panel__stat-value">{PROFILE.location}</span>
          </div>
          <div className="about-panel__stat">
            <span className="about-panel__stat-label">Experience</span>
            <span className="about-panel__stat-value">{PROFILE.experience}</span>
          </div>
          <div className="about-panel__stat">
            <span className="about-panel__stat-label">Status</span>
            <span className="about-panel__stat-value about-panel__stat-value--green">
              ● Available
            </span>
          </div>
        </div>

        <div className="about-panel__section">
          <h3>🎓 Education</h3>
          <p>{PROFILE.degree}</p>
          <p className="about-panel__dim">{PROFILE.college}</p>
        </div>

        <div className="about-panel__section">
          <h3>📝 Bio</h3>
          <p>{PROFILE.bio}</p>
        </div>

        <div className="about-panel__section">
          <h3>🏆 Achievements</h3>
          <div className="about-panel__achievements">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className="about-panel__achievement">
                <span>{a.icon}</span>
                <div>
                  <strong>{a.title}</strong>
                  <p>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-panel__links">
          {CONTACTS.map((c, i) => (
            <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="about-panel__link">
              {c.icon} {c.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
