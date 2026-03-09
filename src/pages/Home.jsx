import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { submitContact } from '../utils/formService.js'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

/* ─── DATA ─────────────────────────────────────── */
const features = [
  {
    icon: '📡',
    title: 'Real-Time GPS',
    desc: 'Live location updates every 5 seconds via multi-constellation GPS + GSM. See your vehicle\'s exact position always.',
    tag: '5s refresh'
  },
  {
    icon: '⚡',
    title: 'One-Click Track',
    desc: 'No apps, no complex setup. Hit one button and your vehicle\'s live location appears in under a second.',
    tag: 'Instant'
  },
  {
    icon: '🛡️',
    title: 'Theft Alerts',
    desc: 'Instant SMS alerts the moment your vehicle moves without permission. Your ride is always protected.',
    tag: 'Always on'
  },
  {
    icon: '🔋',
    title: '30-Day Battery',
    desc: 'Ultra-efficient hardware. One charge lasts a full month, even in always-on tracking mode.',
    tag: '720 hrs'
  },
  {
    icon: '🗺️',
    title: 'Route History',
    desc: 'Replay every journey your vehicle has taken. 90-day route history stored securely on cloud.',
    tag: '90 days'
  },
  {
    icon: '💧',
    title: 'IP67 Rated',
    desc: 'Monsoon-proof, dust-proof, extreme heat resistant. Engineered for Indian road conditions.',
    tag: 'Weatherproof'
  },
]

const steps = [
  { n: '01', title: 'Order Device', desc: 'Fill the order form. Device ships within 24 hours with a full installation guide included in the box.' },
  { n: '02', title: 'Easy Install', desc: 'Clip the compact device to your vehicle. No wires, no drilling — truly plug-and-track in 5 minutes.' },
  { n: '03', title: 'One Click', desc: 'Visit TrackX, hit the Track button — see your vehicle\'s exact live location on the map instantly.' },
  { n: '04', title: 'Stay Protected', desc: 'Automatic theft alerts, battery notifications, and speed monitoring running silently 24/7.' },
]

const brands = ['Forbes', 'Entrepreneur', 'Inc42', 'YourStory', 'TechCrunch', 'Mint', 'Economic Times', 'Forbes', 'Entrepreneur', 'Inc42', 'YourStory']

