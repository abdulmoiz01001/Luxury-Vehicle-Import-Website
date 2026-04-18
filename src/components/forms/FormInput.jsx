const FormInput = ({ label, id, error, as = 'input', variant = 'light', hideLabel = false, ...props }) => {
  const lightClass = error
    ? 'border-red-500 text-slate-900 focus:ring-red-500'
    : 'border-slate-200 text-slate-900 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'

  const darkClass = error
    ? 'border-red-400/80 bg-white/6 text-white placeholder:text-white/65 focus:ring-red-400/60'
    : 'border-white/14 bg-gradient-to-r from-white/[0.06] to-white/[0.03] text-white placeholder:text-white/65 focus:border-brand-primary/85 focus:ring-2 focus:ring-brand-primary/30'

  const modeClass = variant === 'dark' ? darkClass : lightClass
  const commonClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${modeClass}`

  return (
    <label htmlFor={id} className="block">
      <span className={hideLabel ? 'sr-only' : 'mb-1 block text-sm font-semibold text-slate-700'}>{label}</span>
      {as === 'textarea' ? <textarea id={id} className={commonClass} {...props} /> : <input id={id} className={commonClass} {...props} />}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}

export default FormInput
