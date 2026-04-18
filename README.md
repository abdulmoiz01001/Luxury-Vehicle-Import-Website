# Bhinder Corporation Ltd - Luxury Vehicle Import Website

Production-ready React frontend for Bhinder Corporation Ltd, designed as a premium business website for a luxury vehicle import portfolio.

## Tech Stack

- React (Vite)
- React Router DOM
- Tailwind CSS (Vite plugin)
- React Helmet Async (SEO)
- EmailJS (contact + receipt + complaint forms)
- React Hot Toast
- Lucide React Icons

## Project Structure

```text
src/
  assets/
  components/
    forms/
    sections/
  context/
  data/
  hooks/
  layout/
  pages/
  routes/
  seo/
  styles/
  utils/
```

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Add your EmailJS values in `.env`.

4. Start dev server:

```bash
npm run dev
```

5. Build production bundle:

```bash
npm run build
```

## Required Environment Variables

```env
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_SERVICE_ID=

VITE_EMAILJS_RECEIPT_OWNER_TEMPLATE_ID=
VITE_EMAILJS_RECEIPT_REPLY_TEMPLATE_ID=
```

## Feature Coverage

- Home page with premium hero and brand sections
- Vehicle listing with advanced filters:
  - Price
  - Brand
  - Model
  - Fuel Type
  - Transmission
  - City
  - Year
  - Search
- Vehicle detail route: `/vehicle/:slug`
- Compare vehicles (2-3 selectors)
- Complaint page form
- Submit receipt page form with optional phone, optional complaint text, and optional file upload
- WhatsApp prefilled inquiry CTA
- 404 page

## SEO Implementation

- React Helmet Async for dynamic metadata
- Dynamic titles and descriptions per page
- Canonical URLs
- Open Graph tags
- Twitter card tags
- Structured Data (JSON-LD):
  - Organization
  - LocalBusiness
  - AutoDealer
  - BreadcrumbList
  - Product (vehicle detail)
- `public/robots.txt`
- `public/sitemap.xml`
- Semantic HTML and alt text
- Route-level code splitting with `React.lazy`
- Lazy-loaded images

## EmailJS Beginner Guide (Complete)

### 1. Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click **Sign Up** and create your account.
3. Verify your email and log in.

### 2. Create Email Service

1. In dashboard, open **Email Services**.
2. Click **Add New Service**.
3. Choose **Gmail**.
4. Name it (e.g. `bhinder_service`).
5. Save and copy your **Service ID**.

### 3. Connect Gmail

1. During service setup, authorize your Gmail account.
2. Allow requested permissions.
3. Confirm service status is active.

### 4. Create Owner Template

Create 1 owner template:

1. Receipt/Complaint Owner Template

This template receives both receipt and complaint submissions and should send details to:

`Bhindercorporationltd254@gmail.com`

### 5. Create Auto Reply Template

Create 1 customer auto-reply template:

1. Receipt/Complaint Reply Template

Template includes:

- Customer name
- Thank-you message
- Follow-up note

### 6. Get Keys and IDs

From EmailJS dashboard collect:

- **Public Key** (Account > API Keys)
- **Service ID** (Email Services)
- **Template IDs** (Email Templates)

Map them into `.env` exactly using names in `.env.example`.

Current service ID provided by you:

- `VITE_EMAILJS_SERVICE_ID=service_9c6jnzw`

### 7. Place .env Variables

Create `.env` in project root (same level as `package.json`) and paste all values.

### 8. Test Forms

1. Run `npm run dev`
2. Submit each form:
   - `/submit-receipt`
   - `/complaint`
3. Confirm:
   - Owner email received
   - Customer auto-reply received
   - Success toast shown in UI
4. Test validation with invalid inputs.

## Email Template Variable Suggestions

### Contact Owner

Use variables:

- `from_name`
- `from_email`
- `phone`
- `message`

### Contact Reply

Use variables:

- `to_name`
- `to_email`
- `message`

### Receipt Owner

Use variables:

- `from_name`
- `from_email`
- `phone`
- `chassis_number`
- `register_number`
- `model_name`
- `complaint_message`
- `receipt_file_name`
- `receipt_attachment`
- `receipt_image_src`
- `receipt_download_url`
- `receipt_uploaded`

Recommended fallback handling in template content:

- Show `phone` as "Not provided" if empty
- Show `complaint_message` as "No complaint message provided." if empty
- Show `receipt_file_name` as "No file uploaded" if empty

Inline image preview and download in owner template HTML:

