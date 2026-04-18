import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE_URL || ''

// Mock user database (remove when backend is ready)
const MOCK_USERS = [
  { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123' }
]

export const loginUser = async ({ email, password }) => {
  // --- MOCK (swap with real call below when backend ready) ---
  await new Promise(r => setTimeout(r, 800)) // simulate network delay
  const user = MOCK_USERS.find(u => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid email or password')
  const { password: _, ...safeUser } = user
  return { user: safeUser, token: 'mock-jwt-token-' + user.id }

  // --- REAL (uncomment when backend ready) ---
  // const { data } = await axios.post(`${BASE}/auth/login`, { email, password })
  // return data
}

export const registerUser = async ({ name, email, password }) => {
  // --- MOCK ---
  await new Promise(r => setTimeout(r, 800))
  const exists = MOCK_USERS.find(u => u.email === email)
  if (exists) throw new Error('An account with this email already exists')
  const newUser = { id: Date.now(), name, email }
  return { user: newUser, token: 'mock-jwt-token-' + newUser.id }

  // --- REAL ---
  // const { data } = await axios.post(`${BASE}/auth/register`, { name, email, password })
  // return data
}

export const getUserProfile = async (token) => {
  // --- REAL ---
  // const { data } = await axios.get(`${BASE}/auth/profile`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // })
  // return data
}