import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import toast from 'react-hot-toast'
import { submitOrder } from '../utils/formService.js'
import { generateOrderId } from '../utils/formService.js'
import { validateForm, checkRateLimit, isBot } from '../utils/security.js'

const ORDER_TYPES = ['System']
const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal']

const INITIAL = {
  name: '', email: '', phone: '',
  vehicleType: '', vehicleModel: '', quantity: '1',
  address: '', city: '', state: '', pincode: '',
  message: '',
  honeypot: '' // bot trap — always empty for real users
}

export default function OrderPage() {
  const [form,    setForm]    = useState(INITIAL)
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')

  const heroRef = useRef(null)
  const formRef = useRef(null)

  // Entrance animations
  useEffect(() => {
    gsap.fromTo(heroRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
    )
    gsap.fromTo(formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.35 }
    )
  }, [])

  const update = (k, v) => {
    setForm(p => ({ ...p, [k]: v }))
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ── Security checks ──
    if (isBot(form.honeypot)) return // silent bot rejection

    const rateLimitResult = checkRateLimit('order-form', 3, 60000)
    if (!rateLimitResult.allowed) {
      toast.error(`Too many attempts. Please wait ${rateLimitResult.waitSec}s and try again.`)
      return
    }

    const validationErrors = validateForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fix the errors below.')
      // Shake animation on form
      gsap.fromTo(formRef.current,
        { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)', repeat: 3 }
      )
      return
    }

    setLoading(true)

    try {
      const result = await submitOrder(form)

      if (result.email || result.sheet) {
        setOrderId(result.orderId)   // ← same ID that went to email + sheet
        setSuccess(true)
        toast.success('Order placed successfully!')
      } else {
        throw new Error('Submission failed')
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again or contact us directly.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) return <SuccessScreen orderId={orderId} name={form.name} onReset={() => { setSuccess(false); setForm(INITIAL) }} />

  return (
    <div className="min-h-screen grid-bg pt-16">
      {/* Ambient */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #e6000a 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <div ref={heroRef} className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase hover:text-white/60 transition-colors mb-8">
            ← Back to Home
          </Link>
          <p className="section-label mb-2"><span className="tag-line">Secure Checkout</span></p>
          <h1 className="font-orbitron font-black text-white mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Order Your<br />TrackX Device
          </h1>
          <p className="text-white/35 text-base max-w-md">
            Fill in your details below. No payment needed now — we'll confirm your order and ship within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── SIDEBAR ── */}
          <aside>
            {/* Product box */}
            <div className="card p-6 mb-5">
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/[0.05]">
                <div className="w-14 h-14 flex items-center justify-center text-3xl"
                  style={{ background:'rgba(230,0,10,0.08)', border:'1px solid rgba(230,0,10,0.15)' }}>
                  📡
                </div>
                <div>
                  <p className="font-orbitron font-bold text-white text-sm">TrackX GPS Device</p>
                  <p className="text-white/30 text-xs mt-0.5">Smart Vehicle Tracker</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/40 text-sm">Unit Price</span>
                <span className="font-orbitron font-bold text-white">₹999</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/40 text-sm">Shipping</span>
                <span className="text-[#e6000a] text-sm font-semibold">FREE</span>
              </div>
              <div className="border-t border-white/[0.05] pt-4 flex items-center justify-between">
                <span className="text-white/60 text-sm font-semibold">Total</span>
                <span className="font-orbitron font-black text-[#e6000a] text-xl">₹999</span>
              </div>
            </div>

            {/* What's included */}
            <div className="card p-6">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">What's Included</p>
              {['TrackX GPS device (compact)','Installation guide booklet','1-year hardware warranty','Lifetime app updates','30-day money-back guarantee','Free shipping anywhere in India','Dedicated setup support call'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e6000a] flex-shrink-0" />
                  <span className="text-white/40 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* ── FORM ── */}
          <form ref={formRef} onSubmit={handleSubmit} noValidate
            className="lg:col-span-2 card p-8 relative">

            {/* Honeypot — hidden from real users, traps bots */}
            <input
              type="text"
              name="website"
              value={form.honeypot}
              onChange={e => update('honeypot', e.target.value)}
              style={{ position:'absolute', left:'-9999px', opacity:0, height:0 }}
              tabIndex={-1}
              autoComplete="off"
            />

            <p className="font-orbitron font-bold text-white text-xs tracking-widest uppercase mb-8 pb-5 border-b border-white/[0.05]">
              📦 Device Order Form
            </p>

            {/* Personal Details */}
            <FieldGroup title="Personal Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Full Name *" value={form.name} onChange={v => update('name', v)}
                  placeholder="Rajan Sharma" error={errors.name} />
                <Field label="Phone Number *" value={form.phone} onChange={v => update('phone', v)}
                  placeholder="9876543210" type="tel" error={errors.phone} />
              </div>
              <Field label="Email Address *" value={form.email} onChange={v => update('email', v)}
                placeholder="you@example.com" type="email" error={errors.email} />
            </FieldGroup>

            {/* Vehicle Details */}
            <FieldGroup title="Vehicle Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField label="Vehicle Type *" value={form.vehicleType} onChange={v => update('vehicleType', v)}
                  options={VEHICLE_TYPES} error={errors.vehicleType} />
                <Field label="Vehicle Model" value={form.vehicleModel} onChange={v => update('vehicleModel', v)}
                  placeholder="Honda Activa 6G" />
              </div>
              <div>
                <label className="block text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2">Quantity</label>
                <div className="flex gap-2">
                  {['1','2','3','4','5'].map(q => (
                    <button key={q} type="button" onClick={() => update('quantity', q)}
                      className="w-10 h-10 text-sm font-bold transition-all duration-150"
                      style={{
                        background: form.quantity === q ? '#e6000a' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${form.quantity === q ? '#e6000a' : 'rgba(255,255,255,0.07)'}`,
                        color: form.quantity === q ? '#fff' : 'rgba(255,255,255,0.4)',
                        boxShadow: form.quantity === q ? '0 0 16px rgba(230,0,10,0.4)' : 'none'
                      }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </FieldGroup>

            {/* Delivery Address */}
            <FieldGroup title="Delivery Address">
              <Field label="Street Address *" value={form.address} onChange={v => update('address', v)}
                placeholder="House No, Street, Area, Landmark" error={errors.address} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="City *" value={form.city} onChange={v => update('city', v)}
                  placeholder="New Delhi" error={errors.city} />
                <SelectField label="State *" value={form.state} onChange={v => update('state', v)}
                  options={STATES} error={errors.state} />
                <Field label="PIN Code *" value={form.pincode} onChange={v => update('pincode', v)}
                  placeholder="110001" error={errors.pincode} />
              </div>
            </FieldGroup>

            {/* Notes */}
            <div className="mb-8">
              <label className="block text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2">Additional Notes (Optional)</label>
              <textarea rows={3} value={form.message} onChange={e => update('message', e.target.value)}
                placeholder="Any special instructions or questions..."
                className="input-field resize-none" />
            </div>

            {/* Security notice */}
            <div className="flex items-center gap-3 mb-6 px-4 py-3"
              style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.05)' }}>
              <span className="text-base">🔒</span>
              <p className="text-white/25 text-xs leading-relaxed">
                Your data is encrypted and never shared with third parties. No payment details required.
              </p>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full text-[12px] py-4 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                    style={{ animation:'spin 0.7s linear infinite' }} />
                  Processing...
                </>
              ) : (
                '⚡ Place Order — Get Confirmation on Email'
              )}
            </button>

            <p className="text-center text-white/20 text-xs mt-4">
              By placing an order you agree to our terms. No spam, ever.
            </p>
          </form>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/* ── FIELD COMPONENTS ── */
function FieldGroup({ title, children }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] text-white/20 uppercase tracking-[0.18em] font-semibold mb-4">{title}</p>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', error }) {
  return (
    <div>
      <label className="block text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} className={`input-field ${error ? 'border-[#e6000a]/60' : ''}`} />
      {error && <p className="text-[#e6000a] text-[11px] mt-1.5">{error}</p>}
    </div>
  )
}

function SelectField({ label, value, onChange, options, error }) {
  return (
    <div>
      <label className="block text-[10px] text-white/30 uppercase tracking-[0.15em] mb-2">{label}</label>
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)}
          className={`input-field appearance-none pr-8 ${error ? 'border-[#e6000a]/60' : ''}`}>
          <option value="">Select...</option>
          {options.map(o => <option key={o} value={o} style={{ background:'#0f0f12' }}>{o}</option>)}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-xs">▾</div>
      </div>
      {error && <p className="text-[#e6000a] text-[11px] mt-1.5">{error}</p>}
    </div>
  )
}

/* ── SUCCESS SCREEN ── */
function SuccessScreen({ orderId, name, onReset }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' }
    )
  }, [])

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center grid-bg px-5">
      <div ref={ref} className="card p-12 max-w-md w-full text-center"
        style={{ boxShadow:'0 0 80px rgba(230,0,10,0.1)' }}>
        <div className="text-5xl mb-6">🎉</div>
        <h2 className="font-orbitron font-black text-white text-2xl mb-3">Order Received!</h2>
        <p className="text-white/40 text-sm leading-relaxed mb-8">
          Hey {name}! Your TrackX order has been placed. We've sent a confirmation email and we'll call you within 24 hours to confirm.
        </p>
        <div className="mb-8 py-5 px-6"
          style={{ background:'rgba(230,0,10,0.06)', border:'1px solid rgba(230,0,10,0.18)' }}>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Your Order ID</p>
          <p className="font-orbitron font-black text-[#e6000a] text-2xl">{orderId}</p>
        </div>
        <div className="flex flex-col gap-3">
          {[
            '✅ Confirmation email sent',
            '📦 Ships within 24 hours',
            '📞 We\'ll call to confirm',
            '🛡️ 30-day money-back guarantee',
          ].map(s => (
            <p key={s} className="text-white/35 text-sm">{s}</p>
          ))}
        </div>
        <div className="flex gap-3 mt-8">
          <Link to="/" className="btn-ghost flex-1 text-xs">← Home</Link>
          <button onClick={onReset} className="btn-primary flex-1 text-xs">Order Another</button>
        </div>
      </div>
    </div>
  )
}