```html
<div style="font-family: Arial, sans-serif; color: #111827; font-size: 14px;">
  <p><strong>Receipt Uploaded:</strong> {{receipt_uploaded}}</p>
  <p><strong>File Name:</strong> {{receipt_file_name}}</p>

  {{#receipt_image_src}}
  <div style="margin: 12px 0;">
    <img
      src="{{receipt_image_src}}"
      alt="Uploaded receipt"
      style="max-width: 100%; width: 420px; height: auto; border: 1px solid #e5e7eb; border-radius: 8px;"
    />
  </div>
  <p>
    <a href="{{receipt_download_url}}" target="_blank" rel="noreferrer">Open / Download Receipt Image</a>
  </p>
  {{/receipt_image_src}}
</div>
```

Important note:

- Email clients decide rendering rules. Most support inline image data URLs, but some may block preview by policy.
- Even when blocked, owner still gets filename and base64 payload fields.

Complaint page also uses the same Receipt Owner variables above.

## EmailJS Template Creation (Click-by-Click)

Based on the screen you shared:

1. Go to **Email Templates** in EmailJS.
2. Click **Create New Template**.
3. In the popup, select **Contact Us** (or blank/basic template if available).
4. Click **Create Template**.
5. Rename the template clearly, for example:
  - `receipt_owner`
  - `receipt_reply`
6. In the template editor, set:
  - **To Email** for owner templates: `Bhindercorporationltd254@gmail.com`
  - **To Email** for reply templates: `{{to_email}}`
7. Paste subject/body from the examples below.
8. Save template and copy its Template ID into `.env`.

### 1) Receipt Owner Template (for your team)

Subject:

```text
New Receipt Submission - {{from_name}}
```

Body:

```text
You received a new receipt submission.

Full Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Chassis Number: {{chassis_number}}
Register Number: {{register_number}}
Model Name: {{model_name}}

Complaint Message:
{{complaint_message}}

Receipt File Name: {{receipt_file_name}}
Receipt Attachment (Base64):
{{receipt_attachment}}
```

Notes:

- Optional values are already handled in app code.
- If user skips optional fields, email will show friendly fallback text.

### 2) Receipt Reply Template (customer confirmation)

To Email:

```text
{{to_email}}
```

Subject:

```text
Receipt Submission Received - Bhinder Corporation Ltd
```

Body:

```text
Dear {{to_name}},

Thank you for submitting your receipt.
We have received your details successfully and our team will review them shortly.

Regards,
Bhinder Corporation Ltd
```

## .env Mapping You Need

Set these with your actual IDs from EmailJS:

```env
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
VITE_EMAILJS_SERVICE_ID=service_9c6jnzw
VITE_EMAILJS_RECEIPT_OWNER_TEMPLATE_ID=YOUR_RECEIPT_OWNER_TEMPLATE_ID
VITE_EMAILJS_RECEIPT_REPLY_TEMPLATE_ID=YOUR_RECEIPT_REPLY_TEMPLATE_ID
```

## Deployment Guide

## Vercel

1. Push project to GitHub.
2. Import repo in Vercel.
3. Framework preset: **Vite**.
4. Add all `.env` variables in project settings.
5. Deploy.

## Netlify

1. Push project to GitHub.
2. New site from Git.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add env variables.
6. Deploy.

## Post-Deploy Checklist

- Verify all routes load correctly on refresh.
- Confirm `robots.txt` and `sitemap.xml` are publicly accessible.
- Test receipt and complaint EmailJS forms in production.
- Check SEO metadata with browser dev tools.

## How To Send Me Requirements

Use this format so I can implement quickly without back-and-forth:

1. Business rules
- Which fields are required vs optional for each form.
- Max file size and allowed file types.

2. Owner email content
- Exact subject line per form.
- Exact fields to include in owner email body.

3. Customer confirmation content
- Exact subject line.
- Exact thank-you message text.

4. EmailJS IDs
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_RECEIPT_OWNER_TEMPLATE_ID`
- `VITE_EMAILJS_RECEIPT_REPLY_TEMPLATE_ID`

5. Branding preferences
- Sender name (for example: Bhinder Corporation Ltd)
- Reply-to email address

Quick copy/paste template:

```text
FORM: submit-receipt
Required fields:
Optional fields:
Allowed file types:
Max file size:

OWNER EMAIL SUBJECT:
OWNER EMAIL BODY FIELDS:

CUSTOMER EMAIL SUBJECT:
CUSTOMER EMAIL MESSAGE:

ENV VALUES:
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_RECEIPT_OWNER_TEMPLATE_ID=
VITE_EMAILJS_RECEIPT_REPLY_TEMPLATE_ID=
```

## Notes About Assets

- Current implementation includes reusable SVG assets under `public/assets`.
- If you re-add your original icon pack, replace files in `public/assets` with your exact SVGs while keeping existing paths to avoid code changes.
