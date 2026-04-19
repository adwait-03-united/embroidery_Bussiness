import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) setIds(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(ids))
  }, [ids])

  const toggle = (id) => {
    setIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const isWishlisted = (id) => ids.includes(id)
  const totalWishlisted = ids.length

  return (
    <WishlistContext.Provider value={{ ids, toggle, isWishlisted, totalWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}