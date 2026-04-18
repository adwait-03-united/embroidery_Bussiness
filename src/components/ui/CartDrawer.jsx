import { Link } from 'react-router-dom'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import Button from './Button'

function CartItem({ item }) {
  const { updateQty, removeItem } = useCart()
  return (
    <div className="flex gap-4 py-4 border-b border-[#e8e0d5]">
      <Link to={`/product/${item.slug}`} className="w-20 h-24 bg-[#f5f0eb] rounded overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.slug}`}>
          <p className="text-sm font-medium text-[#1a1a1a] hover:text-[#c8a97e] transition-colors truncate">
            {item.name}
          </p>
        </Link>
        <p className="text-xs text-[#5f5e5a] mt-1">
          Size: {item.size}
          {item.color && (
            <span className="inline-flex items-center gap-1 ml-2">
              · <span className="w-3 h-3 rounded-full inline-block border border-[#e8e0d5]" style={{ background: item.color }} />
            </span>
          )}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-[#e8e0d5] rounded">
            <button
              onClick={() => updateQty(item.key, item.qty - 1)}
              className="w-7 h-7 flex items-center justify-center text-[#1a1a1a] hover:bg-[#f5f0eb] text-base"
            >−</button>
            <span className="w-7 text-center text-xs font-medium">{item.qty}</span>
            <button
              onClick={() => updateQty(item.key, item.qty + 1)}
              className="w-7 h-7 flex items-center justify-center text-[#1a1a1a] hover:bg-[#f5f0eb] text-base"
            >+</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-[#1a1a1a]">
              Rs.{(item.price * item.qty).toLocaleString()}
            </span>
            <button
              onClick={() => removeItem(item.key)}
              className="text-[#b4b2a9] hover:text-[#d94f3d] transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, subtotal, shipping, total, totalItems } = useCart()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e0d5]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#1a1a1a]" />
            <h2 className="font-heading text-lg text-[#1a1a1a]">
              Your Cart {totalItems > 0 && <span className="text-[#c8a97e]">({totalItems})</span>}
            </h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-[#5f5e5a] hover:text-[#1a1a1a]">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={40} className="text-[#e8e0d5]" />
              <p className="text-sm text-[#5f5e5a]">Your cart is empty</p>
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map(item => <CartItem key={item.key} item={item} />)
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e8e0d5] px-6 py-5 flex flex-col gap-3">
            <div className="flex justify-between text-sm text-[#5f5e5a]">
              <span>Subtotal</span>
              <span>Rs.{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-[#5f5e5a]">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'text-[#1D9E75] font-medium' : ''}>
                {shipping === 0 ? 'Free' : `Rs.${shipping}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-[#c8a97e]">
                Add Rs.{(999 - subtotal + 1).toLocaleString()} more for free shipping
              </p>
            )}
            <div className="flex justify-between font-semibold text-[#1a1a1a] border-t border-[#e8e0d5] pt-3">
              <span>Total</span>
              <span>Rs.{total.toLocaleString()}</span>
            </div>
            <Link to="/checkout" onClick={() => setIsOpen(false)}>
              <Button size="lg" className="w-full">Proceed to Checkout</Button>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-center text-[#5f5e5a] hover:text-[#1a1a1a] underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}