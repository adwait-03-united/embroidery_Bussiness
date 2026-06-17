import axiosInstance from './axiosInstance.js'

export const getDashboardStats  = async () => {
  const { data } = await axiosInstance.get('/admin/dashboard')
  return data
}
export const adminGetProducts   = async () => {
  const { data } = await axiosInstance.get('/admin/products')
  return data.products
}
export const adminCreateProduct = async (formData) => {
  const { data } = await axiosInstance.post('/admin/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}
export const adminUpdateProduct = async (id, formData) => {
  const { data } = await axiosInstance.put(`/admin/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}
export const adminDeleteProduct = async (id) => {
  const { data } = await axiosInstance.delete(`/admin/products/${id}`)
  return data
}
export const adminGetOrders     = async (params = {}) => {
  const { data } = await axiosInstance.get('/admin/orders', { params })
  return data
}
export const adminUpdateStatus  = async (id, status) => {
  const { data } = await axiosInstance.put(`/admin/orders/${id}/status`, { status })
  return data
}