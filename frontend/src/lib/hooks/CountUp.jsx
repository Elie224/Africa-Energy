import { useEffect, useState } from 'react'
import { useInView } from './useInView.js'

/**
 * Animated number counter.
 * @param {Object}  props
 * @param {number}  props.value         Target number (e.g. 6)
 * @param {string}  [props.suffix='']   Suffix string (e.g. '+', 'k')
 * @param {number}  [props.duration=1400]
 * @param {number}  [props.decimals=0]
 */
export default function CountUp({ value, suffix = '', duration = 1400, decimals = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const from = 0
    const to = Number(value) || 0
    const ease = (t) => 1 - Math.pow(1 - t, 3) // easeOutCubic

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const current = from + (to - from) * ease(progress)
      setDisplay(current)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toString()

  return (
    <span ref={ref} className="ae-stat-number">
      {formatted}{suffix}
    </span>
  )
}
