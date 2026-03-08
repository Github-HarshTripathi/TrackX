import { sanitizeObject } from './security'

// ── ONE ORDER ID generator — same ID used in email + sheet + success screen ──
export function generateOrderId() {
  const ts   = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `TRX-${ts}-${rand}`
}

// ─────────────────────────────────────────────
//  ORDER FORM — email + Google Sheet
// ─────────────────────────────────────────────
export async function submitOrder(rawData) {
  const data      = sanitizeObject(rawData)
  const orderId   = generateOrderId()
  const orderDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  const results   = { email: false, sheet: false, errors: [], orderId }

  // ── 1. WEB3FORMS EMAIL → Noni.workplace@gmail.com ──
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        subject: `🔴 New TrackX Order [${orderId}] — ${data.name}`,
        from_name: 'TrackX Orders',
        // ── Order details as clean email body ──
        'Order ID':      orderId,
        'Date':          orderDate,
        '---':           '──────────────────────',
        'Name':          data.name,
        'Email':         data.email,
        'Phone':         data.phone,
        '----':          '──────────────────────',
        'Vehicle Type':  data.vehicleType,
        'Vehicle Model': data.vehicleModel || 'Not specified',
        'Quantity':      data.quantity,
        '-----':         '──────────────────────',
        'Address':       data.address,
        'City':          data.city,
        'State':         data.state,
        'PIN Code':      data.pincode,
        'Notes':         data.message || 'None',
      }),
    })
    const json = await res.json()
    if (json.success) results.email = true
    else results.errors.push('Email: ' + json.message)
  } catch (err) {
    results.errors.push('Email: ' + err.message)
  }

  // ── 2. GOOGLE SHEETS — includes orderId ──
  try {
    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL
    if (sheetUrl) {
      await fetch(sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          timestamp:    orderDate,
          name:         data.name,
          email:        data.email,
          phone:        data.phone,
          vehicleType:  data.vehicleType,
          vehicleModel: data.vehicleModel,
          quantity:     data.quantity,
          address:      data.address,
          city:         data.city,
          state:        data.state,
          pincode:      data.pincode,
          message:      data.message,
        }),
      })
      results.sheet = true
    }
  } catch (err) {
    results.errors.push('Sheet: ' + err.message)
  }

  return results
}

// ─────────────────────────────────────────────
//  CONTACT FORM — only email, NO Google Sheet
// ─────────────────────────────────────────────
export async function submitContact(rawData) {
  const data = sanitizeObject(rawData)
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        subject:    `💬 TrackX Contact — ${data.name}`,
        from_name:  'TrackX Contact Form',
        'Name':     data.name,
        'Email':    data.email,
        'Subject':  data.subject || 'No subject',
        'Message':  data.message,
      }),
    })
    const json = await res.json()
    return json.success
  } catch {
    return false
  }
}
