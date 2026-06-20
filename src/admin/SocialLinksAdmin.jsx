import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '../lib/axios'

const PLATFORMS = [
  { key: 'instagram', label: 'Instagram', icon: '📷', placeholder: 'https://instagram.com/notaspeaks' },
  { key: 'x', label: 'X (Twitter)', icon: '𝕏', placeholder: 'https://twitter.com/notaspeaks' },
  { key: 'youtube', label: 'YouTube', icon: '▶', placeholder: 'https://youtube.com/@notaspeaks' },
  { key: 'email', label: 'Email', icon: '✉', placeholder: 'mailto:notaspeaks@gmail.com' },
]

export default function SocialLinksAdmin() {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

  useEffect(() => {
    api.get('/social-links').then(res => {
      if (res.data?.length > 0) {
        const defaults = {}
        res.data.forEach(s => { defaults[s.icon || s.platform?.toLowerCase()] = s.url })
        reset(defaults)
      }
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const onSubmit = async (data) => {
    const links = PLATFORMS.map(p => ({ platform: p.label, url: data[p.key] || '', icon: p.key }))
    await api.put('/social-links', { links })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-serif">Social Media Links</h2>
        <p className="text-sm text-gray-500 mt-1">Update social links — changes appear in the website footer automatically.</p>
      </div>

      {loading ? <p className="text-sm text-gray-500">Loading...</p> : (
        <div className="bg-white border border-gray-200 p-8 max-w-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {PLATFORMS.map(p => (
              <div key={p.key}>
                <label className="form-label text-gray-700 flex items-center gap-2">
                  <span>{p.icon}</span> {p.label}
                </label>
                <input
                  {...register(p.key)}
                  type="url"
                  placeholder={p.placeholder}
                  className="form-input"
                />
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={isSubmitting} className="btn-primary text-xs">
                {isSubmitting ? 'Saving...' : 'Save Social Links'}
              </button>
              {saved && (
                <span className="text-xs text-green-600 font-medium">✓ Saved successfully!</span>
              )}
            </div>
          </form>
          <p className="mt-6 text-xs text-gray-400 border-t border-gray-100 pt-4">
            Links update automatically on the website. No deployment required.
          </p>
        </div>
      )}
    </div>
  )
}
