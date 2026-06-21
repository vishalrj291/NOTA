import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}

const stats = [
  { num: '50K+', label: 'Citizens Reached' },
  { num: '12', label: 'States Covered' },
  { num: '200+', label: 'Institutions' },
  { num: '6', label: 'Focus Areas' },
]

export default function HeroSection({ onJoinClick }) {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      {/* ── Rich Background Layer ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Ruled paper lines — constitution inspired */}
        <div className="absolute inset-0 bg-constitution-lines opacity-70" />

        {/* Diagonal newsprint texture */}
        <div className="absolute inset-0 bg-newsprint" />

        {/* Large decorative Constitution article — top left */}
        <div className="absolute top-16 left-4 md:left-10 opacity-[0.06] select-none">
          <p className="font-serif text-[5rem] md:text-[8rem] font-black text-charcoal leading-none tracking-tighter">19</p>
          <p className="font-body text-[10px] text-charcoal mt-1 max-w-[180px] leading-relaxed">
            Right to Freedom<br/>of Speech & Expression<br/>— Constitution of India
          </p>
        </div>

        {/* Right side — Article 21 */}
        <div className="absolute top-24 right-4 md:right-12 opacity-[0.06] select-none text-right">
          <p className="font-serif text-[5rem] md:text-[8rem] font-black text-charcoal leading-none tracking-tighter">21</p>
          <p className="font-body text-[10px] text-charcoal mt-1 max-w-[160px] leading-relaxed">
            Protection of Life<br/>& Personal Liberty<br/>— Constitution of India
          </p>
        </div>

        {/* Bottom right fragment */}
        <div className="absolute bottom-20 left-8 md:left-16 opacity-[0.05] select-none">
          <p className="font-serif text-[3rem] md:text-[5rem] font-black text-charcoal leading-none tracking-tighter">51A</p>
          <p className="font-body text-[10px] text-charcoal mt-1 max-w-[180px] leading-relaxed">
            Fundamental Duties<br/>of every citizen
          </p>
        </div>

        {/* Saffron vertical accent */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 top-1/4 w-1 h-40 bg-saffron origin-top opacity-60"
        />

        {/* Circular motifs */}
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full border border-charcoal/[0.04]" />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full border border-saffron/[0.06]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full border border-charcoal/[0.04]" />

        {/* Horizontal divider lines — editorial */}
        <div className="absolute top-[28%] left-0 right-0 h-px bg-charcoal/[0.06]" />
        <div className="absolute top-[30%] left-0 right-[60%] h-px bg-saffron/20" />

        {/* Notice board push-pin dots */}
        <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-saffron/20" />
        <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-saffron/20" />
      </div>

      {/* ── Main Content ── */}
      <div className="section-container relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-5xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-saffron" />
            <span className="section-label">An Independent Citizen-Led Platform · Est. 2025</span>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={container} initial="hidden" animate="show">
            <h1 className="font-display text-hero font-normal leading-none tracking-tight text-charcoal mb-0">
              <motion.span variants={item} className="block">WE</motion.span>
              <motion.span variants={item} className="block">THE</motion.span>
              <motion.span variants={item} className="block relative inline-block">
                PEOPLE
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-3 left-0 right-0 h-[5px] bg-saffron origin-left"
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-saffron"
                >.</motion.span>
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-xl md:text-2xl text-charcoal/55 font-light max-w-xl leading-relaxed font-serif italic"
          >
            Democracy is strongest when citizens are informed, engaged, and unafraid to speak.
          </motion.p>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-5 text-sm text-charcoal/50 max-w-lg leading-relaxed"
          >
            NOTA Speaks is an independent platform for Legal Awareness, Civic Education, 
            Constitutional Literacy, and Active Citizenship — because an informed citizen 
            is the king of a democracy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 mb-16"
          >
            <button
              onClick={onJoinClick}
              className="btn-primary text-sm"
              aria-label="Join NOTA Speaks movement"
              id="hero-join-btn"
            >
              Join the Movement
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <a
              href="#campaigns"
              className="btn-secondary text-sm"
              onClick={e => { e.preventDefault(); document.querySelector('#campaigns')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Explore Campaigns
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-8 md:gap-12 pt-8 border-t border-charcoal/10"
          >
            {stats.map(({ num, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
              >
                <p className="font-serif text-3xl md:text-4xl font-bold text-charcoal leading-none">{num}</p>
                <p className="text-[11px] text-charcoal/45 mt-1.5 tracking-caps uppercase font-medium">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-caps uppercase text-charcoal/30 font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-saffron/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
