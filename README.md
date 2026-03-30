# IntelAI Analytics Website

Landing site with consultation booking form.

## Setup
1. Clone repo
2. Add .env file with credentials
3. npm install
4. vercel dev

## Deploying & Email Setup

This site uses a Vercel Serverless Function at `/api/sendEmail` with Nodemailer and GoDaddy SMTP.

### Environment Variables (Vercel → Project → Settings → Environment Variables)
- `SMTP_USER` = support@intelaianalytics.com
- `SMTP_PASSWORD` = your mailbox password
- (optional) `SMTP_HOST` = smtpout.secureserver.net
- (optional) `SMTP_PORT` = 465

### Local Testing
- Use `vercel dev` at the project root (where `index.html` and `api/` are). The API endpoint will be available at `http://localhost:3000/api/sendEmail`.
- Opening `index.html` directly via `file://` won't work for the API. Use `vercel dev` or any static server for the frontend, but keep API under the same origin.
