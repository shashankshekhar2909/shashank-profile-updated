---
title: "Why AST-Parsing Trumps Raw Vector Embeddings for Code RAG"
slug: "ast-parsing-vs-vector-embeddings"
date: "2026-05-10"
displayDate: "May 2026"
readTime: "12 min read"
summary: "An in-depth look at using Tree-sitter AST queries to build deterministic model context maps rather than relying purely on semantic vector chunking."
tags:
  - "RAG"
  - "Tree-sitter"
  - "AI Agents"
  - "BuildOS"
---

Standard RAG treats a codebase like a pile of prose: split files into arbitrary chunks, embed them, retrieve by cosine similarity. For documentation this is passable. For code it is structurally wrong — and the errors it causes are exactly the ones that make AI-generated code untrustworthy.

This post explains why BuildOS Knowledge Hub parses code into abstract syntax trees instead, and what that unlocks for agentic development.

## The problem with chunking code

Code has structure that chunking destroys. A 1,000-token window sliced through the middle of a class loses the class boundary. A function's signature ends up in one chunk, its body in another, its call sites in a third. Import trees, method scopes, API boundaries — all invisible to the embedding.

The result is RAG noise: retrieval that returns text that looks similar to the query while missing the code that actually governs the behavior in question. An agent asked to modify an authentication flow retrieves three fragments mentioning "auth" and none of the middleware that enforces it.

## Parse, don't split

Knowledge Hub uses Tree-sitter to parse codebases into real syntax trees across languages. Instead of text fragments, the system extracts exact entities: classes, functions, parameters, return types, call relationships, and dependencies — with 100% precision, because a grammar parser cannot be fooled the way a regex or a token window can.

Alongside code, a metadata harvester pulls structure from OpenAPI specs and live database schemas. Everything compiles into OKF — Open Knowledge Format — a structured, queryable graph of the system stored in PostgreSQL, with a vector index (pgvector/Qdrant) beside it.

## Hybrid retrieval: graph queries plus semantics

The interesting part is that AST parsing does not replace semantic search — it grounds it. Knowledge Hub runs a hybrid model:

- **Graph-based relationship queries** answer structural questions deterministically: "find all API routes that call the user database."
- **Vector-based semantic search** answers conceptual ones: "explain how authentication works."

Each mode covers the other's blind spot. Pure vectors hallucinate structure; pure graphs cannot rank by meaning. Combined, retrieval is both relevant and correct.

## Keeping the index honest

Two engineering problems dominate in practice.

**Incremental indexing cost.** Reparsing an entire repository on every commit is slow and expensive. A Git-diff watcher parses only modified files and recalculates only the affected graph dependencies, so the knowledge base updates on every push without full rebuilds.

**Token overflow in retrieval.** Agents ask for too much context. A hierarchical summarize-and-drill-down engine serves high-level system maps first and reveals detailed function bodies only when explicitly requested. The agent navigates the codebase the way a senior engineer does — top down, zooming in only where the task demands it.

## Why this matters for agents

Deterministic context is what separates an agent that ships working code from one that generates plausible fragments. When the context an agent receives is a precise structural map — not a lottery of similar-looking chunks — its output respects interfaces it would otherwise violate.

Docs drift; code does not lie about itself. Parse the code, harvest the schemas, and let the graph be the source of truth.
