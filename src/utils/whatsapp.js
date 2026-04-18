import { company } from '../data/company'

export const buildWhatsAppUrl = (vehicleName) => {
  const msg = encodeURIComponent(`Hello, I am interested in ${vehicleName}`)
  return `https://wa.me/${company.whatsappNumber}?text=${msg}`
}
