/**
 * ═══════════════════════════════════════════════════
 *  TRACKX — Google Apps Script for Google Sheets
 *  Paste this ENTIRE file into Google Apps Script
 *  and deploy as Web App
 * ═══════════════════════════════════════════════════
 *
 * SETUP STEPS:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Delete existing code, paste this entire file
 * 3. Click Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL → paste into .env as VITE_GOOGLE_SHEET_URL
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Order ID', 'Full Name', 'Email', 'Phone',
        'Vehicle Type', 'Vehicle Model', 'Quantity',
        'Address', 'City', 'State', 'PIN Code', 'Message'
      ])
      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, 13)
      headerRange.setBackground('#e6000a')
      headerRange.setFontColor('#ffffff')
      headerRange.setFontWeight('bold')
    }

    // Parse the incoming JSON
    const data = JSON.parse(e.postData.contents)

    // Append the new order as a row
    sheet.appendRow([
      data.timestamp    || new Date().toLocaleString('en-IN'),
      data.orderId      || '',
      data.name         || '',
      data.email        || '',
      data.phone        || '',
      data.vehicleType  || '',
      data.vehicleModel || '',
      data.quantity     || '1',
      data.address      || '',
      data.city         || '',
      data.state        || '',
      data.pincode      || '',
      data.message      || ''
    ])

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 13)

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Test function — run this manually to verify it works
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toLocaleString('en-IN'),
        orderId: 'TRX-TEST01',
        name: 'Test User',
        email: 'test@example.com',
        phone: '9876543210',
        vehicleType: 'Motorcycle / Bike',
        vehicleModel: 'Honda Activa 6G',
        quantity: '1',
        address: '123 Test Street',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        message: 'Test order'
      })
    }
  }
  const result = doPost(mockEvent)
  Logger.log(result.getContent())
}
