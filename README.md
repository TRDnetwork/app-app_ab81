# Portfolio Pro

A clean personal portfolio site with project showcase and contact form.

## 📄 Description
Portfolio Pro is a static personal website built with React, Vite, and Tailwind CSS. It features a modern, warm minimalist design with smooth animations powered by Framer Motion. The site includes a hero section, about paragraph, three project cards, and a fully functional contact form that sends emails via Resend through a Vercel serverless function.

This project prioritizes performance, accessibility, security (honeypot, rate limiting), and user experience with thoughtful micro-interactions and responsive layout.

---

## ✨ Features
- **Hero Section**: Introduces the owner with name and role
- **About Section**: Descriptive paragraph about the creator
- **Project Showcase**: 3 responsive project cards in a flexible grid layout
- **Contact Form**: Secure form with:
  - Honeypot anti-bot protection
  - Client-side validation
  - Dual email delivery (owner notification + user confirmation)
  - Loading, success, and error states with toast feedback
- **Animations**: Subtle scroll-in effects using Framer Motion
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Performance Optimized**: Zero external JavaScript (except analytics/debugging tools), Tailwind via CDN
- **Accessibility Focused**: Semantic HTML, proper contrast, focus states

---

## 🛠 Tech Stack
| Layer | Technology |
|------|------------|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS (via CDN) + Custom CSS Variables |
| Animations | Framer Motion |
| Email | Resend (serverless email delivery) |
| Hosting | Vercel |
| Backend | Vercel Serverless Functions (`api/contact.ts`) |
| Security | Honeypot, input sanitization, CSP headers |
| Analytics | PostHog (optional), Sentry (optional) |
| Rate Limiting | Upstash Redis (production-ready config) |

---

## 🚀 Setup Instructions
### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- [Resend account](https://resend.com) for email delivery
- Vercel account for deployment

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/app_ab81.git
cd app_ab81

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 📬 Contact Form Usage
The contact form submits to a Vercel serverless function at `/api/contact`:

### Endpoint
```
POST /api/contact
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello! I'd love to collaborate.",
  "bot-field": "" // Honeypot field (leave empty)
}
```

### Responses
| Status | Response |
|-------|----------|
| `200` | `{ "success": true }` |
| `400` | `{ "message": "All fields are required." }` or email validation error |
| `405` | `{ "message": "Method not allowed" }` |
| `500` | `{ "message": "Something went wrong. Please try again later." }` |

> ✅ Bots filling the honeypot field receive a silent `200` response to avoid detection.

---

## 📁 Folder Structure
```
app_ab81/
├── index.html                  # Main HTML template with Tailwind CDN
├── styles.css                  # Unused (styles inlined in index.html)
├── api/
│   └── contact.ts              # Vercel serverless function for email
├── db/
│   ├── schema.sql              # Empty — no DB used
│   └── seed.sql                # Empty — no DB used
├── src/
│   ├── emails/
│   │   ├── contact-notification.js # Owner email template
│   │   └── contact-confirmation.js # User confirmation template
│   └── main.tsx                # React entry point
├── EMAIL_SETUP.md              # Resend configuration guide
└── README.md                   # This file
```

---

## 🌐 Deployment
Deployed exclusively on **Vercel**:

1. Push code to a GitHub repository
2. Import project into Vercel dashboard
3. Set environment variables (see `EMAIL_SETUP.md`)
4. Deploy!

> ✅ Automatic SSL, CDN, and global edge functions included.

---

## 🔐 Security Notes
- **Honeypot Protection**: Hidden `bot-field` blocks spam bots
- **Input Validation**: Required fields + email regex check
- **Sanitization**: Uses `isomorphic-dompurify` (implied in backend logic)
- **Error Handling**: Generic messages to prevent info leakage
- **Headers**: CSP, X-Frame-Options, and other security headers enforced
- **Rate Limiting**: Optional Upstash Redis integration for production spam protection

---

## 🧪 Testing & Quality
- **Lighthouse Score**: Target >90 on Performance, Accessibility, SEO
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels
- **Responsive**: Tested on mobile, tablet, desktop
- **Animations**: Respected via `prefers-reduced-motion`

---

## 📎 Notes
- No database or Supabase usage — fully static site
- Fonts: **Fraunces** (headings), **Satoshi** (body)
- Color Palette: Natural beige (`#faf8f5`), dark green text (`#1a2e1a`), burnt orange accent (`#e66000`)
- Max width: `1200px` centered container
- Toast notifications auto-dismiss after 4 seconds

For email setup instructions, see [`EMAIL_SETUP.md`](./EMAIL_SETUP.md).

---

## 📞 Support
Need help? Open an issue or reach out at [your-email@example.com](mailto:your-email@example.com)

---

*Built with ❤️ using warm minimalism principles.*