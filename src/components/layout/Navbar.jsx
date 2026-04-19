import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBag, Menu, X, Search, LogOut, Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import SearchOverlay from '../ui/SearchOverlay'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/collections/tshirts', label: 'T-Shirts' },
  { to: '/collections/shirts', label: 'Shirts' },
  { to: '/about', label: 'Our Story' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false) // ✅ search state

  const { isAuthenticated, user, logout } = useAuth()
  const { totalWishlisted } = useWishlist()
  const { totalItems, setIsOpen } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-[#f5f0eb] border-b border-[#e8e0d5]">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        <Link to="/" className="font-heading text-xl font-semibold tracking-wide text-[#1a1a1a]">
          STITCH & CO
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive ? 'text-[#c8a97e] font-medium' : 'text-[#1a1a1a] hover:text-[#c8a97e]'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">

          {/* 🔍 Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="text-[#1a1a1a] hover:text-[#c8a97e] transition-colors"
          >
            <Search size={20} />
          </button>

          {/* ❤️ Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-[#1a1a1a] hover:text-[#d94f3d] transition-colors"
          >
            <Heart size={20} />
            {totalWishlisted > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#d94f3d] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {totalWishlisted}
              </span>
            )}
          </Link>

          {/* 🛒 Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative text-[#1a1a1a] hover:text-[#c8a97e] transition-colors"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#c8a97e] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          {/* 👤 Auth */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 text-sm text-[#1a1a1a] hover:text-[#c8a97e]">
                <div className="w-7 h-7 rounded-full bg-[#e8e0d5] flex items-center justify-center">
                  <span className="text-[10px] font-medium text-[#c8a97e]">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                {user?.name?.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="text-[#5f5e5a] hover:text-[#d94f3d]">
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link to="/login" className="text-sm text-[#1a1a1a] hover:text-[#c8a97e]">Sign In</Link>
              <Link to="/register" className="text-sm bg-[#1a1a1a] text-white px-4 py-2 rounded hover:bg-[#c8a97e]">
                Register
              </Link>
            </div>
          )}

          {/* 📱 Mobile toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <div className="md:hidden px-5 py-4 flex flex-col gap-4">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}

          <div className="border-t pt-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  My Account ({user?.name?.split(' ')[0]})
                </Link>
                <button onClick={handleLogout}>Sign Out</button>
              </>
            ) : (
              <>
                {/* ✅ FIXED BUG HERE */}
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm text-[#1a1a1a]">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* 🔍 Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}