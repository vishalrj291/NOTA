import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — Page Not Found | NOTA Speaks</title></Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-paper flex items-center justify-center"
      >
        <div className="text-center px-6">
          <p className="font-serif text-[12rem] font-bold text-charcoal/5 leading-none select-none" aria-hidden="true">404</p>
          <h1 className="font-serif text-4xl font-bold text-charcoal -mt-16 mb-4">Page Not Found</h1>
          <p className="text-charcoal/60 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. Perhaps you were looking for our campaigns or knowledge hub?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/#campaigns" className="btn-secondary">View Campaigns</Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}
