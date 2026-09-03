---
title: "How I Built a Self-Hosted AI Operations Dashboard on a $16 VPS"
slug: "self-hosted-ai-operations-dashboard-on-a-16-vps"
date: "2026-09-03"
displayDate: "September 2026"
readTime: "9 min read"
summary: "A practical blueprint for turning a small Hetzner box into a reliable operations dashboard with health checks, auth, history, and alerting — the exact stack I would ship again."
tags:
  - "Self-Hosting"
  - "DevOps"
  - "AI Operations"
---

A lot of people want to run AI projects, but they start with the wrong question: *Which model should I use?* The more useful question is: *What operating system do I need around the model so the thing keeps working when traffic, failure, and reality show up?*

This post is the practical version of that answer. I built a self-hosted operations dashboard for my homelab on a small Hetzner VPS, and the goal was simple: make it easy to see what is up, what is down, what changed, and what needs attention without turning it into a fragile science project.

## What the dashboard needed to do

The requirements were deliberately boring:

- check real services on a schedule
- keep history instead of only showing the latest state
- require auth for every API call
- surface uptime trends and state transitions
- stay cheap enough to run continuously

That combination matters because most dashboards are either too minimal to be useful or too complicated to maintain. I wanted something I could actually trust in daily use.

## The architecture I chose

The stack is intentionally straightforward:

- **Node.js + Express** for the service layer
- **SQLite** for local history storage
- **browser-first frontend** for quick visual checks
- **scheduled probes** for host and service health
- **token auth** for the API

The important design choice was to keep the health checks near the UI the team actually uses. If the status page is slow, unauthenticated, or hard to read, nobody checks it often enough to matter.

## Why this is SEO- and LinkedIn-friendly

Technical blog posts perform better when they answer a real search intent. This one targets phrases people actually search for:

- self-hosted operations dashboard
- Hetzner VPS monitoring
- AI infrastructure monitoring
- homelab health check dashboard
- low-cost observability stack

That is also the right shape for a LinkedIn post: concrete problem, specific constraint, real outcome.

A simple LinkedIn angle from this article would be:

> I built a self-hosted operations dashboard on a $16 VPS so I could monitor my homelab without paying for another SaaS tool. The interesting part was not the UI — it was designing the system so history, auth, and alerting were all cheap enough to keep forever.

That kind of post works because it is specific, useful, and easy to discuss.

## What I learned

The biggest lesson was that reliability comes from restraint. A small dashboard becomes valuable when it does a few things consistently:

- expose the truth quickly
- keep the last few changes visible
- avoid hidden dependencies
- make the defaults safe

That is true for dashboards, but it is also true for AI products in general.

## If I were writing this post for a founder audience

I would lead with the pain, not the stack:

- We kept losing visibility into small infra issues.
- SaaS monitoring was overkill for the environment.
- The fix was a simple internal dashboard with hard auth and history.

That framing gives you a stronger LinkedIn hook and a better SEO headline at the same time.

## Closing thought

Self-hosting is not about being romantic about servers. It is about owning the feedback loop. When the system tells you the truth fast, you can move faster with less guesswork.

If you want, I can also turn this into a LinkedIn carousel outline or a shorter founder-friendly version.
