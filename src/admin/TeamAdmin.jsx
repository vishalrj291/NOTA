import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '../lib/axios'

function TeamForm({ initial, onSave, onCancel }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: initial || { name: '', role: '', bio: '', photoUrl: '', instagram: '', twitter: '', linkedin: '' }
  })
  const onSubmit = async (data) => { await onSave(data); reset() }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-800">{initial?._id ? 'Edit Member' : 'Add Team Member'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label text-gray-700">Full Name *</label>
          <input {...register('name', { required: true })} className="form-input" placeholder="Member name" />
        </div>
        <div>
          <label className="form-label text-gray-700">Role *</label>
          <input {...register('role', { required: true })} className="form-input" placeholder="e.g. Constitutional Law Expert" />
        </div>
      </div>
      <div>
        <label className="form-label text-gray-700">Bio</label>
        <textarea {...register('bio')} rows={3} className="form-input resize-none" placeholder="Short biography..." />
      </div>
      <div>
        <label className="form-label text-gray-700">Photo URL</label>
        <input {...register('photoUrl')} className="form-input" placeholder="https://..." />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div><label className="form-label text-gray-700">Instagram</label><input {...register('instagram')} className="form-input" placeholder="@handle" /></div>
        <div><label className="form-label text-gray-700">X (Twitter)</label><input {...register('twitter')} className="form-input" placeholder="@handle" /></div>
        <div><label className="form-label text-gray-700">LinkedIn</label><input {...register('linkedin')} className="form-input" placeholder="linkedin.com/in/..." /></div>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting} className="btn-primary text-xs">{isSubmitting ? 'Saving...' : initial?._id ? 'Save Changes' : 'Add Member'}</button>
        <button type="button" onClick={onCancel} className="btn-secondary text-xs">Cancel</button>
      </div>
    </form>
  )
}

export default function TeamAdmin() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)

  const fetch = async () => {
    setLoading(true)
    const res = await api.get('/team').catch(() => ({ data: [] }))
    setMembers(res.data)
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const handleAdd = async (data) => { await api.post('/team', data); setAdding(false); fetch() }
  const handleEdit = async (data) => { await api.put(`/team/${editing._id}`, data); setEditing(null); fetch() }
  const handleDelete = async (id) => { if (!confirm('Delete this team member?')) return; await api.delete(`/team/${id}`); fetch() }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 font-serif">Team Members</h2>
          <p className="text-sm text-gray-500 mt-1">Manage the NOTA Speaks team</p>
        </div>
        {!adding && !editing && <button onClick={() => setAdding(true)} className="btn-primary text-xs">+ Add Member</button>}
      </div>
      {adding && <div className="mb-6"><TeamForm onSave={handleAdd} onCancel={() => setAdding(false)} /></div>}
      {editing && <div className="mb-6"><TeamForm initial={editing} onSave={handleEdit} onCancel={() => setEditing(null)} /></div>}
      {loading ? <p className="text-sm text-gray-500">Loading...</p> : members.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500 mb-3">No team members yet.</p>
          <button onClick={() => setAdding(true)} className="btn-primary text-xs">Add First Member</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(m => (
            <div key={m._id} className="bg-white border border-gray-200 p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {m.photoUrl ? <img src={m.photoUrl} alt={m.name} className="w-full h-full object-cover" /> :
                    <span className="text-sm font-bold text-gray-400">{m.name?.[0]}</span>}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.role}</p>
                </div>
              </div>
              {m.bio && <p className="text-xs text-gray-500 mb-3 line-clamp-2">{m.bio}</p>}
              <div className="flex gap-2">
                <button onClick={() => { setEditing(m); setAdding(false) }} className="px-3 py-1.5 text-xs border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors">Edit</button>
                <button onClick={() => handleDelete(m._id)} className="px-3 py-1.5 text-xs border border-red-100 text-red-600 hover:bg-red-50 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
