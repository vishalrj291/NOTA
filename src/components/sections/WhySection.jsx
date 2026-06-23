import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97z"/>
      </svg>
    ),
    label: 'Legal Awareness',
    title: 'Know Your Rights',
    desc: 'Every citizen has rights guaranteed by the Constitution. We make them understandable — from FIR procedures to tenant protections, RTI applications to consumer rights.',
    accent: '#E8861A',
    stat: '5K+',
    statLabel: 'Citizens Informed',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25"/>
      </svg>
    ),
    label: 'Constitutional Literacy',
    title: 'Understand the Constitution',
    desc: 'The Indian Constitution is the bedrock of democracy. We decode its articles, amendments, and fundamental rights into language every citizen can understand and use.',
    accent: '#0D1B2A',
    stat: '30+',
    statLabel: 'Articles Explained',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
      </svg>
    ),
    label: 'Civic Education',
    title: 'How Democracy Works',
    desc: 'How does Parliament function? What does your local representative do? How can you file a grievance? Civic education transforms passive observers into active participants.',
    accent: '#E8861A',
    stat: '200+',
    statLabel: 'Institutions Reached',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
      </svg>
    ),
    label: 'Active Citizenship',
    title: 'Be the Change',
    desc: 'Citizenship is not passive. Voting, engaging with public policy, holding representatives accountable — these are responsibilities, not just rights.',
    accent: '#0D1B2A',
    stat: '12',
    statLabel: 'States Covered',
  },
]

function CardReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function WhySection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="why" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--paper-50)' }} aria-labelledby="why-heading">
      {/* Rich background — noticeboard texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-constitution-lines opacity-60" />
        {/* Pushpin dots at corners — noticeboard effect */}
        <div className="absolute top-6 left-6 w-3 h-3 rounded-full border-2 border-saffron/25 bg-saffron/10" />
        <div className="absolute top-6 right-6 w-3 h-3 rounded-full border-2 border-saffron/25 bg-saffron/10" />
        <div className="absolute bottom-6 left-6 w-3 h-3 rounded-full border-2 border-charcoal/15 bg-charcoal/5" />
        <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full border-2 border-charcoal/15 bg-charcoal/5" />
        {/* Large background number */}
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 font-serif text-[20rem] font-black text-charcoal/[0.025] leading-none select-none">
          IV
        </div>
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label block mb-3">Why NOTA Speaks</span>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
            <h2 id="why-heading" className="section-title max-w-xl">
              The Pillars of an Informed Democracy
            </h2>
            <div className="hidden md:block flex-1 h-px bg-charcoal/10 mb-3" />
          </div>
          <p className="mt-4 text-charcoal/55 max-w-lg leading-relaxed text-sm">
            We believe in four fundamentals that transform citizens from spectators into participants.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <CardReveal key={card.label} delay={i * 0.1}>
              <article
                className="civic-card group relative overflow-hidden cursor-default h-full"
                aria-label={card.label}
              >
                {/* Accent bar top */}
                <div
                  className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: card.accent }}
                  aria-hidden="true"
                />

                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ color: card.accent, border: `1px solid ${card.accent}25`, background: `${card.accent}08` }}
                  >
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <span className="section-label text-[10px]" style={{ color: card.accent }}>{card.label}</span>
                    <h3 className="font-serif text-xl font-bold text-charcoal mt-0.5">{card.title}</h3>
                  </div>
                  {/* Stat */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-serif text-2xl font-bold" style={{ color: card.accent }}>{card.stat}</p>
                    <p className="text-[9px] text-charcoal/40 tracking-wide">{card.statLabel}</p>
                  </div>
                </div>

                <p className="text-charcoal/60 text-sm leading-relaxed">{card.desc}</p>

                {/* Decorative quote mark */}
                <div
                  className="absolute bottom-4 right-5 font-serif text-7xl text-charcoal/[0.04] leading-none select-none group-hover:text-opacity-10 transition-colors"
                  aria-hidden="true"
                >
                  "
                </div>
              </article>
            </CardReveal>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="font-serif text-xl md:text-2xl italic text-charcoal/35">
            "An informed citizen is the king of a democracy."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
