---
title: "BuildOS Knowledge Hub"
slug: "buildos-knowledge-hub"
type: "Independent"
tags:
  - "Knowledge Management"
  - "AI"
  - "Developer Productivity"
  - "Search"
timeline: "2026 - Present"
stack:
  - "Next.js"
  - "FastAPI"
  - "PostgreSQL"
  - "Redis"
  - "Docker"
  - "Vector Database"
  - "Tree-sitter"
  - "Git"
  - "LLMs"
featured: true
summary: "Knowledge management layer that indexes repositories, docs, architecture notes, prompts, and API specs into structured OKF engineering knowledge for AI agents."
problem: "Engineering knowledge is scattered across repositories, READMEs, docs, prompts, API specs, and architecture notes, forcing developers to repeatedly rebuild context."
outcome: "Created a structured project memory layer that extracts applications, modules, APIs, services, schemas, dependencies, decisions, and deployment workflows for AI retrieval."
stats:
  - value: "OKF graph"
    label: "structured knowledge format"
  - value: "Tree-sitter"
    label: "AST parsing, not text chunks"
  - value: "Hybrid"
    label: "semantic + relationship search"
highlights:
  - "Tree-sitter code layout parsing"
  - "Unified repository dependency graph"
  - "Semantic and relationship hybrid search"
mockup:
  - text: "// Indexing changed sources..."
    style: "muted"
  - text: "→ Scanned 18 modules (Python, TypeScript)"
    style: "info"
  - text: "✓ Exported OKF schema graph map"
    style: "ok"
  - text: "✓ Synchronized 42 vector embeddings to store"
    style: "accent"
  - text: "Query semantic search: \"Auth callback flow\""
    style: "muted"
links:
  - label: "Live"
    url: "https://projects.buildwithshashank.com/"
  - label: "GitHub"
    url: "https://github.com/shashankshekhar2909/BuildOS-KB"
---

## Overview
BuildOS Knowledge Hub is the semantic repository and memory foundation of the BuildOS platform. It is designed to act as an automated "engineering memory," continuously scanning project workspaces, documentation repositories, design assets, and database schemas. It compiles these disparate pieces of information into a centralized, queryable, structured graph format known as OKF (Open Knowledge Format), ready to be consumed by both human engineers and autonomous AI agents.

## The Problem
As engineering systems scale, technical knowledge becomes heavily fragmented:
- **Scattered Sources:** Documentation lives in wikis, Notion, Google Docs, and codebase READMEs, while the actual implementation lives in code.
- **Outdated Docs:** Code evolves faster than documentation, causing the written material to drift and become inaccurate.
- **RAG Noise:** Standard RAG (Retrieval-Augmented Generation) splits code files into arbitrary chunks, losing structural meaning (e.g., class structures, method scopes, import trees, and API boundaries).

## The Solution
Knowledge Hub acts as a specialized parser and semantic router:
- **Structural Code Parsing:** Using Tree-sitter, it parses codebases into abstract syntax trees (ASTs) rather than raw text chunks. This allows the system to map out exact classes, functions, calls, and dependencies.
- **Automatic Schema Harvesting:** The hub connects to database instances and OpenAPI configurations to extract API structures, data schemas, and validation requirements.
- **Semantic Syncing:** It tracks git branches and commits to run incremental document builds, updating the knowledge base on every push.

## Architecture
```
[ Code Repos ] ---> ( Tree-sitter Parser )
                               |
[ OpenAPI Specs ] --> ( Metadata Harvester ) --> [ OKF Builder ] ---> [ PostgreSQL (Graph/Relational) ]
                               |
[ Database Schemas ] ----------+                                     [ Vector DB (Semantic Index) ]
                                                                                   |
                                                                                   v
                                                                     [ AI Agents / API Endpoint ]
```

- **AST Parsing Engine:** Tree-sitter integration for multi-language syntax tree extraction.
- **Storage Layer:** PostgreSQL for relational data and graph boundaries, paired with a Vector database (pgvector/Qdrant) for fast conceptual search.
- **API Interfaces:** Highly optimized FastAPI routes that deliver structured context objects to AI tools.

## Technical Decisions
1. **Tree-sitter AST Over Regex/Strings:** Using real grammar parsers instead of regular expressions ensures class boundaries, parameters, and return types are captured with 100% precision.
2. **Hybrid Search Model:** We combined graph-based relationship queries (e.g., "Find all API routes that call the user database") with vector-based semantic search ("Explain how authentication works") to achieve high relevance and accuracy.

## Interesting Challenges & Solutions
- **Incremental Indexing Cost:** Reparsing an entire repository on every commit is computationally expensive and slow. We implemented a Git-diff watcher that parses only modified files, recalculating only affected graph dependencies.
- **Token Overflow in Retrieval:** When agents request codebase context, they often ask for too much. We built a hierarchical summarize-and-drill-down engine that serves high-level system maps first and only reveals detailed function code when explicitly requested.

## Roadmap & Future Work
- **Dependency Drift Alerts:** Automatic notification if a pull request modifies an API contract that breaks downstream microservices.
- **Multi-repo Graph Linking:** Expand the dependency graph across separate git repositories, tracing data flows across microservice clusters.
