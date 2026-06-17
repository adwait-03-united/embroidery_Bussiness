import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Package } from 'lucide-react'
import { getMyOrders } from '../api/orders.js'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'

const STATUS_STYLES = {
  pending:    'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed:  'bg-blue-50 text-blue-700 border-blue-200',
  processing: 'bg-purple-50 text-purple-700 border-purple-200',
  shipped:    'bg-orange-50 text-orange-700 border-orange-200',
  delivered:  'bg-green-50 text-green-700 border-green-200',
  cancelled:  'bg-red-50 text-red-700 border-red-200',
}

export default function MyOrders() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn:  getMyOrders,
  })

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-14">
        <SectionTitle label="Account" title="My Orders" />
        <div className="flex flex-col gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-28 bg-[#e8e0d5] rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <SectionTitle
        label="Account"
        title="My Orders"
        subtitle={orders.length ? `${orders.length} order${orders.length !== 1 ? 's' : ''}` : undefined}
      />

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-5">
          <Package size={48} className="text-[#e8e0d5]" />
          <p className="text-sm text-[#5f5e5a]">You have not placed any orders yet.</p>
          <Link to="/shop"><Button>Start Shopping</Button></Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white border border-[#e8e0d5] rounded-lg p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-[#5f5e5a]">Order ID</p>
                  <p className="text-sm font-mono font-medium text-[#1a1a1a] mt-0.5">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border font-medium capitalize ${STATUS_STYLES[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className="flex gap-2 mb-4">
                {order.items.slice(0, 4).map((item, i) => (
                  <div key={i} className="w-14 h-16 bg-[#f5f0eb] rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="w-14 h-16 bg-[#e8e0d5] rounded flex items-center justify-center text-xs text-[#5f5e5a]">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-[#e8e0d5] pt-3">
                <div>
                  <p className="text-xs text-[#5f5e5a]">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                  <p className="text-sm font-semibold text-[#1a1a1a] mt-0.5">
                    Rs.{order.total.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-[#5f5e5a]">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}