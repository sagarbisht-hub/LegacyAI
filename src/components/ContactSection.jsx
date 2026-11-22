import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@legacyai.com',
    href: 'mailto:hello@legacyai.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (800) 555-0199',
    href: 'tel:+18005550199',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'LegacyAI Inc., 101 Innovation Ave, San Francisco, CA 94105',
    href: null,
  },
]

const subjects = [
  'General Inquiry',
  'Company Registration Help',
  'Technical Support',
  'Partnership Opportunity',
  'Pricing & Plans',
  'Demo Request',
  'Other',
]

const initialForm = { name: '', email: '', subject: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Your name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.subject) errors.subject = 'Please select a subject.'
  if (!form.message.trim()) {
    errors.message = 'Please write a message.'
  } else if (form.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.'
  }
  return errors
}

function FieldError({ msg }) {
  if (!msg) return null
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600" role="alert">
      <AlertCircle size={12} aria-hidden="true" />
      {msg}
    </p>
  )
}

export default function ContactSection() {
  const [ref, visible] = useIntersectionObserver()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value })
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const newErrors = validate(form)
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)
    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setStatus('submitting')
    try {
      await new Promise((r) => setTimeout(r, 1500))
      // TODO: POST /api/contact with form data
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="section-pad bg-slate-50 scroll-mt-nav"
      aria-labelledby="contact-heading"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 mb-4">
            <Mail size={13} className="text-brand-600" aria-hidden="true" />
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wide">Get in Touch</span>
          </div>
          <h2 id="contact-heading" className="section-heading mb-4">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="section-sub">
            Have a question or want to learn more? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Contact info panel */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Info card */}
            <div className="relative bg-gradient-to-br from-brand-600 to-purple-700 rounded-2xl p-8 text-white h-full overflow-hidden">
              <h3 className="text-xl font-bold mb-2">Let's Talk</h3>
              <p className="text-brand-100 text-sm leading-relaxed mb-8">
                Whether you have a question about platform features, pricing, or anything else — our team is ready to answer.
              </p>

              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-brand-200 uppercase tracking-widest mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-white hover:text-brand-100 transition-colors underline-offset-2 hover:underline"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-white/90">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative circles */}
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-8 -mb-8" aria-hidden="true" />
              <div className="absolute bottom-16 right-12 w-16 h-16 rounded-full bg-white/5" aria-hidden="true" />
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-emerald-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Message Sent</h3>
                  <p className="text-sm text-slate-500 mb-6 max-w-sm">
                    Thank you for reaching out. We'll get back to you at <strong>{form.email}</strong> as soon as possible.
                  </p>
                  <button
                    onClick={() => { setForm(initialForm); setStatus('idle'); setTouched({}); setErrors({}) }}
                    className="btn-secondary text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="form-label">
                        Your Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        className={`form-input ${errors.name ? 'border-red-300 focus:ring-red-400' : ''}`}
                      />
                      <FieldError msg={errors.name} />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="form-label">
                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        className={`form-input ${errors.email ? 'border-red-300 focus:ring-red-400' : ''}`}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="form-label">
                      Subject <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      className={`form-input ${errors.subject ? 'border-red-300 focus:ring-red-400' : ''}`}
                    >
                      <option value="">Select a subject…</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <FieldError msg={errors.subject} />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="form-label">
                      Message <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell us how we can help you…"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      className={`form-input resize-none ${errors.message ? 'border-red-300 focus:ring-red-400' : ''}`}
                    />
                    <FieldError msg={errors.message} />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3" role="alert">
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0" aria-hidden="true" />
                      <p className="text-sm text-red-700">Something went wrong. Please try again.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full sm:w-auto text-sm py-3 px-8 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    aria-label="Send contact message"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
