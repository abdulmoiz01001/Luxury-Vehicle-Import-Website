import { useState } from 'react'

const ImageGallery = ({ images = [], alt }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images.length) return null

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-soft">
        <img src={images[activeIndex]} alt={alt} className="h-[360px] w-full rounded-2xl object-cover" loading="lazy" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {images.map((img, idx) => (
          <button
            key={`${img}-${idx}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`overflow-hidden rounded-xl border ${idx === activeIndex ? 'border-brand-primary' : 'border-slate-200'}`}
            aria-label={`View image ${idx + 1}`}
          >
            <img src={img} alt={`${alt} ${idx + 1}`} className="h-24 w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
