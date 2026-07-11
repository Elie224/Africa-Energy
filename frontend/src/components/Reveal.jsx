import { useInView } from '../lib/hooks/useInView.js'

/**
 * Reveal-on-scroll wrapper. Applies the className (e.g. "ae-fade-up") when
 * the element enters the viewport.
 *
 * Props:
 *   as       : tag name (default "div")
 *   effect   : "fade-up" | "slide-left" | "slide-right" | "zoom-in"
 *   stagger  : boolean, adds .ae-stagger to coordinate children delays
 *   delay    : number, ms to delay
 *   className: extra classes
 *   style    : extra style
 */
export default function Reveal({
  as: Tag = 'div',
  effect = 'fade-up',
  stagger = false,
  delay = 0,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold: 0.15 })

  const effectClass =
    effect === 'slide-left'  ? 'ae-slide-left'  :
    effect === 'slide-right' ? 'ae-slide-right' :
    effect === 'zoom-in'     ? 'ae-zoom-in'     :
                               'ae-fade-up'

  const merged = `${effectClass}${inView ? ' ae-in-view' : ''} ${stagger ? 'ae-stagger' : ''} ${className}`.trim()
  const mergedStyle = delay ? { ...style, transitionDelay: `${delay}ms` } : style

  return (
    <Tag ref={ref} className={merged} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  )
}
