import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SKILLS } from '../data'

export default function TechSidebar() {
  const ref = useRef()

  useEffect(() => {
    const cards = ref.current?.querySelectorAll('.sidebar__skill')
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, delay: 1, ease: 'power2.out' }
      )
    }
    const title = ref.current?.querySelector('.sidebar__title')
    if (title) {
      gsap.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.8 })
    }
  }, [])

  return (
    <div className="sidebar" ref={ref}>
      <div className="sidebar__title">TECH STACK</div>
      <div className="sidebar__list">
        {SKILLS.map((skill, i) => (
          <div key={i} className="sidebar__skill">
            <div className="sidebar__skill-header">
              <span className="sidebar__skill-icon">{skill.icon}</span>
              <span className="sidebar__skill-name">{skill.name}</span>
            </div>
            <div className="sidebar__skill-techs">
              {skill.techs.map((t, j) => (
                <span key={j} className="sidebar__tech">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
