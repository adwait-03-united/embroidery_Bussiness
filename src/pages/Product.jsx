import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ShoppingBag, Heart, ChevronLeft, Ruler } from 'lucide-react'
import toast from 'react-hot-toast'
import { getProductBySlug } from '../api/products'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ErrorMessage from '../components/ui/ErrorMessage'
import { useCart } from '../context/CartContext'

function PDPSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
      <div className="aspect-[3/4] bg-[#e8e0d5] rounded" />
      <div className="flex flex-col gap-4 pt-4">
        <div className="h-4 bg-[#e8e0d5] rounded w-1/4" />
        <div className="h-8 bg-[#e8e0d5] rounded w-3/4" />
        <div className="h-4 bg-[#e8e0d5] rounded w-1/3" />
        <div className="h-24 bg-[#e8e0d5] rounded" />
        <div className="h-10 bg-[#e8e0d5] rounded" />
        <div className="h-14 bg-[#e8e0d5] rounded" />
      </div>
    </div>
  )
}

export default function Product() {
  const { slug } = useParams()
  const [selectedSize,  setSelectedSize]  = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
  })

  if (isLoading) return <PDPSkeleton />
  if (isError || !product) return <ErrorMessage message="Product not found." />

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const handleAddToCart = () => {
  if (!selectedSize) {
    toast.error('Please select a size')
    return
  }
  addItem(product, selectedSize, selectedColor, qty)
  toast.success(`${product.name} added to cart!`)
}

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <Link to="/shop" className="inline-flex items-center gap-1 text-xs text-[#5f5e5a] hover:text-[#c8a97e] mb-8 transition-colors">
        <ChevronLeft size={14} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-[3/4] bg-[#f5f0eb] rounded overflow-hidden">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-5 py-4">
          {product.badge && <Badge variant="accent">{product.badge}</Badge>}

          <h1 className="font-heading text-3xl md:text-4xl text-[#1a1a1a] leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-[#1a1a1a]">Rs.{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-base text-[#b4b2a9] line-through">Rs.{product.originalPrice}</span>
                <Badge variant="accent">{discount}% off</Badge>
              </>
            )}
          </div>

          <p className="text-sm text-[#5f5e5a] leading-relaxed border-t border-[#e8e0d5] pt-5">
            {product.description}
          </p>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#5f5e5a] mb-2">Colour</p>
            <div className="flex gap-2">
              {product.colors.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{ background: c }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === c ? 'border-[#c8a97e] scale-110' : 'border-[#e8e0d5]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium uppercase tracking-wide text-[#5f5e5a]">Size</p>
              <button className="flex items-center gap-1 text-xs text-[#c8a97e] hover:underline">
                <Ruler size={12} /> Size guide
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-[44px] h-10 px-3 text-sm rounded border transition-all ${
                    selectedSize === s
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                      : 'bg-white text-[#1a1a1a] border-[#e8e0d5] hover:border-[#c8a97e]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#5f5e5a] mb-2">Quantity</p>
            <div className="flex items-center border border-[#e8e0d5] rounded w-fit">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-[#1a1a1a] hover:bg-[#f5f0eb] transition-colors text-lg">−</button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-[#1a1a1a] hover:bg-[#f5f0eb] transition-colors text-lg">+</button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
              <ShoppingBag size={18} /> Add to Cart
            </Button>
            <button className="w-12 h-12 flex items-center justify-center border border-[#e8e0d5] rounded hover:border-[#d94f3d] hover:text-[#d94f3d] transition-colors">
              <Heart size={18} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#e8e0d5]">
            {[
              { icon: '✦', label: 'Hand Embroidered' },
              { icon: '↩', label: 'Easy Returns' },
              { icon: '⚡', label: 'Fast Delivery' },
            ].map(b => (
              <div key={b.label} className="flex flex-col items-center gap-1 text-center">
                <span className="text-[#c8a97e] text-lg">{b.icon}</span>
                <span className="text-[10px] text-[#5f5e5a] leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}