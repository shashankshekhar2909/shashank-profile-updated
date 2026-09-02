---
title: "BuildOS Full Platform"
slug: "buildos-full"
type: "Independent"
tags:
  - "AI"
  - "Agents"
  - "Infrastructure"
  - "Docker"
timeline: "2026 - Present"
stack:
  - "Next.js 15"
  - "FastAPI"
  - "SQLAlchemy2"
  - "PostgreSQL"
  - "pgvector"
  - "Redis"
  - "Docker Compose"
  - "WebSockets"
  - "Node.js Runtime"
featured: true
summary: "Full agentic AI platform tying together a Next.js dashboard, FastAPI backend, vector-search knowledge layer, and a Node.js runtime for orchestrating agent-driven infrastructure tasks."
problem: "Running AI agents against real infrastructure needs more than a chat window — it needs a real backend, persistent state, vector search over knowledge, and a runtime that can safely execute and report back on agent actions."
outcome: "Built a production platform: a Next.js dashboard, a FastAPI + SQLAlchemy2 API layer backed by Postgres with pgvector for semantic search, Redis for queuing/caching, and a dedicated Node.js runtime service that executes agent-issued operations over WebSockets."
stats:
  - value: "5"
    label: "services in the stack (web, API, MCP, node-runtime, postgres, redis)"
  - value: "pgvector"
    label: "semantic search over knowledge/context"
  - value: "WebSockets"
    label: "live agent-to-runtime execution channel"
highlights:
  - "FastAPI + SQLAlchemy2 API layer with async Postgres/pgvector"
  - "Dedicated Node.js runtime service for executing agent operations"
  - "Redis-backed queuing and caching between services"
  - "Full Docker Compose deployment, self-hosted"
mockup:
  - text: "$ docker compose ps"
    style: "muted"
  - text: "● api-gateway   [healthy]  0.0.0.0:8800->8000"
    style: "ok"
  - text: "● dashboard-web [running]  0.0.0.0:3300->3000"
    style: "ok"
  - text: "● postgres      [healthy]  pgvector/pgvector:pg16"
    style: "ok"
  - text: "→ node-runtime connected over WebSocket"
    style: "info"
links:
  - label: "GitHub"
    url: "https://github.com/shashankshekhar2909/buildos-full"
---

## Overview
BuildOS Full Platform is the production build-out of the BuildOS ecosystem: a Next.js 15 dashboard talking to a FastAPI backend, with Postgres/pgvector as the knowledge and semantic-search layer, Redis for queuing, and a separate Node.js runtime service that executes agent-issued operations and reports results back over WebSockets.

## The Problem
Earlier BuildOS prototypes were single-process tools — useful for one task at a time, but with no durable state, no way to search accumulated knowledge semantically, and no clean separation between "the agent decides" and "the agent executes."

## The Solution
BuildOS Full splits these concerns into dedicated services:
- **Dashboard (Next.js 15):** the operator-facing UI.
- **API (FastAPI + SQLAlchemy2):** async request handling, backed by Postgres.
- **pgvector:** semantic search over stored knowledge and context, not just keyword lookup.
- **Redis:** queuing and caching between services.
- **Node.js runtime:** a dedicated execution service, connected over WebSockets, that carries out agent-issued operations and streams results back — keeping "decide" and "do" cleanly separated.

## Architecture
```
        +-------------------+        +-------------------+
        |  Dashboard (Next)  | <----> |   API (FastAPI)   |
        +-------------------+        +-------------------+
                                        |             |
                                        v             v
                                  +---------+   +-----------+
                                  | Postgres|   |   Redis   |
                                  | pgvector|   | (queue/  |
                                  |         |   |  cache)  |
                                  +---------+   +-----------+
                                        ^
                                        | WebSocket
                                        v
                                +------------------+
                                |  Node.js Runtime  |
                                +------------------+
```

## Technical Decisions
1. **pgvector over a separate vector DB:** keeps knowledge and relational data in one Postgres instance instead of syncing two systems.
2. **A dedicated Node.js runtime, separate from the FastAPI API:** agent-issued operations run in their own service over a WebSocket channel, so a long-running or risky operation can't block the API layer.

## Roadmap & Future Work
- Expand the knowledge layer with more automated ingestion sources.
- Tighter integration between the Node.js runtime and the homelab's real infrastructure (BuildOS Node Commander).
