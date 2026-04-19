import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { getProducts } from '../api/products'
import ProductCard from '../components/ui/ProductCard'
import { ProductGridSkeleton } from '../components/ui/Skeleton'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import { PageTransition, StaggerGrid, StaggerItem } from '../components/ui/Animate'
import SEO from '../components/ui/SEO' // ✅ ADD THIS

export default function Wishlist() {
  const { ids } = useWishlist()

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: () => getProducts(),
  })

  const wishlisted = allProducts.filter(p => ids.includes(p.id))

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-5 py-14">

        {/* ✅ SEO added here */}
        <SEO title="My Wishlist" />

        <SectionTitle
          label="Saved"
          title="My Wishlist"
          subtitle={
            wishlisted.length
              ? `${wishlisted.length} item${wishlisted.length !== 1 ? 's' : ''} saved`
              : undefined
          }
        />

        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : wishlisted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <Heart size={48} className="text-[#e8e0d5]" />
            <p className="text-sm text-[#5f5e5a]">You haven't saved anything yet.</p>
            <Link to="/shop">
              <Button variant="outline">Browse Collection</Button>
            </Link>
          </div>
        ) : (
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlisted.map(p => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </PageTransition>
  )
}