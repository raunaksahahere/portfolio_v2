import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ProjectCards({ projects, onProjectClick }) {
  const ref = useRef()

  useEffect(() => {
    const cards = ref.current?.querySelectorAll('.project-card')
    if (cards) {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 1.2,
        ease: 'power3.out',
      })
    }
  }, [])

  return (
    <div className="projects-section" ref={ref}>
      {projects.map((p) => (
        <div
          key={p.id}
          className="project-card"
          onClick={() => onProjectClick(p)}
        >
          <div
            className="project-card__accent"
            style={{ background: p.color }}
          />
          <div className="project-card__tag">{p.tag}</div>
          <div className="project-card__title">{p.title}</div>
          <div className="project-card__desc">{p.desc}</div>
        </div>
      ))}
    </div>
  )
}
