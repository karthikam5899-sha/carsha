import { useEffect, useRef, useState } from 'react'

export default function PageIntro({ onComplete }) {
  const [phase, setPhase] = useState('drive')
  const skipButton = useRef(null)
  const timers = useRef([])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const driveDuration = reducedMotion ? 500 : 3000
    const brandDuration = reducedMotion ? 650 : 1500
    document.body.style.overflow = 'hidden'
    skipButton.current?.focus()

    timers.current = [
      window.setTimeout(() => setPhase('brand'), driveDuration),
      window.setTimeout(() => setPhase('exiting'), driveDuration + brandDuration),
      window.setTimeout(onComplete, driveDuration + brandDuration + 450)
    ]

    return () => {
      document.body.style.overflow = previousOverflow
      timers.current.forEach(timer => window.clearTimeout(timer))
    }
  }, [onComplete])

  const skip = () => {
    timers.current.forEach(timer => window.clearTimeout(timer))
    setPhase('exiting')
    timers.current = [window.setTimeout(onComplete, 450)]
  }

  return <section className={`page-intro-screen page-intro-${phase}`} role="dialog" aria-modal="true" aria-label="CarSha introduction">
    <div className="intro-scenery" aria-hidden="true"/>
    <img className="intro-driving-car" src="/car.png" alt="" aria-hidden="true"/>
    <div className="intro-brand-reveal" aria-hidden={phase === 'drive'}>
      <img src="/CarSha.png" alt="" className="intro-brand-logo"/>
      <span>CarSha</span>
      <small>YOUR NEXT DRIVE STARTS HERE</small>
    </div>
    <button className="page-intro-skip" type="button" ref={skipButton} onClick={skip}>Skip intro</button>
  </section>
}
