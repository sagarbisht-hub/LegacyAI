import React, { useState } from 'react'
import { Building2, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const industries = [
  'Technology & Software',
  'Financial Services & Banking',
  'Healthcare & Life Sciences',
  'Manufacturing & Engineering',
  'Energy & Utilities',
  'Retail & E-commerce',
  'Professional Services & Consulting',
  'Education & Training',
  'Government & Public Sector',
  'Logistics & Supply Chain',
  'Telecommunications',
  'Construction & Real Estate',
  'Other',
]

const employeeRanges = [
  '1–10',
  '11–50',
  '51–200',
  '201–500',
  '501–1,000',
  '1,001–5,000',
  '5,000+',
]

const initialForm = {
  companyName: '',
  companyEmail: '',
  companyPhone: '',
  companyAddress: '',
  companyWebsite: '',
  industry: '',
  employeeCount: '',
  adminName: '',
  adminEmail: '',
  adminPhone: '',
  department: '',
  message: '',
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

function validate(form) {
  const errors = {}
  if (!form.companyName.trim()) errors.companyName = 'Company name is required.'
  if (!form.companyEmail.trim()) {
    errors.companyEmail = 'Company email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail)) {
    errors.companyEmail = 'Please enter a valid email address.'
  }
  if (!form.adminName.trim()) errors.adminName = 'Admin name is required.'
  if (!form.adminEmail.trim()) {
    errors.adminEmail = 'Admin email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.adminEmail)) {
    errors.adminEmail = 'Please enter a valid email address.'
  }
  if (form.companyPhone && !/^[\d\s\-\+\(\)]{6,20}$/.test(form.companyPhone)) {
    errors.companyPhone = 'Please enter a valid phone number.'
  }
  if (form.adminPhone && !/^[\d\s\-\+\(\)]{6,20}$/.test(form.adminPhone)) {
    errors.adminPhone = 'Please enter a valid phone number.'
  }
  if (form.companyWebsite && !/^https?:\/\/.+\..+/.test(form.companyWebsite)) {
    errors.companyWebsite = 'Website must start with http:// or https://'
  }
  return errors
}

export default function CompanyRegistrationForm() {
  const [ref, visible] = useIntersectionObserver()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [touched, setTouched] = useState({})

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
    // Mark all fields touched
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)

    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setStatus('submitting')

    // Mock async submission — replace with real API call to FastAPI backend
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800))
      // TODO: POST /api/companies/register with form data
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <section id="register" className="section-pad bg-white scroll-mt-nav" ref={ref}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-500" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Registration Submitted</h2>
          <p className="text-slate-500 leading-relaxed mb-8 max-w-lg mx-auto">
            Thank you! Your company registration request has been submitted for review. Our team will contact you at <strong className="text-slate-700">{form.adminEmail}</strong> within 1–2 business days.
          </p>
          <button onClick={handleReset} className="btn-secondary">
            Submit Another Registration
          </button>
        </div>
      </section>
    )
  }

  return (
    <section
      id="register"
      className="section-pad bg-white scroll-mt-nav"
      aria-labelledby="register-heading"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 mb-4">
            <Building2 size={13} className="text-brand-600" aria-hidden="true" />
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-wide">Register Your Company</span>
          </div>
          <h2 id="register-heading" className="section-heading mb-4">
            Bring Your Organization's Knowledge{' '}
            <span className="gradient-text">Into the Future</span>
          </h2>
          <p className="section-sub">
            Register your company with LegacyAI and create a centralized knowledge environment for your teams. Submissions are reviewed and activated by our team.
          </p>
        </div>

        {/* Form card */}
        <div
          className={`bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 overflow-hidden transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Top gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500" aria-hidden="true" />

          <form onSubmit={handleSubmit} noValidate className="p-8 md:p-10">

            {/* Section: Company Information */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 pb-3 border-b border-slate-100">
                Company Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="form-label">
                    Company Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Corporation"
                    value={form.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!errors.companyName}
                    aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                    className={`form-input ${errors.companyName ? 'border-red-300 focus:ring-red-400' : ''}`}
                  />
                  <FieldError msg={errors.companyName} />
                </div>

                {/* Company Email */}
                <div>
                  <label htmlFor="companyEmail" className="form-label">
                    Company Email <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="hello@company.com"
                    value={form.companyEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!errors.companyEmail}
                    className={`form-input ${errors.companyEmail ? 'border-red-300 focus:ring-red-400' : ''}`}
                  />
                  <FieldError msg={errors.companyEmail} />
                </div>

                {/* Company Phone */}
                <div>
                  <label htmlFor="companyPhone" className="form-label">Company Phone</label>
                  <input
                    id="companyPhone"
                    name="companyPhone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.companyPhone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.companyPhone}
                    className={`form-input ${errors.companyPhone ? 'border-red-300 focus:ring-red-400' : ''}`}
                  />
                  <FieldError msg={errors.companyPhone} />
                </div>

                {/* Company Website */}
                <div>
                  <label htmlFor="companyWebsite" className="form-label">Company Website</label>
                  <input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="url"
                    autoComplete="url"
                    placeholder="https://company.com"
                    value={form.companyWebsite}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.companyWebsite}
                    className={`form-input ${errors.companyWebsite ? 'border-red-300 focus:ring-red-400' : ''}`}
                  />
                  <FieldError msg={errors.companyWebsite} />
                </div>

                {/* Company Address */}
                <div className="md:col-span-2">
                  <label htmlFor="companyAddress" className="form-label">Company Address</label>
                  <input
                    id="companyAddress"
                    name="companyAddress"
                    type="text"
                    autoComplete="street-address"
                    placeholder="123 Innovation Drive, San Francisco, CA 94102"
                    value={form.companyAddress}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label htmlFor="industry" className="form-label">Industry</label>
                  <select
                    id="industry"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select industry…</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Number of Employees */}
                <div>
                  <label htmlFor="employeeCount" className="form-label">Number of Employees</label>
                  <select
                    id="employeeCount"
                    name="employeeCount"
                    value={form.employeeCount}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select range…</option>
                    {employeeRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            {/* Section: Admin Information */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 pb-3 border-b border-slate-100">
                Primary Administrator
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Admin Name */}
                <div>
                  <label htmlFor="adminName" className="form-label">
                    Admin Full Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="adminName"
                    name="adminName"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={form.adminName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!errors.adminName}
                    className={`form-input ${errors.adminName ? 'border-red-300 focus:ring-red-400' : ''}`}
                  />
                  <FieldError msg={errors.adminName} />
                </div>

                {/* Admin Email */}
                <div>
                  <label htmlFor="adminEmail" className="form-label">
                    Admin Email <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="adminEmail"
                    name="adminEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@company.com"
                    value={form.adminEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!errors.adminEmail}
                    className={`form-input ${errors.adminEmail ? 'border-red-300 focus:ring-red-400' : ''}`}
                  />
                  <FieldError msg={errors.adminEmail} />
                </div>

                {/* Admin Phone */}
                <div>
                  <label htmlFor="adminPhone" className="form-label">Admin Phone</label>
                  <input
                    id="adminPhone"
                    name="adminPhone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.adminPhone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.adminPhone}
                    className={`form-input ${errors.adminPhone ? 'border-red-300 focus:ring-red-400' : ''}`}
                  />
                  <FieldError msg={errors.adminPhone} />
                </div>

                {/* Department */}
                <div>
                  <label htmlFor="department" className="form-label">Department</label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    placeholder="e.g. Information Technology"
                    value={form.department}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 pb-3 border-b border-slate-100">
                Additional Information
              </h3>
              <div>
                <label htmlFor="message" className="form-label">Message / Requirements</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your knowledge management needs, use cases, or any specific requirements you have…"
                  value={form.message}
                  onChange={handleChange}
                  className="form-input resize-none"
                />
              </div>
            </div>

            {/* Privacy notice */}
            <p className="text-xs text-slate-400 mb-6">
              By submitting this form, you agree to our{' '}
              <a href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</a>
              {' '}and{' '}
              <a href="/terms" className="text-brand-600 hover:underline">Terms & Conditions</a>.
              Your information is used only to process this registration request.
            </p>

            {/* Error state */}
            {status === 'error' && (
              <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3" role="alert">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-red-700">
                  Something went wrong. Please try again or contact us directly at{' '}
                  <a href="mailto:support@legacyai.com" className="underline">support@legacyai.com</a>.
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary w-full sm:w-auto text-base py-4 px-10 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              aria-label="Submit company registration request"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Company Registration
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>

            <p className="mt-3 text-xs text-slate-400">
              <span className="text-red-500">*</span> Required fields
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
