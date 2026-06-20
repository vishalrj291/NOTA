import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '../lib/axios'

function FAQForm({ initial, onSave, onCancel }) {
  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm({
    defaultValues: initial || { question: '', answer: '' }
  })
  const onSubmit = async (data) => { await onSave(data); reset() }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white border border-gray-200 p-6 mb-6">
      <h3 className="font-semibold text-gray-800">{initial?._id ? 'Edit FAQ' : 'Add FAQ'}</h3>
      <div>
        <label className="form-label text-gray-700">Question *</label>
        <input {...register('question', { required: true })} className="form-input" placeholder="The question..." />
      </div>
      <div>
        <label className="form-label text-gray-700">Answer *</label>
        <textarea {...register('answer', { required: true })} rows={4} className="form-input resize-none" placeholder="The answer..." />
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting} className="btn-primary text-xs">{isSubmitting ? 'Saving...' : initial?._id ? 'Save Changes' : 'Add FAQ'}</button>
        <button type="button" onClick={onCancel} className="btn-secondary text-xs">Cancel</button>
      </div>
    </form>
  )
}

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)

  const fetch = async () => {
    setLoading(true)
    const res = await api.get('/faqs').catch(() => ({ data: [] }))
    setFaqs(res.data)
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const handleAdd = async (data) => { await api.post('/faqs', data); setAdding(false); fetch() }
  const handleEdit = async (data) => { await api.put(`/faqs/${editing._id}`, data); setEditing(null); fetch() }
  const handleDelete = async (id) => { if (!confirm('Delete this FAQ?')) return; await api.delete(`/faqs/${id}`); fetch() }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 font-serif">FAQ Management</h2>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or delete FAQs displayed on the website</p>
        </div>
        {!adding && !editing && <button onClick={() => setAdding(true)} className="btn-primary text-xs">+ Add FAQ</button>}
      </div>
      {adding && <FAQForm onSave={handleAdd} onCancel={() => setAdding(false)} />}
      {editing && <FAQForm initial={editing} onSave={handleEdit} onCancel={() => setEditing(null)} />}
      {loading ? <p className="text-sm text-gray-500">Loading...</p> : faqs.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">No FAQs yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f._id} className="bg-white border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-400 mb-1">Q{i + 1}</p>
                  <p className="font-semibold text-gray-800 mb-2">{f.question}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{f.answer}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => { setEditing(f); setAdding(false) }} className="px-3 py-1.5 text-xs border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(f._id)} className="px-3 py-1.5 text-xs border border-red-100 text-red-600 hover:bg-red-50 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
