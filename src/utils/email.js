import emailjs from '@emailjs/browser'

const requireEnv = (key) => {
  const value = import.meta.env[key]
  if (!value) {
    throw new Error(`Missing env variable: ${key}`)
  }
  return value
}

export const sendDualTemplate = async ({ ownerTemplateId, replyTemplateId, ownerParams, replyParams }) => {
  const publicKey = requireEnv('VITE_EMAILJS_PUBLIC_KEY')
  const serviceId = requireEnv('VITE_EMAILJS_SERVICE_ID')

  try {
    await Promise.all([
      emailjs.send(serviceId, ownerTemplateId, ownerParams, { publicKey }),
      emailjs.send(serviceId, replyTemplateId, replyParams, { publicKey }),
    ])
  } catch (error) {
    const status = error?.status ? ` (status ${error.status})` : ''
    const details = error?.text ? ` ${error.text}` : ''
    throw new Error(`Failed to send email${status}.${details}`.trim())
  }
}
