import { useEffect } from 'react'
import { gsap } from 'gsap'

export function useCursor() {
  useEffect(() => {
    const dot  = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' })
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring, { x: ringX, y: ringY })
      requestAnimationFrame(animateRing)
    }

    const onEnter = () => {
      gsap.to(dot,  { scale: 2.5, duration: 0.2 })
      gsap.to(ring, { scale: 1.5, borderColor: 'rgba(230,0,10,0.9)', duration: 0.2 })
    }
    const onLeave = () => {
      gsap.to(dot,  { scale: 1, duration: 0.2 })
      gsap.to(ring, { scale: 1, borderColor: 'rgba(230,0,10,0.5)', duration: 0.2 })
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, input, select, textarea, [data-cursor]')
      .forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    animateRing()
    return () => document.removeEventListener('mousemove', onMove)
  }, [])
}
