# 📨 Portfolio Pro Email Setup Guide

Your contact form is powered by [Resend](https://resend.com) and a Vercel serverless function (`api/contact.ts`). Follow these steps to get email delivery working.

---

## 🔧 Step 1: Get Your Resend API Key

1. Go to [https://resend.com/signup](https://resend.com/signup) and create a free account.
2. After verifying your email, go to **API Keys** and create a new key.
3. Copy the key (it looks like `re_12345678-...`).

> 🔐 Never commit this key to GitHub. It's used only server-side.

---

## 🌐 Step 2: Set Environment Variables in Vercel

In your Vercel project dashboard:

1. Go to **Settings > Environment Variables**.
2. Add the following variables:

| Key               | Value                            |
|-------------------|----------------------------------|
| `RESEND_API_KEY`  | `re_12345678-...` (your key)     |
| `OWNER_EMAIL`     | `you@yourdomain.com` (your real email) |

> ✅ Use `RESEND_API_KEY`, NOT `VITE_RESEND_API_KEY` — the latter would expose it to the browser!

---

## 🛠️ Step 3: Verify Your Sending Domain (Critical!)

1. In the Resend dashboard, go to **Domains**.
2. Click **Add Domain** and enter your domain (e.g., `portfolio-pro.com` or `app_ab81.vercel.app`).
3. Follow the DNS verification steps (add TXT records).
4. Once verified, emails will send from `onboarding@resend.dev` → your verified domain.

> ⚠️ Unverified domains may have poor deliverability or be flagged as spam.

---

## 📲 Step 4: Frontend Integration (Already Done)

Your frontend already calls the API correctly:

```ts
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message, 'bot-field': botField }),
});
```

No client-side email logic is used. All sensitive operations are server-side.

---

## 🧪 Step 5: Test the Form

1. Deploy your site to Vercel.
2. Fill out the contact form with your own email.
3. Check:
   - You receive the notification at `OWNER_EMAIL`
   - The submitter receives a confirmation email

---

## 🚨 Troubleshooting

- **Emails not sending?** Check Vercel logs in `api/contact.ts`.
- **500 error?** Likely missing env vars or invalid API key.
- **Spam folder?** Verify your domain in Resend.
- **Rate limiting?** Add Upstash Redis via Vercel for production (optional).

---

✅ Done! Your portfolio now accepts messages securely and professionally.