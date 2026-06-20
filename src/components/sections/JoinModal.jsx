import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '../../lib/axios'

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan',
  'Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu',
  'Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry'
]

const INTERESTS = [
  'Legal Awareness','Constitutional Rights','Civic Education',
  'Consumer Rights','RTI','Cyber Safety','Democratic Participation','Nation Building'
]

const PROFESSIONS = [
  'Student','Lawyer / Legal Professional','Educator / Teacher',
  'Researcher / Academic','Working Professional','Activist','Volunteer','Other'
]

const step1Schema = z.object({
  name: z.string().min(2, 'Name is required (min 2 chars)'),
  email: z.string().email('Enter a valid email'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  state: z.string().min(1, 'Please select your state'),
  profession: z.string().min(1, 'Please select your profession'),
  message: z.string().optional(),
  agreed: z.boolean().refine(v => v === true, 'You must agree to the values of NOTA Speaks'),
})

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must be numeric'),
})

// Step indicator
function StepIndicator({ step }) {
  return (
    <div className="flex items-center gap-2 mb-8" aria-label={`Step ${step} of 3`}>
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-7 h-7 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            s < step ? 'bg-green-600 text-white' :
            s === step ? 'bg-charcoal text-paper' :
            'bg-charcoal/10 text-charcoal/30'
          }`}>
            {s < step ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : s}
          </div>
          {s < 3 && <div className={`h-px w-8 transition-colors ${s < step ? 'bg-green-600' : 'bg-charcoal/10'}`} />}
        </div>
      ))}
      <span className="ml-2 text-xs text-charcoal/50">
        {step === 1 ? 'Your Details' : step === 2 ? 'Verify Email' : 'Done'}
      </span>
    </div>
  )
}

export default function JoinModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [selectedInterests, setSelectedInterests] = useState([])
  const [otpSent, setOtpSent] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const [submitError, setSubmitError] = useState('')
  const [verifyError, setVerifyError] = useState('')
  const [sessionId, setSessionId] = useState('')

  const form1 = useForm({ resolver: zodResolver(step1Schema) })
  const form2 = useForm({ resolver: zodResolver(otpSchema) })

  // Timer countdown
  useEffect(() => {
    if (otpTimer <= 0) return
    const t = setTimeout(() => setOtpTimer(otpTimer - 1), 1000)
    return () => clearTimeout(t)
  }, [otpTimer])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )
  }

  const sendOTP = async (email) => {
    setSubmitError('')
    try {
      const res = await api.post('/join/send-otp', { email })
      setSessionId(res.data.sessionId || '')
      setOtpSent(true)
      setOtpTimer(60)
    } catch (e) {
      setSubmitError(e.response?.data?.message || 'Failed to send OTP. Please try again.')
    }
  }

  const onStep1Submit = async (data) => {
    setSubmitError('')
    const payload = { ...data, interests: selectedInterests }
    setFormData(payload)
    await sendOTP(data.email)
    setStep(2)
  }

  const onOTPSubmit = async (data) => {
    setVerifyError('')
    try {
      await api.post('/join/verify-otp', { email: formData.email, otp: data.otp, sessionId })
      // Submit full form
      await api.post('/join/submit', formData)
      setStep(3)
    } catch (e) {
      setVerifyError(e.response?.data?.message || 'Invalid or expired OTP. Please try again.')
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(1)
      setFormData({})
      setSelectedInterests([])
      setOtpSent(false)
      setSubmitError('')
      setVerifyError('')
      form1.reset()
      form2.reset()
    }, 400)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="join-modal-title">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="modal-panel relative"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-charcoal/50 hover:text-charcoal hover:bg-charcoal/8 transition-all z-10"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <img src="/logo.jpeg" alt="" className="w-9 h-9 rounded-full object-cover" aria-hidden="true" />
                <div>
                  <h2 id="join-modal-title" className="font-serif text-xl font-bold text-charcoal leading-tight">
                    Join NOTA Speaks
                  </h2>
                  <p className="text-xs text-charcoal/50">A Citizen. A Voice. A Nation.</p>
                </div>
              </div>

              <div className="h-px bg-charcoal/8 my-5" />

              <StepIndicator step={step} />

              {/* Step 1 — Details Form */}
              {step === 1 && (
                <form onSubmit={form1.handleSubmit(onStep1Submit)} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="join-name" className="form-label">Full Name *</label>
                      <input {...form1.register('name')} id="join-name" type="text" placeholder="Your full name" className="form-input" />
                      {form1.formState.errors.name && <p className="mt-1 text-xs text-red-600" role="alert">{form1.formState.errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="join-email" className="form-label">Email *</label>
                      <input {...form1.register('email')} id="join-email" type="email" placeholder="you@email.com" className="form-input" />
                      {form1.formState.errors.email && <p className="mt-1 text-xs text-red-600" role="alert">{form1.formState.errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="join-mobile" className="form-label">Mobile Number *</label>
                      <input {...form1.register('mobile')} id="join-mobile" type="tel" placeholder="10-digit mobile" className="form-input" />
                      {form1.formState.errors.mobile && <p className="mt-1 text-xs text-red-600" role="alert">{form1.formState.errors.mobile.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="join-state" className="form-label">State *</label>
                      <select {...form1.register('state')} id="join-state" className="form-input">
                        <option value="">Select your state</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {form1.formState.errors.state && <p className="mt-1 text-xs text-red-600" role="alert">{form1.formState.errors.state.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="join-profession" className="form-label">Profession *</label>
                    <select {...form1.register('profession')} id="join-profession" className="form-input">
                      <option value="">Select your profession</option>
                      {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {form1.formState.errors.profession && <p className="mt-1 text-xs text-red-600" role="alert">{form1.formState.errors.profession.message}</p>}
                  </div>

                  {/* Interests — checkboxes */}
                  <div>
                    <p className="form-label mb-2">Areas of Interest</p>
                    <div className="grid grid-cols-2 gap-2">
                      {INTERESTS.map(interest => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-2 text-left text-xs font-medium border transition-all duration-200 ${
                            selectedInterests.includes(interest)
                              ? 'bg-charcoal text-paper border-charcoal'
                              : 'border-charcoal/15 text-charcoal/70 hover:border-charcoal/40'
                          }`}
                          aria-pressed={selectedInterests.includes(interest)}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="join-message" className="form-label">Message <span className="text-charcoal/40 normal-case font-normal">(optional)</span></label>
                    <textarea {...form1.register('message')} id="join-message" rows={2} placeholder="Why do you want to join? What drives you..." className="form-input resize-none" />
                  </div>

                  {/* Agreement checkbox */}
                  <div className="border border-charcoal/10 bg-charcoal/2 p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        {...form1.register('agreed')}
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 accent-charcoal flex-shrink-0"
                        id="join-agreed"
                      />
                      <span className="text-xs text-charcoal/70 leading-relaxed">
                        I agree with the <strong className="text-charcoal">values and objectives of NOTA Speaks</strong> — 
                        to promote legal awareness, civic education, constitutional literacy, and democratic participation 
                        in a non-partisan, independent manner.
                      </span>
                    </label>
                    {form1.formState.errors.agreed && <p className="mt-2 text-xs text-red-600 ml-7" role="alert">{form1.formState.errors.agreed.message}</p>}
                  </div>

                  {submitError && <p className="text-xs text-red-600 bg-red-50 border border-red-100 p-3" role="alert">{submitError}</p>}

                  <button
                    type="submit"
                    disabled={form1.formState.isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-60"
                    aria-label="Proceed to email verification"
                  >
                    {form1.formState.isSubmitting ? 'Sending OTP...' : 'Continue — Verify Email'}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </form>
              )}

              {/* Step 2 — OTP Verification */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-saffron/10 border border-saffron/20 flex items-center justify-center mx-auto mb-3 text-saffron">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-charcoal mb-1">Verify Your Email</h3>
                    <p className="text-sm text-charcoal/60">
                      A 6-digit OTP has been sent to <strong className="text-charcoal">{formData.email}</strong>
                    </p>
                  </div>

                  <form onSubmit={form2.handleSubmit(onOTPSubmit)} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="join-otp" className="form-label">Enter 6-Digit OTP *</label>
                      <input
                        {...form2.register('otp')}
                        id="join-otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="000000"
                        className="form-input text-center text-2xl tracking-[0.5em] font-mono"
                        autoFocus
                        aria-describedby={form2.formState.errors.otp ? 'otp-error' : undefined}
                      />
                      {form2.formState.errors.otp && <p id="otp-error" className="mt-1 text-xs text-red-600 text-center" role="alert">{form2.formState.errors.otp.message}</p>}
                    </div>

                    {verifyError && <p className="text-xs text-red-600 bg-red-50 border border-red-100 p-3 text-center" role="alert">{verifyError}</p>}

                    <button
                      type="submit"
                      disabled={form2.formState.isSubmitting}
                      className="btn-primary w-full justify-center disabled:opacity-60"
                    >
                      {form2.formState.isSubmitting ? 'Verifying...' : 'Verify & Submit Application'}
                    </button>

                    <div className="flex items-center justify-between text-xs">
                      <button type="button" onClick={() => setStep(1)} className="text-charcoal/50 hover:text-charcoal transition-colors">
                        ← Edit details
                      </button>
                      {otpTimer > 0 ? (
                        <span className="text-charcoal/40">Resend OTP in {otpTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => sendOTP(formData.email)}
                          className="text-saffron font-semibold hover:underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 3 — Success */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">Welcome to NOTA Speaks!</h3>
                  <p className="text-charcoal/60 mb-6 leading-relaxed">
                    Your application has been received. You're now part of a growing movement of 
                    informed, engaged citizens. We'll be in touch soon.
                  </p>
                  <p className="font-serif text-lg italic text-charcoal/40 mb-6">
                    "An informed citizen is the king of a democracy."
                  </p>
                  <button onClick={handleClose} className="btn-primary">
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
