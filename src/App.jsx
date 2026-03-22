import { useState, useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import Loader from './components/Loader'
import Scene3D from './components/Scene3D'
import HeroOverlay from './components/HeroOverlay'
import Menu from './components/Menu'
import ProjectDetail from './components/ProjectDetail'
import SocialLinks from './components/SocialLinks'
import AboutPanel from './components/AboutPanel'
import GitHubCommit from './components/GitHubCommit'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import AboutMeSection from './components/AboutMeSection'
import { PROJECTS, SKILLS, PROFILE, ACHIEVEMENTS, CONTACTS } from './data'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const menuBtnRef = useRef()
  const sectionsRef = useRef()
  const heroContentRef = useRef()

  const handleLoadComplete = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading && menuBtnRef.current) {
      gsap.to(menuBtnRef.current, { opacity: 1, duration: 0.8, delay: 0.5, ease: 'power2.out' })
    }
  }, [loading])

  // Track scroll position for 3D parallax + hero fade + back-to-top
  useEffect(() => {
    if (loading) return
    const handleScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      setShowBackToTop(y > window.innerHeight * 0.8)

      // Fade hero content as user scrolls (don't start until 15% scrolled)
      if (heroContentRef.current) {
        const scrollStart = window.innerHeight * 0.15
        const scrollEnd = window.innerHeight * 0.7
        const fade = y < scrollStart ? 1 : Math.max(0, 1 - (y - scrollStart) / (scrollEnd - scrollStart))
        heroContentRef.current.style.opacity = fade
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading])

  // Enhanced scroll-triggered animations with GSAP stagger
  useEffect(() => {
    if (loading || !sectionsRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Stagger children within the section
            const children = entry.target.querySelectorAll(
              '.skill-card, .project-grid-card, .achievement-card, .contact-link'
            )
            if (children.length > 0) {
              gsap.fromTo(
                children,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.6,
                  stagger: 0.08,
                  ease: 'power3.out',
                  delay: 0.2,
                }
              )
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    sectionsRef.current.querySelectorAll('.scroll-section').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null)
        else if (aboutOpen) setAboutOpen(false)
        else if (menuOpen) setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen, selectedProject, aboutOpen])

  // Card tilt handler
  const handleCardTilt = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
  }

  const handleCardTiltReset = (e) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <>
      {loading && <Loader onComplete={handleLoadComplete} />}

      {!loading && <CustomCursor />}

      {!loading && (
        <div className="page" ref={sectionsRef}>
          {/* ── SECTION 1: Hero (3D scene + name) ── */}
          <section className="page__hero">
            <Scene3D projects={PROJECTS} onProjectClick={setSelectedProject} scrollY={scrollY} />
            <HeroOverlay onNameHover={(v) => setAboutOpen(v)} fadeRef={heroContentRef} />
            <div className="scroll-indicator">
              <span>Scroll to explore</span>
              <div className="scroll-indicator__arrow">↓</div>
            </div>
          </section>

          <div className="section-divider" />

          {/* ── SECTION 1.5: About Me ── */}
          <AboutMeSection />

          <div className="section-divider" />
          <section className="page__section scroll-section" id="skills">
            <div className="section-container">
              <div className="section-label">TECH STACK</div>
              <h2 className="section-heading">Skills & Technologies</h2>
              <div className="skills-grid">
                {SKILLS.map((skill, i) => (
                  <div
                    key={i}
                    className="skill-card tilt-card"
                    onMouseMove={handleCardTilt}
                    onMouseLeave={handleCardTiltReset}
                  >
                    <div className="skill-card__icon">{skill.icon}</div>
                    <h3 className="skill-card__name">{skill.name}</h3>
                    <div className="skill-card__techs">
                      {skill.techs.map((t, j) => (
                        <span key={j} className="skill-card__tech">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="section-divider" />

          {/* ── SECTION 3: Projects ── */}
          <section className="page__section scroll-section" id="projects">
            <div className="section-container">
              <div className="section-label">PROJECTS</div>
              <h2 className="section-heading">What I've Built</h2>

              <div className="projects-grid">
                {PROJECTS.map((p) => (
                  <div
                    key={p.id}
                    className="project-grid-card tilt-card"
                    onClick={() => setSelectedProject(p)}
                    onMouseMove={handleCardTilt}
                    onMouseLeave={handleCardTiltReset}
                    style={{ '--accent': p.color }}
                  >
                    <div className="project-grid-card__accent" style={{ background: p.color }} />
                    <div className="project-grid-card__tag">{p.tag}</div>
                    <h3 className="project-grid-card__title">{p.title}</h3>
                    <p className="project-grid-card__desc">{p.desc}</p>
                    <div className="project-grid-card__techs">
                      {p.techs.map((t, j) => (
                        <span key={j}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="section-divider" />

          {/* ── SECTION 4: Achievements & GitHub ── */}
          <section className="page__section scroll-section" id="achievements">
            <div className="section-container">
              <div className="section-label">ACHIEVEMENTS</div>
              <h2 className="section-heading">Milestones</h2>
              <div className="achievements-grid">
                {ACHIEVEMENTS.map((a, i) => (
                  <div key={i} className="achievement-card">
                    <span className="achievement-card__icon">{a.icon}</span>
                    <div>
                      <h4 className="achievement-card__title">{a.title}</h4>
                      <p className="achievement-card__desc">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="github-section">
                <GitHubCommit username={PROFILE.github} />
              </div>
            </div>
          </section>

          <div className="section-divider" />

          {/* ── SECTION 5: Contact ── */}
          <section className="page__section scroll-section" id="contact">
            <div className="section-container section-container--center">
              <div className="section-label">CONTACT</div>
              <h2 className="section-heading">Let's Work Together</h2>
              <p className="contact-desc">
                I'm currently available for freelance work, internships, and collaboration.
              </p>
              <div className="contact-links">
                {CONTACTS.map((c, i) => (
                  <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-link__icon">{c.icon}</span>
                    <span>{c.label}</span>
                  </a>
                ))}
              </div>
              <a
                href="/Raunak Saha.pdf"
                download="Raunak Saha.pdf"
                className="resume-btn"
              >
                📄 Download Resume
              </a>
            </div>
          </section>

          {/* ── Footer ── */}
          <Footer />
        </div>
      )}

      {/* Fixed overlays */}
      {!loading && <SocialLinks />}

      {!loading && (
        <AboutPanel visible={aboutOpen} onClose={() => setAboutOpen(false)} />
      )}

      {!loading && (
        <button
          ref={menuBtnRef}
          className="menu-toggle"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? '✕ close' : '☰ menu'}
        </button>
      )}

      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavClick={(id) => {
          if (id === 'about') setAboutOpen(true)
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <ProjectDetail
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Back to top */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  )
}
