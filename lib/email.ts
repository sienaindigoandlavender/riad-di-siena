import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingEmailData {
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  property: string;
  room?: string;
  tent?: string;
  experience?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  total: number;
  paypalOrderId?: string;
  message?: string;
}

const formatDate = (dateStr: string): string => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const getAccommodationName = (data: BookingEmailData): string => {
  return data.room || data.tent || data.experience || 'Accommodation';
};

// Email to guest confirming their booking
export async function sendGuestConfirmationEmail(data: BookingEmailData) {
  const accommodationName = getAccommodationName(data);
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Georgia, serif; color: #1a1a1a; line-height: 1.7; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 30px 0 24px; border-bottom: 1px solid #e5e5e5; }
    .logo { font-size: 22px; letter-spacing: 0.22em; font-weight: normal; }
    .content { padding: 30px 0; }
    h1 { font-size: 26px; font-weight: normal; margin: 0 0 8px; }
    p { margin: 0 0 16px; }
    .lede { color: #3a3a3a; }
    .section-label { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #8a7f72; margin: 32px 0 10px; }
    .dyafa { font-style: italic; }
    .details { background: #faf8f5; padding: 25px; margin: 28px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9e4dd; }
    .detail-row:last-child { border-bottom: none; }
    .label { color: #6b6b6b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
    .value { font-size: 14px; }
    .total { font-size: 18px; font-weight: bold; padding-top: 15px; margin-top: 15px; border-top: 2px solid #1a1a1a; }
    .note { background: #f0f7f0; padding: 15px 18px; margin: 24px 0; font-size: 14px; }
    .footer { text-align: center; padding: 28px 0 10px; border-top: 1px solid #e5e5e5; color: #8a7f72; font-size: 12px; }
    .signoff { margin-top: 28px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">RIAD DI SIENA</div>
  </div>

  <div class="content">
    <h1>Salam, ${data.firstName}</h1>
    <p class="lede">Thank you for choosing Riad di Siena for your stay in Marrakech. Your booking is confirmed, and we are so happy to be welcoming you.</p>
    <p>Riad di Siena is a lived-in home, perfectly imperfect, rooted in care, presence, and the quiet rhythm of a traditional Medina house. Simplicity is honored here. Rest is protected. If you appreciate care over polish and meaning over perfection, you will feel at home the moment you walk in.</p>

    <div class="section-label">Your Reservation</div>
    <div class="details">
      <div class="detail-row">
        <span class="label">Booking Reference</span>
        <span class="value">${data.bookingId}</span>
      </div>
      <div class="detail-row">
        <span class="label">Accommodation</span>
        <span class="value">${accommodationName}</span>
      </div>
      <div class="detail-row">
        <span class="label">Check-in</span>
        <span class="value">${formatDate(data.checkIn)}</span>
      </div>
      <div class="detail-row">
        <span class="label">Check-out</span>
        <span class="value">${formatDate(data.checkOut)}</span>
      </div>
      <div class="detail-row">
        <span class="label">Nights</span>
        <span class="value">${data.nights}</span>
      </div>
      <div class="detail-row">
        <span class="label">Guests</span>
        <span class="value">${data.guests}</span>
      </div>
      <div class="total">
        <div class="detail-row" style="border: none;">
          <span>Total Paid</span>
          <span>€${data.total.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <div class="section-label">The Spirit of the House — Dyafa</div>
    <p class="dyafa">There is an old Arabic word for the way a guest is received: dyafa. Born in the desert, where taking in a weary traveler was a sacred duty, it lives on in Moroccan life as a point of honor.</p>
    <p class="dyafa">When you cross our threshold you are not a customer to be attended to, but a guest to be cared for — met with a hot glass of tea, a room prepared with devotion, and the ease of knowing you are held by a house that takes real pride in your comfort. That is the tradition we keep.</p>

    <div class="note">
      <strong>Next step:</strong> Please confirm your estimated arrival time with Zahra via WhatsApp (+212 6 19 11 20 08, 8:00 AM – 5:00 PM), so we can prepare everything for you. Closer to your arrival, we will send full directions and practical details.
    </div>

    <p class="signoff">Welcome to Marrakech. Welcome to this house. We look forward to receiving you.</p>
    <p>With warmth,<br>Jacqueline, Zahra &amp; Mouad<br>Riad di Siena</p>
  </div>

  <div class="footer">
    <p>Riad di Siena · 35–37 Derb Fhal Zefriti, Laksour · Marrakech Medina, Morocco</p>
    <p>riaddisiena.com</p>
  </div>
</body>
</html>
  `;

  try {
    const result = await resend.emails.send({
      from: 'Riad di Siena <bookings@mail.riaddisiena.com>',
      to: data.email,
      subject: `Welcome to Riad di Siena — your booking is confirmed (${data.bookingId})`,
      html,
    });
    console.log('Guest confirmation email sent:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send guest confirmation email:', error);
    return { success: false, error };
  }
}

// Email to owner notifying of new booking
export async function sendOwnerNotificationEmail(data: BookingEmailData) {
  const accommodationName = getAccommodationName(data);
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1a1a1a; color: #fff; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 18px; font-weight: normal; }
    .content { padding: 20px 0; }
    .highlight { background: #f0f7f0; padding: 15px; margin: 15px 0; border-left: 4px solid #4a5043; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { text-align: left; padding: 10px; border-bottom: 1px solid #e5e5e5; }
    th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b6b6b; }
    .amount { font-size: 24px; font-weight: bold; color: #4a5043; }
    .actions { margin-top: 20px; }
    .btn { display: inline-block; padding: 12px 24px; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 NEW BOOKING</h1>
  </div>
  
  <div class="content">
    <div class="highlight">
      <strong>${data.firstName} ${data.lastName}</strong> just booked <strong>${accommodationName}</strong> at <strong>${data.property}</strong>
    </div>
    
    <p class="amount">€${data.total.toLocaleString()}</p>
    
    <table>
      <tr>
        <th>Booking ID</th>
        <td>${data.bookingId}</td>
      </tr>
      <tr>
        <th>Guest</th>
        <td>${data.firstName} ${data.lastName}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td><a href="mailto:${data.email}">${data.email}</a></td>
      </tr>
      ${data.phone ? `<tr><th>Phone</th><td>${data.phone}</td></tr>` : ''}
      <tr>
        <th>Property</th>
        <td>${data.property}</td>
      </tr>
      <tr>
        <th>Accommodation</th>
        <td>${accommodationName}</td>
      </tr>
      <tr>
        <th>Check-in</th>
        <td>${formatDate(data.checkIn)}</td>
      </tr>
      <tr>
        <th>Check-out</th>
        <td>${formatDate(data.checkOut)}</td>
      </tr>
      <tr>
        <th>Nights</th>
        <td>${data.nights}</td>
      </tr>
      <tr>
        <th>Guests</th>
        <td>${data.guests}</td>
      </tr>
      <tr>
        <th>Total</th>
        <td><strong>€${data.total.toLocaleString()}</strong></td>
      </tr>
      ${data.paypalOrderId ? `<tr><th>PayPal Order</th><td>${data.paypalOrderId}</td></tr>` : ''}
      ${data.message ? `<tr><th>Message</th><td>${data.message}</td></tr>` : ''}
    </table>
    
    <div class="actions">
      <a href="https://ops.riaddisiena.com/team" class="btn">View in Ops</a>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const result = await resend.emails.send({
      from: 'Riad di Siena Bookings <bookings@mail.riaddisiena.com>',
      to: 'happy@riaddisiena.com',
      subject: `💰 New Booking: ${data.firstName} ${data.lastName} - €${data.total} - ${accommodationName}`,
      html,
    });
    console.log('Owner notification email sent:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send owner notification email:', error);
    return { success: false, error };
  }
}

// Send both emails
export async function sendBookingEmails(data: BookingEmailData) {
  const [guestResult, ownerResult] = await Promise.all([
    sendGuestConfirmationEmail(data),
    sendOwnerNotificationEmail(data),
  ]);
  
  return {
    guest: guestResult,
    owner: ownerResult,
  };
}

// Contact form email data
interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Email to owner for contact form submissions
export async function sendContactEmail(data: ContactEmailData) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2a2520; color: #f5f0e8; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 18px; font-weight: normal; }
    .content { padding: 20px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { text-align: left; padding: 10px; border-bottom: 1px solid #e5e5e5; }
    th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b6b6b; width: 100px; }
    .message { background: #faf8f5; padding: 20px; margin: 20px 0; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="header">
    <h1>✉️ NEW MESSAGE</h1>
  </div>
  
  <div class="content">
    <table>
      <tr>
        <th>From</th>
        <td><strong>${data.name}</strong></td>
      </tr>
      <tr>
        <th>Email</th>
        <td><a href="mailto:${data.email}">${data.email}</a></td>
      </tr>
      ${data.phone ? `<tr><th>Phone</th><td>${data.phone}</td></tr>` : ''}
    </table>
    
    <div class="message">${data.message}</div>
  </div>
</body>
</html>
  `;

  try {
    const result = await resend.emails.send({
      from: 'Riad di Siena <hello@mail.riaddisiena.com>',
      to: 'happy@riaddisiena.com',
      replyTo: data.email,
      subject: `Message from ${data.name}`,
      html,
    });
    console.log('Contact email sent:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return { success: false, error };
  }
}
