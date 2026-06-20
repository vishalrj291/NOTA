import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
  }
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const wordReveal = {
  hidden: { opacity: 0, y: 60 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function HeroSection({ onJoinClick }) {
  const headline = ['WE,',  'PEOPLE.']

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-paper bg-newsprint"
      aria-label="Hero section"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Constitution-inspired horizontal lines */}
        <div className="absolute inset-0 bg-constitution-lines opacity-60" />

        {/* Large circular motif from logo — top right */}
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full border border-charcoal/5" />
        <div className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full border border-charcoal/5" />
        <div className="absolute top-0 right-16 w-[240px] h-[240px] rounded-full border border-saffron/8" />

        {/* Bottom left circles */}
        <div className="absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full border border-charcoal/6" />

        {/* Decorative article fragments */}
        <div className="absolute top-24 left-8 md:left-16 opacity-[0.04] select-none">
          <p className="font-serif text-4xl font-bold text-charcoal leading-none">ARTICLE 19</p>
          <p className="font-body text-xs text-charcoal mt-1 max-w-[200px]">Protection of certain rights<br/>regarding freedom of speech...</p>
        </div>
        <div className="absolute bottom-32 right-8 md:right-16 opacity-[0.04] select-none text-right">
          <p className="font-serif text-4xl font-bold text-charcoal leading-none">ARTICLE 21</p>
          <p className="font-body text-xs text-charcoal mt-1 max-w-[180px]">Protection of life and<br/>personal liberty...</p>
        </div>

        {/* Saffron accent stripe */}
        <div className="absolute left-0 top-1/3 w-1 h-32 bg-saffron opacity-30" />
      </div>

      {/* Main Content */}
      <div className="section-container relative z-10 pt-32 pb-20">
        <div className="max-w-5xl">
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-px bg-saffron" />
            <span className="section-label">An Independent Citizen-Led Platform</span>
          </motion.div>

          {/* Hero Headline — staggered words */}
          <h1 className="font-display text-hero font-normal leading-none tracking-tight mb-8 text-charcoal">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                initial="hidden"
                animate="show"
                variants={wordReveal}
                className="inline-block mr-[0.2em]"
              >
                {word === 'PEOPLE.' ? (
                  <>
                    {'THE '}
                    <span className="relative">
                      PEOPLE
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-saffron origin-left"
                      />
                      .
                    </span>
                  </>
                ) : word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-xl md:text-2xl text-charcoal/60 font-light max-w-2xl leading-relaxed mb-12 font-serif italic"
          >
            Democracy is strongest when citizens are informed.
          </motion.p>

          {/* Central tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm text-charcoal/50 max-w-lg mb-12 leading-relaxed"
          >
            NOTA Speaks is an independent platform for Legal Awareness, Civic Education, 
            Constitutional Literacy, and Active Citizenship. Because an informed citizen 
            is the king of a democracy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <button
              onClick={onJoinClick}
              className="btn-primary text-sm"
              aria-label="Join NOTA Speaks movement"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-10 pt-8 border-t border-charcoal/10"
          >
            {[
              { num: '50K+', label: 'Citizens Reached' },
              { num: '12', label: 'States Covered' },
              { num: '200+', label: 'Institutions' },
              { num: '6', label: 'Focus Areas' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-serif text-3xl font-bold text-charcoal">{num}</p>
                <p className="text-xs text-charcoal/50 mt-0.5 tracking-wide">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-caps uppercase text-charcoal/30 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-charcoal/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
