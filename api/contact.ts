import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import contactNotification from '../../src/emails/contact-notification';
import contactConfirmation from '../../src/emails/contact-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message, 'bot-field': botField } = req.body;

  // Honeypot check
  if (botField) {
    return res.status(200).json({ success: true }); // Silent success to fool bots
  }

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  try {
    // Send notification to site owner
    await resend.emails.send({
      from: 'Portfolio Pro <onboarding@resend.dev>',
      to: [process.env.OWNER_EMAIL || 'owner@portfolio-pro.com'],
      subject: `New message from ${name}`,
      html: contactNotification({ name, email, message }),
    });

    // Send confirmation to user
    await resend.emails.send({
      from: 'Portfolio Pro <onboarding@resend.dev>',
      to: [email],
      subject: 'Thanks for reaching out!',
      html: contactConfirmation({ name }),
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
}