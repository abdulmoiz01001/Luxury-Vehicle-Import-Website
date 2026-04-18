import { useEffect, useMemo, useState } from 'react'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import FilterSidebar from '../components/FilterSidebar'
import VehicleCard from '../components/VehicleCard'
import Seo from '../seo/Seo'
import { breadcrumbSchema } from '../seo/schemas'
import { allVehicles } from '../utils/vehicles'
import { useVehicleFilters } from '../hooks/useVehicleFilters'
import { useCompare } from '../context/CompareContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useDebouncedValue from '../hooks/useDebouncedValue'

const VehicleListingPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParam = searchParams.get('q') || ''
  const { selectedSlugs, toggleCompare } = useCompare()
  const { filters, options, filteredVehicles, updateFilter, resetFilters } = useVehicleFilters(allVehicles)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(queryParam)
  const debouncedSearchInput = useDebouncedValue(searchInput, 350)
  const normalizedDebouncedSearch = useMemo(() => debouncedSearchInput.trim(), [debouncedSearchInput])

  useEffect(() => {
    setSearchInput(queryParam)
  }, [queryParam])

  useEffect(() => {
    updateFilter('search', normalizedDebouncedSearch)
  }, [normalizedDebouncedSearch, updateFilter])

  useEffect(() => {
    if (normalizedDebouncedSearch === queryParam) return

    const next = new URLSearchParams(searchParams)
    if (normalizedDebouncedSearch) {
      next.set('q', normalizedDebouncedSearch)
    } else {
      next.delete('q')
    }
    setSearchParams(next, { replace: true })
  }, [normalizedDebouncedSearch, queryParam, searchParams, setSearchParams])

  const handleResetFilters = () => {
    resetFilters()
    setSearchInput('')
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    setSearchParams(next, { replace: true })
  }

  const handleCompareToggle = (slug) => {
    const exists = selectedSlugs.includes(slug)
    const next = exists
      ? selectedSlugs.filter((item) => item !== slug)
      : selectedSlugs.length >= 3
        ? selectedSlugs
        : [...selectedSlugs, slug]

    toggleCompare(slug)

    if (!exists && next.length === 2) {
      navigate('/compare')
    }
  }

  return (
    <>
      <Seo
        title="Vehicle Inventory"
        description="Browse imported luxury and premium vehicles with advanced filtering by brand, model, fuel type, city, year, and price."
        path="/vehicles"
        schema={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Vehicles', path: '/vehicles' }])]}
      />
      <section className="inventory-page bg-white">
        <div className="inventory-shell mx-auto grid max-w-[1300px] gap-8 px-4 py-10 md:grid-cols-[300px_1fr] md:px-8">
          <div className={`inventory-filters-panel ${mobileFiltersOpen ? 'inventory-filters-panel-open' : ''}`}>
            <div className="inventory-mobile-filter-head">
              <button
                type="button"
                className="inventory-mobile-filter-toggle"
                onClick={() => setMobileFiltersOpen((value) => !value)}
                aria-expanded={mobileFiltersOpen}
                aria-controls="inventory-mobile-filter-content"
              >
                <SlidersHorizontal size={16} />
                More Filters
                <ChevronDown size={16} className={mobileFiltersOpen ? 'inventory-mobile-chevron-open' : ''} />
              </button>
            </div>

            <div id="inventory-mobile-filter-content" className="inventory-mobile-filter-content">
              <FilterSidebar
                filters={{ ...filters, resultsCount: filteredVehicles.length }}
                options={options}
                updateFilter={updateFilter}
                resetFilters={handleResetFilters}
              />
            </div>
          </div>

          <div>
            <div className="mb-5">
              <label htmlFor="inventory-search" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Search Inventory
              </label>
              <input
                id="inventory-search"
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Type keywords like BMW, hybrid, sport..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>

            {filteredVehicles.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
                <h2 className="text-2xl font-black text-slate-900">No vehicles found</h2>
                <p className="mt-2 text-sm text-slate-600">Try adjusting filters to see available inventory.</p>
                <button type="button" onClick={handleResetFilters} className="btn-primary mt-5">
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="inventory-card-grid grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.slug}
                    vehicle={vehicle}
                    onCompareToggle={handleCompareToggle}
                    isSelected={selectedSlugs.includes(vehicle.slug)}
                    variant="inventory"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default VehicleListingPage
