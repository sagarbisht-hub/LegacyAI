import React, { useState, useRef } from 'react'
import { Upload, FileText, Video, CheckCircle, Loader2, X, AlertCircle, CloudUpload } from 'lucide-react'
import CALayout from './CALayout'
import { uploadKnowledge } from '../../services/knowledgeService'

const DEPTS   = ['Software Engineering', 'DevOps', 'QA Engineering', 'Human Resources', 'Finance', 'Operations', 'IT']
const CATS    = ['Operations', 'HR', 'IT Operations', 'DevOps', 'Cloud', 'Finance', 'Security', 'Engineering']
const SKILLS  = ['Beginner', 'Intermediate', 'Advanced']
const TYPES   = ['Video', 'PDF', 'SOP', 'Document', 'Tutorial', 'Project Lesson']
const EXPERTS = ['Amit Kapoor', 'Neha Sharma', 'Rohit Mehta', 'Sunita Agarwal', 'Deepak Joshi']

const STAGE_INFO = {
  uploading:  { label: 'Uploading file…',              color: 'from-blue-600 to-brand-600',     pct: 25 },
  processing: { label: 'Extracting & processing…',     color: 'from-brand-600 to-violet-600',   pct: 55 },
  indexing:   { label: 'Indexing & embedding…',        color: 'from-violet-600 to-purple-600',  pct: 80 },
  done:       { label: 'Knowledge added successfully!',color: 'from-emerald-500 to-teal-600',   pct: 100 },
}

const ACCEPT = '.mp4,.mov,.avi,.pdf,.doc,.docx,.ppt,.pptx,.txt'

export default function CAUpload() {
  const fileRef = useRef(null)
  const [form, setForm] = useState({
    title: '', description: '', department: '', category: '',
    skillLevel: 'Beginner', expert: '', contentType: 'Document',
  })
  const [file, setFile]     = useState(null)
  const [stage, setStage]   = useState(null) // null | uploading | processing | indexing | done
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.department)   e.department = 'Department is required'
    if (!form.contentType)  e.contentType = 'Content type is required'
    if (!file)              e.file = 'Please select a file to upload'
    return e
  }

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) setFile(f)
    setErrors((p) => ({ ...p, file: undefined }))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) { setFile(f); setErrors((p) => ({ ...p, file: undefined })) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    await uploadKnowledge({ ...form, file }, (s) => setStage(s))
  }

  const reset = () => { setForm({ title: '', description: '', department: '', category: '', skillLevel: 'Beginner', expert: '', contentType: 'Document' }); setFile(null); setStage(null); setErrors({}) }

  const info = stage ? STAGE_INFO[stage] : null

  return (
    <CALayout breadcrumbs={[{ label: 'Upload Knowledge' }]}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Upload Organizational Knowledge</h1>
        <p className="text-slate-400 text-sm mt-1">Add videos, SOPs, documents and expert knowledge to the repository.</p>
      </div>

      {/* Pipeline visual */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Knowledge Processing Pipeline</p>
        <div className="flex items-center gap-2 flex-wrap">
          {['Upload', 'Extract Text', 'Chunk', 'Embed', 'Store Vectors', 'AI Retrieval'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <span className="text-xs font-semibold text-slate-300 bg-slate-900/60 border border-slate-700 px-3 py-1 rounded-full">{step}</span>
              {i < arr.length - 1 && <span className="text-slate-600 text-xs">→</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">Uploaded content is automatically processed through the RAG pipeline and made available in the knowledge repository.</p>
      </div>

      {/* Upload stage overlay */}
      {stage && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 mb-6 text-center">
          {stage === 'done' ? (
            <>
              <div className="w-16 h-16 rounded-full bg-emerald-950/50 border-2 border-emerald-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Knowledge Added Successfully</h3>
              <p className="text-sm text-slate-400 mb-6">"{form.title}" has been processed and is now available in the knowledge repository.</p>
              <button onClick={reset} className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-500 transition-colors">Upload Another</button>
            </>
          ) : (
            <>
              <Loader2 size={36} className="text-brand-400 animate-spin mx-auto mb-4" />
              <h3 className="text-base font-bold text-white mb-4">{info?.label}</h3>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden max-w-xs mx-auto">
                <div className={`h-full bg-gradient-to-r ${info?.color} rounded-full transition-all duration-700`} style={{ width: `${info?.pct}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-3">{info?.pct}% complete</p>
            </>
          )}
        </div>
      )}

      {/* Form */}
      {!stage && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500" />
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* File drop zone */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Upload File *</label>
              <div
                onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-brand-500 hover:bg-brand-950/10 ${errors.file ? 'border-red-700 bg-red-950/10' : file ? 'border-emerald-700 bg-emerald-950/10' : 'border-slate-600'}`}
              >
                <input ref={fileRef} type="file" accept={ACCEPT} onChange={handleFile} className="hidden" />
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle size={24} className="text-emerald-400" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-white">{file.name}</p>
                      <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null) }} className="ml-2 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <CloudUpload size={32} className="text-slate-500 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-300 mb-1">Drop file here or click to browse</p>
                    <p className="text-xs text-slate-500">Supports: MP4, MOV, PDF, DOC, DOCX, PPT, PPTX, TXT</p>
                  </>
                )}
              </div>
              {errors.file && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.file}</p>}
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Title *</label>
                <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Production Server Troubleshooting Guide"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 ${errors.title ? 'border-red-700' : 'border-slate-600'}`} />
                {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3} placeholder="Brief description of what this knowledge covers…"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
              </div>

              {[
                { label: 'Department *', key: 'department', opts: DEPTS, err: errors.department },
                { label: 'Category', key: 'category', opts: CATS },
                { label: 'Content Type *', key: 'contentType', opts: TYPES, err: errors.contentType },
                { label: 'Skill Level', key: 'skillLevel', opts: SKILLS },
                { label: 'Expert / Contributor', key: 'expert', opts: EXPERTS, placeholder: true },
              ].map(({ label, key, opts, err, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">{label}</label>
                  <select value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${err ? 'border-red-700' : 'border-slate-600'}`}>
                    {placeholder && <option value="">Select…</option>}
                    {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {err && <p className="text-xs text-red-400 mt-1">{err}</p>}
                </div>
              ))}
            </div>

            <button type="submit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold shadow-lg hover:scale-[1.02] transition-all">
              <Upload size={18} />Upload Knowledge
            </button>
          </form>
        </div>
      )}
    </CALayout>
  )
}
