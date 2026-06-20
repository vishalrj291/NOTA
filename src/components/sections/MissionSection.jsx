import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const missions = [
  {
    id: 1,
    tag: 'Education',
    title: 'Legal Education for All',
    short: 'Make legal knowledge accessible to every citizen, regardless of their background or education level.',
    detail: 'We create simplified, jargon-free content on everything from filing an FIR to understanding RTI, from consumer protection laws to digital rights — in formats that work for students, professionals, and everyone in between.',
    color: '#E8861A',
  },
  {
    id: 2,
    tag: 'Civic Action',
    title: 'Activate Democratic Participation',
    short: 'Transform passive citizens into active participants who understand and exercise their democratic rights.',
    detail: 'We educate citizens about elections, public consultation processes, grievance redressal systems, and constitutional remedies — empowering them to participate meaningfully in every level of democracy.',
    color: '#0D1B2A',
  },
  {
    id: 3,
    tag: 'Research',
    title: 'Policy Awareness and Analysis',
    short: 'Decode complex government policies into clear, understandable information that citizens can act on.',
    detail: 'From education policy to employment schemes, from digital regulations to environmental laws — we analyze policies and explain their real-world impact on ordinary citizens\' lives.',
    color: '#E8861A',
  },
  {
    id: 4,
    tag: 'Community',
    title: 'Build a Civic Network',
    short: 'Connect lawyers, educators, researchers, students, and activists into a unified force for civic change.',
    detail: 'NOTA Speaks is building India\'s largest network of civic-minded citizens — people who believe that awareness is the first step toward a stronger, more just democracy.',
    color: '#0D1B2A',
  },
  {
    id: 5,
    tag: 'Digital',
    title: 'Digital Rights & Cyber Safety',
    short: 'Equip citizens to protect themselves in digital spaces and understand their online rights.',
    detail: 'As India\'s digital population grows, so do threats. We educate citizens on data privacy, cybercrime, digital regulations, and safe online practices — rights that matter as much as physical ones.',
    color: '#E8861A',
  },
  {
    id: 6,
    tag: 'Constitution',
    title: 'Constitutional Literacy First',
    short: 'Every citizen should know, understand, and be able to invoke the Constitution of India.',
    detail: 'Our Constitution is 75+ years of collective wisdom, struggle, and aspiration. We make Fundamental Rights, Directive Principles, and constitutional amendments understandable and memorable for every Indian.',
    color: '#0D1B2A',
  },
]

function MissionCard({ mission, index }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="border border-charcoal/10 bg-white relative overflow-hidden group"
      aria-label={mission.title}
    >
      {/* Left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: mission.color }}
        aria-hidden="true"
      />

      <div className="pl-6 pr-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span
              className="inline-block text-[10px] font-semibold tracking-caps uppercase mb-2 px-2 py-0.5"
              style={{ color: mission.color, background: `${mission.color}12` }}
            >
              {mission.tag}
            </span>
            <h3 className="font-serif text-lg font-bold text-charcoal mb-2 leading-snug">
              {mission.title}
            </h3>
            <p className="text-sm text-charcoal/60 leading-relaxed">{mission.short}</p>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 w-8 h-8 border border-charcoal/15 flex items-center justify-center hover:border-charcoal/40 transition-colors mt-1"
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <motion.svg
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-3.5 h-3.5 text-charcoal"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </motion.svg>
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-4 pt-4 border-t border-charcoal/8 text-sm text-charcoal/70 leading-relaxed">
                {mission.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export default function MissionSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="mission" className="py-24 md:py-32 bg-paper relative" aria-labelledby="mission-heading">
      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label block mb-3">Our Mission</span>
          <h2 id="mission-heading" className="section-title max-w-2xl">
            What We Are Here to Do
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-xl leading-relaxed">
            Six interconnected missions that together build a more informed, more just, more democratic India.
            Click any card to learn more.
          </p>
        </motion.div>

        {/* Mission cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.map((m, i) => (
            <MissionCard key={m.id} mission={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
