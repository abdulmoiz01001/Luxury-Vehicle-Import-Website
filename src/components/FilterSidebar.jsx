import { company } from '../data/company'

const carTypeChips = [
  'SUV',
  'Automatic',
  'Diesel',
  'Petrol',
  'Hybrid',
  '4x4 / 4WD',
  'Agriculture',
  'Off-Roading',
  'Family Cars',
  'Sports Car',
  'Luxury',
  'Commercial',
]

const passengerChips = ['2 Passengers', '4 Passengers', '5 Passengers', '7 Passengers', '8 Passengers']

const defaultCompanyList = [
  'AUDI',
  'BMW',
  'HONDA',
  'VOLKSWAGEN',
  'LANDROVER',
  'LEXUS',
  'MAZDA',
  'MERCEDES',
  'NISSAN',
  'MITSUBISHI',
  'PEUGEOT',
  'PORCHE',
  'SUBARU',
  'VOLVO',
  'SUZUKI',
  'TOYOTA',
  'ISUZU',
  'HINO',
  'FUSO',
]

const FilterSidebar = ({ resetFilters, filters, options, updateFilter }) => {
  const results = Number.isFinite(filters?.resultsCount) ? filters.resultsCount : 0
  const selectedTransmissions = filters?.transmissions || []
  const selectedBrands = filters?.brands || []
  const selectedPassengers = filters?.passengers || []

  const transmissionOptions = ['Automatic', 'Manual', ...(options?.transmissions || []).filter((item) => !['Automatic', 'Manual'].includes(item))]

  const companyOptions = Array.from(new Set([...defaultCompanyList, ...(options?.brands || []).map((item) => String(item).toUpperCase())]))

  const toggleSelection = (field, value) => {
    const current = filters?.[field] || []
    const exists = current.includes(value)
    const next = exists ? current.filter((item) => item !== value) : [...current, value]
    updateFilter(field, next)
  }

  const toggleQuickChip = (chip) => {
    if (chip === 'Automatic') {
      const active = selectedTransmissions.includes('Automatic')
      updateFilter('transmissions', active ? [] : ['Automatic'])
      return
    }

    if (chip === 'Diesel' || chip === 'Petrol' || chip === 'Hybrid') {
      updateFilter('fuelType', filters?.fuelType === chip ? 'All' : chip)
      return
    }

    updateFilter('search', filters?.search === chip ? '' : chip)
  }

  const isQuickChipActive = (chip) => {
    if (chip === 'Automatic') return selectedTransmissions.includes('Automatic')
    if (chip === 'Diesel' || chip === 'Petrol' || chip === 'Hybrid') return filters?.fuelType === chip
    return filters?.search === chip
  }

  const togglePassengerChip = (label) => {
    const seats = Number(label.split(' ')[0])
    toggleSelection('passengers', seats)
  }

  return (
    <aside className="inventory-filters">
      <div className="inventory-map-card" aria-label="Bhinder office map location">
        <iframe
          title="Bhinder office map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="inventory-map-btn" aria-label="Open map location">
          Show On Map
        </a>
      </div>

      <div className="inventory-filter-meta">
        <p>{results} Results</p>
        <button type="button" onClick={resetFilters}>
          Clear Filters
        </button>
      </div>

      <div className="inventory-filter-block">
        <h3>Car Type</h3>
        <div className="inventory-chip-wrap">
          {carTypeChips.map((chip) => (
            <button
              type="button"
              key={chip}
              onClick={() => toggleQuickChip(chip)}
              className={`inventory-chip ${isQuickChipActive(chip) ? 'inventory-chip-active' : ''}`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="inventory-filter-block">
        <h3>Passengers</h3>
        <div className="inventory-chip-wrap">
          {passengerChips.map((chip) => (
            <button
              type="button"
              key={chip}
              onClick={() => togglePassengerChip(chip)}
              className={`inventory-chip ${selectedPassengers.includes(Number(chip.split(' ')[0])) ? 'inventory-chip-active' : ''}`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="inventory-filter-block">
        <h3>Transmission</h3>
        <div className="inventory-checkbox-list">
          <label className="inventory-checkbox-item">
            <input
              type="checkbox"
              checked={selectedTransmissions.length === 0}
              onChange={() => updateFilter('transmissions', [])}
            />
            <span>All</span>
          </label>

          {transmissionOptions.map((item) => (
            <label key={item} className="inventory-checkbox-item">
              <input
                type="checkbox"
                checked={selectedTransmissions.includes(item)}
                onChange={() => toggleSelection('transmissions', item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="inventory-filter-block">
        <h3>Company</h3>
        <div className="inventory-checkbox-list inventory-checkbox-company-list">
          {companyOptions.map((item) => (
            <label key={item} className="inventory-checkbox-item">
              <input
                type="checkbox"
                checked={selectedBrands.includes(item)}
                onChange={() => toggleSelection('brands', item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar
