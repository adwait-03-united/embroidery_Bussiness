import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
      <p className="font-heading text-8xl text-[#e8e0d5] mb-4">404</p>
      <h1 className="font-heading text-2xl text-[#1a1a1a] mb-3">Page not found</h1>
      <p className="text-sm text-[#5f5e5a] max-w-xs mb-8 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/shop"><Button>Back to Shop</Button></Link>
    </div>
  )
}