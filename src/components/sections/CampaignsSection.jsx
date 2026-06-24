import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../../lib/axios'

const defaultCampaigns = [
  {
    _id: '1',
    number: '01',
    tag: 'Completed',
    tagColor: '#16a34a',
    title: 'Know Your Rights',
    desc: 'A nationwide digital campaign educating citizens about fundamental legal rights — from FIR procedures to tenant protections.',
    story: 'Every day, thousands of Indians lose their rights simply because they don\'t know they have them.',
    stats: [{ label: 'Citizens Reached', value: '5K+' }, { label: 'States', value: '12' }],
    color: '#E8861A',
    category: 'Legal Rights',
  },
  {
    _id: '2',
    number: '02',
    tag: 'Completed',
    tagColor: '#6b7280',
    title: 'Digital Safety Week',
    desc: 'A week-long initiative on cyber safety: phishing, data privacy, safe social media usage, and reporting online harassment.',
    story: 'India adds 25 million new internet users every year. Most of them are unaware of basic digital safety.',
    stats: [{ label: 'Universities', value: '8' }, { label: 'Workshops', value: '25+' }],
    color: '#0D1B2A',
    category: 'Cyber Safety',
  },
  {
    _id: '3',
    number: '03',
    tag: 'Upcoming',
    tagColor: '#2563eb',
    title: 'Policy Decoded',
    desc: 'Breaking down complex government policies into digestible content — from education budgets to employment schemes.',
    story: 'When citizens understand policy, they can hold policymakers accountable.',
    stats: [{ label: 'Policies Covered', value: '30+' }, { label: 'Target Reach', value: '100K' }],
    color: '#E8861A',
    category: 'Governance',
  },
  {
    _id: '4',
    number: '04',
    tag: 'Completed',
    tagColor: '#16a34a',
    title: 'First Vote, Informed Vote',
    desc: 'Empowering first-time voters with non-partisan information about electoral processes and the power of informed civic participation.',
    story: 'India\'s youth are the world\'s largest voting bloc. Their informed choice shapes the nation.',
    stats: [{ label: 'First-time Voters', value: '75K+' }, { label: 'Colleges', value: '200+' }],
    color: '#0D1B2A',
    category: 'Civic Action',
  },
  {
    _id: '5',
    number: '05',
    tag: 'Completed',
    tagColor: '#6b7280',
    title: 'RTI for Everyone',
    desc: 'Demystifying the Right to Information Act. Teaching citizens how to file RTI applications and use transparency as a civic tool.',
    story: 'The RTI is one of India\'s most powerful laws — and one of the least used by ordinary citizens.',
    stats: [{ label: 'RTI Guides', value: '20+' }, { label: 'Queries Helped', value: '5K+' }],
    color: '#E8861A',
    category: 'Transparency',
  },
]

function normalizeCampaigns(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.campaigns)) return data.campaigns
  if (Array.isArray(data?.items)) return data.items
  return []
}

function CampaignCard({ campaign, index }) {
  const safeStats = Array.isArray(campaign?.stats) ? campaign.stats : []

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-white border border-charcoal/10 group hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col"
      style={{ borderTopColor: campaign?.color || '#E8861A', borderTopWidth: '3px' }}
      aria-label={`Campaign: ${campaign?.title || 'Campaign'}`}
    >
      <div
        className="absolute top-4 right-4 font-serif text-[5rem] font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:opacity-20"
        style={{ color: `${campaign?.color || '#E8861A'}12` }}
        aria-hidden="true"
      >
        {campaign?.number || String(index + 1).padStart(2, '0')}
      </div>

      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
        style={{ background: campaign?.color || '#E8861A' }}
        aria-hidden="true"
      />

      <div className="p-6 md:p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-[9px] font-semibold tracking-caps uppercase px-2 py-0.5"
            style={{
              color: campaign?.color || '#E8861A',
              background: `${campaign?.color || '#E8861A'}12`
            }}
          >
            {campaign?.category || 'Campaign'}
          </span>

          <span
            className="inline-flex items-center gap-1.5 text-[9px] font-semibold tracking-caps uppercase px-2 py-0.5"
            style={{
              color: campaign?.tagColor || '#E8861A',
              background: `${campaign?.tagColor || '#E8861A'}12`
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {campaign?.tag || campaign?.status || 'Active'}
          </span>
        </div>

        <p className="text-xs text-charcoal/45 italic mb-3 leading-relaxed font-serif">
          "{campaign?.story || 'Every campaign begins with awareness and action.'}"
        </p>

        <h3 className="font-serif text-xl font-bold text-charcoal mb-3 leading-snug group-hover:text-opacity-90 transition-colors">
          {campaign?.title || 'Untitled Campaign'}
        </h3>

        <p className="text-sm text-charcoal/60 leading-relaxed flex-1">
          {campaign?.desc || campaign?.description || 'Campaign details will be updated soon.'}
        </p>

        {safeStats.length > 0 && (
          <div className="flex gap-6 mt-5 pt-5 border-t border-charcoal/8">
            {safeStats.map((s, i) => (
              <div key={s?.label || i}>
                <p className="font-serif text-2xl font-bold" style={{ color: campaign?.color || '#E8861A' }}>
                  {s?.value || '-'}
                </p>
                <p className="text-[10px] text-charcoal/45 mt-0.5 tracking-wide">
                  {s?.label || 'Stat'}
                </p>
              </div>
            ))}
          </div>
        )}

        <Link
          to={`/campaigns/${campaign?._id || campaign?.id || index}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-editorial uppercase text-charcoal/60 hover:text-charcoal transition-colors duration-200 group/link"
        >
          Read the Story
          <svg
            className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.article>
  )
}

export default function CampaignsSection() {
  const [campaigns, setCampaigns] = useState(defaultCampaigns)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  useEffect(() => {
    api.get('/campaigns')
      .then((res) => {
        const campaignsFromApi = normalizeCampaigns(res.data)

        if (campaignsFromApi.length > 0) {
          setCampaigns(campaignsFromApi)
        }
      })
      .catch(() => {
        setCampaigns(defaultCampaigns)
      })
  }, [])

  const safeCampaigns = Array.isArray(campaigns) ? campaigns : defaultCampaigns

  return (
    <section id="campaigns" className="py-24 md:py-32 bg-paper-50 relative overflow-hidden" aria-labelledby="campaigns-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-constitution-lines opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-charcoal/8" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-charcoal/8" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="section-label block mb-3">Making an Impact</span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 id="campaigns-heading" className="section-title max-w-xl">
              Campaigns That Move India
            </h2>

            <p className="text-charcoal/55 max-w-xs leading-relaxed text-sm md:text-right">
              Each campaign is a chapter in India's civic awakening. Stories of awareness, action, and change.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {safeCampaigns.map((c, i) => (
            <CampaignCard key={c?._id || c?.id || i} campaign={c} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-charcoal/40 text-sm mb-1 font-serif italic">
            "Change begins when citizens demand it."
          </p>
        </motion.div>
      </div>
    </section>
  )
}