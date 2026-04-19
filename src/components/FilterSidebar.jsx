import { Link } from 'react-router-dom'
import { FaCar, FaCarSide, FaChargingStation, FaCompass, FaGasPump, FaGem, FaRoad, FaTachometerAlt, FaTractor, FaTruck, FaUsers, FaCog } from 'react-icons/fa'
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

const passengerChips = [
  { label: '2 Passengers', value: 2 },
  { label: '4 Passengers', value: 4 },
  { label: '5 Passengers', value: 5 },
  { label: '7 Passengers', value: 7 },
  { label: '8 Passengers', value: 8 },
]

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

  const togglePassengerChip = (value) => {
    toggleSelection('passengers', value)
  }

  const getCarTypeIcon = (chip) => {
    if (chip === 'SUV') return <FaCarSide size={13} aria-hidden="true" />
    if (chip === 'Automatic') return <FaCog size={13} aria-hidden="true" />
    if (chip === 'Diesel') return <FaCar size={13} aria-hidden="true" />
    if (chip === 'Petrol') return <FaGasPump size={13} aria-hidden="true" />
    if (chip === 'Hybrid') return <FaChargingStation size={13} aria-hidden="true" />
    if (chip === '4x4 / 4WD') return <FaCompass size={13} aria-hidden="true" />
    if (chip === 'Agriculture') return <FaTractor size={13} aria-hidden="true" />
    if (chip === 'Off-Roading') return <FaRoad size={13} aria-hidden="true" />
    if (chip === 'Family Cars') return <FaUsers size={13} aria-hidden="true" />
    if (chip === 'Sports Car') return <FaTachometerAlt size={13} aria-hidden="true" />
    if (chip === 'Luxury') return <FaGem size={13} aria-hidden="true" />
    if (chip === 'Commercial') return <FaTruck size={13} aria-hidden="true" />
    return <FaCar size={13} aria-hidden="true" />
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
        <Link to={company.mapsUrl} target="_blank" rel="noreferrer" className="inventory-map-btn" aria-label="Open map location">
          Show On Map
        </Link>
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
              <span className="inventory-chip-content">
                {getCarTypeIcon(chip)}
                {chip}
              </span>
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
              key={chip.label}
              onClick={() => togglePassengerChip(chip.value)}
              className={`inventory-chip ${selectedPassengers.includes(chip.value) ? 'inventory-chip-active' : ''}`}
            >
              {chip.label}
            </button>
          ))}
          <button
            type="button"
            className="inventory-more"
            onClick={() => togglePassengerChip('more')}
            aria-label={selectedPassengers.includes('more') ? 'Show 8 passengers and below' : 'Show more than 8 passengers'}
          >
            {selectedPassengers.includes('more') ? 'Less' : 'More'}
          </button>
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
