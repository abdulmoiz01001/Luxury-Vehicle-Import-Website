import { useState } from 'react'
import toast from 'react-hot-toast'
import { sendDualTemplate } from '../utils/email'

export const useEmailForm = ({ ownerTemplateEnv, replyTemplateEnv, mapPayload, successMessage }) => {
  const [loading, setLoading] = useState(false)

  const submit = async (formData, reset, extra = {}) => {
    setLoading(true)
    try {
      const ownerTemplateId = import.meta.env[ownerTemplateEnv]
      const replyTemplateId = import.meta.env[replyTemplateEnv]

      if (!ownerTemplateId || !replyTemplateId) {
        throw new Error('EmailJS template IDs are missing.')
      }

      const { ownerParams, replyParams } = await mapPayload(formData, extra)

      await sendDualTemplate({
        ownerTemplateId,
        replyTemplateId,
        ownerParams,
        replyParams,
      })

      toast.success(successMessage)
      reset()
    } catch (error) {
      toast.error(error.message || 'Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, submit }
}
