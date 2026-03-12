/**
 * Security Utilities
 * - Input sanitization (prevents XSS)
 * - Rate limiting (client-side)
 * - Form validation
 */

// ── SANITIZE user input before sending anywhere ──
export function sanitize(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
    .slice(0, 500) // max length
}

export function sanitizeObject(obj) {
  const clean = {}
  for (const key in obj) {
    clean[key] = sanitize(String(obj[key]))
  }
  return clean
}

// ── VALIDATION ──
export const validators = {
  name: (v) => v.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(v),
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  phone: (v) => /^[6-9]\d{9}$/.test(v.replace(/\s/g, '')),
  pincode: (v) => /^\d{6}$/.test(v),
  required: (v) => v.trim().length > 0,
}

export function validateForm(fields) {
  const errors = {}
  if (!validators.name(fields.name)) errors.name = 'Enter a valid full name'
  if (!validators.email(fields.email)) errors.email = 'Enter a valid email address'
  if (!validators.phone(fields.phone)) errors.phone = 'Enter a valid 10-digit Indian mobile number'
  if (!validators.required(fields.vehicleType)) errors.vehicleType = 'Please select vehicle type'
  if (!validators.required(fields.address)) errors.address = 'Address is required'
  if (!validators.required(fields.city)) errors.city = 'City is required'
  if (!validators.pincode(fields.pincode)) errors.pincode = 'Enter a valid 6-digit PIN code'
  return errors
}

// ── CLIENT-SIDE RATE LIMITER ──
// Prevents spam submissions
const attempts = {}
export function checkRateLimit(key, maxAttempts = 3, windowMs = 60000) {
  const now = Date.now()
  if (!attempts[key]) attempts[key] = []
  // Remove old attempts outside the window
  attempts[key] = attempts[key].filter(t => now - t < windowMs)
  if (attempts[key].length >= maxAttempts) {
    const waitSec = Math.ceil((windowMs - (now - attempts[key][0])) / 1000)
    return { allowed: false, waitSec }
  }
  attempts[key].push(now)
  return { allowed: true }
}

// ── HONEYPOT check (bot detection) ──
export function isBot(honeypotValue) {
  return honeypotValue !== ''
}