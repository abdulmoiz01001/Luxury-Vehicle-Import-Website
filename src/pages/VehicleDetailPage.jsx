import { Link, Navigate, useParams } from 'react-router-dom'
import { Armchair, SlidersVertical, Snowflake, BriefcaseBusiness, Share2, GitCompareArrows, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import Seo from '../seo/Seo'
import { breadcrumbSchema, productVehicleSchema } from '../seo/schemas'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { allVehicles, getVehicleSeats, vehicleBySlug } from '../utils/vehicles'
import { useCompare } from '../context/CompareContext'
import { shareContent } from '../utils/share'

const VehicleDetailPage = () => {
  const { slug } = useParams()
  const vehicle = vehicleBySlug(slug)
  const { selectedSlugs, toggleCompare } = useCompare()

  if (!vehicle) return <Navigate to="/404" replace />

  const currentIndex = allVehicles.findIndex((item) => item.slug === vehicle.slug)
  const prevVehicle = allVehicles[(currentIndex - 1 + allVehicles.length) % allVehicles.length]
  const nextVehicle = allVehicles[(currentIndex + 1) % allVehicles.length]

  const related = allVehicles.filter((item) => item.slug !== vehicle.slug).slice(0, 3)
  const trustPoints = [
    'Personally Selected Vehicles',
    'Direct Import (No Middleman)',
    'Verified Mileage Guaranteed',
    'Quality Checked Before Delivery',
  ]

  const detailBlurb = `${vehicle.description} Built for everyday confidence with refined comfort, smart features, and strong long-term reliability.`
  const isSelected = selectedSlugs.includes(vehicle.slug)

  const handleShare = async () => {
    try {
      const result = await shareContent({
        title: `${vehicle.name} ${vehicle.year}`,
        text: `Check out ${vehicle.name} from Bhinder Corporation`,
        url: `${window.location.origin}/vehicle/${vehicle.slug}`,
      })
      if (result === 'copied') {
        toast.success('Vehicle link copied to clipboard')
      }
    } catch {
      toast.error('Unable to share right now')
    }
  }

  return (
    <>
      <Seo
        title={`${vehicle.name} ${vehicle.year}`}
        description={vehicle.description}
        path={`/vehicle/${vehicle.slug}`}
        image={vehicle.images[0]}
        type="product"
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Vehicles', path: '/vehicles' },
            { name: vehicle.name, path: `/vehicle/${vehicle.slug}` },
          ]),
          productVehicleSchema(vehicle),
        ]}
      />

      <section className="vehicle-detail-page">
        <div className="vehicle-detail-split-bg" aria-hidden="true" />

        <div className="vehicle-detail-shell">
          <section className="vehicle-detail-hero-wrap">
            <div className="vehicle-detail-left">
              <div className="vehicle-detail-title-wrap">
                <div className="vehicle-detail-title-line" />
                <div>
                  <h1>{vehicle.brand.toUpperCase()}</h1>
                  <p>New Addition</p>
                </div>
              </div>

              <div className="vehicle-detail-hero-image-wrap">
                <img src={vehicle.images[0]} alt={vehicle.name} className="vehicle-detail-hero-image" />
              </div>

              <div className="vehicle-detail-arrow-wrap">
                <Link to={`/vehicle/${prevVehicle.slug}`} className="vehicle-detail-arrow-btn" aria-label="Previous vehicle">
                  <ChevronLeft size={30} />
                </Link>
                <Link to={`/vehicle/${nextVehicle.slug}`} className="vehicle-detail-arrow-btn" aria-label="Next vehicle">
                  <ChevronRight size={30} />
                </Link>
              </div>

              <article className="vehicle-detail-card-panel">
                <h2>Vehicle Specifications</h2>

                <ul className="vehicle-detail-spec-grid">
                  <li>
                    <Armchair size={18} />
                    <span>{getVehicleSeats(vehicle)} Seats</span>
                  </li>
                  <li>
                    <SlidersVertical size={18} />
                    <span>{vehicle.transmission}</span>
                  </li>
                  <li>
                    <Snowflake size={18} />
                    <span>Air Condition</span>
                  </li>
                  <li>
                    <BriefcaseBusiness size={18} />
                    <span>2 Large Bags</span>
                  </li>
                </ul>

                <h3>Why Choose Bhinder Corporation</h3>
                <ul className="vehicle-detail-benefits-grid">
                  {trustPoints.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={15} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>

            </div>

            <aside className="vehicle-detail-right">
              <span className="vehicle-detail-badge">Contact Us</span>

              <h2>{vehicle.brand.toUpperCase()}</h2>
              <h3>New Addition</h3>
              <p>{detailBlurb}</p>

              <div className="vehicle-detail-social-row">
                <button type="button" onClick={handleShare} aria-label={`Share ${vehicle.name}`}>
                  <Share2 size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => toggleCompare(vehicle.slug)}
                  className={isSelected ? 'bg-brand-primary text-white' : ''}
                  aria-label={`Add ${vehicle.name} to compare`}
                >
                  <GitCompareArrows size={18} />
                </button>
                <a href={buildWhatsAppUrl(vehicle.name)} target="_blank" rel="noreferrer" aria-label={`WhatsApp inquiry for ${vehicle.name}`}>
                  <FaWhatsapp size={18} />
                </a>
              </div>

              <Link to="/vehicles" className="vehicle-detail-fleet-link">
                Explore Full Fleet
              </Link>
            </aside>

            <section className="vehicle-detail-related-wrap vehicle-detail-related-full">
              <h2>You might also like</h2>

              <div className="vehicle-detail-related-grid">
                {related.map((item) => (
                  <Link key={item.slug} to={`/vehicle/${item.slug}`} className="vehicle-detail-related-card">
                    <img src={item.images[0]} alt={item.name} loading="lazy" />
                    <small>{item.brand === 'Mini' ? 'Premium Compact' : item.brand === 'Volkswagen' ? 'Economy Plus' : 'Electric City'}</small>
                    <p>{item.name}</p>
                  </Link>
                ))}
              </div>
            </section>
          </section>
        </div>
      </section>
    </>
  )
}

export default VehicleDetailPage
