import { useState } from 'react'
import FormInput from '../components/forms/FormInput'
import FormShell from '../components/forms/FormShell'
import Seo from '../seo/Seo'
import { breadcrumbSchema } from '../seo/schemas'
import { useEmailForm } from '../hooks/useEmailForm'

const initial = { fullName: '', email: '', phone: '', vehicle: '', complaint: '' }

const ComplaintPage = () => {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})

  const { loading, submit } = useEmailForm({
    ownerTemplateEnv: 'VITE_EMAILJS_COMPLAINT_OWNER_TEMPLATE_ID',
    replyTemplateEnv: 'VITE_EMAILJS_COMPLAINT_REPLY_TEMPLATE_ID',
    successMessage: 'Complaint submitted. Our team will contact you shortly.',
    mapPayload: async (data) => ({
      ownerParams: {
        from_name: data.fullName,
        from_email: data.email,
        phone: data.phone,
        vehicle: data.vehicle,
        message: data.complaint,
      },
      replyParams: {
        to_name: data.fullName,
        to_email: data.email,
        message: 'We have received your complaint and started review immediately.',
      },
    }),
  })

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Valid email required.'
    if (!/^\+?[\d\s]{8,}$/.test(form.phone)) next.phone = 'Valid phone required.'
    if (form.complaint.trim().length < 15) next.complaint = 'Complaint must be at least 15 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    await submit(form, () => setForm(initial))
  }

  return (
    <>
      <Seo
        title="Complaint Form"
        description="Submit your complaint to Bhinder Corporation Ltd and receive support from our customer service team."
        path="/complaint"
        schema={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Complaint', path: '/complaint' }])]}
      />
      <section className="bg-[radial-gradient(circle_at_top_left,#05355a,transparent_45%),linear-gradient(180deg,#02060d,#000)] px-4 py-16 md:px-8">
        <FormShell title="Customer Complaint" subtitle="Share your issue and our support team will follow up promptly.">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormInput label="Full Name" id="complaint-name" value={form.fullName} onChange={(e) => setForm((v) => ({ ...v, fullName: e.target.value }))} error={errors.fullName} />
            <FormInput label="Email" id="complaint-email" type="email" value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} error={errors.email} />
            <FormInput label="Phone" id="complaint-phone" value={form.phone} onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))} error={errors.phone} />
            <FormInput label="Vehicle Name / Model" id="complaint-vehicle" value={form.vehicle} onChange={(e) => setForm((v) => ({ ...v, vehicle: e.target.value }))} />
            <FormInput label="Complaint Message" id="complaint-message" as="textarea" rows={5} value={form.complaint} onChange={(e) => setForm((v) => ({ ...v, complaint: e.target.value }))} error={errors.complaint} />
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </FormShell>
      </section>
    </>
  )
}

export default ComplaintPage
