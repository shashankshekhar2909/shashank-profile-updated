---
title: "BuildOS Node Commander"
slug: "buildos-node-commander"
type: "Independent"
tags:
  - "Infrastructure"
  - "DevOps"
  - "AI"
  - "Docker"
timeline: "2026 - Present"
stack:
  - "Next.js"
  - "FastAPI"
  - "Docker"
  - "SSH"
  - "PostgreSQL"
  - "Redis"
  - "WebSockets"
featured: true
summary: "AI-powered infrastructure management platform for self-hosted servers and cloud machines with fleet visibility, Docker operations, remote execution, and migration workflows."
problem: "Managing multiple Linux servers requires switching between SSH, Docker CLI, Portainer, terminal sessions, and monitoring tools."
outcome: "Built a unified infrastructure workspace for server discovery, Docker inspection, deployments, health monitoring, remote commands, and near-zero downtime Docker migrations."
links:
  - label: "Live"
    url: "http://infra.buildwithshashank.com/"
  - label: "GitHub"
    url: "https://github.com/shashankshekhar2909/BuildOS-Node-Manager"
---

## Overview
BuildOS Node Commander is an operations workspace designed to simplify and automate server management, Docker setups, and cloud fleet infrastructure. Rather than relying on heavy agent installations on target servers, it uses secure, lightweight SSH connections to monitor processes, deploy docker-compose stacks, orchestrate container migration, and provide real-time terminal access.

## The Problem
For small-to-medium teams and homelab builders, running containerized workloads across several servers introduces operational friction:
- **Scattered Terminal SSH Sessions:** Operators must manage multiple open windows, manually copy scripts, and keep keys organized.
- **Visual Blindness:** Spotting memory leaks, disk fill-ups, or crashing containers requires running commands on each node individually.
- **Migration Hazards:** Moving a docker-compose service from one machine to another involves manual file transfers, port checks, database backups, and inevitable downtime.

## The Solution
Node Commander consolidates server control into a clean dashboard interface:
- **Agentless Architecture:** Requires only a standard SSH connection with Docker access on target nodes. No remote software installs required.
- **Centralized Logs & Metrics:** Streams real-time statistics (CPU, RAM, Disk, IO) and container logs directly to the user interface via WebSockets.
- **Zero-Downtime Migration Engine:** Automates the complete movement of docker-compose projects (volumes, configs, environment configurations) from one machine to another with verification checks.

## Architecture
```
                         +-----------------------------------+
                         |      Node Commander Dashboard     |
                         +-----------------------------------+
                                           |
                    +----------------------+----------------------+
                    | (WebSockets / API)   | (WebSockets)         |
                    v                      v                      v
             +--------------+       +--------------+       +--------------+
             |    Node A    |       |    Node B    |       |    Node C    |
             |  (SSH Connection)    |  (SSH Connection)    |  (SSH Connection)
             +--------------+       +--------------+       +--------------+
                    |                      |                      |
                    v                      v                      v
             +--------------+       +--------------+       +--------------+
             | Docker Engine|       | Docker Engine|       | Docker Engine|
             +--------------+       +--------------+       +--------------+
```

- **WebSocket Streamer:** Handles real-time system metric feeds and terminal emulation logs.
- **Relay System:** Serves as a secure file and data transfer bridge for server migrations.
- **Task Worker Pool:** Processes scheduled backups, database maintenance jobs, and health checks asynchronously.

## Technical Decisions
1. **Agentless via Paramiko/SSH:** Implementing system interactions over native SSH simplifies server setup, improves security, and ensures compatibility with almost any Linux distribution.
2. **WebSocket Terminal Integration:** xterm.js combined with FastAPI websockets provides a responsive terminal directly in the web browser, eliminating the need to leave the workspace dashboard.

## Interesting Challenges & Solutions
- **Safe Docker Stack Migrations:** Ensuring database volumes are safely unmounted and synced without data loss during a migration. The solution wraps migrations in preflight checks (disk space, volume size, port availability), performs an rsync transfer, validates the container startup status, and only then tears down the original container stack.
- **Metric Stream Congestion:** Streaming metrics for dozens of containers can overload browser rendering. We built a server-side aggregation layer that bundles metric updates, sending clean JSON frames at set intervals.

## Roadmap & Future Work
- **Terraform Integration:** Automatically import resources created via Infrastructure as Code.
- **AI incident assistant:** Analyze logs during service failures and suggest corrective commands directly in the terminal interface.
