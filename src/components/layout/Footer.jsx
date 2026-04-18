import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-sand mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <h3 className="font-heading text-2xl text-brand-white tracking-widest mb-4">STITCH</h3>
          <p className="text-sm text-brand-muted leading-relaxed">
            Handcrafted embroidery on premium casual wear.
            Made with care, worn with pride.
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-widest text-brand-gold uppercase mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-brand-muted">
            {['T-Shirts', 'Shirts', 'Embroidery Pieces', 'New Arrivals'].map(item => (
              <li key={item}>
                <Link to="/shop" className="hover:text-brand-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-widest text-brand-gold uppercase mb-4">Help</h4>
          <ul className="space-y-2 text-sm text-brand-muted">
            {['Size Guide', 'Shipping & Returns', 'Care Instructions', 'Contact Us'].map(item => (
              <li key={item}>
                <Link to="/" className="hover:text-brand-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-olive px-6 py-4 text-center text-xs text-brand-muted">
        © {new Date().getFullYear()} Stitch. All rights reserved.
      </div>
    </footer>
  )
} 