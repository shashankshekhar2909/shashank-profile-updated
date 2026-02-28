You are Codex acting as a senior product engineer + UI engineer.

Goal:
Build a production-ready profile webapp to replace https://www.buildwithshashank.com/.
The site should present me as an "AI-Integrated Product Engineer" (broad systems + AI), highlight enterprise scale (7.7M+ SKUs), and showcase independent systems (workflow builder, AI automation services, data adapter, LayerOne design system, homelab infra). The site must be clean, fast, SEO-friendly, and easy to update.

Tech constraints:
- Use Next.js (App Router) + TypeScript.
- Use Tailwind CSS.
- No heavy UI libraries unless necessary.
- Use MDX or a simple JSON/YAML content layer so I can add/edit projects without touching many pages.
- Must be deployable on Vercel.
- Must have good Lighthouse scores (performance + SEO).
- Must use accessible HTML semantics.

Core UX requirements:
- Clean, minimal, founder-friendly look (European startup aesthetic).
- Fast loading, clear typography, no clutter.
- Make it obvious I can own end-to-end delivery and integrate AI responsibly.

Information Architecture (Pages):
1) Home (/)
   - Hero: Name, Title, 1-liner value proposition, key links (LinkedIn/GitHub/Resume).
   - “Proof bar” with 3–5 credibility highlights:
     - 8+ years experience
     - 7.7M+ SKUs search platform
     - AI-integrated workflow systems
     - FastAPI + Docker + CI/CD
     - AWS/GCP deployments
   - “What I Bring” section (4 bullets):
     - Translate ambiguity to architecture
     - End-to-end delivery
     - Responsible AI integration (validation/fallback/cost)
     - Production support mindset
   - Featured Projects grid (top 3):
     - Product Discovery Platform (7.7M+ SKUs)
     - AI Workflow Builder
     - AI Automation Services
   - CTA: “Work with me” (contact) + “View Resume”

2) About (/about)
   - Short narrative: product engineer mindset, system thinking, ownership, AI-native practices
   - Skills grouped:
     - System Design & Architecture
     - Frontend
     - Backend & APIs
     - AI & Automation
     - Infrastructure
   - A short “How I work” (3 bullets max)

3) Experience (/experience)
   - CrowdAnalytix role with sections:
     - High-Scale Product Discovery Platform (7.7M+ SKUs)
     - Taxonomy & Classification Management
     - Modernization & DevOps
   - Freelance role summary
   - Focus on outcomes and scale, not tool dumping.

4) Projects (/projects)
   - List of projects driven from content layer.
   - Filters/tags: "Enterprise", "AI", "Workflow", "Search", "Infra", "Design System".
   - Each project has a detail page:
     - Problem
     - Solution / Approach
     - Architecture (diagram optional as simple SVG)
     - Key features
     - Tech stack
     - What I learned
     - Links (GitHub, live demo if any)

Required Projects to include (at minimum):
A) High-Scale Product Discovery Platform (CrowdAnalytix)
   - 7.7M+ SKUs, Typesense faceting, schema-driven UI, bulk edit, performance optimization

B) Taxonomy & Classification Management System (CrowdAnalytix)
   - hierarchical governance, ML-assisted predictions in dashboards

C) AI-Powered Workflow Builder Platform (Independent)
   - visual builder (node/edge), AI workflow generation NL->graph
   - versioning, JSON portability, templates
   - auth refresh/access, audit logging, admin dashboard
   - FastAPI + SQLite + Alembic + Docker
   - separation between definition and execution layers

D) AI-Integrated Automation Services (Independent)
   - structured extraction PDF/Text -> JSON
   - schema validation + deterministic post-processing
   - cost/latency/fallback thinking
   - self-hosted Ollama experiments (privacy/latency/cost tradeoffs)

E) Data Transformation Adapter (In Progress)
   - CSV/JSON -> structured template -> export JSON/CSV

F) LayerOne Design System (In Progress)
   - theme tokens + reusable components for Angular + Next.js

G) Homelab / Infra (Independent)
   - Dockerized stacks, CI-like practices, SMB permissions, backup workflows
   - keep this framed as “infra experimentation to support rapid iteration and reliability”

5) Resume (/resume)
   - Render the final resume content as a web page (not only PDF).
   - Add “Download PDF” button (we can include a static PDF in /public).
   - Keep typography print-friendly.

6) Contact (/contact)
   - Simple form (email-based) OR mailto link (avoid backend).
   - Include location + availability + preferred roles (EU/Remote).

Global requirements:
- Top nav: Home, About, Experience, Projects, Resume, Contact.
- Footer with social links + short one-liner.
- Sticky header on scroll.
- Responsive design for mobile.
- Add “Open to EU/Remote” badge.

Content layer:
- Create /content/projects/*.mdx (or .md) with frontmatter:
  title, slug, type, tags, timeline, stack, featured, links, summary
- A small helper to load and render projects.
- Add /content/site.json for global texts (hero lines, proof bar items).

SEO requirements:
- Proper metadata (title, description, OG tags).
- Sitemap and robots.txt.
- JSON-LD structured data for “Person”.
- Fast page speed and optimized images.

Analytics:
- Add a simple analytics placeholder (Vercel Analytics optional) but do not force.

Design requirements:
- Use 2–3 font sizes max.
- Use muted colors, mostly black/gray/white.
- Buttons: primary + secondary.
- Cards for projects.
- Avoid animations except subtle transitions.

Deliverables:
1) Full Next.js project with App Router structure.
2) All pages implemented with real content for my profile based on the above.
3) Content layer implemented with at least 7 projects.
4) Clear README with:
   - local run steps
   - how to add a new project
   - how to deploy on Vercel
5) Ensure build passes `npm run build`.

Implementation plan:
- Create folder structure first.
- Build layout + nav.
- Implement content loader.
- Build Projects list and dynamic project pages.
- Fill in initial content.
- Add SEO + JSON-LD.
- Final polish and responsiveness.

Start now. Output:
- A step-by-step plan
- File tree
- Then the full code for each file (only include files you create/modify).
