import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '../lib/axios'

const STATUS_OPTIONS = ['Active Campaign', 'Completed', 'Upcoming', 'Paused']

function CampaignForm({ initial, onSave, onCancel }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: initial || { title: '', description: '', status: 'Active Campaign', tag: '' }
  })

  const onSubmit = async (data) => {
    await onSave(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-800">{initial?._id ? 'Edit Campaign' : 'Add New Campaign'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label text-gray-700">Campaign Title *</label>
          <input {...register('title', { required: 'Title is required' })} className="form-input" placeholder="Campaign name" />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
        </div>
        <div>
          <label className="form-label text-gray-700">Status *</label>
          <select {...register('status')} className="form-input">
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="form-label text-gray-700">Description *</label>
        <textarea {...register('description', { required: 'Description is required' })} rows={4} className="form-input resize-none" placeholder="Describe this campaign..." />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
      </div>
      <div>
        <label className="form-label text-gray-700">Banner Image URL</label>
        <input {...register('bannerUrl')} className="form-input" placeholder="https://..." />
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting} className="btn-primary text-xs disabled:opacity-60">
          {isSubmitting ? 'Saving...' : initial?._id ? 'Save Changes' : 'Add Campaign'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary text-xs">Cancel</button>
      </div>
    </form>
  )
}

export default function CampaignsAdmin() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  const fetchCampaigns = async () => {
    setLoading(true)
    try {
      const res = await api.get('/campaigns')
      setCampaigns(res.data)
    } catch { setError('Failed to load campaigns') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchCampaigns() }, [])

  const handleAdd = async (data) => {
    await api.post('/campaigns', data)
    setAdding(false)
    fetchCampaigns()
  }

  const handleEdit = async (data) => {
    await api.put(`/campaigns/${editing._id}`, data)
    setEditing(null)
    fetchCampaigns()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this campaign? This cannot be undone.')) return
    await api.delete(`/campaigns/${id}`)
    fetchCampaigns()
  }

  const statusColor = (s) => s === 'Active Campaign' ? 'text-green-700 bg-green-50 border-green-100'
    : s === 'Completed' ? 'text-gray-600 bg-gray-50 border-gray-200'
    : s === 'Upcoming' ? 'text-blue-700 bg-blue-50 border-blue-100'
    : 'text-orange-600 bg-orange-50 border-orange-100'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 font-serif">Campaigns</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all NOTA Speaks campaigns</p>
        </div>
        {!adding && !editing && (
          <button onClick={() => setAdding(true)} className="btn-primary text-xs">
            + Add Campaign
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {adding && (
        <div className="mb-6">
          <CampaignForm onSave={handleAdd} onCancel={() => setAdding(false)} />
        </div>
      )}

      {editing && (
        <div className="mb-6">
          <CampaignForm initial={editing} onSave={handleEdit} onCancel={() => setEditing(null)} />
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500 mb-3">No campaigns yet.</p>
          <button onClick={() => setAdding(true)} className="btn-primary text-xs">Add First Campaign</button>
        </div>
      ) : (
        <div className="space-y-3">
          {campaigns.map(c => (
            <div key={c._id} className="bg-white border border-gray-200 p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-gray-800 truncate">{c.title}</h3>
                  <span className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 border ${statusColor(c.status)}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{c.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setEditing(c); setAdding(false) }}
                  className="px-3 py-1.5 text-xs border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(c._id)}
                  className="px-3 py-1.5 text-xs border border-red-100 text-red-600 hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
