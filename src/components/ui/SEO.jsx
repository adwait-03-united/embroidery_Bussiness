import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description = 'Handcrafted embroidery on premium T-Shirts and Shirts. Shop Stitch & Co — made with love, worn with pride.',
  image = '/og-image.jpg',
  url,
}) {
  const fullTitle = title ? `${title} | Stitch & Co` : 'Stitch & Co — Handcrafted Embroidery Clothing'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph (Facebook, WhatsApp previews) */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:type"        content="website" />
      {url && <meta property="og:url" content={url} />}

      {/* Twitter card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
    </Helmet>
  )
}