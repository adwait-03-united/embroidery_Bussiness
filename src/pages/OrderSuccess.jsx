import { useLocation, Link, Navigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import Button from '../components/ui/Button'

export default function OrderSuccess() {
  const { state } = useLocation()

  // If user lands here directly (no state), redirect to home
  if (!state?.paymentId) return <Navigate to="/" replace />

  const { paymentId, address, items, total } = state

  return (
    <div className="max-w-2xl mx-auto px-5 py-16 text-center">

      <div className="flex justify-center mb-6">
        <CheckCircle size={64} className="text-[#1D9E75]" />
      </div>

      <h1 className="font-heading text-3xl text-[#1a1a1a] mb-3">Order Confirmed!</h1>
      <p className="text-sm text-[#5f5e5a] mb-2">
        Thank you for shopping with Stitch & Co.
      </p>
      <p className="text-xs text-[#b4b2a9] mb-8">
        Payment ID: <span className="font-mono text-[#1a1a1a]">{paymentId}</span>
      </p>

      {/* Delivery address */}
      <div className="bg-[#f5f0eb] border border-[#e8e0d5] rounded-lg p-5 text-left mb-6">
        <h3 className="text-xs font-medium uppercase tracking-widest text-[#c8a97e] mb-3">Delivering to</h3>
        <p className="text-sm font-medium text-[#1a1a1a]">{address.fullName}</p>
        <p className="text-sm text-[#5f5e5a]">{address.address}</p>
        <p className="text-sm text-[#5f5e5a]">{address.city}, {address.state} - {address.pincode}</p>
      </div>

      {/* Items summary */}
      <div className="bg-white border border-[#e8e0d5] rounded-lg p-5 text-left mb-8">
        <h3 className="text-xs font-medium uppercase tracking-widest text-[#c8a97e] mb-4">
          {items.length} item{items.length !== 1 ? 's' : ''} ordered
        </h3>
        <div className="flex flex-col gap-3">
          {items.map(item => (
            <div key={item.key} className="flex items-center gap-3">
              <div className="w-12 h-14 bg-[#f5f0eb] rounded overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1a1a1a] truncate">{item.name}</p>
                <p className="text-xs text-[#5f5e5a]">Size: {item.size} · Qty: {item.qty}</p>
              </div>
              <span className="text-sm font-semibold text-[#1a1a1a]">
                Rs.{(item.price * item.qty).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#e8e0d5] mt-4 pt-3 flex justify-between font-semibold text-[#1a1a1a]">
          <span>Total Paid</span>
          <span>Rs.{total.toLocaleString()}</span>
        </div>
      </div>

      <p className="text-xs text-[#5f5e5a] mb-6">
        Expected delivery in 5–7 business days. You will receive an SMS update.
      </p>

      <Link to="/shop">
        <Button size="lg">Continue Shopping</Button>
      </Link>
    </div>
  )
}