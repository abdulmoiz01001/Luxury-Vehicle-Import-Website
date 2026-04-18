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

VITE_EMAILJS_CONTACT_OWNER_TEMPLATE_ID=
VITE_EMAILJS_CONTACT_REPLY_TEMPLATE_ID=

VITE_EMAILJS_RECEIPT_OWNER_TEMPLATE_ID=
VITE_EMAILJS_RECEIPT_REPLY_TEMPLATE_ID=

VITE_EMAILJS_COMPLAINT_OWNER_TEMPLATE_ID=
VITE_EMAILJS_COMPLAINT_REPLY_TEMPLATE_ID=
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
- Contact page form
- Complaint page form
- Submit receipt page form with file upload
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

### 4. Create Owner Templates

Create 3 owner templates:

1. Contact Owner Template
2. Receipt Owner Template
3. Complaint Owner Template

Each should send submission details to:

`Bhindercorporationltd254@gmail.com`

### 5. Create Auto Reply Templates

Create 3 customer auto-reply templates:

1. Contact Reply Template
2. Receipt Reply Template
3. Complaint Reply Template

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

### 7. Place .env Variables

Create `.env` in project root (same level as `package.json`) and paste all values.

### 8. Test Forms

1. Run `npm run dev`
2. Submit each form:
   - `/contact`
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

### Complaint Owner

Use variables:

- `from_name`
- `from_email`
- `phone`
- `vehicle`
- `message`

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
- Test all three EmailJS forms in production.
- Check SEO metadata with browser dev tools.

## Notes About Assets

- Current implementation includes reusable SVG assets under `public/assets`.
- If you re-add your original icon pack, replace files in `public/assets` with your exact SVGs while keeping existing paths to avoid code changes.
