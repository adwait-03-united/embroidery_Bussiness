import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { registerUser } from '../api/auth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export default function Register() {
  const { login }   = useAuth()
  const navigate    = useNavigate()
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await registerUser(data)
      login(result.user, result.token)
      toast.success(`Account created! Welcome, ${result.user.name}!`)
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-5 py-10 bg-[#f5f0eb]">
      <div className="w-full max-w-md bg-white rounded-lg border border-[#e8e0d5] p-8">

        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-[#1a1a1a] mb-2">Create Account</h1>
          <p className="text-sm text-[#5f5e5a]">Join Stitch & Co — it's free</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            label="Full name"
            type="text"
            placeholder="Your full name"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPw ? 'text' : 'password'}
              placeholder="Min 8 chars, 1 uppercase, 1 number"
              error={errors.password?.message}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPw(p => !p)}
              className="absolute right-3 top-8 text-[#b4b2a9] hover:text-[#1a1a1a]"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <Input
            label="Confirm password"
            type={showPw ? 'text' : 'password'}
            placeholder="Re-enter your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-[#5f5e5a] mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#c8a97e] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}