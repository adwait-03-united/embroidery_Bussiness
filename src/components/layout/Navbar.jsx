import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X, User } from 'lucide-react'

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'T-Shirts', to: '/shop?type=tshirt' },
  { label: 'Shirts', to: '/shop?type=shirt' },
  { label: 'Embroidery', to: '/shop?type=embroidery' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = 0

  return (
    <header className="sticky top-0 z-50 bg-brand-white border-b border-brand-sand">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link to="/" className="font-heading text-2xl tracking-widest text-brand-black">
          STITCH
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm tracking-wider transition-colors ${
                  isActive
                    ? 'text-brand-gold'
                    : 'text-brand-muted hover:text-brand-black'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/profile" className="text-brand-muted hover:text-brand-black transition-colors">
            <User size={20} />
          </Link>
          <Link to="/cart" className="relative text-brand-muted hover:text-brand-black transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden text-brand-muted"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-brand-white border-t border-brand-sand px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-brand-muted hover:text-brand-black"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}