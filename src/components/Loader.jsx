import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { LOADER_LINES } from '../data'

export default function Loader({ onComplete }) {
  const ref = useRef()
  const progressRef = useRef()
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        ref.current?.classList.add('glitch')
        setTimeout(() => {
          ref.current?.classList.add('done')
          onComplete?.()
        }, 600)
      },
    })

    tl.to(progressRef.current, { opacity: 1, duration: 0.3 }, 0)

    const lines = ref.current?.querySelectorAll('.loader__line')
    let lineIndex = 0

    LOADER_LINES.forEach((item, i) => {
      const promptEl = lines?.[lineIndex]
      const outputEl = lines?.[lineIndex + 1]

      tl.to(promptEl, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' })

      tl.to(outputEl, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out', delay: 0.2 })

      const progress = ((i + 1) / LOADER_LINES.length) * 100
      tl.to(
        progressRef.current?.querySelector('.loader__progress-bar'),
        {
          width: `${progress}%`,
          duration: 0.3,
          onUpdate: () => setPercent(Math.round(progress * tl.progress())),
          onComplete: () => setPercent(Math.round(progress)),
        },
        `-=0.15`
      )

      lineIndex += 2
    })

    tl.to({}, { duration: 0.5 })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className="loader" ref={ref}>
      <div className="loader__scanline" />
      <div className="loader__content">
        {LOADER_LINES.map((item, i) => (
          <div key={i}>
            <div className="loader__line">
              <span className="loader__prompt">{item.prompt}</span>
              <span className="loader__cursor" />
            </div>
            <div className="loader__line">
              <span className="loader__output">{item.output}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="loader__progress" ref={progressRef}>
        <div className="loader__progress-bar" />
        <span className="loader__percent">{percent}%</span>
      </div>
    </div>
  )
}
