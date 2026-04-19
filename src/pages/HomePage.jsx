import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ShieldCheck, BadgeDollarSign, Wrench, Smartphone } from 'lucide-react'
import Seo from '../seo/Seo'
import { autoDealerSchema, baseSchema, breadcrumbSchema, localBusinessSchema } from '../seo/schemas'
import MotionSection from '../components/animations/MotionSection'
import AnimatedButton from '../components/ui/AnimatedButton'
import { company } from '../data/company'

const brandLogos = [
  { name: 'Lexus', src: '/assets/brand/image%202.svg' },
  { name: 'Audi', src: '/assets/brand/image%203.svg' },
  { name: 'BMW', src: '/assets/brand/image%204.svg' },
  { name: 'Daihatsu', src: '/assets/brand/image%205.svg' },
  { name: 'Honda', src: '/assets/brand/image%206.svg' },
  { name: 'Volkswagen', src: '/assets/brand/image%208.svg' },
  // { name: 'Land Rover', src: '/assets/brand/Gradient.svg' },
]

const driveFeatures = [
  {
    title: 'No Hidden Fees',
    text: "We believe in transparency. That's why our prices are clear and up-front, with no hidden fees or surprises at the checkout.",
    Icon: BadgeDollarSign,
    active: true,
  },
  {
    title: '100% Guaranteed',
    text: "Our comprehensive insurance options give you peace of mind, whether it's unexpected weather or a minor bump.",
    Icon: ShieldCheck,
    active: false,
  },
  {
    title: 'Unwavering Service',
    text: "We're passionate about creating a seamless and enjoyable experience for every Customer.",
    Icon: Wrench,
    active: false,
  },
  {
    title: 'Convenience is Ours',
    text: 'From selection to paperwork, we make your car buying process smooth and effortless.',
    Icon: Smartphone,
    active: false,
  },
]

