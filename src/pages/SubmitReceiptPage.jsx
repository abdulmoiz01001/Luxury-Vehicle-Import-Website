import { useState } from 'react'
import { AlertCircle, Camera, ReceiptText } from 'lucide-react'
import FormInput from '../components/forms/FormInput'
import FormShell from '../components/forms/FormShell'
import Seo from '../seo/Seo'
import { breadcrumbSchema } from '../seo/schemas'
import { useEmailForm } from '../hooks/useEmailForm'
import { compressImageToDataUrl } from '../utils/file'

const MAX_RECEIPT_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const EMAILJS_IMAGE_VARIABLE_BUDGET_CHARS = 38_000

const initial = {
  fullName: '',
  email: '',
  phone: '',
  chassisNumber: '',
  registerNumber: '',
  modelName: '',
  complaintMessage: '',
  receipt: null,
}

const SubmitReceiptPage = () => {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})

  const { loading, submit } = useEmailForm({
    ownerTemplateEnv: 'VITE_EMAILJS_RECEIPT_OWNER_TEMPLATE_ID',
    replyTemplateEnv: 'VITE_EMAILJS_RECEIPT_REPLY_TEMPLATE_ID',
    successMessage: 'Receipt submitted successfully. Thank you.',
    mapPayload: async (data, extra) => ({
      ownerParams: {
        from_name: data.fullName,
        from_email: data.email,
        phone: data.phone?.trim() || 'Not provided',
        chassis_number: data.chassisNumber,
        register_number: data.registerNumber,
        model_name: data.modelName,
        complaint_message: data.complaintMessage?.trim() || 'No complaint message provided.',
        receipt_file_name: extra.receiptName || 'No file uploaded',
        receipt_attachment: '',
        receipt_image_src: extra.receiptBase64 || '',
        receipt_download_url: '',
        receipt_uploaded: extra.receiptBase64 ? 'Yes' : 'No',
        receipt_preview_style: extra.receiptBase64 ? 'display:block;' : 'display:none;',
        receipt_link_style: extra.receiptBase64 ? 'display:inline;' : 'display:none;',
      },
      replyParams: {
        to_name: data.fullName,
        to_email: data.email,
        message: 'Your receipt submission has been received successfully. Bhinder Corporation will verify and update you shortly.',
      },
    }),
  })

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Valid email required.'
    if (form.phone.trim() && !/^\+?[\d\s]{8,}$/.test(form.phone)) next.phone = 'Enter a valid phone number or leave it empty.'
    if (!form.chassisNumber.trim()) next.chassisNumber = 'Chassis number is required.'
    if (!form.registerNumber.trim()) next.registerNumber = 'Register number is required.'
    if (!form.modelName.trim()) next.modelName = 'Model name is required.'
    if (form.receipt && !String(form.receipt.type).startsWith('image/')) {
      next.receipt = 'Only image files are supported for email preview.'
    }
    if (form.receipt && form.receipt.size > MAX_RECEIPT_IMAGE_SIZE_BYTES) {
      next.receipt = 'Image is too large. Please upload an image smaller than 5MB.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    let receiptBase64 = ''
    if (form.receipt) {
      try {
        receiptBase64 = await compressImageToDataUrl(form.receipt, {
          maxDataUrlLength: EMAILJS_IMAGE_VARIABLE_BUDGET_CHARS,
          maxDimension: 1080,
        })
      } catch (error) {
        setErrors((current) => ({
          ...current,
          receipt: error.message || 'Image could not be prepared for email. Please try another image.',
        }))
        return
      }
    }

    await submit(
      form,
      () => setForm(initial),
      {
        receiptBase64,
        receiptName: form.receipt?.name || '',
      },
    )
  }

  return (
    <>
      <Seo
        title="Submit Receipt"
        description="Submit your vehicle receipt and delivery details to Bhinder Corporation Ltd for quick processing and verification."
        path="/submit-receipt"
        schema={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Submit Receipt', path: '/submit-receipt' }])]}
      />
      <section className="-mt-[86px] bg-[radial-gradient(circle_at_top,#02406a,transparent_40%),linear-gradient(180deg,#03060b,#000)] px-4 pb-16 pt-[106px] md:-mt-[98px] md:px-8 md:pb-24 md:pt-[122px]">
        <div className="mx-auto mb-6 max-w-2xl text-center md:mb-7">
          <img src="/assets/logo-blue.svg" alt="Bhinder logo" className="mx-auto h-24 w-auto md:h-28" />
        </div>

        <FormShell title="Let’s connect with  BHINDER" subtitle="Submit your receipt and build our collaboration even stronger.">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormInput label="Full Name" hideLabel variant="dark" id="receipt-name" placeholder="Full Name" value={form.fullName} onChange={(e) => setForm((v) => ({ ...v, fullName: e.target.value }))} error={errors.fullName} />
            <FormInput label="Email" hideLabel variant="dark" id="receipt-email" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} error={errors.email} />
            <FormInput label="Phone Number" hideLabel variant="dark" id="receipt-phone" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))} error={errors.phone} />
            <FormInput label="Chassis Number" hideLabel variant="dark" id="receipt-chassis" placeholder="Chassis Number" value={form.chassisNumber} onChange={(e) => setForm((v) => ({ ...v, chassisNumber: e.target.value }))} error={errors.chassisNumber} />
            <FormInput label="Register Number" hideLabel variant="dark" id="receipt-register" placeholder="Register Number" value={form.registerNumber} onChange={(e) => setForm((v) => ({ ...v, registerNumber: e.target.value }))} error={errors.registerNumber} />
            <FormInput label="Model Name" hideLabel variant="dark" id="receipt-model" placeholder="Model Name" value={form.modelName} onChange={(e) => setForm((v) => ({ ...v, modelName: e.target.value }))} error={errors.modelName} />

            <label htmlFor="receipt-file" className="block">
              <span className="sr-only">Upload Receipt</span>
              <input
                id="receipt-file"
                type="file"
                accept="image/*"
                onChange={(e) => setForm((v) => ({ ...v, receipt: e.target.files?.[0] || null }))}
                className="hidden"
              />
              <div className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-white/14 bg-gradient-to-r from-white/[0.06] to-white/[0.03] px-4 py-3 text-sm text-white/85">
                <Camera size={16} className="text-white/85" /> Upload Receipt Image (Optional)
              </div>
              {form.receipt ? <span className="mt-1 block text-xs text-white/70">Selected: {form.receipt.name}</span> : null}
              {errors.receipt && <span className="mt-1 block text-xs text-red-400">{errors.receipt}</span>}
            </label>

            <label htmlFor="receipt-message" className="block">
              <span className="sr-only">Complaint Message</span>
              <div className="relative">
                <AlertCircle size={14} className="pointer-events-none absolute left-3 top-3 text-red-400" />
                <textarea
                  id="receipt-message"
                  rows={5}
                  placeholder="ADD YOUR COMPLAINT HERE (OPTIONAL)"
                  value={form.complaintMessage}
                  onChange={(e) => setForm((v) => ({ ...v, complaintMessage: e.target.value }))}
                  className="w-full rounded-xl border border-white/14 bg-gradient-to-r from-white/[0.06] to-white/[0.03] py-3 pl-8 pr-4 text-sm text-white outline-none transition placeholder:text-white/65 focus:border-brand-primary/85 focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>
              {errors.complaintMessage && <span className="mt-1 block text-xs text-red-400">{errors.complaintMessage}</span>}
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-primary/70 bg-black/85 px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_0_22px_rgba(1,116,183,0.45)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ReceiptText size={16} /> {loading ? 'Submitting...' : 'Submit Receipt'}
            </button>
          </form>
        </FormShell>
      </section>
    </>
  )
}

export default SubmitReceiptPage
