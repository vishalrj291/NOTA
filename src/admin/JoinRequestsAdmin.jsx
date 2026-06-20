import { useState, useEffect } from 'react'
import api from '../lib/axios'

export default function JoinRequestsAdmin() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ profession: '', state: '', interest: '' })
  const [selected, setSelected] = useState(null)

  const fetch = async () => {
    setLoading(true)
    const params = {}
    if (filter.profession) params.profession = filter.profession
    if (filter.state) params.state = filter.state
    if (filter.interest) params.interest = filter.interest
    const res = await api.get('/admin/join-requests', { params }).catch(() => ({ data: [] }))
    setRequests(res.data)
    setLoading(false)
  }

  useEffect(() => { fetch() }, [filter])

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-serif">Join Requests</h2>
        <p className="text-sm text-gray-500 mt-1">{requests.length} request{requests.length !== 1 ? 's' : ''} received</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 bg-white border border-gray-200 p-4">
        <select value={filter.profession} onChange={e => setFilter(f => ({ ...f, profession: e.target.value }))}
          className="form-input text-sm py-2 w-auto">
          <option value="">All Professions</option>
          {['Student','Lawyer / Legal Professional','Educator / Teacher','Researcher / Academic',
            'Working Professional','Activist','Volunteer','Other'].map(p => <option key={p}>{p}</option>)}
        </select>
        <select value={filter.state} onChange={e => setFilter(f => ({ ...f, state: e.target.value }))}
          className="form-input text-sm py-2 w-auto">
          <option value="">All States</option>
          {['Andhra Pradesh','Maharashtra','Delhi','Karnataka','Tamil Nadu','Uttar Pradesh','Others'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filter.interest} onChange={e => setFilter(f => ({ ...f, interest: e.target.value }))}
          className="form-input text-sm py-2 w-auto">
          <option value="">All Interests</option>
          {['Legal Awareness','Constitutional Rights','Civic Education','Consumer Rights','RTI','Cyber Safety'].map(i => <option key={i}>{i}</option>)}
        </select>
        {(filter.profession || filter.state || filter.interest) && (
          <button onClick={() => setFilter({ profession: '', state: '', interest: '' })}
            className="text-xs text-red-500 px-3 py-2 border border-red-100 hover:bg-red-50 transition-colors">
            Clear Filters
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? <p className="text-sm text-gray-500">Loading...</p> :
      requests.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">No join requests yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mobile</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Profession</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">State</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">OTP</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                  <td className="px-4 py-3 text-gray-600">{r.email}</td>
                  <td className="px-4 py-3 text-gray-600">{r.mobile}</td>
                  <td className="px-4 py-3 text-gray-600">{r.profession}</td>
                  <td className="px-4 py-3 text-gray-600">{r.state}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${r.otpVerified ? 'text-green-700 bg-green-50 border-green-100' : 'text-orange-600 bg-orange-50 border-orange-100'}`}>
                      {r.otpVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(selected?._id === r._id ? null : r)}
                      className="text-xs text-blue-600 hover:underline">
                      {selected?._id === r._id ? 'Hide' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <div className="mt-4 bg-white border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-semibold text-gray-800">{selected.name} — Full Details</h3>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div><p className="text-gray-400 text-xs">Email</p><p className="font-medium">{selected.email}</p></div>
            <div><p className="text-gray-400 text-xs">Mobile</p><p className="font-medium">{selected.mobile}</p></div>
            <div><p className="text-gray-400 text-xs">State</p><p className="font-medium">{selected.state}</p></div>
            <div><p className="text-gray-400 text-xs">Profession</p><p className="font-medium">{selected.profession}</p></div>
          </div>
          {selected.interests?.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-400 text-xs mb-2">Interests</p>
              <div className="flex flex-wrap gap-2">
                {selected.interests.map(i => <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-700">{i}</span>)}
              </div>
            </div>
          )}
          {selected.message && <div><p className="text-gray-400 text-xs mb-1">Message</p><p className="text-sm text-gray-600">{selected.message}</p></div>}
        </div>
      )}
    </div>
  )
}
