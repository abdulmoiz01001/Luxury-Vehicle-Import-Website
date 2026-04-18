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

  await Promise.all([
    emailjs.send(serviceId, ownerTemplateId, ownerParams, { publicKey }),
    emailjs.send(serviceId, replyTemplateId, replyParams, { publicKey }),
  ])
}
