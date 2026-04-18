const SectionHeading = ({ eyebrow, title, description, align = 'left' }) => (
  <header className={align === 'center' ? 'text-center' : ''}>
    {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{eyebrow}</p>}
    <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">{title}</h2>
    {description && <p className="mt-3 text-sm text-slate-600 md:text-base">{description}</p>}
  </header>
)

export default SectionHeading
