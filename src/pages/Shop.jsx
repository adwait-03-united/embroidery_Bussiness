import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { SlidersHorizontal, X } from 'lucide-react'
import { getProducts } from '../api/products'
import ProductCard from '../components/ui/ProductCard'
import { ProductGridSkeleton } from '../components/ui/Skeleton'
import ErrorMessage from '../components/ui/ErrorMessage'
import SectionTitle from '../components/ui/SectionTitle'

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name',       label: 'Name A–Z' },
]

function sortProducts(products, sort) {
  const arr = [...products]
  if (sort === 'price-asc')  return arr.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') return arr.sort((a, b) => b.price - a.price)
  if (sort === 'name')       return arr.sort((a, b) => a.name.localeCompare(b.name))
  return arr
}

export default function Shop() {
  const { category } = useParams()
  const [sort, setSort]     = useState('default')
  const [search, setSearch] = useState('')

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['products', category, search],
    queryFn: () => getProducts({ category, search }),
  })

  const products = sortProducts(data, sort)

  const title = category === 'tshirts' ? 'T-Shirts'
    : category === 'shirts' ? 'Shirts'
    : 'All Products'

  return (
    <div className="max-w-7xl mx-auto px-5 py-14">
      <SectionTitle
        label={category ? 'Collection' : 'Shop'}
        title={title}
        subtitle={`${products.length} product${products.length !== 1 ? 's' : ''}`}
      />
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-[#e8e0d5] rounded bg-white focus:outline-none focus:border-[#c8a97e]"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b4b2a9] hover:text-[#1a1a1a]">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-[#5f5e5a]" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="text-sm border border-[#e8e0d5] rounded px-3 py-2.5 bg-white focus:outline-none focus:border-[#c8a97e] text-[#1a1a1a]"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : isError ? (
        <ErrorMessage />
      ) : products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-[#5f5e5a] text-sm">No products found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}