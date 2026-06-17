import axiosInstance from './axiosInstance.js'

export const loginUser = async ({ email, password }) => {
  const { data } = await axiosInstance.post('/auth/login', { email, password })
  return data
}

export const registerUser = async ({ name, email, password }) => {
  const { data } = await axiosInstance.post('/auth/register', { name, email, password })
  return data
}

export const getUserProfile = async () => {
  const { data } = await axiosInstance.get('/auth/profile')
  return data
}

export const updateUserProfile = async (profileData) => {
  const { data } = await axiosInstance.put('/auth/profile', profileData)
  return data
}