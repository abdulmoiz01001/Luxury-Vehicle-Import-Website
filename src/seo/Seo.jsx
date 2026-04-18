import { Helmet } from 'react-helmet-async'
import { company } from '../data/company'

const Seo = ({
  title,
  description,
  path = '/',
  image = '/assets/vehicles/car-sedan.svg',
  type = 'website',
  schema = [],
}) => {
  const fullTitle = `${title} | ${company.name}`
  const canonical = `${company.baseUrl}${path}`
  const fullImage = image.startsWith('http') ? image : `${company.baseUrl}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={fullImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      {schema.map((item) => (
        <script key={item['@type'] || Math.random()} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  )
}

export default Seo
