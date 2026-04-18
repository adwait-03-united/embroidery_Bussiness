import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#e8e0d5] mt-auto">
      <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-heading text-lg mb-4 text-white">STITCH & CO</h3>
          <p className="text-sm text-[#b4b2a9] leading-relaxed">
            Handcrafted embroidery on premium casual wear. Made with love, worn with pride.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium tracking-widest uppercase mb-4 text-[#c8a97e]">Shop</h4>
          <ul className="flex flex-col gap-2 text-sm text-[#b4b2a9]">
            {['T-Shirts', 'Shirts', 'New Arrivals', 'Sale'].map(item => (
              <li key={item}>
                <Link to="/shop" className="hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium tracking-widest uppercase mb-4 text-[#c8a97e]">Help</h4>
          <ul className="flex flex-col gap-2 text-sm text-[#b4b2a9]">
            {['Shipping Policy', 'Returns', 'Size Guide', 'Contact Us'].map(item => (
              <li key={item}>
                <Link to="/" className="hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[#2c2c2a] text-center text-xs text-[#5f5e5a] py-4">
        &copy; {new Date().getFullYear()} Stitch & Co. All rights reserved.
      </div>
    </footer>
  )
}