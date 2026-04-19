import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import Badge from './Badge'
import { useWishlist } from '../../context/WishlistContext'

export default function ProductCard({ product }) {
  const { name, price, originalPrice, images, badge, slug, id } = product
  const src = images?.[0] || 'https://placehold.co/600x800/e8e0d5/1a1a1a?text=Product'
  const { toggle, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(id)

  const handleWishlist = (e) => {
    e.preventDefault()
    toggle(id)
    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!', {
      icon: wishlisted ? '🤍' : '❤️',
    })
  }

  return (
    <div className="group relative bg-white rounded overflow-hidden border border-[#e8e0d5] hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${slug}`} className="block aspect-[3/4] overflow-hidden bg-[#f5f0eb]">
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      </Link>

      {badge && (
        <div className="absolute top-3 left-3">
          <Badge variant="accent">{badge}</Badge>
        </div>
      )}

      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-200 ${
          wishlisted
            ? 'text-[#d94f3d] scale-110'
            : 'text-[#b4b2a9] hover:text-[#d94f3d] hover:scale-110'
        }`}
      >
        <Heart size={15} fill={wishlisted ? '#d94f3d' : 'none'} />
      </button>

      <div className="p-4">
        <Link to={`/product/${slug}`}>
          <h3 className="text-sm font-medium text-[#1a1a1a] hover:text-[#c8a97e] transition-colors truncate">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-semibold text-[#1a1a1a]">Rs.{price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-xs text-[#b4b2a9] line-through">Rs.{originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  )
}