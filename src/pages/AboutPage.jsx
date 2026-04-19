import { Flag, Eye, Handshake, ShieldCheck, BadgeCheck, TrendingUp, Users } from 'lucide-react'
import Seo from '../seo/Seo'
import { autoDealerSchema, breadcrumbSchema, localBusinessSchema } from '../seo/schemas'

const values = [
  { title: 'Customer Commitment', Icon: Handshake },
  { title: 'Integrity', Icon: ShieldCheck },
  { title: 'Quality', Icon: BadgeCheck },
  { title: 'Continuous Improvement', Icon: TrendingUp },
  { title: 'Teamwork', Icon: Users },
]

const AboutPage = () => (
  <>
    <Seo
      title="About Bhinder Corporation"
      description="Learn about Bhinder Corporation Ltd, our mission, values, and commitment to premium Japanese and luxury imported vehicles in Kenya."
      path="/about"
      schema={[
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]),
        localBusinessSchema,
        autoDealerSchema,
      ]}
    />

    <section className="relative mt-12 overflow-hidden">
      <img
        src="/assets/vehicles/about-us-image-1.svg"
        alt="Bhinder Corporation premium showroom hero"
        className="h-[380px] w-full object-cover md:h-[630px]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute bottom-6 left-1/2 w-[92%] max-w-7xl -translate-x-1/2 md:bottom-10">
        <span className="mb-3 block h-3 w-16 bg-brand-primary" aria-hidden="true" />
        <h1 className="text-4xl font-black text-white md:text-6xl">About Bhinder Corporation Ltd</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/90 md:text-lg">
          Redefining the automotive import experience in Kenya through Japanese precision.
        </p>
      </div>
    </section>

    <section className="bg-[#f1f3f5] py-12 md:py-26">
      <div className="mx-auto grid w-[96%] max-w-[1420px] gap-10 md:grid-cols-[1fr_460px]">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-brand-primary">The Digital Showroom</p>
          <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight text-slate-900 md:text-5xl">Setting the Standard for Kenyan Imports</h2>

          <p className="mt-6 text-base leading-8 text-slate-700">
            Bhinder Corporation Ltd is a trusted name in Kenya&apos;s automotive industry, specializing in the import and sale of high-quality Japanese vehicles.
          </p>
          <p className="mt-5 text-base leading-8 text-slate-700">
            With years of expertise, we bridge the gap between global manufacturing excellence and local driving needs, ensuring every vehicle delivered meets rigorous safety and performance standards. Our process is built on a foundation of transparency, meticulously selecting only the finest units from Japan&apos;s leading auctions and dealers.
          </p>
        </div>

        <div className="relative w-full max-w-[430px] justify-self-end rounded-2xl bg-[#eceff3] p-3 shadow-soft">
          <img src="/assets/vehicles/about-us-image-2.svg" alt="Bhinder quality inspection process" className="h-[330px] w-full rounded-xl object-cover" loading="lazy" />
          <div className="absolute -bottom-4 -left-4 rounded-lg bg-brand-primary px-5 py-3 text-white shadow-lg">
            <p className="text-3xl font-black leading-none">25+</p>
            <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em]">Years Experience</p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#e7eaee] py-16 md:py-24">
      <div className="mx-auto grid w-[96%] max-w-[1420px] gap-5 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white px-6 py-6">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#dce9ff] text-brand-primary">
            <Flag size={20} />
          </div>
          <h3 className="text-3xl font-black text-slate-900">Our Mission</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            To provide high-quality Japanese vehicles to customers in Kenya through reliable sourcing, transparent processes, and exceptional service, ensuring value for money and long-term satisfaction.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white px-6 py-6">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#ffe6d6] text-[#d06f34]">
            <Eye size={20} />
          </div>
          <h3 className="text-3xl font-black text-slate-900">Our Vision</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            To become Kenya&apos;s most trusted and customer-focused importer of Japanese vehicles, setting the benchmark for quality, reliability, and excellence in the automotive industry.
          </p>
        </article>
      </div>
    </section>

    <section className="bg-[#f5f7fa] py-24 md:py-26">
      <div className="mx-auto w-[96%] max-w-[1420px] text-center">
        <h2 className="text-5xl font-black text-slate-900">Our Core Values</h2>
        <p className="mt-3 text-sm text-slate-600">The engineering principles that drive Bhinder Corporation forward.</p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {values.map(({ title, Icon }) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white px-4 py-5">
              <Icon size={34} className="mx-auto text-brand-primary" />
              <p className="mt-3 text-lg font-bold text-slate-800">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
)

export default AboutPage
