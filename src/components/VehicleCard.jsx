import { Link } from 'react-router-dom'
import { Armchair, SlidersVertical, Snowflake, BriefcaseBusiness, Share2, GitCompareArrows } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { formatKES } from '../utils/format'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { shareContent } from '../utils/share'
import { getVehicleSeats } from '../utils/vehicles'

const VehicleCard = ({ vehicle, onCompareToggle, isSelected, variant = 'default' }) => {
  const handleShare = async () => {
    try {
      const result = await shareContent({
        title: vehicle.name,
        text: `Check out ${vehicle.name} at Bhinder Corporation`,
        url: `${window.location.origin}/vehicle/${vehicle.slug}`,
      })

      if (result === 'copied') {
        toast.success('Vehicle link copied to clipboard')
      }
    } catch {
      toast.error('Unable to share right now')
    }
  }

  if (variant === 'inventory') {
    return (
      <article className="inventory-card">
        <div className="inventory-card-head">
          <h3>
            <Link to={`/vehicle/${vehicle.slug}`} aria-label={`View ${vehicle.name} details`}>
              {vehicle.name}
            </Link>
          </h3>
          <p>Or similar - Small Cars</p>
        </div>

        <div className="inventory-car-image-wrap">
          <Link to={`/vehicle/${vehicle.slug}`} aria-label={`View ${vehicle.name} details`}>
            <img src={vehicle.images[0]} alt={vehicle.name} loading="lazy" className="inventory-car-image" />
          </Link>
        </div>

        <ul className="inventory-spec-row">
          <li><Armchair size={13} /> {getVehicleSeats(vehicle)} Seats</li>
          <li><SlidersVertical size={13} /> {vehicle.transmission}</li>
          <li><Snowflake size={13} /> Air Conditioning</li>
          <li><BriefcaseBusiness size={13} /> 2 Bags</li>
        </ul>

        <div className="inventory-icon-row">
          <button type="button" onClick={handleShare} aria-label={`Share ${vehicle.name}`}>
            <Share2 size={17} />
          </button>
          <button
            type="button"
            onClick={() => onCompareToggle(vehicle.slug)}
            className={isSelected ? 'inventory-icon-active' : ''}
            aria-label={`Add ${vehicle.name} to compare`}
          >
            <GitCompareArrows size={17} />
          </button>
          <a href={buildWhatsAppUrl(vehicle.name)} target="_blank" rel="noreferrer" aria-label={`WhatsApp inquiry for ${vehicle.name}`}>
            <FaWhatsapp size={18} />
          </a>
        </div>

        <Link to={`/vehicle/${vehicle.slug}`} className="inventory-view-btn" aria-label={`View ${vehicle.name} details`}>
          View Deal
        </Link>
      </article>
    )
  }

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
      <div className="relative overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          loading="lazy"
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-white">
          {vehicle.condition}
        </span>
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-2xl font-bold text-slate-900">{vehicle.name}</h3>
        <p className="text-sm text-slate-500">{vehicle.brand} • {vehicle.model} • {vehicle.city}</p>
        <p className="mt-3 text-xl font-bold text-brand-primary">{formatKES(vehicle.price)}</p>
      </div>

      <div className="mt-5 flex gap-2">
        <Link to={`/vehicle/${vehicle.slug}`} className="btn-primary flex-1 text-center" aria-label={`View ${vehicle.name} details`}>
          View Deal
        </Link>
        <button
          type="button"
          onClick={() => onCompareToggle(vehicle.slug)}
          className={`rounded-full px-3 py-2 text-xs font-semibold ${isSelected ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-700'}`}
          aria-label={`Add ${vehicle.name} to compare`}
        >
          <GitCompareArrows size={16} />
        </button>
      </div>
    </article>
  )
}

export default VehicleCard
