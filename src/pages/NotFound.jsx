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
        className="min-h-screen bg-paper flex items-center justify-center relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-constitution-lines opacity-60 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-8 left-8 w-3 h-3 rounded-full border-2 border-saffron/25 bg-saffron/10" aria-hidden="true" />
        <div className="absolute top-8 right-8 w-3 h-3 rounded-full border-2 border-saffron/25 bg-saffron/10" aria-hidden="true" />

        <div className="text-center px-6 relative z-10">
          {/* Large 404 watermark */}
          <p className="font-serif text-[10rem] md:text-[16rem] font-black text-charcoal/[0.05] leading-none select-none" aria-hidden="true">
            404
          </p>

          {/* Content */}
          <div className="-mt-12 md:-mt-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-saffron" />
              <span className="section-label">Page Not Found</span>
              <div className="w-8 h-px bg-saffron" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
              This page doesn't exist
            </h1>
            <p className="text-charcoal/55 mb-10 max-w-md mx-auto leading-relaxed">
              The page you're looking for has moved or never existed. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary">
                Back to Home
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l6-6M3 12l6 6" />
                </svg>
              </Link>
              <Link to="/#knowledge" className="btn-secondary">
                Knowledge Hub
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
