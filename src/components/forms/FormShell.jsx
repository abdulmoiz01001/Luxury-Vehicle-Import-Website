const FormShell = ({ title, subtitle, children }) => (
  <section className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0a0d12]/92 p-6 text-white shadow-[0_20px_45px_rgba(0,0,0,0.45)] backdrop-blur md:p-8">
    <h1 className="text-3xl font-black leading-tight">{title}</h1>
    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80">{subtitle}</p>
    <div className="mt-6 space-y-4">{children}</div>
  </section>
)

export default FormShell
