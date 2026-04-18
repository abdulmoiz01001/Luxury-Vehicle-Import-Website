import { company } from '../data/company'

export const baseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  url: company.baseUrl,
  logo: `${company.baseUrl}/assets/logo-blue.svg`,
  sameAs: [company.instagram, company.facebook],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: company.phone,
    contactType: 'customer service',
  },
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: company.name,
  image: `${company.baseUrl}/assets/vehicles/car-sedan.svg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address,
    addressLocality: 'Mombasa',
    addressCountry: 'KE',
  },
  telephone: company.phone,
  openingHours: 'Mo-Sa 08:00-18:00',
  url: company.baseUrl,
}

export const autoDealerSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: company.name,
  url: company.baseUrl,
  telephone: company.phone,
  areaServed: 'Kenya',
}

export const breadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${company.baseUrl}${item.path}`,
  })),
})

export const productVehicleSchema = (vehicle) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: vehicle.name,
  image: vehicle.images,
  brand: { '@type': 'Brand', name: vehicle.brand },
  description: vehicle.description,
  sku: vehicle.slug,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'KES',
    price: vehicle.price,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/UsedCondition',
  },
})
