import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import api from '../../lib/axios'

const defaultFaqs = [
  {
    _id: '1',
    question: 'Is NOTA Speaks a political organization?',
    answer: 'No. NOTA Speaks is completely apolitical and non-partisan. We are not affiliated with, funded by, or aligned to any political party, ideology, or electoral candidate. Our only allegiance is to the Constitution of India and the citizens it protects. We focus exclusively on civic education, legal literacy, and constitutional awareness.',
  },
  {
    _id: '2',
    question: 'Who can join NOTA Speaks?',
    answer: 'Any citizen of India who believes in the power of awareness and democratic participation. Whether you are a student, lawyer, educator, researcher, professional, activist, or concerned citizen — NOTA Speaks is for you. There are no age, profession, or educational qualifications required.',
  },
  {
    _id: '3',
    question: 'How can I contribute to NOTA Speaks?',
    answer: 'There are many ways: you can join as a volunteer, contribute as a content creator, share your legal expertise, help organize campus awareness drives, spread our campaigns on social media, or simply engage with our content and share it with others. Click "Join Us" to get started.',
  },
  {
    _id: '4',
    question: 'Do I need legal knowledge to participate?',
    answer: 'Absolutely not. NOTA Speaks is designed for ordinary citizens, not just legal professionals. All our content is created to be understood by everyone. If you have legal expertise, that\'s a bonus — you can contribute your knowledge. If you don\'t, you\'re exactly who we\'re here for.',
  },
  {
    _id: '5',
    question: 'Is there a membership fee?',
    answer: 'No. NOTA Speaks is completely free to join and participate in. All our resources — guides, articles, videos, and campaigns — are freely accessible to every citizen. We believe civic education should never be behind a paywall.',
  },
  {
    _id: '6',
    question: 'How is NOTA Speaks funded?',
    answer: 'NOTA Speaks operates as an independent citizen-led initiative. We are transparent about our operations and do not accept funding from political entities, foreign organizations, or any source that could compromise our independence. Our focus remains solely on serving citizens.',
  },
  {
    _id: '7',
    question: 'Can I use NOTA Speaks content for educational purposes?',
    answer: 'Yes, with attribution. Our content is created for the benefit of citizens and society. You may use it for educational, non-commercial purposes with proper credit to NOTA Speaks. For any formal partnerships or large-scale usage, please contact us.',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-charcoal/10 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
        aria-expanded={open}
        aria-controls={`faq-answer-${faq._id}`}
        id={`faq-question-${faq._id}`}
      >
        <span className="font-serif text-base font-semibold text-charcoal group-hover:text-saffron transition-colors leading-snug">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-7 h-7 border border-charcoal/20 flex items-center justify-center mt-0.5 group-hover:border-saffron group-hover:text-saffron transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={`faq-answer-${faq._id}`}
            role="region"
            aria-labelledby={`faq-question-${faq._id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-charcoal/65 leading-relaxed max-w-2xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState(defaultFaqs)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  useEffect(() => {
    api.get('/faqs').then(res => {
  const data = Array.isArray(res.data)
    ? res.data
    : res.data?.data || res.data?.faqs || []

  if (Array.isArray(data) && data.length > 0) {
    setFaqs(data)
  }
}).catch(() => {})
  }, [])

  return (
    <section id="faq" className="py-24 md:py-32 bg-paper-50" aria-labelledby="faq-heading">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left — header */}
          <div>
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label block mb-3">Questions</span>
              <h2 id="faq-heading" className="section-title">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-charcoal/60 leading-relaxed">
                Everything you need to know about NOTA Speaks, our mission, and how you can be part of it.
              </p>
              <div className="mt-8">
                <a href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-editorial uppercase text-charcoal border-b border-charcoal/20 pb-0.5 hover:border-saffron hover:text-saffron transition-all"
                  onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                >
                  Still have questions? Contact us
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — FAQ list */}
          <div className="lg:col-span-2">
            {(Array.isArray(faqs) ? faqs : defaultFaqs).map((faq, i) => (
              <FAQItem key={faq._id} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
