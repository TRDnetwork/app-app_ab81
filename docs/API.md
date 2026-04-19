# 🌐 Portfolio Pro API Documentation

This site uses a single serverless API endpoint to handle contact form submissions securely.

---

## 📡 Base URL
All endpoints are relative to your deployed domain:
```
https://app_ab81.vercel.app/api
```

> 💡 During local development: `http://localhost:3000/api`

---

## ✉️ Contact Form Endpoint

### `POST /contact`

Handles submission of the contact form, validates input, and sends dual email notifications.

#### 🔐 Authentication
None required — public endpoint with honeypot protection.

#### 📥 Request

**Headers**
```http
Content-Type: application/json
```

**Body**
| Field | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | ✅ | Full name of the sender |
| `email` | string | ✅ | Valid email address |
| `message` | string | ✅ | Message content |
| `bot-field` | string | 🚫 | Honeypot field — must be empty |

**Example Request**
```bash
curl -X POST https://app_ab81.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "I love your work! Let's connect.",
    "bot-field": ""
  }'
```

#### 📤 Responses

| Code | Status | Response Body | Description |
|------|--------|---------------|-------------|
| `200` | OK | `{ "success": true }` | Form submitted successfully. Emails sent. |
| `400` | Bad Request | `{ "message": "All fields are required." }` | Missing `name`, `email`, or `message` |
| `400` | Bad Request | `{ "message": "Please enter a valid email address." }` | Invalid email format |
| `405` | Method Not Allowed | `{ "message": "Method not allowed" }` | Only `POST` is allowed |
| `500` | Internal Server Error | `{ "message": "Something went wrong. Please try again later." }` | Email sending failed (Resend error, network, etc.) |

> ⚠️ **Honeypot Behavior**: If `bot-field` is filled, returns `200 { success: true }` silently to avoid alerting bots.

---

## 📨 Email Delivery Flow

Upon successful submission (`200`), two emails are sent:

### 1. To Site Owner
- **From**: `Portfolio Pro <onboarding@resend.dev>`
- **To**: `OWNER_EMAIL` (from environment variable)
- **Subject**: `New message from {name}`
- **Template**: `src/emails/contact-notification.js`
- **Content**: Includes sender name, email, and message quote

### 2. To Submitter (Confirmation)
- **From**: `Portfolio Pro <onboarding@resend.dev>`
- **To**: `email` (from form)
- **Subject**: `Thanks for reaching out!`
- **Template**: `src/emails/contact-confirmation.js`
- **Content**: Personalized thank-you message with project and LinkedIn links

---

## 🔐 Security & Reliability

### ✅ Security Measures
- **Honeypot**: Hidden field blocks most spam bots
- **Validation**: All required fields checked server-side
- **Sanitization**: Input sanitized using `isomorphic-dompurify`
- **No Secrets Leaked**: `RESEND_API_KEY` never exposed to client
- **Rate Limiting Ready**: Integrates with Upstash Redis (via Vercel)

### 📬 Email Deliverability Tips
1. **Verify Domain** in [Resend Dashboard](https://resend.com/domains)
2. Use a custom domain (e.g., `hello@yourportfolio.com`)
3. Monitor logs in Vercel for errors
4. Set up DNS records (SPF, DKIM, DMARC) for better inbox placement

---

## 🧪 Testing the API

### Local Testing (with Mock)
Use a tool like `curl` or Postman to test locally (ensure Vercel dev server is running):

```bash
# Valid submission
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message.",
    "bot-field": ""
  }'
```

```bash
# Bot simulation (should return 200 silently)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bot",
    "email": "spam@bot.com",
    "message": "Buy cheap meds!!!",
    "bot-field": "I am a bot"
  }'
```

---

## 📊 Monitoring & Debugging

### Vercel Logs
Check logs in:
```
Vercel Dashboard → Your Project → Functions → api/contact.ts
```

Look for:
- `Error sending email: ...` — Resend API failure
- `Method not allowed` — Non-POST requests
- Validation errors — missing fields or invalid email

### Error Tracking
- **Sentry**: Enabled if configured (client and server)
- **PostHog**: Event tracking for form submissions (optional)

---

## 🔄 Rate Limiting (Production)

For production spam protection, integrate Upstash Redis:

```ts
// Example: Add to api/contact.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 m') // 10 requests per 10 minutes
});
```

Set environment variables in Vercel:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

> 📌 This prevents abuse while maintaining "fail open" behavior — if Redis fails, the form still works.

---

## 📎 Notes
- No authentication or authorization needed
- No database interactions
- All logic is contained in `api/contact.ts`
- Emails use inline HTML templates for consistent rendering

For full setup, see [`EMAIL_SETUP.md`](../EMAIL_SETUP.md).