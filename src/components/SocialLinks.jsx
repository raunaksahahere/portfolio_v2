import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CONTACTS } from '../data'

export default function SocialLinks() {
  const leftRef = useRef()
  const rightRef = useRef()

  useEffect(() => {
    const delay = 1
    const leftLinks = leftRef.current?.querySelectorAll('.social-link')
    const rightLinks = rightRef.current?.querySelectorAll('.social-link')

    gsap.to(leftLinks, {
      opacity: 0.6,
      duration: 0.8,
      stagger: 0.15,
      delay,
      ease: 'power2.out',
    })
    gsap.to(rightLinks, {
      opacity: 0.6,
      duration: 0.8,
      delay: delay + 0.3,
      ease: 'power2.out',
    })
  }, [])

  return (
    <>
      <div className="social-links social-links--left" ref={leftRef}>
        {CONTACTS.map((c, i) => (
          <a
            key={i}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            {c.label}
          </a>
        ))}
      </div>
      <div className="social-links social-links--right" ref={rightRef}>
        <a
          href="mailto:raunaksaha22@gmail.com"
          className="social-link"
        >
          raunaksaha22@gmail.com
        </a>
      </div>
    </>
  )
}
