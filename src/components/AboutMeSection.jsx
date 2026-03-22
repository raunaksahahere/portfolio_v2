import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { PROFILE, SKILLS, ACHIEVEMENTS } from '../data'

export default function AboutMeSection() {
  const sectionRef = useRef()
  const photoRef1 = useRef()
  const bioRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline()
          tl.to(photoRef1.current, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
            .to(bioRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: 'AGE', value: PROFILE.age },
    { label: 'LOCATION', value: PROFILE.location },
    { label: 'COLLEGE', value: 'MSIT' },
    { label: 'EXPERIENCE', value: PROFILE.experience },
  ]

  const topSkills = SKILLS.slice(0, 6)

  const funFacts = [
    { icon: '🍵', text: 'Tea lover' },
    { icon: '💻', text: 'Codes 24/7' },
    { icon: '🎮', text: 'Minecraft enthusiast' },
    { icon: '🕷️', text: 'Favorite hero: Spider-Man' },
    { icon: '🗣️', text: 'Fluent in Bengali, English & Hindi' },
    { icon: '📏', text: "5'8\" tall" },
  ]

  return (
    <section className="aboutme-section scroll-section" id="about" ref={sectionRef}>
      <div className="section-container">
        <div className="section-label">ABOUT ME</div>
        <h2 className="section-heading">The Person Behind the Code</h2>

        <div className="aboutme-grid">
          {/* Photos Column */}
          <div className="aboutme-photos">
            <div
              className="aboutme-photo-frame aboutme-photo-frame--tall"
              ref={photoRef1}
              style={{ opacity: 0, transform: 'translateX(-30px)' }}
            >
              <img src="/Me1.jpeg" alt="Raunak Saha" className="aboutme-photo" />
              <div className="aboutme-photo-glow" />
            </div>
          </div>

          {/* Bio Panel — Code Editor Style */}
          <div
            className="aboutme-bio-panel"
            ref={bioRef}
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            {/* Terminal dots */}
            <div className="aboutme-terminal-header">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
              <span className="aboutme-terminal-title">profile.tsx</span>
            </div>

            <div className="aboutme-bio-content">
              <h3 className="aboutme-name">{PROFILE.name}</h3>
              <p className="aboutme-title">{PROFILE.title}</p>
              <p className="aboutme-bio-text">{PROFILE.bio}</p>

              {/* Stats Grid */}
              <div className="aboutme-stats-grid">
                {stats.map((s, i) => (
                  <div key={i} className="aboutme-stat">
                    <span className="aboutme-stat__label">{s.label}</span>
                    <span className="aboutme-stat__value">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Skill Tags */}
              <div className="aboutme-skill-tags">
                {topSkills.map((skill, i) => (
                  <span key={i} className="aboutme-skill-tag">
                    {skill.icon} {skill.name}
                  </span>
                ))}
              </div>

              {/* Fun Facts */}
              <div className="aboutme-funfacts">
                <span className="aboutme-funfacts__label">// fun facts</span>
                <div className="aboutme-funfacts-grid">
                  {funFacts.map((fact, i) => (
                    <div key={i} className="aboutme-funfact">
                      <span className="aboutme-funfact__icon">{fact.icon}</span>
                      <span className="aboutme-funfact__text">{fact.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements highlight */}
              <div className="aboutme-highlights">
                <span className="aboutme-highlights__label">// key achievements</span>
                {ACHIEVEMENTS.slice(0, 3).map((a, i) => (
                  <div key={i} className="aboutme-highlight">
                    <span>{a.icon}</span>
                    <span>{a.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
