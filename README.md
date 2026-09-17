# NexFlow — AI-Powered Multi-Agent Business Process Automation

> **"Where AI Agents Run Your Business."**  
> An autonomous business operating layer for startups and SMBs where specialized AI agents plan, execute, and verify complex operations, while humans approve high-risk checkpoints.

---

## 🎯 Product Framing & Core Loop

```
User Prompt (Natural Language)
          │
          ▼
┌─────────────────────────────────┐
│       Orchestrator Graph        │
│  • Intent Parser (structured)   │
│  • Task Planner (DAG Generator) │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│     Specialized Domain Agents   │
│  [Sales] [Finance] [HR]         │
│  [Support] [Marketing]          │
│   (12 Boundary-Validated Tools) │
└─────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐
│       Verification Agent        │
│  (PASS / FAIL / NEEDS_REVIEW)   │
└─────────────────────────────────┘
          │
          ├── [NEEDS_REVIEW / High Risk] ──► Human Approval Center (#E8A33D)
          ▼                                            │ (Approve)
┌─────────────────────────────────┐                    │
│   Final Delivery & Audit Log    │◄───────────────────┘
│   (Immutable PostgreSQL Record) │
└─────────────────────────────────┘
```

### Positioning Test
*Every screen and feature must answer:* **"Does this help the user trust and control a workflow that agents run for them?"** — *never "does this let the user chat with an agent?"*

### Explicit Non-Goals (v1 MVP)
- **Not a chatbot**: No conversational fluff or simulated typing theater. Status is drawn via state, color, and live traces.
- **Not a 200-shallow-integration tool**: Ships 12 deep, validated, permission-checked tools with exact interfaces.
- **Not multi-model**: Standardized on GPT-4o / GPT-4o-mini with unified token/cost tracking.

---

## 🛠️ Tech Stack

| Layer | Choice | Details |
|---|---|---|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS v4 | Server Components for data tables, `@xyflow/react` for the workflow canvas, Lucide icons |
| **Backend** | Python 3.12+, FastAPI | Pydantic v2 schemas, async lifespan, structured logging with correlation IDs |
| **Agent / AI** | LangGraph, OpenAI API, Structured Outputs | Orchestrator DAG graph, isolated subgraphs per agent, dedicated Verification agent |
| **Database** | PostgreSQL 16 + pgvector | Multi-tenant schema isolation, Row-Level Security (`SET LOCAL`), append-only audit log |
| **Background Queue** | Redis 7 + Arq | All workflow executions run asynchronously off the main HTTP thread |
| **Realtime** | Server-Sent Events (SSE) | Live streaming of workflow execution states to React Flow canvas |
| **Storage** | MinIO (S3-compatible) | Presigned URLs for knowledge uploads |

---

## 🎨 Industrial Control-Room Design System

Designed around the tension between **machine-run automation** and **human judgment**:

| Token | Hex | Semantic Meaning |
|---|---|---|
| `--surface-base` | `#0E1016` | Near-black, blue-shifted deep background |
| `--surface-raised` | `#171A22` | Cards, panels, elevated sections |
| `--surface-overlay` | `#1F2330` | Modals, drawers, dropdowns |
| `--accent-indigo` | `#5B6EF5` | Primary actions, running node pulses |
| `--signal-amber` | `#E8A33D` | **RESERVED ONLY FOR "YOU":** Requires Human Approval / Needs Review |
| `--signal-green` | `#3FBF7F` | Verified / Completed state |
| `--signal-red` | `#E2555A` | Failed / Escalated state |
| `--text-primary` | `#EDEEF2` | High-contrast readable typography |
| `--text-muted` | `#8B90A0` | Secondary metadata and labels |

---

## 🚀 Quickstart

### Option A: Docker Compose (All-in-One)

Ensure Docker and Docker Compose are installed:

```bash
# 1. Clone repository
cd d:/NexFlow

# 2. Configure environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 3. Start all services (PostgreSQL + pgvector, Redis, MinIO, API, Worker)
docker compose up -d

# 4. Visit the web app
# Frontend: http://localhost:3000
# Backend API Docs: http://localhost:8000/docs
# MinIO Console: http://localhost:9001 (nexflow_access / nexflow_secret)
```

