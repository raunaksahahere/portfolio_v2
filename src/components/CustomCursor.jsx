import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef()
  const trailRefs = useRef([])
  const coords = useRef({ x: -100, y: -100 })
  const trailCoords = useRef([])

  const TRAIL_COUNT = 6

  useEffect(() => {
    // Initialize trail positions
    trailCoords.current = Array(TRAIL_COUNT).fill({ x: -100, y: -100 })

    const handleMouseMove = (e) => {
      coords.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseDown = () => {
      dotRef.current?.classList.add('cursor--click')
    }

    const handleMouseUp = () => {
      dotRef.current?.classList.remove('cursor--click')
    }

    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, [role="button"], .project-grid-card, .skill-card, .menu__nav-link, .contact-link, .achievement-card')
      if (isInteractive) {
        dotRef.current?.classList.add('cursor--hover')
      }
    }

    const handleMouseOut = (e) => {
      const isInteractive = e.target.closest('a, button, [role="button"], .project-grid-card, .skill-card, .menu__nav-link, .contact-link, .achievement-card')
      if (isInteractive) {
        dotRef.current?.classList.remove('cursor--hover')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    let raf
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${coords.current.x}px, ${coords.current.y}px)`
      }
      // Trail follows with delay
      trailCoords.current.forEach((_, i) => {
        const prev = i === 0 ? coords.current : trailCoords.current[i - 1]
        trailCoords.current[i] = {
          x: trailCoords.current[i].x + (prev.x - trailCoords.current[i].x) * 0.3,
          y: trailCoords.current[i].y + (prev.y - trailCoords.current[i].y) * 0.3,
        }
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.transform = `translate(${trailCoords.current[i].x}px, ${trailCoords.current[i].y}px)`
        }
      })
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          className="cursor-trail"
          ref={(el) => (trailRefs.current[i] = el)}
          style={{ opacity: 1 - i * (0.8 / TRAIL_COUNT), '--scale': 1 - i * 0.1 }}
        />
      ))}
      <div className="cursor-dot" ref={dotRef} />
    </>
  )
}
