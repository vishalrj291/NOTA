import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import api from '../lib/axios'

const defaultCampaigns = {
  '1': {
    _id: '1',
    title: 'Know Your Rights',
    status: 'Active Campaign',
    description: 'A nationwide digital campaign educating citizens about fundamental legal rights — from FIR procedures to tenant protections, from filing complaints to understanding bail rights. Every citizen of India has rights guaranteed by the Constitution. The problem is that most people don\'t know what those rights are or how to exercise them.\n\nKnow Your Rights breaks down complex legal provisions into simple, actionable guides. We cover everything from how to file an FIR correctly, what your rights are during police custody, how to approach consumer disputes, and what your fundamental rights as guaranteed by Articles 12–35 of the Constitution actually mean in daily life.',
    stats: [{ label: 'Citizens Reached', value: '50K+' }, { label: 'States', value: '12' }],
  },
  '2': {
    _id: '2',
    title: 'Digital Safety Week',
    status: 'Completed',
    description: 'A week-long initiative on cyber safety: phishing, data privacy, safe social media usage, and reporting online harassment. As India\'s digital population crosses 800 million, online threats have become as real as physical ones. Digital Safety Week equipped students, professionals, and citizens with practical tools to stay safe online.',
    stats: [{ label: 'Universities', value: '8' }, { label: 'Workshops', value: '25+' }],
  },
  '3': {
    _id: '3',
    title: 'Policy Decoded',
    status: 'Upcoming',
    description: 'Breaking down complex government policies into digestible content — from education budgets to employment schemes, from healthcare initiatives to environmental regulations. Policy Decoded makes governance transparent and accessible.',
    stats: [{ label: 'Policies Covered', value: '30+' }, { label: 'Target Reach', value: '100K' }],
  },
  '4': {
    _id: '4',
    title: 'First Vote, Informed Vote',
    status: 'Active Campaign',
    description: 'Empowering first-time voters with non-partisan information about electoral processes and the power of informed civic participation. Understanding how elections work, what the Election Commission does, and how to register as a voter are rights every young Indian deserves to know.',
    stats: [{ label: 'First-time Voters', value: '75K+' }, { label: 'Colleges', value: '200+' }],
  },
  '5': {
    _id: '5',
    title: 'RTI for Everyone',
    status: 'Active Campaign',
    description: 'Demystifying the Right to Information Act. Teaching citizens how to file RTI applications and use transparency as a civic tool. The RTI Act 2005 is one of the most powerful tools any Indian citizen has — yet most people don\'t know how to use it. RTI for Everyone walks you through the entire process: what information you can request, how to write an RTI, what to do if your RTI is rejected, and how to file an appeal.',
    stats: [{ label: 'RTI Guides', value: '20+' }, { label: 'Queries Helped', value: '5K+' }],
  },
}

export default function CampaignDetail({ onJoinClick }) {
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(`/campaigns/${id}`)
      .then(res => { setCampaign(res.data); setLoading(false) })
      .catch(() => {
        // Use default data if API fails
        const fallback = defaultCampaigns[id]
        if (fallback) { setCampaign(fallback); setLoading(false) }
        else { setError(true); setLoading(false) }
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="flex gap-1.5">
        {[0,1,2].map(i => (
          <motion.div key={i} className="w-2 h-2 rounded-full bg-saffron"
            animate={{ y: [0,-8,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }}
          />
        ))}
      </div>
    </div>
  )

  if (error || !campaign) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper text-center p-8">
      <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">Campaign Not Found</h1>
      <p className="text-charcoal/60 mb-8">This campaign doesn't exist or has been removed.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  )

  const statusColor = campaign.status === 'Active Campaign' || campaign.status === 'active' ? '#16a34a'
    : campaign.status === 'Completed' || campaign.status === 'completed' ? '#6b7280' : '#2563eb'

  return (
    <>
      <Helmet>
        <title>{campaign.title} — NOTA Speaks</title>
        <meta name="description" content={campaign.description?.slice(0, 160)} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Hero */}
        <div className="pt-24 pb-0 bg-charcoal relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #fff, #fff 1px, transparent 1px, transparent 50px)' }}
            aria-hidden="true"
          />
          <div className="section-container py-16 relative z-10">
            <Link to="/#campaigns" className="inline-flex items-center gap-2 text-xs font-semibold tracking-editorial uppercase text-paper/50 hover:text-saffron transition-colors mb-8">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Campaigns
            </Link>

            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-caps uppercase mb-4 px-2.5 py-1"
              style={{ color: statusColor, background: `${statusColor}20` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {campaign.status || 'Active Campaign'}
            </span>

            <h1 className="font-serif text-display font-bold text-paper leading-tight mb-6 max-w-3xl">
              {campaign.title}
            </h1>

            {campaign.stats && campaign.stats.length > 0 && (
              <div className="flex flex-wrap gap-8 pt-6 border-t border-white/10">
                {campaign.stats.map((s, i) => (
                  <div key={i}>
                    <p className="font-serif text-2xl font-bold text-saffron">{s.value}</p>
                    <p className="text-xs text-paper/50 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {campaign.bannerUrl && (
            <div className="section-container pb-0">
              <img
                src={campaign.bannerUrl}
                alt={`${campaign.title} banner`}
                className="w-full max-h-80 object-cover"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-paper py-16">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="civic-divider" />
                <h2 className="font-serif text-2xl font-bold text-charcoal mb-6">About This Campaign</h2>
                <div className="space-y-4 text-charcoal/70 leading-relaxed">
                  {campaign.description?.split('\n\n').map((para, i) => (
                    <p key={i} className="text-base leading-relaxed">{para}</p>
                  ))}
                </div>

                {campaign.gallery && campaign.gallery.length > 0 && (
                  <div className="mt-10">
                    <h3 className="font-serif text-xl font-bold text-charcoal mb-4">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {campaign.gallery.map((img, i) => (
                        <img key={i} src={img} alt={`Campaign image ${i + 1}`}
                          className="w-full aspect-video object-cover border border-charcoal/10"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside>
                <div className="bg-white border border-charcoal/10 p-6 sticky top-24">
                  <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Get Involved</h3>
                  <p className="text-sm text-charcoal/60 mb-6 leading-relaxed">
                    Support this campaign and help spread civic awareness across India.
                  </p>
                  <button
                    onClick={onJoinClick}
                    className="btn-primary w-full justify-center text-xs mb-3"
                  >
                    Join NOTA Speaks
                  </button>
                  <Link to="/" className="btn-secondary w-full justify-center text-xs">
                    View All Campaigns
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
