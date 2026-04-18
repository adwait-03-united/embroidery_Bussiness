const MOCK = [
  { id: 1, slug: 'floral-embroidery-tshirt', name: 'Floral Embroidery Tee', price: 1299, originalPrice: 1799, badge: 'New', category: 'tshirts', sizes: ['S','M','L','XL'], colors: ['#f5f0eb','#1a1a1a','#c8a97e'], images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Tee+1'], description: 'Premium cotton tee with hand-embroidered floral motif on the chest.' },
  { id: 2, slug: 'heritage-crane-shirt', name: 'Heritage Crane Shirt', price: 2199, originalPrice: 2799, badge: 'Bestseller', category: 'shirts', sizes: ['S','M','L','XL','XXL'], colors: ['#f5f0eb','#8b5e3c'], images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Shirt+1'], description: 'Linen-blend shirt with an embroidered crane design on the back.' },
  { id: 3, slug: 'minimal-stitch-tee', name: 'Minimal Stitch Tee', price: 999, originalPrice: null, badge: null, category: 'tshirts', sizes: ['S','M','L'], colors: ['#1a1a1a','#d94f3d'], images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Tee+2'], description: 'Clean minimal tee with a small embroidered logo at the chest.' },
  { id: 4, slug: 'paisley-linen-shirt', name: 'Paisley Linen Shirt', price: 2499, originalPrice: 2999, badge: 'Sale', category: 'shirts', sizes: ['M','L','XL'], colors: ['#f5f0eb','#c8a97e'], images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Shirt+2'], description: 'Premium linen shirt with intricate paisley embroidery along the placket.' },
  { id: 5, slug: 'tiger-embroidery-tee', name: 'Tiger Embroidery Tee', price: 1499, originalPrice: null, badge: 'New', category: 'tshirts', sizes: ['S','M','L','XL'], colors: ['#1a1a1a'], images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Tee+3'], description: 'Bold tiger face embroidery on a heavy-weight black tee.' },
  { id: 6, slug: 'botanical-resort-shirt', name: 'Botanical Resort Shirt', price: 1999, originalPrice: 2499, badge: null, category: 'shirts', sizes: ['S','M','L','XL','XXL'], colors: ['#f5f0eb'], images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Shirt+3'], description: 'Lightweight resort shirt with botanical leaf embroidery on both sleeves.' },
  { id: 7, slug: 'wave-stitch-tee', name: 'Wave Stitch Tee', price: 1199, originalPrice: 1499, badge: null, category: 'tshirts', sizes: ['M','L','XL'], colors: ['#1a1a1a','#f5f0eb'], images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Tee+4'], description: 'Organic cotton tee with ocean wave stitch pattern across the chest.' },
  { id: 8, slug: 'mandala-overshirt', name: 'Mandala Overshirt', price: 2799, originalPrice: 3499, badge: 'Sale', category: 'shirts', sizes: ['M','L','XL'], colors: ['#8b5e3c','#1a1a1a'], images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Shirt+4'], description: 'Heavy cotton overshirt with full mandala embroidery on the back panel.' },
]

export const getProducts = async (filters = {}) => {
  let results = [...MOCK]
  if (filters.category) results = results.filter(p => p.category === filters.category)
  if (filters.search) results = results.filter(p =>
    p.name.toLowerCase().includes(filters.search.toLowerCase()))
  return results
}

export const getProductBySlug = async (slug) => {
  return MOCK.find(p => p.slug === slug) || null
}