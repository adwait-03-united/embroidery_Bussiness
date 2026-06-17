import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../api/auth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const schema = z.object({
  email:    z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function Login() {
  const { login }  = useAuth()
  const navigate   = useNavigate()
  const location   = useLocation()
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const from = location.state?.from?.pathname || '/'

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await loginUser(data)
      login(result, result.token)
      toast.success(`Welcome back, ${result.name}!`)
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-5 bg-[#f5f0eb]">
      <div className="w-full max-w-md bg-white rounded-lg border border-[#e8e0d5] p-8">

        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-[#1a1a1a] mb-2">Welcome Back</h1>
          <p className="text-sm text-[#5f5e5a]">Sign in to your Stitch & Co account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPw(p => !p)}
              className="absolute right-3 top-8 text-[#b4b2a9] hover:text-[#1a1a1a] transition-colors"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-[#5f5e5a] mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#c8a97e] font-medium hover:underline">
            Create one
          </Link>
        </p>

        <div className="mt-6 p-3 bg-[#f5f0eb] rounded text-xs text-[#5f5e5a] text-center">
          Test: <strong>test@example.com</strong> / <strong>password123</strong>
        </div>
      </div>
    </div>
  )
}