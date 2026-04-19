import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from '../ui/CartDrawer'
import ScrollToTop from './ScrollToTop'
import BackToTop from '../ui/BackToTop'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <BackToTop />
    </div>
  )
}