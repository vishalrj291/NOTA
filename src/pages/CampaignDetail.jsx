import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import api from '../lib/axios'
import Navbar from '../components/layout/Navbar'
import { useState as useModalState } from 'react'
import JoinModal from '../components/sections/JoinModal'

export default function CampaignDetail() {
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(`/campaigns/${id}`)
      .then(res => { setCampaign(res.data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
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
        <meta name="description" content={campaign.description || campaign.desc} />
      </Helmet>

      <Navbar onJoinClick={() => setJoinOpen(true)} />

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
                    <p className="font-serif text-2xl font-bold text-paper">{s.value}</p>
                    <p className="text-xs text-paper/50 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Banner image */}
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
                <div className="prose text-charcoal/70 leading-relaxed">
                  <p className="text-base leading-relaxed">{campaign.description || campaign.desc}</p>
                </div>

                {/* Gallery */}
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
                  <button onClick={() => setJoinOpen(true)} className="btn-primary w-full justify-center text-xs mb-3">
                    Join NOTA Speaks
                  </button>
                  <Link to="/#campaigns" className="btn-secondary w-full justify-center text-xs">
                    View All Campaigns
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </motion.div>

      <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  )
}
