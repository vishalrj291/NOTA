import { useState, useEffect } from 'react'
import api from '../lib/axios'

export default function ContactMessagesAdmin() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    api.get('/admin/contacts').then(res => setMessages(res.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-serif">Contact Messages</h2>
        <p className="text-sm text-gray-500 mt-1">{messages.length} message{messages.length !== 1 ? 's' : ''} received</p>
      </div>
      {loading ? <p className="text-sm text-gray-500">Loading...</p> :
      messages.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m._id} className={`bg-white border p-5 cursor-pointer transition-colors ${selected?._id === m._id ? 'border-gray-400' : 'border-gray-200 hover:border-gray-300'}`}
              onClick={() => setSelected(selected?._id === m._id ? null : m)}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.email}</p>
                  </div>
                  <p className={`text-sm text-gray-500 ${selected?._id === m._id ? '' : 'line-clamp-1'}`}>{m.message}</p>
                </div>
                <p className="text-xs text-gray-400 flex-shrink-0">
                  {new Date(m.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              {selected?._id === m._id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed">{m.message}</p>
                  <a href={`mailto:${m.email}?subject=Re: Your message to NOTA Speaks`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline">
                    Reply via Email →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
