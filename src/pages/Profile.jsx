import { useNavigate } from 'react-router-dom'
import { LogOut, User, Package, Heart, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

const MENU = [
  { icon: Package, label: 'My Orders',    desc: 'Track and view your orders' },
  { icon: Heart,   label: 'Wishlist',     desc: 'Items you have saved' },
  { icon: MapPin,  label: 'Addresses',    desc: 'Saved delivery addresses' },
]

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const initials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">

      {/* User card */}
      <div className="bg-white border border-[#e8e0d5] rounded-lg p-6 flex items-center gap-5 mb-6">
        <div className="w-16 h-16 rounded-full bg-[#e8e0d5] flex items-center justify-center flex-shrink-0">
          <span className="font-heading text-xl text-[#c8a97e]">{initials}</span>
        </div>
        <div>
          <h1 className="font-heading text-xl text-[#1a1a1a]">{user?.name}</h1>
          <p className="text-sm text-[#5f5e5a] mt-0.5">{user?.email}</p>
        </div>
      </div>

      {/* Menu items */}
      <div className="flex flex-col gap-3 mb-6">
        {MENU.map(item => (
          <button
            key={item.label}
            className="bg-white border border-[#e8e0d5] rounded-lg p-4 flex items-center gap-4 hover:border-[#c8a97e] transition-colors text-left w-full"
          >
            <div className="w-10 h-10 rounded-full bg-[#f5f0eb] flex items-center justify-center flex-shrink-0">
              <item.icon size={18} className="text-[#c8a97e]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1a1a1a]">{item.label}</p>
              <p className="text-xs text-[#5f5e5a] mt-0.5">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3 border border-[#e8e0d5] rounded-lg text-sm text-[#d94f3d] hover:bg-[#fcebeb] transition-colors"
      >
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  )
}