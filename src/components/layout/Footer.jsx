import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/axios'

const defaultSocials = [
  { platform: 'Instagram', url: 'https://instagram.com/notaspeaks', icon: 'instagram' },
  { platform: 'X (Twitter)', url: 'https://twitter.com/notaspeaks', icon: 'x' },
  { platform: 'YouTube', url: 'https://youtube.com/@notaspeaks', icon: 'youtube' },
  { platform: 'Email', url: 'mailto:notaspeaks@gmail.com', icon: 'email' },
]

function SocialIcon({ icon }) {
  const cls = "w-4 h-4"
  if (icon === 'instagram') return (
    <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
  if (icon === 'x') return (
    <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
  if (icon === 'youtube') return (
    <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  )
}

export default function Footer() {
  const [socials, setSocials] = useState(defaultSocials)

  useEffect(() => {
    api.get('/social-links').then(res => {
      if (res.data?.length > 0) setSocials(res.data)
    }).catch(() => {})
  }, [])

  return (
    <footer className="bg-navy text-paper" role="contentinfo">
      {/* Top banner */}
      <div className="border-b border-white/10 py-3">
        <div className="section-container">
          <p className="text-center text-xs tracking-caps font-medium text-paper/50 uppercase">
            An informed citizen is the king of a democracy
          </p>
        </div>
      </div>

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.jpeg"
                alt="NOTA Speaks"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-saffron/40"
              />
              <div>
                <p className="font-serif text-xl font-bold text-paper leading-tight">NOTA Speaks</p>
                <p className="text-xs text-paper/50 tracking-caps uppercase">A Citizen. A Voice. A Nation.</p>
              </div>
            </div>
            <p className="text-paper/60 text-sm leading-relaxed mb-6 max-w-xs">
              An independent citizen-led platform focused on Legal Awareness, Civic Education, 
              Constitutional Literacy, and Democratic Participation.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target={s.url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-paper/60 hover:text-saffron hover:border-saffron/50 transition-all duration-200"
                >
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-[10px] tracking-caps font-semibold text-paper/40 uppercase mb-4">Platform</h4>
            <div className="flex flex-col gap-2.5">
              {[
                ['Why NOTA Speaks', '#why'],
                ['Vision', '#vision'],
                ['Campaigns', '#campaigns'],
                ['Knowledge Hub', '#knowledge'],
                ['FAQ', '#faq'],
              ].map(([label, href]) => (
                <a key={href} href={href}
                  className="text-sm text-paper/60 hover:text-paper transition-colors duration-200 w-fit">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-[10px] tracking-caps font-semibold text-paper/40 uppercase mb-4">Get Involved</h4>
            <div className="flex flex-col gap-2.5">
              {[
                ['Join Us', '#join'],
                ['Contact', '#contact'],
                ['Volunteer', '#join'],
              ].map(([label, href]) => (
                <a key={label} href={href}
                  className="text-sm text-paper/60 hover:text-paper transition-colors duration-200 w-fit">
                  {label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-paper/40 mb-1">Phone</p>
                <a href="tel:+917004776949" className="text-sm text-paper/70 hover:text-saffron transition-colors">
                  +91 70047 76949
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-paper/40">
            © {new Date().getFullYear()} NOTA Speaks. All rights reserved. Not affiliated with any political entity.
          </p>
          <a
            href="https://vishalraj.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-paper/40 hover:text-saffron transition-colors duration-200"
          >
            Designed &amp; Developed by Vishal Raj
          </a>
        </div>
      </div>
    </footer>
  )
}
