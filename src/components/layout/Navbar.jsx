import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBag, Menu, X, Search, User, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/',                    label: 'Home' },
  { to: '/shop',                label: 'Shop' },
  { to: '/collections/tshirts', label: 'T-Shirts' },
  { to: '/collections/shirts',  label: 'Shirts' },
  { to: '/about',               label: 'Our Story' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
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
          <Link to="/cart" className="relative text-[#1a1a1a] hover:text-[#c8a97e] transition-colors">
            <ShoppingBag size={20} />
          </Link>

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm text-[#1a1a1a] hover:text-[#c8a97e] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#e8e0d5] flex items-center justify-center">
                  <span className="text-[10px] font-medium text-[#c8a97e]">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                {user?.name?.split(' ')[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="text-[#5f5e5a] hover:text-[#d94f3d] transition-colors"
                title="Sign out"
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-sm text-[#1a1a1a] hover:text-[#c8a97e] transition-colors">
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-sm bg-[#1a1a1a] text-white px-4 py-2 rounded hover:bg-[#c8a97e] transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          <button className="md:hidden text-[#1a1a1a]" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#f5f0eb] border-t border-[#e8e0d5] px-5 py-4 flex flex-col gap-4">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="text-sm text-[#1a1a1a] hover:text-[#c8a97e]">
              {l.label}
            </NavLink>
          ))}
          <div className="border-t border-[#e8e0d5] pt-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)} className="text-sm text-[#1a1a1a]">
                  My Account ({user?.name?.split(' ')[0]})
                </Link>
                <button onClick={handleLogout} className="text-sm text-[#d94f3d] text-left">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login"    onClick={() => setOpen(false)} className="text-sm text-[#1a1a1a]">Sign In</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="text-sm text-[#c8a97e] font-medium">Create Account</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}