import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { getProducts } from '../api/products'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionTitle from '../components/ui/SectionTitle'
import ProductCard from '../components/ui/ProductCard'
import { ProductGridSkeleton } from '../components/ui/Skeleton'
import { FadeUp, StaggerGrid, StaggerItem, PageTransition } from '../components/ui/Animate'
import SEO from '../components/ui/SEO' // ✅ ADD THIS

const CATEGORIES = [
  { label: 'T-Shirts', slug: 'tshirts', desc: 'Casual embroidered tees' },
  { label: 'Shirts',   slug: 'shirts',  desc: 'Premium linen & cotton' },
]

export default function Home() {
  const { data: newArrivals = [], isLoading } = useQuery({
    queryKey: ['products', 'home'],
    queryFn: () => getProducts(),
    select: (data) => data.slice(0, 4),
  })

  return (
    <div>
      
      {/* ✅ SEO added here */}
      <SEO title="Home" />

      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-5 bg-[#f5f0eb]">
        <div className="max-w-3xl">
          <Badge variant="gold">Summer Collection 2025</Badge>
          <h1 className="font-heading text-5xl md:text-7xl mt-5 mb-6 leading-tight text-[#1a1a1a]">
            Wear the Art of<br />Embroidery
          </h1>
          <p className="text-[#5f5e5a] max-w-md mx-auto text-sm leading-relaxed mb-8">
            Handcrafted embroidery on premium T-Shirts and Shirts. Each piece tells a story — yours.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/shop"><Button size="lg">Shop Collection</Button></Link>
            <Link to="/about"><Button variant="outline" size="lg">Our Story</Button></Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-16">
        <SectionTitle label="Collections" title="Shop by Category" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              to={`/collections/${cat.slug}`}
              className="group relative aspect-video bg-[#e8e0d5] rounded overflow-hidden flex flex-col items-center justify-center text-center p-8 hover:shadow-lg transition-shadow"
            >
              <p className="text-xs tracking-widest uppercase text-[#c8a97e] mb-2">{cat.desc}</p>
              <h3 className="font-heading text-3xl text-[#1a1a1a] mb-4">{cat.label}</h3>
              <span className="flex items-center gap-2 text-sm text-[#1a1a1a] font-medium group-hover:text-[#c8a97e] transition-colors">
                Shop {cat.label} <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 pb-20">
        <div className="flex items-center justify-between mb-10">
          <SectionTitle label="Just In" title="New Arrivals" />
          <Link to="/shop" className="flex items-center gap-1 text-sm text-[#c8a97e] hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      <section className="bg-[#1a1a1a] text-center py-16 px-5">
        <p className="text-xs tracking-widest uppercase text-[#c8a97e] mb-3">Our Promise</p>
        <h2 className="font-heading text-3xl text-white mb-4">Crafted by Hand. Made to Last.</h2>
        <p className="text-sm text-[#b4b2a9] max-w-md mx-auto leading-relaxed">
          Every stitch is placed with intention. We use only premium fabrics and hand-guide every embroidery frame ourselves.
        </p>
      </section>
      
    </div>
  )
}