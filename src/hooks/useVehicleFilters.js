import { useMemo, useState } from 'react'
import { getVehicleSeats } from '../utils/vehicles'

const defaultFilters = {
  search: '',
  brand: 'All',
  brands: [],
  model: 'All',
  fuelType: 'All',
  transmission: 'All',
  transmissions: [],
  passengers: [],
  city: 'All',
  year: 'All',
  maxPrice: Infinity,
}

export const useVehicleFilters = (vehicles = []) => {
  const [filters, setFilters] = useState(defaultFilters)

  const options = useMemo(() => {
    const unique = (key) => ['All', ...new Set(vehicles.map((v) => v[key]))]
    return {
      brands: unique('brand'),
      models: unique('model'),
      fuelTypes: unique('fuelType'),
      transmissions: [...new Set(vehicles.map((v) => v.transmission))],
      cities: unique('city'),
      years: ['All', ...new Set(vehicles.map((v) => String(v.year)).sort((a, b) => Number(b) - Number(a)))],
      maxAvailablePrice: Math.max(...vehicles.map((v) => v.price), 0),
    }
  }, [vehicles])

  const filteredVehicles = useMemo(() => {
    const query = filters.search.trim().toLowerCase()
    const selectedTransmissions = new Set((filters.transmissions || []).map((item) => String(item).toLowerCase()))
    const selectedBrands = new Set((filters.brands || []).map((item) => String(item).toLowerCase()))
    const selectedPassengers = new Set((filters.passengers || []).map((item) => Number(item)))

    return vehicles.filter((vehicle) => {
      const searchable = `${vehicle.name} ${vehicle.brand} ${vehicle.model}`.toLowerCase()
      const vehicleTransmission = String(vehicle.transmission).toLowerCase()
      const vehicleBrand = String(vehicle.brand).toLowerCase()

      return (
        searchable.includes(query) &&
        (selectedTransmissions.size === 0 || selectedTransmissions.has(vehicleTransmission)) &&
        (selectedBrands.size === 0 || selectedBrands.has(vehicleBrand)) &&
        (selectedPassengers.size === 0 || selectedPassengers.has(getVehicleSeats(vehicle))) &&
        (filters.brand === 'All' || vehicle.brand === filters.brand) &&
        (filters.model === 'All' || vehicle.model === filters.model) &&
        (filters.fuelType === 'All' || vehicle.fuelType === filters.fuelType) &&
        (filters.transmission === 'All' || vehicle.transmission === filters.transmission) &&
        (filters.city === 'All' || vehicle.city === filters.city) &&
        (filters.year === 'All' || String(vehicle.year) === String(filters.year)) &&
        vehicle.price <= Number(filters.maxPrice)
      )
    })
  }, [vehicles, filters])

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }))
  }

  const resetFilters = () => {
    setFilters({ ...defaultFilters, maxPrice: options.maxAvailablePrice || Infinity })
  }

  return {
    filters,
    options,
    filteredVehicles,
    updateFilter,
    resetFilters,
  }
}
