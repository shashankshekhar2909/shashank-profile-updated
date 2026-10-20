---
title: "AgentOS"
slug: "agentos"
type: "Independent"
tags:
  - "AI"
  - "Platform"
  - "Developer Tools"
  - "Automation"
timeline: "2026 - Present"
stack:
  - "Next.js"
  - "TypeScript"
  - "FastAPI"
  - "PostgreSQL"
  - "Python"
  - "React"
featured: true
summary: "A self-hosted, vendor-neutral control plane for AI agents, skills, model routing, runtime configuration and human approvals, with a shared web console and CLI."
metaDescription: "AgentOS by Shashank Shekhar: a self-hosted AI agent control plane with versioned skills, model routing, runtime sync, approvals and an interactive sample demo."
problem: "Agent instructions, skills and permissions get scattered across tools and machines, making changes hard to review and runtime configuration difficult to keep consistent."
outcome: "A central workspace for publishing agent versions, managing skills and model policies, previewing runtime sync changes, and following tasks through approvals and audit events."
highlights:
  - "Versioned agents and skills with reviewable changes"
  - "Local and OpenAI-compatible model provider routing"
  - "Preview, diff and backup before managed runtime sync"
  - "Interactive sample organization with simulated approvals"
stats:
  - value: "Versioned"
    label: "agent instructions and skills"
  - value: "Reviewable"
    label: "runtime changes and approval requests"
  - value: "Self-hosted"
    label: "web console and CLI on one API"
mockup:
  - text: "// Example workflow in AgentOS"
    style: "muted"
  - text: "→ Choose an agent and published version"
    style: "info"
  - text: "→ Inspect the runtime and model policy"
    style: "info"
  - text: "? Review the proposed action"
    style: "accent"
  - text: "✓ Follow the result in the run timeline"
    style: "ok"
links:
  - label: "Visit AgentOS"
    url: "https://agentos.buildwithshashank.com/"
  - label: "Try the sample demo"
    url: "https://agentos.buildwithshashank.com/demo"
  - label: "GitHub"
    url: "https://github.com/shashankshekhar2909/agentOs"
---

## What it is
AgentOS is a self-hosted control plane for organizing AI agents and the configuration around them. Agent roles, instructions, skills, teams and project context live together, while models and runtimes remain replaceable.

## The problem
When agents are configured separately in each tool or on each machine, instructions drift and permissions become difficult to inspect. I wanted a shared place to review changes, publish versions and see which configuration a task uses.

## How it works
- Define agents and attach skills, then publish immutable versions with history and comparisons.
- Register local or OpenAI-compatible model providers and inspect model routing decisions.
- Preview managed runtime configuration changes, review the diff, and apply them with backups and drift checks. Claude Code is one supported sync target.
- Prepare tasks in the web console or CLI, follow run events, and review approval requests and audit history.
- Keep sign-in separate from the public introduction and sample workspace.

## Try it
The [AgentOS overview](https://agentos.buildwithshashank.com/) introduces the application. The [interactive demo](https://agentos.buildwithshashank.com/demo) lets visitors choose a fictional agent, simulate a task, approve or decline an action, and inspect the resulting timeline.

The demo uses prewritten sample data in browser memory. It makes no API or model calls, creates no live tasks, and does not change the real organization. It demonstrates the workflow rather than real model execution. Access to the operational console requires sign-in; deployment access restrictions still apply.

## Engineering choices
The Next.js interface and CLI use a shared FastAPI backend, with PostgreSQL holding application state. Agent configuration is versioned, runtime sync changes are reviewable, and operational changes retain a rollback path.

The public showcase gives visitors a way to understand the product before configuring providers or connecting their own tools.