### Option B: Local Development

#### 1. Backend (FastAPI + Python 3.12+)
```bash
cd backend
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Unix:
source .venv/bin/activate

pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```

#### 2. Frontend (Next.js 15)
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the full dashboard and landing page.

---

## 🤖 Five Specialized Business Agents & 12 Demo Tools

| Agent | Responsibilities | Boundary-Validated Tools |
|---|---|---|
| **Sales & CRM** | Lead management, qualification, follow-ups | `search_crm_contacts`, `update_crm_deal`, `send_follow_up_email` |
| **Finance** | Invoicing, payments, expense audits | `generate_invoice`, `check_payment_status`, `create_expense_report` |
| **HR** | Employee queries, scheduling, onboarding | `search_employees`, `schedule_meeting` |
| **Customer Support** | Ticket resolution, RAG knowledge search | `search_tickets`, `create_ticket`, `search_knowledge_base` |
| **Marketing** | Campaign briefs, content drafting | `generate_content_brief` |

*Security*: Any tool returning external text passes through `sanitize_tool_output` with clear delimiters to neutralize prompt-injection attacks.

---

## 📂 Project Structure

```
NexFlow/
├── docker-compose.yml              # Local multi-service infrastructure
├── README.md                       # Comprehensive guide & architecture
├── backend/
│   ├── pyproject.toml              # Python 3.12+ project & dependencies
│   ├── Dockerfile                  # Container definition
│   ├── scripts/
│   │   ├── init.sql                # Postgres extensions (uuid-ossp, pgvector)
│   │   └── seed_demo_data.py       # Pre-seeded workflows & demo state
│   ├── app/
│   │   ├── main.py                 # FastAPI application factory & lifespan
│   │   ├── core/                   # Config (pydantic-settings), DB, security, logging
│   │   ├── models/                 # SQLAlchemy 2.0 async declarative models
│   │   ├── schemas/                # Pydantic v2 schemas
│   │   ├── api/                    # Routers for all 11 domains + SSE
│   │   ├── agents/                 # LangGraph orchestrator, base agent, 5 specialists
│   │   │   ├── tools/              # 12 demo tools, registry, prompt sanitizer
│   │   │   └── verification_agent.py # Dedicated scoring LLM
│   │   ├── services/               # Workflow execution, approvals, audit logs
│   │   ├── middleware/             # Correlation ID & rate limiting
│   │   └── workers/                # Arq background workers
│   └── tests/                      # Unit & integration test suite
└── frontend/
    ├── package.json                # Next.js 15, @xyflow/react, Tailwind v4
    ├── next.config.ts
    ├── tsconfig.json
    └── src/
        ├── app/
        │   ├── page.tsx            # Landing page with live workflow visual motif
        │   └── (dashboard)/        # 10 dashboard routes (workflows, tasks, approvals, etc.)
        ├── components/             # React Flow canvas, custom nodes, UI kit
        ├── hooks/                  # useSSE real-time streaming hook
        ├── lib/                    # API client & formatting utilities
        ├── stores/                 # Zustand workflow canvas store
        └── types/                  # Complete TypeScript definitions
```

---

## 🛡️ Enterprise Security & Governance

1. **Row-Level Security (RLS)**: Scoped via `SET LOCAL app.current_tenant_id` within transactional blocks to eliminate connection pooling cross-tenant leaks.
2. **Append-Only Audit Log**: `audit_logs` table has UPDATE and DELETE operations disabled at the database privilege level.
3. **Idempotency Keys**: Mutating actions derive deterministic `SHA256(workflow_run_id:task_id:attempt)` keys to prevent duplicate side-effects during retries.
4. **Token Budgeting**: Per-organization monthly caps and per-run token ceilings enforced before each graph execution step.

---

## 🧪 Testing

Run backend tests:
```bash
python -m pytest backend/tests -v
```
Verifies tool execution, security sanitization, cost calculations, idempotency keys, and agent permissions.

---

## 📜 License
MIT License. Built for autonomous enterprise workflow automation.
#   N e x F l o w  
 