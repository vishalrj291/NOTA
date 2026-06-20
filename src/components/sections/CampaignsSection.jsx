import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../../lib/axios'

const defaultCampaigns = [
  {
    _id: '1',
    number: '01',
    tag: 'Active Campaign',
    tagColor: '#16a34a',
    title: 'Know Your Rights',
    desc: 'A nationwide digital campaign educating citizens about fundamental legal rights — from FIR procedures to tenant protections.',
    stats: [{ label: 'Citizens Reached', value: '50K+' }, { label: 'States', value: '12' }],
    color: '#E8861A',
  },
  {
    _id: '2',
    number: '02',
    tag: 'Completed',
    tagColor: '#6b7280',
    title: 'Digital Safety Week',
    desc: 'A week-long initiative on cyber safety: phishing, data privacy, safe social media usage, and reporting online harassment.',
    stats: [{ label: 'Universities', value: '8' }, { label: 'Workshops', value: '25+' }],
    color: '#0D1B2A',
  },
  {
    _id: '3',
    number: '03',
    tag: 'Upcoming',
    tagColor: '#2563eb',
    title: 'Policy Decoded',
    desc: 'Breaking down complex government policies into digestible content — from education budgets to employment schemes.',
    stats: [{ label: 'Policies Covered', value: '30+' }, { label: 'Target Reach', value: '100K' }],
    color: '#E8861A',
  },
  {
    _id: '4',
    number: '04',
    tag: 'Active Campaign',
    tagColor: '#16a34a',
    title: 'First Vote, Informed Vote',
    desc: 'Empowering first-time voters with non-partisan information about electoral processes and the power of informed civic participation.',
    stats: [{ label: 'First-time Voters', value: '75K+' }, { label: 'Colleges', value: '200+' }],
    color: '#0D1B2A',
  },
  {
    _id: '5',
    number: '05',
    tag: 'Active Campaign',
    tagColor: '#16a34a',
    title: 'RTI for Everyone',
    desc: 'Demystifying the Right to Information Act. Teaching citizens how to file RTI applications and use transparency as a civic tool.',
    stats: [{ label: 'RTI Guides', value: '20+' }, { label: 'Queries Helped', value: '5K+' }],
    color: '#E8861A',
  },
]

function CampaignCard({ campaign, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="scroll-snap-start flex-shrink-0 w-[320px] md:w-[380px] bg-white border border-charcoal/10 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      style={{ borderTopColor: campaign.color, borderTopWidth: '3px' }}
      aria-label={`Campaign: ${campaign.title}`}
    >
      {/* Campaign number watermark */}
      <div className="absolute top-4 right-4 font-serif text-7xl font-bold leading-none select-none"
        style={{ color: `${campaign.color}10` }} aria-hidden="true">
        {campaign.number || String(index + 1).padStart(2, '0')}
      </div>

      <div className="p-6 flex flex-col h-full min-h-[300px]">
        {/* Tag */}
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-caps uppercase mb-4 px-2 py-1 w-fit"
          style={{ color: campaign.tagColor || '#E8861A', background: `${campaign.tagColor || '#E8861A'}15` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {campaign.tag || campaign.status || 'Active'}
        </span>

        <h3 className="font-serif text-xl font-bold text-charcoal mb-3 leading-snug">
          {campaign.title}
        </h3>
        <p className="text-sm text-charcoal/60 leading-relaxed flex-1">
          {campaign.desc || campaign.description}
        </p>

        {/* Stats */}
        {campaign.stats && campaign.stats.length > 0 && (
          <div className="flex gap-6 mt-4 pt-4 border-t border-charcoal/8">
            {campaign.stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-xl font-bold text-charcoal">{s.value}</p>
                <p className="text-[10px] text-charcoal/50 mt-0.5 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          to={`/campaigns/${campaign._id}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-editorial uppercase text-charcoal hover:text-saffron transition-colors duration-200 group"
        >
          Read More
          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.article>
  )
}

export default function CampaignsSection() {
  const [campaigns, setCampaigns] = useState(defaultCampaigns)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const trackRef = useRef(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  useEffect(() => {
    api.get('/campaigns').then(res => {
      if (res.data?.length > 0) setCampaigns(res.data)
    }).catch(() => {})
  }, [])

  const checkScroll = () => {
    if (!trackRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' })
  }

  return (
    <section id="campaigns" className="py-24 md:py-32 bg-paper-50 overflow-hidden" aria-labelledby="campaigns-heading">
      <div className="section-container mb-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="section-label block mb-3">Making an Impact</span>
            <h2 id="campaigns-heading" className="section-title">Legal Awareness Campaigns</h2>
            <p className="mt-4 text-charcoal/60 max-w-lg leading-relaxed">
              Each campaign is a chapter in India's civic awakening. Scroll to explore our work.
            </p>
          </div>

          {/* Scroll controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className={`w-10 h-10 border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'border-charcoal/20 hover:border-charcoal hover:bg-charcoal hover:text-paper'
                  : 'border-charcoal/10 text-charcoal/20 cursor-not-allowed'
              }`}
              aria-label="Scroll campaigns left"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className={`w-10 h-10 border flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'border-charcoal/20 hover:border-charcoal hover:bg-charcoal hover:text-paper'
                  : 'border-charcoal/10 text-charcoal/20 cursor-not-allowed'
              }`}
              aria-label="Scroll campaigns right"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-snap-x px-6 md:px-12 lg:px-16 pb-4"
        role="list"
        aria-label="Campaign list — scroll horizontally"
      >
        {campaigns.map((c, i) => (
          <div key={c._id} role="listitem">
            <CampaignCard campaign={c} index={i} />
          </div>
        ))}
        {/* End spacer */}
        <div className="flex-shrink-0 w-6 md:w-12 lg:w-16" aria-hidden="true" />
      </div>

      {/* Mobile scroll hint */}
      <div className="section-container mt-4">
        <p className="text-xs text-charcoal/30 tracking-wide md:hidden">
          ← Swipe to explore all campaigns
        </p>
      </div>
    </section>
  )
}
