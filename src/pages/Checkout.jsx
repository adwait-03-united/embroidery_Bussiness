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

const schema = z.object({
  fullName:  z.string().min(2, 'Full name is required'),
  phone:     z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  address:   z.string().min(10, 'Enter your full address'),
  city:      z.string().min(2, 'City is required'),
  state:     z.string().min(2, 'State is required'),
  pincode:   z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
})

const INDIAN_STATES = [
  'Andhra Pradesh','Assam','Bihar','Delhi','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana',
  'Uttar Pradesh','Uttarakhand','West Bengal',
]

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const navigate   = useNavigate()
  const [loading, setLoading] = useState(false)
  const [step, setStep]       = useState(1) // 1=address, 2=confirm

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

    // Load Razorpay SDK dynamically
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_PLACEHOLDER',
        amount: total * 100, // Razorpay takes paise (multiply by 100)
        currency: 'INR',
        name: 'Stitch & Co',
        description: `Order of ${items.length} item${items.length !== 1 ? 's' : ''}`,
        image: '/logo.png',
        prefill: {
          name:    address.fullName,
          contact: address.phone,
          email:   user?.email || '',
        },
        notes: {
          address: `${address.address}, ${address.city}, ${address.state} - ${address.pincode}`,
        },
        theme: { color: '#c8a97e' },
        handler: function(response) {
          // Payment successful
          clearCart()
          navigate('/order-success', {
            state: {
              paymentId: response.razorpay_payment_id,
              address,
              items,
              total,
            }
          })
        },
        modal: {
          ondismiss: () => setLoading(false),
        }
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
      <Link to="/shop" className="inline-flex items-center gap-1 text-xs text-[#5f5e5a] hover:text-[#c8a97e] mb-8">
        <ChevronLeft size={14} /> Back to Shop
      </Link>

      <h1 className="font-heading text-3xl text-[#1a1a1a] mb-8">Checkout</h1>

      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-8">
        {['Shipping Address', 'Review & Pay'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              step > i + 1 ? 'bg-[#1D9E75] text-white'
              : step === i + 1 ? 'bg-[#1a1a1a] text-white'
              : 'bg-[#e8e0d5] text-[#5f5e5a]'
            }`}>{i + 1}</div>
            <span className={`text-xs ${step === i + 1 ? 'text-[#1a1a1a] font-medium' : 'text-[#5f5e5a]'}`}>
              {label}
            </span>
            {i === 0 && <span className="text-[#e8e0d5] mx-1">—</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

        {/* Left — form */}
        <div>
          {step === 1 && (
            <form onSubmit={handleSubmit(onAddressSubmit)} className="flex flex-col gap-5">
              <h2 className="font-heading text-xl text-[#1a1a1a]">Shipping Address</h2>
              <Input label="Full name"    error={errors.fullName?.message}  {...register('fullName')} placeholder="As on ID" />
              <Input label="Phone number" error={errors.phone?.message}     {...register('phone')}    placeholder="10-digit mobile number" />
              <Input label="Full address" error={errors.address?.message}   {...register('address')}  placeholder="House no, Street, Area, Landmark" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="City"    error={errors.city?.message}    {...register('city')}    placeholder="City" />
                <Input label="Pincode" error={errors.pincode?.message} {...register('pincode')} placeholder="6-digit pincode" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-wide uppercase text-[#5f5e5a]">State</label>
                <select
                  {...register('state')}
                  className="w-full px-4 py-3 text-sm border border-[#e8e0d5] bg-white rounded focus:outline-none focus:border-[#c8a97e]"
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-xs text-[#d94f3d]">{errors.state.message}</p>}
              </div>
              <Button type="submit" size="lg" className="w-full mt-2">Continue to Review</Button>
            </form>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl text-[#1a1a1a]">Delivery Address</h2>
                <button onClick={() => setStep(1)} className="text-xs text-[#c8a97e] hover:underline">Edit</button>
              </div>
              <div className="bg-[#f5f0eb] rounded p-4 text-sm text-[#1a1a1a] leading-relaxed border border-[#e8e0d5] mb-6">
                <p className="font-medium">{getValues('fullName')}</p>
                <p className="text-[#5f5e5a] mt-1">{getValues('address')}</p>
                <p className="text-[#5f5e5a]">{getValues('city')}, {getValues('state')} - {getValues('pincode')}</p>
                <p className="text-[#5f5e5a]">Ph: {getValues('phone')}</p>
              </div>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-white text-base font-medium px-8 py-4 rounded hover:bg-[#c8a97e] transition-colors disabled:opacity-60"
              >
                <Lock size={16} />
                {loading ? 'Opening Payment...' : `Pay Rs.${total.toLocaleString()} Securely`}
              </button>
              <p className="text-xs text-center text-[#5f5e5a] mt-3">
                Secured by Razorpay · UPI · Cards · Net Banking · EMI
              </p>
            </div>
          )}
        </div>

        {/* Right — order summary */}
        <div className="bg-[#f5f0eb] rounded-lg p-6 border border-[#e8e0d5] h-fit">
          <h2 className="font-heading text-lg text-[#1a1a1a] mb-4">Order Summary</h2>
          <div className="flex flex-col gap-3 mb-5">
            {items.map(item => (
              <div key={item.key} className="flex gap-3">
                <div className="w-14 h-16 bg-white rounded overflow-hidden flex-shrink-0 border border-[#e8e0d5]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#1a1a1a] truncate">{item.name}</p>
                  <p className="text-xs text-[#5f5e5a]">Size: {item.size} · Qty: {item.qty}</p>
                  <p className="text-xs font-semibold text-[#1a1a1a] mt-1">Rs.{(item.price * item.qty).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#e8e0d5] pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm text-[#5f5e5a]"><span>Subtotal</span><span>Rs.{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm text-[#5f5e5a]">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'text-[#1D9E75]' : ''}>{shipping === 0 ? 'Free' : `Rs.${shipping}`}</span>
            </div>
            <div className="flex justify-between font-semibold text-[#1a1a1a] text-base border-t border-[#e8e0d5] pt-2 mt-1">
              <span>Total</span><span>Rs.{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}