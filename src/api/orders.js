import axiosInstance from './axiosInstance.js'

export const createRazorpayOrder = async (amount) => {
  const { data } = await axiosInstance.post('/orders/create-razorpay-order', { amount })
  return data
}

export const verifyPayment = async (paymentData) => {
  const { data } = await axiosInstance.post('/orders/verify-payment', paymentData)
  return data
}

export const getMyOrders = async () => {
  const { data } = await axiosInstance.get('/orders/my-orders')
  return data
}

export const getOrderById = async (id) => {
  const { data } = await axiosInstance.get(`/orders/${id}`)
  return data
}