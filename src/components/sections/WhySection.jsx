import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.7.7m14.16 14.16l.7.7M1 12h1m20 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M9 12a3 3 0 106 0 3 3 0 00-6 0z"/>
      </svg>
    ),
    label: 'Legal Awareness',
    title: 'Know Your Rights',
    desc: 'Every citizen has rights guaranteed by the Constitution. We make them understandable — from FIR procedures to tenant protections, RTI applications to consumer rights.',
    accent: '#E8861A',
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
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
      </svg>
    ),
    label: 'Active Citizenship',
    title: 'Be the Change',
    desc: 'Citizenship is not passive. Voting, engaging with public policy, holding representatives accountable, and participating in democracy — these are responsibilities, not just rights.',
    accent: '#0D1B2A',
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
    <section id="why" className="py-24 md:py-32 bg-paper-50 relative overflow-hidden" aria-labelledby="why-heading">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full border border-charcoal/5 translate-x-1/2 -translate-y-1/2" aria-hidden="true" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label block mb-3">Why NOTA Speaks</span>
          <div className="flex items-end gap-6">
            <h2 id="why-heading" className="section-title max-w-2xl">
              The Pillars of an Informed Democracy
            </h2>
            <div className="hidden md:block flex-1 h-px bg-charcoal/10 mb-3" />
          </div>
          <p className="mt-4 text-charcoal/60 max-w-xl leading-relaxed">
            We believe in four fundamentals that transform citizens from spectators into participants.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <CardReveal key={card.label} delay={i * 0.1}>
              <article
                className="civic-card group relative overflow-hidden cursor-default h-full"
                aria-label={card.label}
              >
                {/* Accent bar */}
                <div
                  className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: card.accent }}
                  aria-hidden="true"
                />

                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{ color: card.accent, border: `1px solid ${card.accent}20`, background: `${card.accent}08` }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <span className="section-label text-[10px]" style={{ color: card.accent }}>{card.label}</span>
                    <h3 className="font-serif text-xl font-bold text-charcoal mt-0.5">{card.title}</h3>
                  </div>
                </div>

                <p className="text-charcoal/60 text-sm leading-relaxed">{card.desc}</p>

                {/* Subtle quote mark */}
                <div className="absolute bottom-4 right-4 font-serif text-6xl text-charcoal/5 leading-none select-none" aria-hidden="true">"</div>
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
          <p className="font-serif text-2xl italic text-charcoal/40">
            "An informed citizen is the king of a democracy."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
