import { useEffect, useRef, useState } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * useScrollReveal — detecta cuando un elemento entra en el viewport.
 * 
 * Uso:
 *   const { ref, visible } = useScrollReveal()
 *   <div ref={ref} style={{ opacity: visible ? 1 : 0, ... }} />
 */
export const useScrollReveal = (options: Options = {}) => {
  const {
    threshold  = 0.12,
    rootMargin = '0px 0px -40px 0px',
    once       = true,
  } = options

  const ref     = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Si reduce motion está habilitado, mostramos todo inmediatamente
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, visible }
}