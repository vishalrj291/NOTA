import { useEffect, useState } from 'react'
import api from '../lib/axios'

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white border border-gray-200 p-6 flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{value ?? '—'}</p>
      </div>
      <div className={`w-10 h-10 flex items-center justify-center ${color}`}>{icon}</div>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({})

  useEffect(() => {
    Promise.all([
      api.get('/campaigns').catch(() => ({ data: [] })),
      api.get('/admin/join-requests').catch(() => ({ data: [] })),
      api.get('/admin/contacts').catch(() => ({ data: [] })),
      api.get('/faqs').catch(() => ({ data: [] })),
    ]).then(([campaigns, joins, contacts, faqs]) => {
      setStats({
        campaigns: campaigns.data.length,
        joins: joins.data.length,
        contacts: contacts.data.length,
        faqs: faqs.data.length,
      })
    })
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 font-serif">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Overview of NOTA Speaks platform activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Campaigns" value={stats.campaigns}
          color="bg-saffron/10 text-saffron"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"/></svg>}
        />
        <StatCard label="Join Requests" value={stats.joins}
          color="bg-green-50 text-green-600"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/></svg>}
        />
        <StatCard label="Contact Messages" value={stats.contacts}
          color="bg-blue-50 text-blue-600"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>}
        />
        <StatCard label="FAQs" value={stats.faqs}
          color="bg-purple-50 text-purple-600"
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>}
        />
      </div>

      <div className="bg-white border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-1">Quick Actions</h3>
        <p className="text-sm text-gray-500 mb-4">Common administrative tasks</p>
        <div className="flex flex-wrap gap-3">
          {[
            ['Add Campaign', '/admin/campaigns'],
            ['View Join Requests', '/admin/join-requests'],
            ['View Messages', '/admin/contacts'],
            ['Update Social Links', '/admin/social-links'],
          ].map(([label, path]) => (
            <a key={label} href={path}
              className="px-4 py-2 text-sm font-medium border border-gray-200 text-gray-700 hover:border-gray-400 transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
