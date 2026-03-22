import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { PROFILE, TAGLINES, STATS } from '../data'

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef()
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to({ val: 0 }, {
            val: value,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate() { setDisplayed(Math.round(this.targets()[0].val)) },
          })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{displayed}{suffix}</span>
}

export default function HeroOverlay({ onNameHover, fadeRef }) {
  const nameRef = useRef()
  const titleRef = useRef()
  const badgeRef = useRef()
  const taglineRef = useRef()
  const statsRef = useRef()
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [taglineText, setTaglineText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.to(nameRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    return () => tl.kill()
  }, [])

  useEffect(() => {
    const current = TAGLINES[taglineIndex]
    let timeout

    if (!isDeleting && taglineText.length < current.length) {
      timeout = setTimeout(() => setTaglineText(current.slice(0, taglineText.length + 1)), 80)
    } else if (!isDeleting && taglineText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && taglineText.length > 0) {
      timeout = setTimeout(() => setTaglineText(taglineText.slice(0, -1)), 40)
    } else if (isDeleting && taglineText.length === 0) {
      setIsDeleting(false)
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length)
    }

    return () => clearTimeout(timeout)
  }, [taglineText, isDeleting, taglineIndex])

  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    const enter = () => onNameHover?.(true)
    const click = () => onNameHover?.(true)
    el.addEventListener('mouseenter', enter, true)
    el.addEventListener('click', click, true)
    return () => {
      el.removeEventListener('mouseenter', enter, true)
      el.removeEventListener('click', click, true)
    }
  }, [onNameHover])

  return (
    <div className="hero" ref={fadeRef}>
      <h1
        className="hero__name"
        ref={nameRef}
        style={{ transform: 'translateY(20px)' }}
      >
        {PROFILE.name}
      </h1>
      <p className="hero__title" ref={titleRef} style={{ transform: 'translateY(15px)' }}>
        {PROFILE.title}
      </p>
      <p className="hero__tagline" ref={taglineRef} style={{ transform: 'translateY(10px)' }}>
        {taglineText}<span className="hero__tagline-cursor">|</span>
      </p>
      {PROFILE.available && (
        <div className="hero__available" ref={badgeRef} style={{ transform: 'translateY(10px)' }}>
          Available for work
        </div>
      )}
      <div className="hero__stats" ref={statsRef} style={{ transform: 'translateY(10px)' }}>
        {STATS.map((s, i) => (
          <div key={i} className="hero__stat">
            <span className="hero__stat-value">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
