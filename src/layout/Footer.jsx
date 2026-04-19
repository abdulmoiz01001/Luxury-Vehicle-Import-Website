import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { m } from 'framer-motion'
import { company } from '../data/company'

const WhatsAppIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M19.05 4.94A9.86 9.86 0 0 0 12 2a9.94 9.94 0 0 0-8.6 14.9L2 22l5.24-1.37A10 10 0 0 0 12 22c5.5 0 10-4.44 10-9.95 0-2.66-1.03-5.16-2.95-7.11zM12 20.18a8.13 8.13 0 0 1-4.13-1.12l-.3-.18-3.1.81.83-3.03-.2-.31a8.12 8.12 0 1 1 6.9 3.83zm4.46-6.12c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.2-.71-.63-1.19-1.41-1.33-1.64-.14-.24-.02-.36.1-.48.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.24 1.03.38 1.38.48.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
  </svg>
)

const InstagramIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5z" />
    <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z" />
    <circle cx="17.3" cy="6.7" r="1.1" />
  </svg>
)

const FacebookIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.2-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4v2.3H8v3.2h2.6v8h2.9z" />
  </svg>
)

const services = [
  { title: 'Car Sales', subtitle: 'New & Used Vehicles' },
  { title: 'Vehicle Import', subtitle: 'Direct Japan & UK Imports' },
  { title: 'Financing Assistance', subtitle: 'Hire Purchase Options' },
  { title: 'Trade-In', subtitle: 'Get Value for Your Old Car' },
  { title: 'After-Sales Support', subtitle: 'Comprehensive Warranty' },
]

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/vehicles', label: 'Inventory' },
  { to: '/#site-footer', label: 'Contact Us' },
]

const Footer = () => {
  return (
    <m.footer
      id="site-footer"
      className="footer-shell"
      aria-label="Site footer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="footer-world" aria-hidden="true" />
      <div className="footer-grid-lines" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="footer-top-grid">
        <m.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5 }}>
          <img src="/assets/logo-blue.svg" alt="Bhinder Corporation" className="footer-logo" />
          <h2 className="footer-tagline">
            Driven by Excellence, Delivered by
            <br />
            <span>Bhinder Corporation.</span>
          </h2>
          <p className="footer-subtext">
            Kenya&apos;s trusted hub for high-quality vehicles, offering dependable cars, excellent service, and clear, transparent pricing
          </p>

          <div className="footer-services" aria-label="Services">
            {services.map((service) => (
              <m.article
                key={service.title}
                className="footer-service-card"
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 340, damping: 24 }}
              >
                <h3>{service.title}</h3>
                <p>{service.subtitle}</p>
              </m.article>
            ))}
          </div>
        </m.section>

        <m.section className="md:ml-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-link-list">
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="footer-link-animated">{item.label}</Link>
              </li>
            ))}
          </ul>

          <h3 className="footer-heading" style={{ marginTop: '4.2rem' }}>
            Contact Us:
          </h3>
          <ul className="footer-contact-list">
            <li>
              <m.span className="footer-icon footer-social-icon" aria-hidden="true" whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.2 }}>
                <WhatsAppIcon size={16} />
              </m.span>
              <div>
                <small>Whatsapp</small>
                <a href={`https://wa.me/${company.whatsappNumber}`} target="_blank" rel="noreferrer">
                  {company.phone}
                </a>
              </div>
            </li>
            <li>
              <m.span className="footer-icon footer-social-icon" aria-hidden="true" whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.2 }}>
                <Mail size={16} />
              </m.span>
              <div>
                <small>Email</small>
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(company.email)}`} target="_blank" rel="noreferrer">
                  {company.email}
                </a>
              </div>
            </li>
            <li>
              <m.span className="footer-icon footer-social-icon" aria-hidden="true" whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.2 }}>
                <InstagramIcon size={16} />
              </m.span>
              <div>
                <small>Instagram</small>
                <a href={company.instagram} target="_blank" rel="noreferrer">
                  Instagram.com/bhindercorporationltd
                </a>
              </div>
            </li>
            <li>
              <m.span className="footer-icon footer-social-icon" aria-hidden="true" whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.2 }}>
                <FacebookIcon size={16} />
              </m.span>
              <div>
                <small>Facebook</small>
                <a href={company.facebook} target="_blank" rel="noreferrer">
                  Facebook.com/BhinderCorporationLtd
                </a>
              </div>
            </li>
          </ul>
        </m.section>

        <m.aside className="footer-right" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: 0.16 }}>
          <div className="footer-map-card" aria-label="Bhinder Corporation office location map">
            <iframe
              title="Bhinder Corporation office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </m.aside>
      </div>

      <div className="footer-bottom-bar">
        <p>© 2026, All Rights Reserved, Terms & Conditions</p>
        <div>
          <span className="footer-badge">stripe</span>
          <span>Privacy policy</span>
          <span>/</span>
          <span>Terms of use</span>
        </div>
      </div>
    </m.footer>
  )
}

export default Footer
