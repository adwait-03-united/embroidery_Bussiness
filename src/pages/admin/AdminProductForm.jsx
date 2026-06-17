import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { adminCreateProduct, adminUpdateProduct } from '../../api/admin.js'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const SIZES  = ['XS','S','M','L','XL','XXL']
const COLORS = ['#f5f0eb','#1a1a1a','#c8a97e','#8b5e3c','#d94f3d','#e8e0d5']

export default function AdminProductForm({ product, onClose }) {
  const queryClient = useQueryClient()
  const isEdit = !!product

  const [form, setForm] = useState({
    name:          product?.name          || '',
    slug:          product?.slug          || '',
    description:   product?.description   || '',
    price:         product?.price         || '',
    originalPrice: product?.originalPrice || '',
    category:      product?.category      || 'tshirts',
    badge:         product?.badge         || '',
    stock:         product?.stock         || 100,
    isFeatured:    product?.isFeatured    || false,
    sizes:         product?.sizes         || [],
    colors:        product?.colors        || [],
  })
  const [images, setImages] = useState([])

  const mutation = useMutation({
    mutationFn: (formData) =>
      isEdit ? adminUpdateProduct(product._id, formData) : adminCreateProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products'])
      toast.success(isEdit ? 'Product updated!' : 'Product created!')
      onClose()
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to save product'),
  })

  const toggleSize  = (s) => setForm(f => ({ ...f, sizes:  f.sizes.includes(s)  ? f.sizes.filter(x => x !== s)  : [...f.sizes, s] }))
  const toggleColor = (c) => setForm(f => ({ ...f, colors: f.colors.includes(c) ? f.colors.filter(x => x !== c) : [...f.colors, c] }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => {
      if (Array.isArray(v)) fd.append(k, JSON.stringify(v))
      else fd.append(k, v)
    })
    images.forEach(img => fd.append('images', img))
    mutation.mutate(fd)
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-[#1a1a1a]">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
        <button onClick={onClose} className="text-sm text-[#5f5e5a] hover:text-[#1a1a1a]">← Back</button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white border border-[#e8e0d5] rounded-lg p-6">
        <Input label="Product name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <Input label="Slug (URL key)" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} required />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-[#5f5e5a]">Description</label>
          <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full px-4 py-3 text-sm border border-[#e8e0d5] rounded focus:outline-none focus:border-[#c8a97e]" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Price (Rs)" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
          <Input label="Original price (Rs)" type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-[#5f5e5a]">Category</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full px-4 py-3 text-sm border border-[#e8e0d5] rounded focus:outline-none focus:border-[#c8a97e]">
              <option value="tshirts">T-Shirts</option>
              <option value="shirts">Shirts</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-[#5f5e5a]">Badge</label>
            <select value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
              className="w-full px-4 py-3 text-sm border border-[#e8e0d5] rounded focus:outline-none focus:border-[#c8a97e]">
              <option value="">None</option>
              <option value="New">New</option>
              <option value="Bestseller">Bestseller</option>
              <option value="Sale">Sale</option>
            </select>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#5f5e5a] mb-2">Sizes</p>
          <div className="flex gap-2 flex-wrap">
            {SIZES.map(s => (
              <button type="button" key={s} onClick={() => toggleSize(s)}
                className={`w-12 h-10 text-sm rounded border transition-all ${form.sizes.includes(s) ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-[#1a1a1a] border-[#e8e0d5]'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#5f5e5a] mb-2">Colours</p>
          <div className="flex gap-2">
            {COLORS.map(c => (
              <button type="button" key={c} onClick={() => toggleColor(c)} style={{ background: c }}
                className={`w-8 h-8 rounded-full border-2 transition-all ${form.colors.includes(c) ? 'border-[#c8a97e] scale-110' : 'border-[#e8e0d5]'}`} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Stock count" type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
          <div className="flex items-center gap-3 pt-5">
            <input type="checkbox" id="featured" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} className="w-4 h-4" />
            <label htmlFor="featured" className="text-sm text-[#1a1a1a]">Featured product</label>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-[#5f5e5a]">
            Product images {isEdit ? '(leave empty to keep current)' : '(required)'}
          </label>
          <input type="file" multiple accept="image/*" onChange={e => setImages(Array.from(e.target.files))}
            className="text-sm text-[#5f5e5a] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#1a1a1a] file:text-white hover:file:bg-[#c8a97e]" />
          {images.length > 0 && <p className="text-xs text-[#1D9E75]">{images.length} image{images.length !== 1 ? 's' : ''} selected</p>}
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" size="lg" className="flex-1" disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </Button>
          <button type="button" onClick={onClose} className="px-6 py-3 border border-[#e8e0d5] rounded text-sm text-[#5f5e5a] hover:bg-[#f5f0eb]">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}