import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil, Trash2, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { adminGetProducts, adminDeleteProduct } from '../../api/admin.js'
import Button from '../../components/ui/Button'
import AdminProductForm from './AdminProductForm'

export default function AdminProducts() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm]     = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn:  adminGetProducts,
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products'])
      toast.success('Product deleted')
    },
    onError: () => toast.error('Failed to delete product'),
  })

  const handleEdit = (product) => {
    setEditProduct(product)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this product? This cannot be undone.')) {
      deleteMutation.mutate(id)
    }
  }

  if (showForm) return (
    <AdminProductForm
      product={editProduct}
      onClose={() => { setShowForm(false); setEditProduct(null) }}
    />
  )

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-[#1a1a1a]">Products ({products.length})</h1>
        <Button onClick={() => { setEditProduct(null); setShowForm(true) }}>
          <Plus size={16} className="mr-2" /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-[#e8e0d5] rounded animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-white border border-[#e8e0d5] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f5f0eb]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#5f5e5a] uppercase">Product</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#5f5e5a] uppercase">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#5f5e5a] uppercase">Price</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#5f5e5a] uppercase">Stock</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#5f5e5a] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-t border-[#f5f0eb] hover:bg-[#fafaf9]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]} alt={p.name} className="w-10 h-12 object-cover rounded bg-[#e8e0d5]" />
                      <span className="font-medium text-[#1a1a1a]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-[#5f5e5a]">{p.category}</td>
                  <td className="px-4 py-3 font-medium text-[#1a1a1a]">Rs.{p.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${p.stock > 10 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {p.stock} left
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="p-1.5 text-[#5f5e5a] hover:text-[#c8a97e] transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-1.5 text-[#5f5e5a] hover:text-[#d94f3d] transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
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