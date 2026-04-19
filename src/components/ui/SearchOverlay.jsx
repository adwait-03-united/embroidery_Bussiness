import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { getProducts } from '../../api/products'

export default function SearchOverlay({ open, onClose }) {
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  // Focus input when overlay opens
  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  // Debounced search
  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const data = await getProducts({ search: query })
        setResults(data.slice(0, 6))
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Search panel */}
      <div className="relative bg-white w-full max-w-2xl mx-auto mt-20 rounded-xl shadow-2xl overflow-hidden">

        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e8e0d5]">
          <Search size={18} className="text-[#5f5e5a] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for T-shirts, shirts, embroidery..."
            className="flex-1 text-sm text-[#1a1a1a] outline-none placeholder:text-[#b4b2a9] bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#b4b2a9] hover:text-[#1a1a1a]">
              <X size={16} />
            </button>
          )}
          <button onClick={onClose} className="text-xs text-[#5f5e5a] hover:text-[#1a1a1a] ml-2 px-2 py-1 border border-[#e8e0d5] rounded">
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="p-6 text-center text-sm text-[#5f5e5a]">Searching...</div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-[#5f5e5a]">No results for "{query}"</p>
              <p className="text-xs text-[#b4b2a9] mt-1">Try searching for T-shirt, shirt, or embroidery</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div>
              <p className="px-5 pt-4 pb-2 text-xs text-[#b4b2a9] uppercase tracking-widest">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              {results.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-[#f5f0eb] transition-colors"
                >
                  <div className="w-12 h-14 bg-[#f5f0eb] rounded overflow-hidden flex-shrink-0">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1a1a1a] truncate">{product.name}</p>
                    <p className="text-xs text-[#5f5e5a] capitalize">{product.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#1a1a1a] flex-shrink-0">
                    Rs.{product.price.toLocaleString()}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {!query && (
            <div className="p-6">
              <p className="text-xs text-[#b4b2a9] uppercase tracking-widest mb-3">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {['Embroidery tee', 'Linen shirt', 'Floral', 'Minimal', 'Crane'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 border border-[#e8e0d5] rounded-full text-[#5f5e5a] hover:border-[#c8a97e] hover:text-[#c8a97e] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}