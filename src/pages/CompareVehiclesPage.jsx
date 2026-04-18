import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Gauge, Settings2, Fuel, Zap, CircleDot, Shuffle } from 'lucide-react'
import Seo from '../seo/Seo'
import { breadcrumbSchema } from '../seo/schemas'
import { allVehicles } from '../utils/vehicles'
import { useCompare } from '../context/CompareContext'
import AnimatedButton from '../components/ui/AnimatedButton'

const labelFor = (idx) => {
  if (idx === 0) return 'Best Performance'
  if (idx === 2) return 'Best Value'
  return ''
}

const CompareVehiclesPage = () => {
  const { selectedSlugs, setCompareSelection } = useCompare()
  const initialSelection = useMemo(() => {
    if (selectedSlugs.length > 0) {
      return selectedSlugs.slice(0, 3)
    }
    return allVehicles.slice(0, 3).map((vehicle) => vehicle.slug)
  }, [selectedSlugs])

  const [selection, setSelection] = useState(initialSelection)

  useEffect(() => {
    setSelection(initialSelection)
  }, [initialSelection])

  const compared = useMemo(
    () => selection.map((slug) => allVehicles.find((vehicle) => vehicle.slug === slug)).filter(Boolean),
    [selection],
  )

  const addComparisonVehicle = () => {
    setSelection((current) => {
      if (current.length >= 3) return current
      const next = allVehicles.find((vehicle) => !current.includes(vehicle.slug))
      if (!next) return current
      const updated = [...current, next.slug]
      setCompareSelection(updated)
      return updated
    })
  }

  const handleSelectionChange = (index, slug) => {
    setSelection((current) => {
      const copy = [...current]
      const duplicateIndex = copy.findIndex((item, itemIndex) => item === slug && itemIndex !== index)

      if (duplicateIndex >= 0) {
        const previous = copy[index]
        copy[index] = slug
        copy[duplicateIndex] = previous
      } else {
        copy[index] = slug
      }

      setCompareSelection(copy)
      return copy
    })
  }

  return (
    <>
      <Seo
        title="Compare Vehicles"
        description="Compare up to three imported vehicles by price, engine, transmission, fuel economy, mileage, year, and ownership pros and cons."
        path="/compare"
        schema={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Compare Vehicles', path: '/compare' }])]}
      />
      <section className="mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-10 md:px-8">
        <header className="text-center">
          <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">Compare Vehicles</h1>
          <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">Find the best car based on performance, price, and features with our precision comparison engine.</p>
        </header>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className={`grid gap-3 ${selection.length >= 3 ? 'md:grid-cols-[1fr_1fr_1fr_auto]' : 'md:grid-cols-[1fr_1fr_auto]'}`}>
            {selection.map((slug, index) => (
              <label key={`${slug}-${index}`} className="block">
                <span className="mb-1 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-500">Select Vehicle {index + 1}</span>
                <select
                  value={slug || ''}
                  onChange={(e) => handleSelectionChange(index, e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  {allVehicles.map((vehicle) => (
                    <option key={vehicle.slug} value={vehicle.slug}>{vehicle.year} {vehicle.name}</option>
                  ))}
                </select>
              </label>
            ))}

            <AnimatedButton
              as="button"
              type="button"
              onClick={addComparisonVehicle}
              disabled={selection.length >= 3}
              aria-label="Add another vehicle for comparison"
              className="mt-5 inline-grid h-10 w-10 place-items-center rounded-lg bg-brand-primary text-white disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Shuffle size={15} />
            </AnimatedButton>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3">
          {compared.map((vehicle, index) => (
            <article
              key={vehicle.slug}
              className={`flex h-full flex-col rounded-2xl border p-4 shadow-soft sm:p-5 ${index === 0 ? 'border-[#0a5f94] bg-[#0d679c] text-white' : 'border-slate-200 bg-white text-slate-900'}`}
            >
              <img src={vehicle.images[0]} alt={vehicle.name} className="mx-auto h-36 w-auto object-contain sm:h-40" />

              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <h2 className={`text-[2.15rem] font-black leading-[1.03] break-words sm:text-4xl ${index === 0 ? 'text-white' : 'text-slate-900'}`}>{vehicle.name}</h2>
                {labelFor(index) ? (
                  <span className={`w-fit rounded px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] ${index === 0 ? 'bg-[#1684c7] text-white' : 'bg-[#1684c7] text-white'}`}>
                    {labelFor(index)}
                  </span>
                ) : null}
              </div>

              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2"><Settings2 size={14} /> {vehicle.engine}</li>
                <li className="flex items-center gap-2"><Gauge size={14} /> {vehicle.mileage.toLocaleString()} KM</li>
                <li className="flex items-center gap-2"><Zap size={14} /> {vehicle.year}</li>
                <li className="flex items-center gap-2"><CircleDot size={14} /> {vehicle.transmission}</li>
                <li className="flex items-center gap-2"><Fuel size={14} /> {vehicle.fuelType}</li>
              </ul>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
                <AnimatedButton
                  as={Link}
                  to={`/vehicle/${vehicle.slug}`}
                  className={`flex-1 rounded-full px-4 py-2 text-center text-sm font-bold ${index === 0 ? 'bg-white/88 !text-slate-900 visited:!text-slate-900 hover:!text-slate-900 focus:!text-slate-900' : 'bg-slate-200 text-slate-700'}`}
                >
                  View Details
                </AnimatedButton>
                <AnimatedButton as={Link} to="/#site-footer" className="flex-1 rounded-full bg-brand-primary px-4 py-2 text-center text-sm font-bold !text-white visited:!text-white hover:!text-white focus:!text-white">
                  Buy Now
                </AnimatedButton>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-4xl font-black text-slate-900">Expert Verdict: Pros & Cons</h2>

          <div className="mt-4 grid overflow-hidden rounded-2xl border border-slate-200 md:grid-cols-3">
            {compared.map((vehicle) => (
              <article key={`${vehicle.slug}-verdict`} className="border-r border-slate-200 bg-white p-5 last:border-r-0">
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">{vehicle.brand}</h3>

                <ul className="mt-4 space-y-2">
                  {vehicle.pros.slice(0, 2).map((item) => (
                    <li key={`${vehicle.slug}-pro-${item}`} className="text-sm text-slate-700">
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 space-y-2">
                  {vehicle.cons.slice(0, 2).map((item) => (
                    <li key={`${vehicle.slug}-con-${item}`} className="text-sm text-slate-700">
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </section>
    </>
  )
}

export default CompareVehiclesPage
