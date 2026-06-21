import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import KnowledgeModal from './KnowledgeModal'

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
    emoji: '⚖️',
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
    emoji: '📄',
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
    emoji: '🛡️',
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
    emoji: '🔐',
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
    emoji: '📜',
  },
  {
    id: 'legal-awareness',
    title: 'Legal Awareness',
    desc: 'FIR procedures, bail, legal aid, labour laws, property rights — law for everyday life.',
    count: '20+ Guides',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/>
      </svg>
    ),
    color: '#0D1B2A',
    bg: 'bg-navy/5',
    border: 'border-navy/15 hover:border-navy/40',
    emoji: '🏛️',
  },
  {
    id: 'civic-participation',
    title: 'Civic Participation',
    desc: 'Voting, holding representatives accountable, RTI, grievance filing — your democratic power.',
    count: '10+ Guides',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
      </svg>
    ),
    color: '#E8861A',
    bg: 'bg-saffron/5',
    border: 'border-saffron/20 hover:border-saffron/50',
    emoji: '🗳️',
  },
  {
    id: 'paper-leak',
    title: 'Paper Leak Awareness',
    desc: 'Your rights as a student, how to report exam fraud, and fighting for fair examination systems.',
    count: '5+ Guides',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
      </svg>
    ),
    color: '#0D1B2A',
    bg: 'bg-navy/5',
    border: 'border-navy/15 hover:border-navy/40',
    emoji: '📚',
  },
]

export default function KnowledgeSection() {
  const [activeTopicId, setActiveTopicId] = useState(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <>
      <section id="knowledge" className="py-24 md:py-32 bg-paper relative overflow-hidden" aria-labelledby="knowledge-heading">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-constitution-lines opacity-50" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-saffron/8 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border border-charcoal/5 -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="section-container relative z-10">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <span className="section-label block mb-3">Knowledge Hub</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 id="knowledge-heading" className="section-title max-w-xl">
                Eight Pillars of Civic Knowledge
              </h2>
              <p className="text-charcoal/55 max-w-xs leading-relaxed text-sm md:text-right">
                Click any card to explore complete guides, real examples, and actionable steps.
              </p>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setActiveTopicId(cat.id)}
                  className={`w-full text-left block p-6 border bg-white ${cat.border} transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron`}
                  aria-label={`Explore ${cat.title} — ${cat.count}`}
                  id={`knowledge-${cat.id}`}
                >
                  {/* Accent top bar */}
                  <div
                    className="h-[3px] w-0 group-hover:w-full transition-all duration-500 mb-4 -mt-6 -mx-6 rounded-none"
                    style={{ background: cat.color }}
                    aria-hidden="true"
                  />

                  <div
                    className={`w-12 h-12 ${cat.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}
                    style={{ color: cat.color }}
                  >
                    {cat.icon}
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-base font-bold text-charcoal leading-snug">
                      {cat.title}
                    </h3>
                    <span
                      className="text-[9px] font-semibold tracking-wide px-2 py-0.5 flex-shrink-0 ml-2 whitespace-nowrap"
                      style={{ color: cat.color, background: `${cat.color}12` }}
                    >
                      {cat.count}
                    </span>
                  </div>

                  <p className="text-xs text-charcoal/55 leading-relaxed mb-4">{cat.desc}</p>

                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-editorial uppercase transition-all duration-200"
                    style={{ color: cat.color }}
                  >
                    Explore
                    <svg
                      className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-200"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Coming soon note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 p-4 border border-dashed border-charcoal/15 text-center"
          >
            <p className="text-sm text-charcoal/50">
              <span className="font-semibold text-charcoal/65">More topics coming soon.</span>{' '}
              The Knowledge Hub is continuously expanding.{' '}
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-saffron hover:underline font-medium"
              >
                Suggest a topic →
              </button>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Knowledge Modal */}
      <KnowledgeModal
        topicId={activeTopicId}
        onClose={() => setActiveTopicId(null)}
      />
    </>
  )
}
