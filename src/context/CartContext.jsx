import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // Restore cart from localStorage on load
  useEffect(() => {
    const saved = localStorage.getItem('cart')

    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, size, color, qty = 1) => {
    setItems(prev => {
      // Prefer MongoDB _id over old numeric id
      const productId = product._id || product.id || ''

      const key = `${productId}-${size}-${color}`

      const existing = prev.find(i => i.key === key)

      // If same product/size/color already exists → increase qty
      if (existing) {
        return prev.map(i =>
          i.key === key
            ? { ...i, qty: i.qty + qty }
            : i
        )
      }

      // Add new item
      return [
        ...prev,
        {
          key,
          id: String(productId), // important fix
          slug: product.slug || '',
          name: product.name || '',
          price: Number(product.price) || 0,
          image: product.images?.[0] || '',
          size: String(size) || '',
          color: String(color || ''),
          qty: Number(qty) || 1,
        },
      ]
    })

    setIsOpen(true)
  }

  const removeItem = (key) => {
    setItems(prev => prev.filter(i => i.key !== key))
  }

  const updateQty = (key, qty) => {
    if (qty < 1) {
      removeItem(key)
      return
    }

    setItems(prev =>
      prev.map(i =>
        i.key === key
          ? { ...i, qty }
          : i
      )
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  )

  const shipping = subtotal > 999 ? 0 : 99

  const total = subtotal + shipping

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,

        addItem,
        removeItem,
        updateQty,
        clearCart,

        totalItems,
        subtotal,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)

  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return ctx
}