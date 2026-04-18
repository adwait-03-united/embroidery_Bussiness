import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'
import PrivateRoute from './components/layout/PrivateRoute'

const Home     = lazy(() => import('./pages/Home'))
const Shop     = lazy(() => import('./pages/Shop'))
const Product  = lazy(() => import('./pages/Product'))
const About    = lazy(() => import('./pages/About'))
const Login    = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile  = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#c8a97e] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index                        element={<Home />} />
          <Route path="shop"                  element={<Shop />} />
          <Route path="collections/:category" element={<Shop />} />
          <Route path="product/:slug"         element={<Product />} />
          <Route path="about"                 element={<About />} />
          <Route path="login"                 element={<Login />} />
          <Route path="register"              element={<Register />} />
          <Route path="profile"               element={
            <PrivateRoute><Profile /></PrivateRoute>
          } />
          <Route path="*"                     element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}