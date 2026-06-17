import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { adminGetOrders, adminUpdateStatus } from '../../api/admin.js'

const STATUSES = ['pending','confirmed','processing','shipped','delivered','cancelled']
const STATUS_COLORS = {
  pending:'bg-yellow-50 text-yellow-700', confirmed:'bg-blue-50 text-blue-700',
  processing:'bg-purple-50 text-purple-700', shipped:'bg-orange-50 text-orange-700',
  delivered:'bg-green-50 text-green-700', cancelled:'bg-red-50 text-red-700',
}

export default function AdminOrders() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn:  adminGetOrders,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => adminUpdateStatus(id, status),
    onSuccess: () => { queryClient.invalidateQueries(['admin-orders']); toast.success('Order status updated') },
    onError:   () => toast.error('Failed to update status'),
  })

  const orders = data?.orders || []

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="font-heading text-2xl text-[#1a1a1a] mb-6">Orders ({data?.total || 0})</h1>

      {isLoading ? (
        <div className="flex flex-col gap-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-[#e8e0d5] rounded animate-pulse" />)}</div>
      ) : orders.length === 0 ? (
        <p className="text-center text-sm text-[#5f5e5a] py-20">No orders yet</p>
      ) : (
        <div className="bg-white border border-[#e8e0d5] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f5f0eb]">
              <tr>
                {['Order ID','Customer','Items','Total','Status','Update'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#5f5e5a] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-t border-[#f5f0eb] hover:bg-[#fafaf9]">
                  <td className="px-4 py-3 font-mono text-xs text-[#5f5e5a]">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#1a1a1a]">{order.user?.name}</p>
                    <p className="text-xs text-[#5f5e5a]">{order.user?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-[#5f5e5a]">{order.items?.length} items</td>
                  <td className="px-4 py-3 font-semibold text-[#1a1a1a]">Rs.{order.total?.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={e => updateMutation.mutate({ id: order._id, status: e.target.value })}
                      className="text-xs border border-[#e8e0d5] rounded px-2 py-1.5 bg-white focus:outline-none focus:border-[#c8a97e]"
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}