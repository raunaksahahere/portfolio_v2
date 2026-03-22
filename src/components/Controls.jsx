import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Controls() {
  const ref = useRef()

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, delay: 2, ease: 'power2.out' }
    )
    gsap.to(ref.current, { opacity: 0.3, duration: 1, delay: 8 })
  }, [])

  return (
    <div className="controls-hint" ref={ref}>
      <div className="controls-hint__keys">
        <div className="controls-hint__key">W</div>
        <div className="controls-hint__row">
          <div className="controls-hint__key">A</div>
          <div className="controls-hint__key">S</div>
          <div className="controls-hint__key">D</div>
        </div>
      </div>
      <div className="controls-hint__text">
        Move around the solar system<br />
        <span>Walk into the sun to see About Me</span><br />
        <span>Click orbiting planets for projects</span>
      </div>
    </div>
  )
}
