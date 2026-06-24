import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import { AuthProvider } from './store/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/ui/LoadingScreen'
import JoinModal from './components/sections/JoinModal'

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'))
const CampaignDetail = lazy(() => import('./pages/CampaignDetail'))
const AdminLogin = lazy(() => import('./admin/AdminLogin'))
const AdminLayout = lazy(() => import('./admin/AdminLayout'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const [joinOpen, setJoinOpen] = useState(false)

  return (
    <>
      {!isAdmin && <Navbar onJoinClick={() => setJoinOpen(true)} />}
      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home onJoinClick={() => setJoinOpen(true)} />} />
            <Route path="/campaigns/:id" element={<CampaignDetail onJoinClick={() => setJoinOpen(true)} />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      {!isAdmin && <Footer />}
      {!isAdmin && <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
