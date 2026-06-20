import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Why NOTA', href: '#why' },
  { label: 'Vision', href: '#vision' },
  { label: 'Campaigns', href: '#campaigns' },
  { label: 'Knowledge', href: '#knowledge' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onJoinClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scroll > 50)
      setScrollProgress(docHeight > 0 ? (scroll / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-paper/95 backdrop-blur-sm border-b border-black/10 shadow-sm'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-saffron transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-[70px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="NOTA Speaks — Home">
              <img
                src="/logo.jpeg"
                alt="NOTA Speaks Logo"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-saffron/30 group-hover:ring-saffron/60 transition-all duration-300"
              />
              <div className="hidden sm:block">
                <span className="block font-serif text-lg font-bold text-charcoal leading-none tracking-tight">
                  NOTA Speaks
                </span>
                <span className="block text-[10px] tracking-caps text-muted uppercase font-medium">
                  A Citizen. A Voice. A Nation.
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs font-semibold uppercase tracking-editorial text-charcoal/70 hover:text-charcoal transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={onJoinClick}
                className="btn-primary text-xs hidden sm:inline-flex"
                aria-label="Join NOTA Speaks"
              >
                Join Us
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Hamburger */}
              <button
                className="lg:hidden flex flex-col justify-center gap-1.5 w-9 h-9 relative"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <motion.span
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                  className="block h-0.5 w-5 bg-charcoal origin-center transition-all"
                />
                <motion.span
                  animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 8 : 0 }}
                  className="block h-0.5 w-5 bg-charcoal"
                />
                <motion.span
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                  className="block h-0.5 w-5 bg-charcoal origin-center"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-paper flex flex-col"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div className="section-container pt-24 pb-12 flex flex-col h-full">
              {/* Decorative lines */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-charcoal via-saffron to-charcoal opacity-20" />

              <nav className="flex-1 flex flex-col justify-center gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="py-4 border-b border-black/6 flex items-center justify-between group"
                  >
                    <span className="font-serif text-2xl text-charcoal group-hover:text-saffron transition-colors">
                      {link.label}
                    </span>
                    <svg className="w-5 h-5 text-charcoal/30 group-hover:text-saffron group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8"
              >
                <button
                  onClick={() => { setMenuOpen(false); onJoinClick?.() }}
                  className="btn-primary w-full justify-center text-sm"
                >
                  Join NOTA Speaks
                </button>
                <p className="text-center text-xs text-muted mt-6 font-medium tracking-editorial uppercase">
                  +91 70047 76949
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
