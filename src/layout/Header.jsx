import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, PhoneCall, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, m, useReducedMotion } from 'framer-motion'
import { company } from '../data/company'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/vehicles', label: 'Vehicle' },
  { to: '/#site-footer', label: 'Contact Us' },
  { to: '/about', label: 'About Us' },
  { to: '/submit-receipt', label: 'Submit Receipt' },
]

const Header = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [footerInView, setFooterInView] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.getElementById('site-footer')
    if (!footer) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting)
      },
      { threshold: 0.28 },
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto w-[94%] md:w-[80%]">
        <m.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: scrolled ? -2 : 0,
                  backdropFilter: scrolled ? 'blur(18px)' : 'blur(8px)',
                }
          }
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-b-2xl border border-t-0 text-white shadow-[0_14px_28px_rgba(0,0,0,0.45)] ${scrolled ? 'border-brand-primary/50 bg-black/88' : 'border-brand-primary/35 bg-black/95'}`}
        >
          <m.div
            className="flex items-center justify-between px-4 md:px-8"
            animate={prefersReducedMotion ? undefined : { paddingTop: scrolled ? 10 : 12, paddingBottom: scrolled ? 10 : 12 }}
            transition={{ duration: 0.28 }}
          >
            <Link to="/" className="flex items-center" aria-label="Bhinder Corporation home">
              <img src="/assets/logo-white.svg" alt="Bhinder Corporation Ltd" className="h-9 w-auto md:h-10" />
            </Link>

            <button
              type="button"
              className="rounded-lg border border-white/20 p-2 text-white md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              aria-label="Toggle navigation"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>

            <LayoutGroup id="primary-nav">
              <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
                {navItems.map((item) => (
                  item.label === 'Contact Us' ? (
                    <Link key={item.to} to={item.to} className="relative !text-white text-base font-medium">
                      <m.span
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.04, color: '#79c9ff' }}
                        transition={{ duration: 0.18 }}
                        className={`relative inline-block pb-1 transition ${footerInView ? 'opacity-100' : 'opacity-95'}`}
                      >
                        {item.label}
                        {footerInView ? (
                          <m.span
                            layoutId="nav-active-line"
                            transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.7 }}
                            className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-brand-primary"
                          />
                        ) : null}
                      </m.span>
                    </Link>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      className="relative !text-white text-base font-medium"
                    >
                      {({ isActive }) => (
                        <m.span
                          whileHover={prefersReducedMotion ? undefined : { scale: 1.04, color: '#79c9ff' }}
                          transition={{ duration: 0.18 }}
                          className={`relative inline-block pb-1 transition ${isActive ? 'opacity-100' : 'opacity-95'}`}
                        >
                          {item.label}
                          {isActive ? (
                            <m.span
                              layoutId="nav-active-line"
                              transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.7 }}
                              className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-brand-primary"
                            />
                          ) : null}
                        </m.span>
                      )}
                    </NavLink>
                  )
                ))}
              </nav>
            </LayoutGroup>
            <div className="hidden items-center justify-center gap-2 md:flex">

              <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="!text-white" aria-label="Open map location">
                <Search size={17} />
              </a>
              <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="!text-white" aria-label="Call Bhinder Corporation">
                <PhoneCall size={17} />
              </a>
            </div>
          </m.div>
        </m.div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <m.div
              className="fixed inset-0 z-40 bg-black/55 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            <m.aside
              id="mobile-nav-drawer"
              className="fixed right-0 top-0 z-50 h-screen w-[82%] max-w-xs border-l border-brand-primary/35 bg-black/95 px-5 py-6 text-white shadow-2xl backdrop-blur-md md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile navigation"
            >
              <div className="mb-6 flex items-center justify-between">
                <img src="/assets/logo-white.svg" alt="Bhinder Corporation Ltd" className="h-8 w-auto" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/20 p-2"
                  aria-label="Close mobile menu"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="space-y-4" aria-label="Mobile links">
                {navItems.map((item) => (
                  item.label === 'Contact Us' ? (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`block !text-white text-base font-medium transition ${footerInView ? 'translate-x-1 text-white underline decoration-brand-primary decoration-2 underline-offset-4' : 'opacity-95 hover:translate-x-1 hover:opacity-100'}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block !text-white text-base font-medium transition ${isActive ? 'translate-x-1 text-white underline decoration-brand-primary decoration-2 underline-offset-4' : 'opacity-95 hover:translate-x-1 hover:opacity-100'}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
                ))}
              </nav>

              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-5">
                <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="!text-white" aria-label="Open map location">
                  <Search size={18} />
                </a>
                <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="!text-white" aria-label="Call Bhinder Corporation">
                  <PhoneCall size={18} />
                </a>
              </div>
            </m.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Header
