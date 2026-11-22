# LegacyAI — AI-Powered Enterprise Knowledge Hub

> Turn Professional Expertise into an AI-Powered Knowledge Hub

---

## Quick Start (5 minutes)

### Prerequisites
- Python 3.11+ (`python --version`)
- Node.js 18+ (`node --version`)

### 1 — Clone and set up environment files

```bash
# Frontend
cp .env.example .env

# Backend
cd backend
cp .env.example .env
```

### 2 — Install Python dependencies

```bash
cd backend
python -m pip install -r requirements.txt
```

### 3 — Seed the database (one command does everything)

```bash
cd backend
python seed.py
```

This single command:
- Creates the SQLite database (`backend/legacyai.db`)
- Creates demo companies and three user accounts
- Imports **1,470 synthetic employee records** (IBM HR Analytics format)
- Indexes **7 knowledge documents** (SOPs, guides, playbooks) with real embeddings

### 4 — Start the backend

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### 5 — Start the frontend (new terminal)

```bash
# From project root
npm install
npm run dev
```

App: http://localhost:5173

---

## Demo Login Credentials

| Role | Email | Password | Redirects to |
|---|---|---|---|
| Super Admin | `superadmin@legacyai.com` | `SuperAdmin@123` | `/super-admin` |
| Company Admin | `admin@techcorp.com` | `CompanyAdmin@123` | `/company-admin` |
| Employee | `employee@techcorp.com` | `Employee@123` | `/employee` |

---

## Running without the backend

The frontend gracefully falls back to demo data whenever the backend is unreachable. Set in your frontend `.env`:

```
VITE_USE_DEMO_AUTH=true
```

Then run only `npm run dev` — login, dashboards, and the AI assistant all work in demo mode.

---

## Project Structure

```
legacyai/
├── src/                         # React frontend
│   ├── services/
│   │   ├── authService.js       ← JWT login + demo fallback
│   │   ├── knowledgeService.js  ← Documents + employees API
│   │   └── aiService.js         ← RAG query + analyze API
│   ├── context/AuthContext.jsx  ← Session management
│   ├── routes/ProtectedRoute.jsx
│   ├── pages/
│   │   ├── login/LoginPage.jsx
│   │   ├── super-admin/
│   │   ├── company-admin/
│   │   └── employee/            ← includes AI Assistant
│   └── components/dashboard/
│
└── backend/
    ├── app/
    │   ├── main.py              ← FastAPI app + CORS + startup
    │   ├── core/
    │   │   ├── config.py        ← Settings from .env
    │   │   ├── security.py      ← bcrypt + JWT
    │   │   └── deps.py          ← Auth dependencies
    │   ├── db/
    │   │   ├── models.py        ← SQLModel schema
    │   │   └── database.py      ← Engine + session
    │   ├── routers/
    │   │   ├── auth.py          ← POST /api/auth/login, GET /api/auth/me
    │   │   ├── employees.py     ← CRUD /api/employees + /api/departments
    │   │   ├── documents.py     ← Upload + process /api/documents
    │   │   └── ai.py            ← RAG /api/ai/query, /api/ai/analyze
    │   └── services/
    │       ├── embedding.py     ← sentence-transformers (all-MiniLM-L6-v2)
    │       ├── text_extraction.py ← PDF / DOCX / TXT extraction
    │       ├── chunking.py      ← RecursiveCharacterTextSplitter
    │       ├── vector_store.py  ← SQLite-backed cosine similarity search
    │       └── rag.py           ← Full RAG pipeline (embed → retrieve → generate)
    ├── data/
    │   ├── ibm_hr_synthetic.csv ← 1,470 synthetic employee rows
    │   └── seed_docs/           ← 7 knowledge documents (txt)
    └── seed.py                  ← One-command full setup
```

---

## Architecture & Data Flow

### Authentication

```
Browser → POST /api/auth/login (email + password)
        → FastAPI verifies bcrypt hash in SQLite
        → Returns JWT token
        → Frontend stores token in sessionStorage
        → Every subsequent request: Authorization: Bearer <token>
        → JWT decoded in deps.py to load User + enforce role
```

### RAG Pipeline (AI Assistant)

