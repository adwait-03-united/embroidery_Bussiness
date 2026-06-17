import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Package, ShoppingBag, Users, IndianRupee } from 'lucide-react'
import { getDashboardStats } from '../../api/admin.js'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white border border-[#e8e0d5] rounded-lg p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-xs text-[#5f5e5a] uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-semibold text-[#1a1a1a] mt-0.5">{value}</p>
    </div>
  </div>
)

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn:  getDashboardStats,
  })

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-[#1a1a1a]">Admin Dashboard</h1>
          <p className="text-sm text-[#5f5e5a] mt-1">Stitch & Co management panel</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/products" className="text-sm bg-[#1a1a1a] text-white px-4 py-2 rounded hover:bg-[#c8a97e] transition-colors">Manage Products</Link>
          <Link to="/admin/orders"   className="text-sm border border-[#1a1a1a] text-[#1a1a1a] px-4 py-2 rounded hover:bg-[#f5f0eb] transition-colors">View Orders</Link>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1,2,3,4].map(i => <div key={i} className="h-24 bg-[#e8e0d5] rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={ShoppingBag}  label="Total Orders"   value={stats?.totalOrders}   color="bg-blue-500" />
          <StatCard icon={Package}      label="Products"       value={stats?.totalProducts} color="bg-amber-500" />
          <StatCard icon={Users}        label="Customers"      value={stats?.totalUsers}    color="bg-purple-500" />
          <StatCard icon={IndianRupee}  label="Revenue"        value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`} color="bg-green-500" />
        </div>
      )}

      <div className="bg-white border border-[#e8e0d5] rounded-lg p-5">
        <h2 className="font-heading text-lg text-[#1a1a1a] mb-4">Recent Orders</h2>
        {stats?.recentOrders?.length === 0 ? (
          <p className="text-sm text-[#5f5e5a] text-center py-8">No orders yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {stats?.recentOrders?.map(order => (
              <div key={order._id} className="flex items-center justify-between py-2 border-b border-[#f5f0eb] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a]">{order.user?.name}</p>
                  <p className="text-xs text-[#5f5e5a]">{order.items?.length} items</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#1a1a1a]">Rs.{order.total?.toLocaleString()}</p>
                  <p className="text-xs capitalize text-[#c8a97e]">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}