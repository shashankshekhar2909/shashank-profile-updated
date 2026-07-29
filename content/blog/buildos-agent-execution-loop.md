---
title: "Building BuildOS: Reimagining the AI Agent Execution Loop"
slug: "buildos-agent-execution-loop"
date: "2026-06-15"
displayDate: "June 2026"
readTime: "8 min read"
summary: "How we implemented event-driven microservice orchestration and Paramiko SSH streaming to execute code safely across private fleets."
tags:
  - "AI Agents"
  - "Architecture"
  - "BuildOS"
---

Most AI coding assistants share a fatal flaw: they are stateless. Every prompt starts from zero. Prior engineering decisions, system constraints, API contracts — all of it has to be re-explained, and as the chat grows, the important parts drift out of the context window anyway.

BuildOS Agent is my answer to that. It is a persistent engineering workspace where the execution loop — plan, execute, verify, repair — is a first-class system, not an emergent behavior of a chat window. This post covers how that loop actually works.

## Why a single LLM invocation is not enough

A realistic feature request touches several layers at once: a database migration, a schema update, API tests, and a matching frontend component. No single LLM call handles that reliably. The failure mode is architectural fragmentation — generated code that compiles but violates the patterns the rest of the system depends on.

BuildOS Agent breaks feature requests into stateful planning logs: actionable sub-tasks allocated to specific agents (a database architect, an API developer, a UI builder) that execute sequentially, each with context scoped to its task.

## The execution loop is event-driven, not conversational

All agent steps are structured as jobs running through Celery and Redis. The FastAPI orchestration core dispatches work, PostgreSQL holds state and logs, and the Next.js control plane stays responsive over SSE and WebSockets even during multi-minute execution cycles.

This matters more than it sounds. A conversational loop blocks: the user waits, the model runs, something fails, everyone starts over. An event-driven loop persists: jobs are queued, retried, inspected, and resumed. The execution state outlives any single request.

## Deterministic context beats vector luck

Before any request reaches an LLM, a Context Builder Engine pre-compiles the relevant schema, dependencies, and code constraints. The source is OKF — Open Knowledge Format — a structured JSON representation of application boundaries, interfaces, and core schemas, parsed from the repositories themselves.

The point is determinism. Instead of embedding source code and hoping vector search retrieves the right chunks, the system knows which schema and which contracts govern the task at hand, and loads exactly those. Token usage drops, and generated code stops violating interfaces it never saw.

## Executing on real machines: SSH, not sidecar agents

Execution ultimately lands on real infrastructure, and that side of the loop is handled by Node Commander, the fleet-management layer of BuildOS. It is deliberately agentless: interactions run over native SSH (via Paramiko), streaming command output back through WebSockets to the dashboard.

No daemons to install on target servers, no bespoke runtime to keep patched — just an SSH connection with Docker access on the node. That choice simplifies setup, improves the security posture, and keeps the system compatible with essentially any Linux host.

## When agents get stuck

Agents loop. Anyone who has run autonomous coding agents has watched one retry the same failing lint fix forever. BuildOS Agent runs a state-verifier that halts execution after three failed attempts and requests human feedback — a circuit breaker against model runaway.

The other cost center is tokens. Multi-agent runs get expensive fast, so a context-reduction pipeline strips comments, imports, and boilerplate from input contexts before dispatch.

## What's next

Two directions on the roadmap: native MCP (Model Context Protocol) endpoints, so tools like Claude Desktop can consume BuildOS context directly, and ephemeral Docker sandboxes that compile and test generated code before it is ever proposed to a human.

The thesis behind all of it: agentic development works when the loop around the model is engineered as carefully as the prompts inside it.
