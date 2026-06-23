import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '../../lib/axios'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export default function ContactSection({ onJoinClick }) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data) => {
    setError('')
    try {
      await api.post('/contact', data)
      setSubmitted(true)
      reset()
    } catch (e) {
      setError('Something went wrong. Please try again or call us directly.')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-navy relative overflow-hidden" aria-labelledby="contact-heading">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #fff, #fff 1px, transparent 1px, transparent 50px)' }}
        />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full border border-white/5" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full border border-white/5" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Contact Info */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label block mb-3" style={{ color: '#F49B28' }}>Get In Touch</span>
            <h2 id="contact-heading" className="section-title text-paper mb-6">
              Reach Out to Us
            </h2>
            <p className="text-paper/60 leading-relaxed mb-10">
              Have a question, idea, collaboration proposal, or just want to connect? 
              We're always open to conversations that strengthen civic awareness.
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 border border-white/15 flex items-center justify-center flex-shrink-0 text-saffron">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-caps text-paper/40 uppercase mb-1 font-medium">Phone</p>
                  <a href="tel:+917004776949" className="text-paper font-semibold hover:text-saffron transition-colors">
                    +91 70047 76949
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 border border-white/15 flex items-center justify-center flex-shrink-0 text-saffron">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-caps text-paper/40 uppercase mb-1 font-medium">Email</p>
                  <a href="mailto:notaspeaks@gmail.com" className="text-paper font-semibold hover:text-saffron transition-colors">
                    notaspeaks@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 border border-white/15 flex items-center justify-center flex-shrink-0 text-saffron">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-caps text-paper/40 uppercase mb-1 font-medium">Location</p>
                  <p className="text-paper font-semibold">Ranchi, Jharkhand</p>
                  <p className="text-paper/50 text-sm">Serving citizens across the state</p>
                </div>
              </div>
            </div>

            {/* Join CTA */}
            <div className="mt-12 pt-10 border-t border-white/10">
              <p className="text-paper/50 text-sm mb-4">Want to be part of the movement?</p>
              <a href="#" onClick={e => { e.preventDefault(); onJoinClick?.() }}
                className="btn-saffron text-xs">
                Join NOTA Speaks
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-paper p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-2">Message Sent!</h3>
                  <p className="text-charcoal/60 text-sm">We'll respond within 24-48 hours. Thank you for reaching out.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-xs font-semibold text-saffron underline-saffron">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="form-label">Full Name</label>
                      <input
                        {...register('name')}
                        id="contact-name"
                        type="text"
                        placeholder="Your full name"
                        className="form-input"
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      />
                      {errors.name && <p id="contact-name-error" className="mt-1 text-xs text-red-600" role="alert">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="form-label">Email Address</label>
                      <input
                        {...register('email')}
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        className="form-input"
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      />
                      {errors.email && <p id="contact-email-error" className="mt-1 text-xs text-red-600" role="alert">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="form-label">Message</label>
                      <textarea
                        {...register('message')}
                        id="contact-message"
                        rows={5}
                        placeholder="Your message, question, or idea..."
                        className="form-input resize-none"
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      />
                      {errors.message && <p id="contact-message-error" className="mt-1 text-xs text-red-600" role="alert">{errors.message.message}</p>}
                    </div>

                    {error && (
                      <p className="text-xs text-red-600 bg-red-50 border border-red-100 p-3" role="alert">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
