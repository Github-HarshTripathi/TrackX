# ⚡ TrackX — Complete Setup Guide

## Tech Stack
- **React 18** + Vite (frontend)
- **GSAP** (animations — hero, scroll reveals, counters)
- **Tailwind CSS** (styling)
- **EmailJS** (sends email to tripathiharsh202@gmail.com — NO backend needed)
- **Google Sheets** (saves every order — NO backend needed)
- **DOMPurify** (security — input sanitization)

---

## 📦 STEP 1 — Install Node.js

1. Go to: https://nodejs.org/en/download
2. Download **LTS version** (e.g. Node 20)
3. Install it normally
4. Verify: Open terminal → `node --version` → should show `v20.x.x`

---

## 📁 STEP 2 — Open Project in VS Code

1. Extract the ZIP folder
2. Open VS Code
3. File → Open Folder → select the `trackx` folder
4. Open Terminal: `Ctrl + backtick` (the key above Tab)

---

## 📦 STEP 3 — Install Dependencies

Run this one command in the terminal:
```bash
npm install
```

This installs: React, GSAP, EmailJS, Tailwind, etc. (takes ~1-2 minutes)

---

## 📧 STEP 4 — Setup EmailJS (so orders reach your email)

### A. Create EmailJS Account
1. Go to: https://www.emailjs.com
2. Click **Sign Up Free** → create account with tripathiharsh202@gmail.com

### B. Add Email Service
1. Dashboard → **Email Services** → **Add New Service**
2. Choose **Gmail** → Connect your Gmail account (tripathiharsh202@gmail.com)
3. Click **Connect Account** and authorize
4. Copy your **Service ID** (looks like: `service_abc123`)

### C. Create Email Template
1. Dashboard → **Email Templates** → **Create New Template**
2. **Subject:** `🔴 New TrackX Order — {{from_name}}`
3. **Body** (paste this exactly):
```
New TrackX device order received!

Order ID:       {{order_id}}
Date:           {{order_date}}

━━━━━━━━━━━━━━━━━━
CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━
Name:           {{from_name}}
Email:          {{from_email}}
Phone:          {{phone}}

━━━━━━━━━━━━━━━━━━
ORDER DETAILS
━━━━━━━━━━━━━━━━━━
Vehicle Type:   {{vehicle_type}}
Vehicle Model:  {{vehicle_model}}
Quantity:       {{quantity}}

━━━━━━━━━━━━━━━━━━
DELIVERY ADDRESS
━━━━━━━━━━━━━━━━━━
Address:        {{address}}
City:           {{city}}
State:          {{state}}
PIN Code:       {{pincode}}

Notes: {{message}}
```
4. Set **To Email:** `tripathiharsh202@gmail.com`
5. **Save** the template
6. Copy your **Template ID** (looks like: `template_xyz789`)

### D. Get Public Key
1. Dashboard → **Account** → **General** tab
2. Copy your **Public Key** (looks like: `user_ABCdef123`)

---

## 📊 STEP 5 — Setup Google Sheets (to save all orders)

### A. Create a New Google Sheet
1. Go to: https://sheets.new
2. Rename the sheet tab to `Orders` (bottom left)
3. Name the spreadsheet: **TrackX Orders**

### B. Open Apps Script
1. In the Google Sheet: **Extensions** → **Apps Script**
2. Delete all existing code in the editor
3. Open the file `google-apps-script.js` from this project
4. Copy ALL the code and paste it into Apps Script
5. Click **Save** (floppy disk icon)

### C. Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → select **Web app**
3. Settings:
   - **Description:** TrackX Order Form
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. If it asks for permissions → click **Authorize access** → Allow
6. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/AKfycb.../exec`)

### D. Test it works
1. Back in Apps Script, click `testDoPost` function
2. Click **Run** button
3. Go to your Google Sheet — you should see a test row appear!

---

## 🔧 STEP 6 — Fill in Your .env File

Open the `.env` file in VS Code and replace the placeholder values:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_ABCdef123
VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

Replace with YOUR actual values from Steps 4 and 5.

---

## 🚀 STEP 7 — Run the Website

```bash
npm run dev
```

Open browser → **http://localhost:5173**

### Test the form:
1. Go to `/order`
2. Fill in all fields with test data
3. Click **Place Order**
4. Check: tripathiharsh202@gmail.com should receive an email
5. Check: Your Google Sheet should have a new row

---

## 🌐 STEP 8 — Host on Google Firebase (Free + Custom Domain)

Firebase Hosting is Google's hosting — fast, free, and works perfectly with custom domains.

### A. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### B. Login to Firebase
```bash
firebase login
```
(Opens browser → sign in with your Google account)

### C. Build the project
```bash
npm run build
```
(Creates a `dist/` folder with the production website)

### D. Initialize Firebase
```bash
firebase init hosting
```
Answer the questions:
- **Which Firebase project?** → Create new project → name it `trackx-app`
- **What is your public directory?** → type `dist`
- **Single-page app?** → `y`
- **Overwrite dist/index.html?** → `N`

### E. Deploy!
```bash
firebase deploy
```

Your site is now LIVE at: `https://trackx-app.web.app`

### F. Connect Your Custom Domain
1. Go to: https://console.firebase.google.com
2. Select your project → **Hosting** → **Add custom domain**
3. Enter your domain (e.g. `www.trackx.in`)
4. Firebase gives you DNS records to add
5. Go to your domain registrar (GoDaddy, Namecheap, etc.)
6. Add the DNS records Firebase shows you
7. Wait 24-48 hours → your domain is live with HTTPS automatically!

---

## 🔒 Security Features Already Built In

| Feature | What it does |
|---------|-------------|
| Input Sanitization | All form inputs stripped of HTML/JS before sending |
| Validation | Phone, email, PIN code, name all validated |
| Rate Limiting | Max 3 form submissions per minute per user |
| Honeypot Field | Invisible field catches and blocks bots silently |
| HTTPS | Firebase gives free SSL certificate automatically |
| CSP Meta Tags | XSS protection via Content Security Policy |
| No sensitive keys exposed | EmailJS public key is safe to use client-side |

---

## 📂 File Structure

```
trackx/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          ← Full landing page with GSAP animations
│   │   └── OrderPage.jsx     ← Order form with validation + submission
│   ├── components/
│   │   └── Navbar.jsx        ← Sticky nav with GSAP entrance
│   ├── hooks/
│   │   └── useCursor.js      ← Custom animated cursor
│   ├── utils/
│   │   ├── security.js       ← Sanitization, validation, rate limit
│   │   └── formService.js    ← EmailJS + Google Sheets submission
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             ← Tailwind + custom animations
├── .env                      ← YOUR KEYS GO HERE
├── google-apps-script.js     ← Paste into Google Apps Script
├── index.html
└── package.json
```

---

## ❓ Common Issues & Fixes

**"EmailJS not sending"**
→ Check your Service ID, Template ID, Public Key in `.env`
→ Make sure Gmail account is connected in EmailJS dashboard
→ Check EmailJS quota (200 free emails/month on free plan)

**"Google Sheet not saving"**
→ Re-deploy Apps Script (Deploy → Manage deployments → New version)
→ Make sure "Who has access" is set to "Anyone"
→ Double-check the URL in `.env` ends in `/exec`

**"npm not found"**
→ Node.js is not installed → go back to Step 1

**"Module not found" error**
→ Run `npm install` again

**Cursor not showing**
→ Normal on mobile devices — cursor only shows on desktop

---

Built for Nikhil Gupta / TrackX
Contact: tripathiharsh202@gmail.com