/* ─── COMPONENT ─────────────────────────────────── */
export default function Home() {
  const heroRef    = useRef(null)
  const titleRef   = useRef(null)
  const badgeRef   = useRef(null)
  const descRef    = useRef(null)
  const ctaRef     = useRef(null)
  const deviceRef  = useRef(null)
  const statsRef   = useRef(null)

  /* Hero entrance timeline */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(badgeRef.current,  { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.4)
      .fromTo(titleRef.current,  { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.55)
      .fromTo(descRef.current,   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.75)
      .fromTo(ctaRef.current,    { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.9)
      .fromTo(deviceRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1 },   0.6)
  }, [])

  /* Scroll-triggered reveals */
  useEffect(() => {
    const cards = gsap.utils.toArray('.gsap-card')
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          delay: (i % 3) * 0.12,
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })

    gsap.utils.toArray('.gsap-step').forEach((el, i) => {
      gsap.fromTo(el,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
          delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })

    gsap.utils.toArray('.gsap-reveal').forEach(el => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })

    /* Stats counter */
    gsap.utils.toArray('.stat-num').forEach(el => {
      const end = parseFloat(el.dataset.val)
      const isFloat = el.dataset.float === '1'
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo({ val: 0 }, { val: end }, {
            duration: 2, ease: 'power2.out',
            onUpdate: function () {
              el.textContent = isFloat
                ? this.targets()[0].val.toFixed(1) + '%'
                : Math.round(this.targets()[0].val).toLocaleString() + (el.dataset.suffix || '')
            }
          })
        }
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <main className="grid-bg">

      {/* ── HERO ─────────────────────────────────── */}
      <section ref={heroRef} id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #e6000a 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #e6000a 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-24">

          {/* Left copy */}
          <div>
            <div ref={badgeRef} className="inline-flex items-center gap-2 mb-7 px-4 py-2 text-[11px] font-bold tracking-[0.18em] uppercase"
              style={{ background: 'rgba(230,0,10,0.08)', border: '1px solid rgba(230,0,10,0.2)', color: '#e6000a' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e6000a] blink" />
              Next-Gen Vehicle Security · India
            </div>

            <h1 ref={titleRef} className="font-orbitron font-black leading-[1.05] mb-6 text-glow"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}>
              Track Your Bike<br />
              with{' '}
              <span className="relative inline-block text-[#e6000a]">
                One Click.
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#e6000a]"
                  style={{ boxShadow: '0 0 12px #e6000a' }} />
              </span>
            </h1>

            <p ref={descRef} className="text-white/45 text-lg leading-relaxed mb-10 max-w-[480px]">
              TrackX is a smart GPS tracking device built for Indian roads. Instantly locate and
              protect your motorcycle, scooter, or car using advanced satellite technology — no
              technical skills needed.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Link to="/order" className="btn-primary">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2.5" fill="white"/><path d="M7 0v3M7 11v3M0 7h3M11 7h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Order Device — ₹999
              </Link>
              <a href="#how-it-works" className="btn-ghost">
                See How It Works →
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex items-center gap-5 flex-wrap">
              {[['10K+','Devices Sold'],['99.8%','Accuracy'],['24/7','Support']].map(([v,l]) => (
                <div key={l} className="flex items-center gap-2">
                  <span className="font-orbitron font-black text-lg text-white">{v}</span>
                  <span className="text-white/30 text-xs uppercase tracking-widest">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Device card */}
          <div ref={deviceRef} className="hidden lg:flex justify-center items-center">
            <div className="float relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-8 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(230,0,10,0.4) 0%, transparent 70%)' }} />

              <div className="relative card p-7 w-[320px]"
                style={{ boxShadow: '0 0 80px rgba(230,0,10,0.08), 0 40px 80px rgba(0,0,0,0.6)' }}>

                {/* Map mock */}
                <div className="relative w-full h-[180px] mb-5 overflow-hidden"
                  style={{ background: '#080810', border: '1px solid rgba(230,0,10,0.1)',
                    backgroundImage: 'linear-gradient(rgba(230,0,10,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(230,0,10,0.06) 1px, transparent 1px)',
                    backgroundSize: '24px 24px' }}>
                  {/* Radar */}
                  <div className="absolute top-1/2 left-1/2" style={{ transform:'translate(-50%,-50%)' }}>
                    {[56,96,136].map(s => (
                      <div key={s} className="absolute rounded-full border border-[#e6000a]/10"
                        style={{ width:s, height:s, top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
                    ))}
                    {/* Sweep line */}
                    <div className="radar-sweep absolute" style={{
                      width: '68px', height: '1px', top:'50%', left:'50%',
                      background: 'linear-gradient(to right, transparent, rgba(230,0,10,0.9))',
                      transformOrigin: '0 50%', marginTop:'-0.5px'
                    }} />
                    {/* Center dot */}
                    <div className="absolute w-3 h-3 rounded-full bg-[#e6000a] z-10"
                      style={{ top:'50%', left:'50%', transform:'translate(-50%,-50%)', boxShadow:'0 0 16px #e6000a' }}>
                      <div className="ping-expand absolute w-3 h-3 rounded-full bg-[#e6000a]" style={{top:'50%',left:'50%'}} />
                    </div>
                  </div>
                  {/* Blips */}
                  {[{t:'28%',l:'66%',d:0},{t:'64%',l:'28%',d:0.8}].map((b,i)=>(
                    <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-[#e6000a]"
                      style={{ top:b.t, left:b.l, boxShadow:'0 0 8px #e6000a', animation:`blink 1.8s ${b.d}s infinite` }} />
                  ))}
                  {/* Address tag */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 text-[10px] text-white/50 flex items-center gap-1.5"
                    style={{ background:'rgba(6,6,8,0.85)', border:'1px solid rgba(255,255,255,0.06)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e6000a] blink flex-shrink-0" />
                    Connaught Place, New Delhi — Live
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[['Speed','42 km/h','#e6000a'],['Battery','94%','#4ade80'],['Signal','GPS','#60a5fa']].map(([l,v,c])=>(
                    <div key={l} className="text-center py-2.5 px-2"
                      style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.04)' }}>
                      <p className="font-orbitron font-bold text-[11px]" style={{color:c}}>{v}</p>
                      <p className="text-white/25 text-[10px] uppercase tracking-widest mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>

                <Link to="/order" className="btn-primary w-full text-[11px]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="2" fill="white"/><path d="M6 0v2.5M6 9.5V12M0 6h2.5M9.5 6H12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  Track My Vehicle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ────────────────────────── */}
      <div className="overflow-hidden border-y border-white/[0.04] py-4">
        <div className="marquee-track flex gap-12 whitespace-nowrap w-max">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="font-orbitron font-bold text-xs tracking-[0.2em] uppercase text-white/15">
              {b} <span className="text-[#e6000a] mx-4">×</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ─────────────────────────────── */}
      <section ref={statsRef} className="border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { val: '10000', suffix: '+', label: 'Devices Sold' },
            { val: '99.8',  float: '1',  label: 'GPS Accuracy' },
            { val: '500',   suffix: 'ms',label: 'Avg. Response' },
            { val: '50000', suffix: '+', label: 'Km Tracked' },
          ].map((s, i) => (
            <div key={i} className="gsap-reveal py-10 text-center border-r border-white/[0.04] last:border-r-0 hover:bg-white/[0.01] transition-colors">
              <p className="stat-num font-orbitron font-black text-3xl text-[#e6000a] mb-1"
                data-val={s.val} data-float={s.float} data-suffix={s.suffix}>
                {s.float ? '0.0%' : '0' + (s.suffix||'')}
              </p>
              <p className="text-white/30 text-[11px] uppercase tracking-[0.15em]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────── */}
      <section id="features" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="gsap-reveal text-center mb-16">
            <p className="section-label"><span className="tag-line">Features</span></p>
            <h2 className="font-orbitron font-black text-white mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Everything You Need to<br />Stay in Control
            </h2>
            <p className="text-white/35 text-base max-w-lg mx-auto leading-relaxed">
              Six layers of intelligence, engineered into one compact device the size of a matchbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="gsap-card card p-8 group cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at top right, rgba(230,0,10,0.06), transparent)' }} />
                <div className="flex items-start justify-between mb-5">
                  <span className="text-3xl">{f.icon}</span>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1"
                    style={{ background:'rgba(230,0,10,0.08)', color:'#e6000a', border:'1px solid rgba(230,0,10,0.15)' }}>
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-orbitron font-bold text-white text-sm mb-3">{f.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-5 w-0 group-hover:w-full h-px bg-[#e6000a]/30 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section id="how-it-works" className="py-28 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left steps */}
          <div>
            <p className="gsap-reveal section-label"><span className="tag-line">Process</span></p>
            <h2 className="gsap-reveal font-orbitron font-black text-white mb-3"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              From Order to<br />Live Tracking
            </h2>
            <p className="gsap-reveal text-white/35 leading-relaxed mb-12">
              Under 3 minutes from unboxing to your vehicle showing live on the map.
            </p>

            <div className="flex flex-col">
              {steps.map((s, i) => (
                <div key={i} className="gsap-step flex gap-6 py-7 border-b border-white/[0.05] last:border-b-0 group">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center font-orbitron font-black text-2xl transition-all duration-300"
                    style={{ border:'1px solid rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.12)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(230,0,10,0.5)'; e.currentTarget.style.color='#e6000a' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.color='rgba(255,255,255,0.12)' }}>
                    {s.n}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-orbitron font-bold text-white text-sm mb-2">{s.title}</h4>
                    <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right radar visual */}
          <div className="gsap-reveal flex justify-center">
            <div className="relative w-[280px] h-[280px]">
              {[70,128,186,244,280].map((s,i) => (
                <div key={s} className="absolute rounded-full border border-[#e6000a]/[0.12]"
                  style={{ width:s, height:s, top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                    boxShadow: i === 0 ? '0 0 20px rgba(230,0,10,0.15)' : 'none' }} />
              ))}

              {/* Cross lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-[#e6000a]/[0.08]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-[#e6000a]/[0.08]" />
              </div>

              {/* Sweep */}
              <div className="radar-sweep absolute" style={{
                width:'140px', height:'1px',
                top:'50%', left:'50%',
                background:'linear-gradient(to right, transparent, rgba(230,0,10,0.8))',
                transformOrigin:'0 50%', marginTop:'-0.5px'
              }} />

              {/* Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-5 h-5 rounded-full bg-[#e6000a]"
                  style={{ boxShadow:'0 0 24px #e6000a, 0 0 50px rgba(230,0,10,0.4)' }}>
                  <div className="ping-expand absolute w-5 h-5 rounded-full bg-[#e6000a]"
                    style={{top:'50%',left:'50%'}} />
                  <div className="ping-expand-delay absolute w-5 h-5 rounded-full bg-[#e6000a]"
                    style={{top:'50%',left:'50%'}} />
                </div>
              </div>

              {/* Blips */}
              {[{t:'22%',l:'63%',d:'0s'},{t:'66%',l:'24%',d:'0.9s'},{t:'36%',l:'18%',d:'1.6s'}].map((b,i)=>(
                <div key={i} className="absolute w-2 h-2 rounded-full bg-[#e6000a]"
                  style={{ top:b.t, left:b.l, boxShadow:'0 0 10px #e6000a',
                    animation:`blink 2s ${b.d} infinite` }} />
              ))}

              {/* Label */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
                <p className="font-orbitron font-bold text-[#e6000a] text-xs tracking-widest">LIVE TRACKING</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(230,0,10,0.05) 0%, transparent 50%, rgba(230,0,10,0.03) 100%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="gsap-reveal section-label justify-center"><span className="tag-line">Limited Stock</span></p>
          <h2 className="gsap-reveal font-orbitron font-black text-white mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Ready to Secure<br />Your Vehicle?
          </h2>
          <p className="gsap-reveal text-white/35 text-base leading-relaxed mb-10 max-w-md mx-auto">
            Join 10,000+ riders across India who trust TrackX to keep their vehicles safe. Free shipping. 30-day guarantee.
          </p>
          <div className="gsap-reveal flex flex-wrap gap-4 justify-center">
            <Link to="/order" className="btn-primary text-sm">
              ⚡ Order Now — ₹999 + Free Shipping
            </Link>
            <a href="#features" className="btn-ghost text-sm">Explore Features →</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────── */}
      <section id="contact" className="py-28 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <p className="gsap-reveal section-label"><span className="tag-line">Contact</span></p>
            <h2 className="gsap-reveal font-orbitron font-black text-white mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
              Got Questions?<br />We're Here.
            </h2>
            <p className="gsap-reveal text-white/35 leading-relaxed mb-10">
              Whether it's about the product, shipping, or installation — reach out and we'll get back within a few hours.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: '👤', label: 'Contact Person', val: 'Nikhil Gupta & Harsh Tripathi' },
                { icon: '📧', label: 'Email', val: 'Noni.workplace@gmail.com' },
                { icon: '📍', label: 'Based In', val: 'India' },
              ].map((c, i) => (
                <div key={i} className="gsap-card card flex items-center gap-5 px-5 py-4 hover:translate-x-1">
                  <span className="text-xl w-10 text-center">{c.icon}</span>
                  <div>
                    <p className="text-white/25 text-[10px] uppercase tracking-[0.15em] mb-0.5">{c.label}</p>
                    <p className="text-white font-semibold text-sm">{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick contact form */}
          <SimpleContactForm />
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between gap-10 mb-10">
            <div>
              <p className="font-orbitron font-black text-xl tracking-widest mb-3">
                TRACK<span className="text-[#e6000a]">X</span>
              </p>
              <p className="text-white/25 text-sm max-w-xs leading-relaxed">
                India's smartest GPS vehicle tracking device. Know where your bike is — always.
              </p>
            </div>
            {[
              { title: 'Product',   links: ['Features', 'How It Works', 'Pricing', 'Order Now'] },
              { title: 'Support',   links: ['Contact Us', 'Installation Guide', 'Warranty Policy', 'Shipping Info'] },
              { title: 'Legal',     links: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookie Policy'] },
            ].map(col => (
              <div key={col.title}>
                <p className="font-orbitron font-bold text-[10px] tracking-[0.2em] uppercase text-white mb-4">{col.title}</p>
                <ul className="flex flex-col gap-3">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-white/25 text-xs hover:text-white/70 transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.05] pt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-white/20 text-xs">© 2026 TrackX. All rights reserved. Contact: <span className="text-white/40">Nikhil Gupta & Harsh Tripathi</span></p>
            <p className="text-white/15 text-xs">Securing India's vehicles, one click at a time.</p>
          </div>
        </div>
      </footer>

    </main>
  )
}

/* ─── CONTACT FORM — sends email only, no Google Sheet ── */
function SimpleContactForm() {
  const [form, setForm]       = useState({ name:'', email:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in Name, Email and Message.')
      return
    }
    setLoading(true)
    try {
      const ok = await submitContact(form)
      if (ok) setSent(true)
      else alert('Could not send message. Please email us directly at Noni.workplace@gmail.com')
    } catch {
      alert('Error sending message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <div className="gsap-reveal card p-8 flex flex-col items-center justify-center text-center" style={{ minHeight: 320 }}>
      <div className="text-4xl mb-4">✅</div>
      <p className="font-orbitron font-bold text-white text-sm mb-2">Message Sent!</p>
      <p className="text-white/35 text-sm">We'll get back to you at <span className="text-white/60">{form.email}</span> soon.</p>
    </div>
  )

  return (
    <div className="gsap-reveal card p-8">
      <p className="font-orbitron font-bold text-white text-xs tracking-widest uppercase mb-6">
        Send a Message
      </p>
      <div className="flex flex-col gap-4">
        {[
          { l:'Your Name', p:'Full name', k:'name', t:'text' },
          { l:'Email', p:'you@example.com', k:'email', t:'email' },
          { l:'Subject', p:'How can we help?', k:'subject', t:'text' },
        ].map(f => (
          <div key={f.k}>
            <label className="block text-[10px] text-white/25 uppercase tracking-[0.15em] mb-2">{f.l}</label>
            <input type={f.t} value={form[f.k]} onChange={e => update(f.k, e.target.value)}
              placeholder={f.p} className="input-field" />
          </div>
        ))}
        <div>
          <label className="block text-[10px] text-white/25 uppercase tracking-[0.15em] mb-2">Message</label>
          <textarea rows={4} value={form.message} onChange={e => update('message', e.target.value)}
            placeholder="Tell us what you need..." className="input-field resize-none" />
        </div>
        <button onClick={handleSend} disabled={loading}
          className="btn-primary text-[11px] w-full mt-1 disabled:opacity-60">
          {loading ? 'Sending...' : 'Send Message →'}
        </button>
      </div>
    </div>
  )
}
