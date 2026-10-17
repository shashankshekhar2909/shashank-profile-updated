---
title: "Alpha - Local AI Ops Console"
slug: "alpha"
type: "Independent"
tags:
  - "AI"
  - "Platform"
  - "Infra"
  - "Automation"
timeline: "2026 - Present"
stack:
  - "Next.js"
  - "TypeScript"
  - "FastAPI"
  - "Python"
  - "Local open-weight models"
  - "Speech-to-text and text-to-speech"
  - "Docker"
featured: true
links:
  - label: "Alpha overview"
    url: "https://homelab.buildwithshashank.com/alpha"
  - label: "Alpha live view (read-only)"
    url: "https://homelab.buildwithshashank.com/alpha/live"
  - label: "The homelab it runs"
    url: "https://homelab.buildwithshashank.com"
summary: "Alpha is a local AI ops console and assistant for a self-hosted homelab. It answers questions from live data on open-weight models and acts only after a human confirms."
metaDescription: "Case study: Alpha, a local AI ops console and assistant for a homelab. Open-weight models, voice, confirm-before-act actions and a read-only public live view."
problem: "Running a homelab means watching many systems at once, and handing an AI agent the keys is risky. I wanted one calm view of what needs attention, plain-language answers, and no action without a person saying yes."
outcome: "A working console and assistant that runs entirely on local models, answers from live read-only data, proposes a short allow-list of actions that need an on-screen confirmation, and publishes a read-only live view of the lab."
stats:
  - value: "Local"
    label: "open-weight models, no per-use model fees"
  - value: "Confirm"
    label: "before any action runs, voice cannot confirm"
  - value: "Read-only"
    label: "public live view of the lab"
highlights:
  - "Ops console that leads with what needs attention"
  - "Ask Alpha: plain-language questions answered from live data"
  - "Hands-free voice with local speech recognition and speech output"
  - "Confirm-before-act actions with an audit log"
mockup:
  - text: "// Ask Alpha: how are backups?"
    style: "muted"
  - text: "✓ Read live backup status (read-only)"
    style: "ok"
  - text: "→ Last nightly run finished, all guests covered"
    style: "info"
  - text: "? Proposed action needs your confirmation"
    style: "accent"
---

## Problem
A self-hosted lab has many moving parts: virtualization, containers, storage, backups, monitoring. Dashboards show everything and prioritise nothing, and giving an AI agent write access without guardrails is a risk I was not willing to take.

## What it is
Alpha is the custom ops console and local AI assistant I built to run my homelab. One calm view per area leads with what needs attention. Ask Alpha answers plain-language questions from live, read-only data. The whole thing runs on local open-weight models, so there are no per-use model API fees and nothing leaves the lab for routine work.

## How it works
- Read-only collectors sample the lab on a short interval and feed the console and the assistant.
- Ask Alpha uses read-only tools plus a private web search to answer in seconds.
- Voice is hands-free in the browser and interruptible, using local speech recognition and local speech output.
- Alpha can only propose a short allow-list of actions. Nothing runs until a person taps Confirm on screen. Voice can never confirm. Every request and action is audit-logged.
- A read-only public live view shows a small, allow-listed summary of the lab (counts and percentages only).

## Outcomes
- A console and assistant I use daily to run the lab.
- Confirm-before-act as a design rule, not an afterthought.
- Local-first: routine work on local models; paid models only for coding, when needed.

## Live and planned
Live today: ops console, collectors, text and voice Q&A, confirm-before-act, audit log and alerts, email reports, and the public read-only live view.
Planned (no dates): wake word, spoken morning briefing, memory, phone confirmations, an Android app and an open-source release.

## What I Learned
Trust in an AI assistant comes from boundaries: read-only by default, a short allow-list, a human in the loop, and an audit trail.
