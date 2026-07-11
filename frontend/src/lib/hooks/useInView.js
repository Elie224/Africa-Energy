import { useEffect, useRef, useState } from 'react'

/**
 * Observe if an element enters the viewport.
 * @param {Object}  opts
 * @param {number}  [opts.threshold=0.15]   Trigger ratio
 * @param {string}  [opts.rootMargin='0px 0px -10% 0px']  Margin
 * @param {boolean} [opts.once=true]        Stop observing after first hit
 * @returns {[React.RefObject, boolean]}
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            if (once) obs.unobserve(e.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold, rootMargin }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
