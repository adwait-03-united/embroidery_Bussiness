import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // Restore cart from localStorage on load
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, size, color, qty = 1) => {
    setItems(prev => {
      const key = `${product.id}-${size}-${color}`
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i =>
          i.key === key ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, {
        key,
        id:       product.id,
        slug:     product.slug,
        name:     product.name,
        price:    product.price,
        image:    product.images?.[0] || '',
        size,
        color,
        qty,
      }]
    })
    setIsOpen(true)
  }

  const removeItem = (key) => {
    setItems(prev => prev.filter(i => i.key !== key))
  }

  const updateQty = (key, qty) => {
    if (qty < 1) { removeItem(key); return }
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal   = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shipping   = subtotal > 999 ? 0 : 99
  const total      = subtotal + shipping

  return (
    <CartContext.Provider value={{
      items, isOpen, setIsOpen,
      addItem, removeItem, updateQty, clearCart,
      totalItems, subtotal, shipping, total,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}