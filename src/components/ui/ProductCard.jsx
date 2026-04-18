import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Badge from './Badge'

export default function ProductCard({ product }) {
  const { id, name, price, image, badge, originalPrice } = product

  return (
    <div className="group relative">
      <div className="relative overflow-hidden bg-brand-cream aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute top-3 left-3">
            <Badge variant={badge === 'Sale' ? 'sale' : 'new'}>{badge}</Badge>
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-brand-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={16} className="text-brand-muted" />
        </button>
      </div>
      <div className="mt-3">
        <Link to={`/product/${id}`}>
          <h3 className="font-heading text-base text-brand-black hover:text-brand-gold transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-body text-brand-black">₹{price}</span>
          {originalPrice && (
            <span className="text-xs text-brand-muted line-through">₹{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}