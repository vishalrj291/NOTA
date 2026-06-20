import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = [
  {
    id: 'fundamental-rights',
    title: 'Fundamental Rights',
    desc: 'Articles 12–35 of the Indian Constitution — the rights guaranteed to every citizen.',
    count: '6 Rights',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97z"/>
      </svg>
    ),
    color: '#E8861A',
    bg: 'bg-saffron/5',
    border: 'border-saffron/20 hover:border-saffron/50',
  },
  {
    id: 'rti',
    title: 'Right to Information',
    desc: 'How to file RTI applications and use transparency laws to hold authorities accountable.',
    count: '12 Guides',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
      </svg>
    ),
    color: '#0D1B2A',
    bg: 'bg-navy/5',
    border: 'border-navy/15 hover:border-navy/40',
  },
  {
    id: 'consumer-rights',
    title: 'Consumer Rights',
    desc: 'COPRA provisions, consumer courts, filing complaints, and getting justice as a consumer.',
    count: '8 Guides',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
      </svg>
    ),
    color: '#E8861A',
    bg: 'bg-saffron/5',
    border: 'border-saffron/20 hover:border-saffron/50',
  },
  {
    id: 'cyber-safety',
    title: 'Cyber Safety',
    desc: 'Online harassment, phishing, data privacy, cybercrime reporting — staying safe in digital spaces.',
    count: '15 Guides',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
      </svg>
    ),
    color: '#0D1B2A',
    bg: 'bg-navy/5',
    border: 'border-navy/15 hover:border-navy/40',
  },
  {
    id: 'constitution',
    title: 'Constitution Simplified',
    desc: 'Preamble, Articles, Amendments, and Schedules — the soul of India made accessible.',
    count: '30+ Articles',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25"/>
      </svg>
    ),
    color: '#E8861A',
    bg: 'bg-saffron/5',
    border: 'border-saffron/20 hover:border-saffron/50',
  },
  {
    id: 'legal-awareness',
    title: 'Legal Awareness',
    desc: 'FIR procedures, bail, legal aid, labour laws, property rights — law for everyday life.',
    count: '20+ Guides',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.7.7m14.16 14.16l.7.7M1 12h1m20 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M9 12a3 3 0 106 0 3 3 0 00-6 0z"/>
      </svg>
    ),
    color: '#0D1B2A',
    bg: 'bg-navy/5',
    border: 'border-navy/15 hover:border-navy/40',
  },
]

export default function KnowledgeSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="knowledge" className="py-24 md:py-32 bg-paper" aria-labelledby="knowledge-heading">
      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label block mb-3">Resources</span>
          <h2 id="knowledge-heading" className="section-title max-w-2xl">
            The Knowledge Hub
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-xl leading-relaxed">
            Six pillars of knowledge, designed for every citizen. Free, accessible, and always growing.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={`#knowledge-${cat.id}`}
                className={`block p-6 border bg-white ${cat.border} transition-all duration-300 hover:shadow-md hover:-translate-y-1 group`}
                aria-label={`${cat.title} — ${cat.count}`}
              >
                <div
                  className={`w-12 h-12 ${cat.bg} flex items-center justify-center mb-4 transition-colors`}
                  style={{ color: cat.color }}
                >
                  {cat.icon}
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-lg font-bold text-charcoal leading-snug">
                    {cat.title}
                  </h3>
                  <span
                    className="text-[10px] font-semibold tracking-wide px-2 py-0.5 flex-shrink-0 ml-2"
                    style={{ color: cat.color, background: `${cat.color}10` }}
                  >
                    {cat.count}
                  </span>
                </div>

                <p className="text-sm text-charcoal/60 leading-relaxed mb-4">{cat.desc}</p>

                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-editorial uppercase transition-colors"
                  style={{ color: cat.color }}
                >
                  Explore
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Coming soon note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 p-5 border border-dashed border-charcoal/15 bg-charcoal/2 text-center"
        >
          <p className="text-sm text-charcoal/50">
            <span className="font-semibold text-charcoal/70">More categories coming soon.</span> The Knowledge Hub is continuously expanding.
            <span className="text-saffron"> Suggest a topic →</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
