import { formatKES } from '../utils/format'

const rows = [
  { key: 'price', label: 'Price', render: (v) => formatKES(v.price) },
  { key: 'engine', label: 'Engine' },
  { key: 'transmission', label: 'Transmission' },
  { key: 'fuelType', label: 'Fuel Type' },
  { key: 'mileage', label: 'Mileage', render: (v) => `${v.mileage.toLocaleString()} km` },
  { key: 'year', label: 'Year' },
]

const CompareTable = ({ vehicles }) => (
  <section className="overflow-x-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-soft">
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-3 text-left text-sm font-bold text-slate-900">Specification</th>
          {vehicles.map((vehicle) => (
            <th key={vehicle.slug} className="px-4 py-3 text-left text-sm font-bold text-slate-900">{vehicle.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.key} className="border-t border-slate-100">
            <td className="px-4 py-3 text-sm font-semibold text-slate-700">{row.label}</td>
            {vehicles.map((vehicle) => (
              <td key={`${row.key}-${vehicle.slug}`} className="px-4 py-3 text-sm text-slate-600">
                {row.render ? row.render(vehicle) : vehicle[row.key]}
              </td>
            ))}
          </tr>
        ))}
        <tr className="border-t border-slate-100 align-top">
          <td className="px-4 py-3 text-sm font-semibold text-green-700">Pros</td>
          {vehicles.map((vehicle) => (
            <td key={`pros-${vehicle.slug}`} className="px-4 py-3 text-sm text-slate-600">
              <ul className="space-y-1">
                {vehicle.pros.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </td>
          ))}
        </tr>
        <tr className="border-t border-slate-100 align-top">
          <td className="px-4 py-3 text-sm font-semibold text-red-700">Cons</td>
          {vehicles.map((vehicle) => (
            <td key={`cons-${vehicle.slug}`} className="px-4 py-3 text-sm text-slate-600">
              <ul className="space-y-1">
                {vehicle.cons.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </section>
)

export default CompareTable
