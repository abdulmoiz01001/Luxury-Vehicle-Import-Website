import { Link } from 'react-router-dom'
import { Mail, MessageCircle } from 'lucide-react'
import { m } from 'framer-motion'
import { company } from '../data/company'

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
                <MessageCircle size={16} />
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
                <span className="footer-icon-letter">ig</span>
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
                <span className="footer-icon-letter">f</span>
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
