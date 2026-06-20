import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../store/AuthContext'
import api from '../lib/axios'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password is required'),
})

export default function AdminLogin() {
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    setError('')
    try {
      const res = await api.post('/auth/login', data)
      login(res.data.token, res.data.admin)
      navigate('/admin')
    } catch (e) {
      setError(e.response?.data?.message || 'Invalid credentials. Please try again.')
    }
  }

  return (
    <>
      <Helmet><title>Admin Login — NOTA Speaks</title></Helmet>
      <div className="min-h-screen bg-navy flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-paper p-10"
        >
          <div className="text-center mb-8">
            <img src="/logo.jpeg" alt="NOTA Speaks" className="w-12 h-12 rounded-full object-cover mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold text-charcoal">Admin Login</h1>
            <p className="text-xs text-charcoal/50 mt-1">NOTA Speaks Dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="form-label">Email</label>
              <input {...register('email')} id="admin-email" type="email" placeholder="admin@notaspeaks.org" className="form-input" />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="admin-password" className="form-label">Password</label>
              <input {...register('password')} id="admin-password" type="password" placeholder="••••••••" className="form-input" />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>
            {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 p-3">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
              {isSubmitting ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  )
}