```
Employee asks question
      ↓
POST /api/ai/query { question }
      ↓
sentence-transformers embeds question → 384-dim vector
      ↓
SQLite scan: cosine similarity against all indexed chunk embeddings
      ↓
Top-K relevant chunks retrieved (threshold: 0.25 similarity)
      ↓
If OPENAI_API_KEY set → GPT-4o-mini generates grounded answer
Otherwise             → Template answer built from chunk text
      ↓
Response: { found, answer, confidence, sources, expert, department, related }
      ↓
Frontend displays answer + citations + feedback buttons
```

### Document Indexing Pipeline

```
Company Admin uploads file
      ↓
POST /api/documents/upload → file saved to uploads/
      ↓
Background task starts immediately (non-blocking):
  PyMuPDF (PDF) / python-docx (DOCX) / plain text (TXT)
  → (page_num, text) pairs
  → RecursiveCharacterTextSplitter (600 chars, 80 overlap)
  → sentence-transformers batch embed
  → Embedding stored as JSON in document_chunks.chunk_metadata
  → Document status: uploaded → processing → indexing → indexed
```

### Database Schema

```
companies ──< departments ──< employees
          ──< users
          ──< documents ──< document_chunks
          ──< import_jobs
```

---

## IBM HR Dataset

The seeder uses a synthetic replica of the IBM HR Analytics dataset (Kaggle).

The real dataset: https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset

The synthetic replica (`data/ibm_hr_synthetic.csv`) has the same 35 columns
and 1,470 rows, generated from the same statistical distributions. No real
employee data is included. All names are synthetically generated.

**To use the real Kaggle dataset instead:**
1. Download `WA_Fn-UseC_-HR-Employee-Attrition.csv` from Kaggle
2. Copy it to `backend/data/ibm_hr_synthetic.csv`
3. Add a `ManagerName` column (the seeder expects it; the original dataset does not have it)
4. Run `python seed.py` again

---

## Seed Documents (Knowledge Base)

| File | Title | Department |
|---|---|---|
| `production_api_troubleshooting.txt` | Production Server Troubleshooting Guide | Software Engineering |
| `employee_onboarding_sop.txt` | Employee Onboarding SOP | Human Resources |
| `database_backup_recovery.txt` | Database Backup and Recovery Procedure | IT Operations |
| `cicd_pipeline_guide.txt` | CI/CD Pipeline Setup and Standards | DevOps |
| `security_incident_response.txt` | Security Incident Response Playbook | IT Security |
| `cloud_deployment_aws.txt` | Cloud Deployment Best Practices on AWS | DevOps |
| `finance_month_end_close.txt` | Financial Month-End Closing Process | Finance |

All documents are fictional and labelled as demo data. They are structured as realistic enterprise SOPs so the RAG pipeline has meaningful content to search.

---

## Upgrading the Vector Store

The current implementation does cosine similarity in SQLite (suitable for ~100k chunks). To scale:

**pgvector (PostgreSQL):**
1. `pip install pgvector`
2. Enable the extension: `CREATE EXTENSION vector;`
3. Add `vector_embedding: list[float] = Field(sa_column=Column(Vector(384)))` to `DocumentChunk`
4. Replace `search_chunks()` in `vector_store.py` with a pgvector `<=>` query

**Pinecone:**
1. `pip install pinecone-client`
2. Set `PINECONE_API_KEY` and `PINECONE_INDEX` in `.env`
3. Replace `upsert_chunk_embedding()` and `search_chunks()` in `vector_store.py`

The RAG pipeline in `services/rag.py` and all routers remain unchanged — only `vector_store.py` needs to be swapped.

---

## Adding OpenAI for Better Answers

```bash
# In backend/.env
OPENAI_API_KEY=sk-...
```

The RAG router automatically detects the key and uses `gpt-4o-mini` for answer
generation. Without it, answers are built directly from retrieved chunk text.

---

## Production Checklist

- [ ] Generate a strong `JWT_SECRET` (`python -c "import secrets; print(secrets.token_hex(32))"`)
- [ ] Switch `DATABASE_URL` to PostgreSQL
- [ ] Set `UPLOAD_DIR` to a persistent volume or cloud storage path
- [ ] Configure nginx/Caddy to proxy `/api` to uvicorn
- [ ] Set `ALLOWED_ORIGINS` to your production domain
- [ ] Remove or protect the `/docs` and `/redoc` endpoints
- [ ] Add rate limiting (slowapi or nginx)

---

© 2026 LegacyAI. All rights reserved.
