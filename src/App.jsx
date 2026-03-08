import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import OrderPage from './pages/OrderPage.jsx'
import { useCursor } from './hooks/useCursor.js'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const { pathname } = useLocation()
  useCursor()

  // Page transition + scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname])

  return (
    <div className="grain">
      {/* Custom cursor elements */}
      <div id="cursor-dot" />
      <div id="cursor-ring" />

      <Navbar />

      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/order"  element={<OrderPage />} />
      </Routes>
    </div>
  )
}
