import { useEffect } from 'gsap'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useReveal — animates elements with class .gsap-reveal when they scroll into view
 * Call once in App.jsx
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.gsap-reveal')
    els.forEach((el, i) => {
      const delay = parseFloat(el.dataset.delay || 0)
      const dir   = el.dataset.dir || 'up'
      const fromVars = {
        opacity: 0,
        y:  dir === 'up'   ? 50 : dir === 'down' ? -50 : 0,
        x:  dir === 'left' ? 50 : dir === 'right' ? -50 : 0,
      }
      gsap.fromTo(el, fromVars,
        {
          opacity: 1, y: 0, x: 0,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}
