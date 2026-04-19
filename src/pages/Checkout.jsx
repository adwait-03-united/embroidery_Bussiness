import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronLeft, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import SEO from '../components/ui/SEO'

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone:    z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  address:  z.string().min(10, 'Enter your full address'),
  city:     z.string().min(2, 'City is required'),
  state:    z.string().min(2, 'State is required'),
  pincode:  z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
})

const INDIAN_STATES = [
  'Andhra Pradesh','Assam','Bihar','Delhi','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana',
  'Uttar Pradesh','Uttarakhand','West Bengal',
]

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate  = useNavigate()
  const [loading, setLoading] = useState(false)
  const [step, setStep]       = useState(1)

  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { fullName: user?.name || '' },
  })

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-5">
        <p className="font-heading text-2xl text-[#1a1a1a]">Your cart is empty</p>
        <Link to="/shop"><Button>Shop Now</Button></Link>
      </div>
    )
  }

  const onAddressSubmit = () => setStep(2)

  const handlePayment = async () => {
    setLoading(true)
    const address = getValues()

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_PLACEHOLDER',
        amount: total * 100,
        currency: 'INR',
        name: 'Stitch & Co',
        description: `Order of ${items.length} item${items.length !== 1 ? 's' : ''}`,
        image: '/logo.png',
        prefill: {
          name: address.fullName,
          contact: address.phone,
          email: user?.email || '',
        },
        notes: {
          address: `${address.address}, ${address.city}, ${address.state} - ${address.pincode}`,
        },
        theme: { color: '#c8a97e' },
        handler: function (response) {
          clearCart()
          navigate('/order-success', {
            state: {
              paymentId: response.razorpay_payment_id,
              address,
              items,
              total,
            },
          })
        },
        modal: { ondismiss: () => setLoading(false) },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', () => {
        setLoading(false)
        alert('Payment failed. Please try again.')
      })
      rzp.open()
    }

    script.onerror = () => {
      setLoading(false)
      alert('Failed to load payment gateway. Check your internet connection.')
    }

    document.body.appendChild(script)
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">

      <SEO title="Checkout" />

      <Link
        to="/shop"
        className="inline-flex items-center gap-1 text-xs text-[#5f5e5a] hover:text-[#c8a97e] mb-8"
      >
        <ChevronLeft size={14} /> Back to Shop
      </Link>

      <h1 className="font-heading text-3xl text-[#1a1a1a] mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-10">
        <span className={`text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full ${step === 1 ? 'bg-[#1a1a1a] text-white' : 'bg-[#e8e0d5] text-[#5f5e5a]'}`}>
          1. Delivery
        </span>
        <span className="text-[#b4b2a9] text-xs">—</span>
        <span className={`text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full ${step === 2 ? 'bg-[#1a1a1a] text-white' : 'bg-[#e8e0d5] text-[#5f5e5a]'}`}>
          2. Payment
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">

        {/* Left — form */}
        <div>
          {step === 1 && (
            <form onSubmit={handleSubmit(onAddressSubmit)} className="flex flex-col gap-5">
              <h2 className="font-heading text-lg text-[#1a1a1a]">Delivery Information</h2>

              <Input
                label="Full Name"
                placeholder="Your name"
                error={errors.fullName?.message}
                {...register('fullName')}
              />
              <Input
                label="Mobile Number"
                placeholder="9876543210"
                error={errors.phone?.message}
                {...register('phone')}
              />
              <Input
                label="Address"
                placeholder="House / Flat no., Street, Area"
                error={errors.address?.message}
                {...register('address')}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  placeholder="Pune"
                  error={errors.city?.message}
                  {...register('city')}
                />
                <Input
                  label="Pincode"
                  placeholder="411001"
                  error={errors.pincode?.message}
                  {...register('pincode')}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-wide uppercase text-[#5f5e5a]">
                  State
                </label>
                <select
                  className="w-full px-4 py-3 text-sm border border-[#e8e0d5] bg-white rounded focus:outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e] transition-colors"
                  {...register('state')}
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-xs text-[#d94f3d]">{errors.state.message}</p>
                )}
              </div>

              <Button type="submit" size="lg" className="mt-2 w-full">
                Continue to Payment
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-lg text-[#1a1a1a]">Review &amp; Pay</h2>

              <div className="bg-[#faf8f5] border border-[#e8e0d5] rounded p-5 text-sm text-[#5f5e5a] space-y-1">
                <p className="font-medium text-[#1a1a1a]">{getValues('fullName')}</p>
                <p>{getValues('address')}</p>
                <p>{getValues('city')}, {getValues('state')} — {getValues('pincode')}</p>
                <p>{getValues('phone')}</p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#c8a97e] underline underline-offset-2 mt-1"
                >
                  Edit
                </button>
              </div>

              <Button
                size="lg"
                className="w-full flex items-center gap-2"
                onClick={handlePayment}
                disabled={loading}
              >
                <Lock size={14} />
                {loading ? 'Processing…' : `Pay ₹${total?.toLocaleString('en-IN')}`}
              </Button>

              <p className="text-xs text-[#b4b2a9] text-center">
                Secured by Razorpay. Your payment info is never stored.
              </p>
            </div>
          )}
        </div>

        {/* Right — order summary */}
        <div className="bg-[#faf8f5] border border-[#e8e0d5] rounded p-6 h-fit">
          <h2 className="font-heading text-lg text-[#1a1a1a] mb-5">Order Summary</h2>

          <ul className="flex flex-col gap-4 mb-6">
            {items.map(item => (
              <li key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1a1a1a] truncate">{item.name}</p>
                  {item.size && (
                    <p className="text-xs text-[#5f5e5a]">Size: {item.size}</p>
                  )}
                  <p className="text-xs text-[#5f5e5a]">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-[#1a1a1a] shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </p>
              </li>
            ))}
          </ul>

          <div className="border-t border-[#e8e0d5] pt-4 flex flex-col gap-2 text-sm text-[#5f5e5a]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-medium text-[#1a1a1a] text-base pt-2 border-t border-[#e8e0d5]">
              <span>Total</span>
              <span>₹{total?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}