const HomePage = () => {
  const heroWords = ['Luxury', 'Reliability', 'Performance']
  const joinWhatsappHref = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent('Hello Bhinder Corporation, please add me to your latest offers and special deals on WhatsApp.')}`

  return (
    <>
      <Seo
        title="Luxury Vehicle Imports in Kenya"
        description="Explore premium imported vehicles from Bhinder Corporation Ltd in Mombasa. Luxury, reliability, and performance in one trusted destination."
        path="/"
        schema={[baseSchema, localBusinessSchema, autoDealerSchema, breadcrumbSchema([{ name: 'Home', path: '/' }])]}
      />

      <section className="relative -mt-[86px] min-h-screen overflow-hidden bg-black pt-[96px] text-white md:-mt-[98px] md:pt-[110px]">
        <img src="/assets/hero_section-bg.svg" alt="Luxury vehicle showroom" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[calc(100svh-96px)] max-w-7xl flex-col items-center justify-center px-4 pb-14 text-center md:min-h-[calc(100svh-110px)] md:px-8">
          <m.h1
            className="max-w-4xl text-[2.2rem] font-black leading-tight text-white md:text-[3rem]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {heroWords.map((word) => (
              <m.span
                key={word}
                className="inline-block pr-3"
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {word}
              </m.span>
            ))}
          </m.h1>
          <m.p
            className="mt-2 max-w-3xl text-lg text-white/85 md:text-[2rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            Driven by Excellence, Delivered by Bhinder Corporation
          </m.p>
          <m.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: [0, -5, 0] }}
            transition={{ duration: 0.6, delay: 0.35, y: { duration: 4.2, ease: 'easeInOut', repeat: Infinity } }}
          >
            <AnimatedButton as={Link} to="/vehicles" className="rounded-xl bg-brand-primary px-5 py-2 text-sm font-semibold text-white">
              Find Your Dream Car
            </AnimatedButton>
            <AnimatedButton as={Link} to="/#site-footer" className="rounded-xl border border-white/15 bg-black/40 px-5 py-2 text-sm font-semibold text-white">
              Contact Us
            </AnimatedButton>
          </m.div>
        </div>
      </section>

      <MotionSection className="bg-[#edf0ef] pt-12 md:pt-16" amount={0.4}>
        <div className="mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-14">
          <div className="flex items-center justify-center gap-5 md:gap-6">
            <span className="h-10 w-3 rounded-full bg-brand-primary" />
            <div className="rounded-full border-2 border-brand-primary bg-black px-12 py-2 md:px-16 md:py-3">
              <h2 className="text-2xl text-center font-black tracking-wide text-white md:text-4xl">TRUSTED BRANDS</h2>
            </div>
            <span className="h-10 w-3 rounded-full bg-brand-primary" />
          </div>
        </div>

        <div className="bg-[#f6f6f6] py-10 md:py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <p className="text-center text-2xl font-semibold text-[#8f9195] md:text-4xl">Trusted by over 50,000 Suppliers</p>

            <div className="brand-marquee mt-10" role="region" aria-label="Trusted automotive brands">
              <div className="brand-track">
                <div className="brand-group" aria-hidden="false">
                  {brandLogos.map((brand) => (
                    <m.div key={brand.name} className="brand-card" whileHover={{ y: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 320, damping: 24 }}>
                      <img src={brand.src} alt={brand.name} loading="lazy" className="brand-logo" />
                    </m.div>
                  ))}
                </div>

                <div className="brand-group" aria-hidden="true">
                  {brandLogos.map((brand) => (
                    <div key={`${brand.name}-clone`} className="brand-card">
                      <img src={brand.src} alt="" loading="lazy" className="brand-logo" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link to="/vehicles" className="inline-flex items-center gap-2 text-xl font-bold text-brand-primary md:text-2xl">
                Browse All Vehicles <span aria-hidden="true">→</span>
              </Link>
              <div className="mx-auto mt-2 h-[2px] w-24 bg-brand-primary/40" />
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="offer-section" amount={0.4}>
        <div className="offer-shell">
          <m.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.55 }}>
            <h2 className="offer-title">
              Get exclusive
              <br />
              access to our
              <br />
              latest offers and
              <br />
              special deals!
            </h2>

            <div className="offer-join-wrap">
              <input type="tel" defaultValue="+ 254" className="offer-phone-input" aria-label="WhatsApp number" />
              <a href={joinWhatsappHref} target="_blank" rel="noreferrer" className="offer-join-btn">Join</a>
            </div>

            <p className="mt-4">
              Connect with <strong>Bhinder</strong> on WhatsApp — share your number to join our official channel.
            </p>
          </m.div>

          <m.div className="offer-visual-wrap" aria-hidden="true" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.6 }}>
            <m.div className="offer-ring offer-ring-outer" animate={{ rotate: 360 }} transition={{ duration: 42, ease: 'linear', repeat: Infinity }} />
            <m.div className="offer-ring offer-ring-mid" animate={{ rotate: -360 }} transition={{ duration: 34, ease: 'linear', repeat: Infinity }} />
            <m.div className="offer-ring offer-ring-inner" animate={{ rotate: 360 }} transition={{ duration: 26, ease: 'linear', repeat: Infinity }} />
            <m.img
              src="/assets/vehicles/car-sedan.svg"
              alt="Featured luxury SUV"
              className="offer-car"
              loading="lazy"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.6, ease: 'easeInOut', repeat: Infinity }}
            />
          </m.div>
        </div>
      </MotionSection>

      <MotionSection className="drive-section" amount={0.42}>
        <div className="drive-inner mx-auto px-4 md:px-8">
          <h2 className="drive-title">
            Find Your Perfect Drive with <span>Bhinder</span>
          </h2>

          <div className="drive-grid-wrap">
            <div className="drive-lines" aria-hidden="true">
              <span className="drive-line drive-line-h-top" />
              <span className="drive-line drive-line-h-bottom" />
              <span className="drive-line drive-line-v-left" />
              <span className="drive-line drive-line-v-right" />
            </div>

            <div className="drive-grid">
              {driveFeatures.map(({ title, text, Icon, active }, index) => (
                <m.article
                  key={title}
                  className={`drive-card ${active ? 'drive-card-active' : 'drive-card-light'}`}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.38 }}
                  transition={{ duration: 0.45, delay: 0.08 * index }}
                  whileHover={{ y: -10, boxShadow: '0 18px 30px rgba(12, 28, 56, 0.15)' }}
                >
                  <div className={`drive-icon ${active ? 'drive-icon-active' : 'drive-icon-light'}`}>
                    <Icon size={34} />
                  </div>
                  <div className="drive-card-content">
                    <h3 className="drive-card-title">{title}</h3>
                    <p className="drive-card-text">{text}</p>
                  </div>
                </m.article>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 flex items-center justify-between">
            <SectionHeading title="Featured Inventory" description="Curated vehicles for luxury and dependable performance." />
            <Link to="/vehicles" className="text-sm font-semibold text-brand-primary">Browse All Vehicles</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((vehicle) => (
              <VehicleCard
                key={vehicle.slug}
                vehicle={vehicle}
                onCompareToggle={toggleCompare}
                isSelected={selectedSlugs.includes(vehicle.slug)}
              />
            ))}
          </div>
        </div>
      </section> */}
    </>
  )
}

export default HomePage
