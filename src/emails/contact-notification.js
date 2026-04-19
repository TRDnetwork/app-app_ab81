/**
 * Email template sent to the site owner when someone submits the contact form.
 */
export default function contactNotification({ name, email, message }) {
  return `
    <div style="font-family: 'Satoshi', sans-serif; line-height: 1.6; color: #1a2e1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #faf8f5;">
      <h2 style="font-family: 'Fraunces', serif; color: #1a2e1a; border-bottom: 2px solid #e66000; padding-bottom: 8px;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #e66000;">${email}</a></p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #e9e5dd; padding: 12px; border-left: 4px solid #ff8c42; margin: 16px 0; font-style: italic;">
        ${message}
      </blockquote>
      <hr style="border: 1px solid #e9e5dd; margin: 24px 0;" />
      <p style="color: #4a4a4a; font-size: 0.9em;">
        This message was sent from your Portfolio Pro contact form. 
        Make sure your domain is verified in the <a href="https://resend.com" style="color: #e66000;">Resend Dashboard</a> to avoid delivery issues.
      </p>
    </div>
  `;
}