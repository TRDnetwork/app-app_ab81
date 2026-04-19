/**
 * Confirmation email sent back to the person who submitted the form.
 */
export default function contactConfirmation({ name }) {
  return `
    <div style="font-family: 'Satoshi', sans-serif; line-height: 1.6; color: #1a2e1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #faf8f5;">
      <h2 style="font-family: 'Fraunces', serif; color: #1a2e1a;">Hi ${name},</h2>
      <p>Thanks for reaching out! I've received your message and will get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore my <a href="https://app_ab81.vercel.app/#projects" style="color: #e66000;">projects</a> or connect with me on <a href="https://linkedin.com" style="color: #e66000;">LinkedIn</a>.</p>
      <hr style="border: 1px solid #e9e5dd; margin: 24px 0;" />
      <p style="color: #4a4a4a; font-size: 0.9em;">
        This is an automated confirmation from Portfolio Pro. 
        If you didn't send this, no further action is needed.
      </p>
    </div>
  `;
}