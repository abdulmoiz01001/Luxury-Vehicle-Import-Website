const PageHero = ({ title, subtitle, image = '/assets/hero_section-bg.svg', dark = true }) => (
  <section
    className={`relative overflow-hidden ${dark ? 'text-white' : 'text-slate-900'}`}
    style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="bg-gradient-to-r from-black/85 via-black/65 to-black/40">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/85 md:text-lg">{subtitle}</p>
      </div>
    </div>
  </section>
)

export default PageHero
