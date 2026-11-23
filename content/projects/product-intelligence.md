---
title: "Product Intelligence - AI Catalog Data Cleaning"
slug: "product-intelligence"
type: "Independent"
tags:
  - "AI"
  - "Data"
  - "Product"
timeline: "2026 - Present"
stack:
  - "Next.js"
  - "TypeScript"
  - "FastAPI"
  - "PostgreSQL"
  - "Local open-weight models"
  - "Embeddings"
  - "Docker"
featured: true
links:
  - label: "Live demo (demo login on the page)"
    url: "https://catalog-ai.buildwithshashank.com"
summary: "Turns messy product feeds into clean catalog data: AI maps unknown columns to a standard schema, normalises values and suggests categories, with a human review queue for low-confidence results."
metaDescription: "Case study: an AI product-catalog cleaner that maps messy supplier feeds to a schema, normalises quantities and classifies products with local models and a measured review queue."
problem: "Marketplaces receive supplier product feeds in every shape: different column names, units and category trees. Cleaning them by hand is slow and inconsistent."
outcome: "A working public demo with measured accuracy: AI field mapping at 98% on a 357-column evaluation set with about 2% sent to human review, and category suggestions at 87% top-3."
highlights:
  - "Field mapping with a local model first and deterministic rules as evidence, validated against a held-out evaluation set"
  - "Quantity and unit normalisation, embedding-based category suggestions with confidence scores"
  - "Human-in-the-loop review queue for anything below the confidence threshold"
  - "Every change re-checked against the evaluation set before release"
stats:
  - value: "98%"
    label: "field mapping accuracy (357 columns)"
  - value: "87%"
    label: "category top-3 accuracy"
  - value: "~2%"
    label: "rows sent to human review"
---

## Problem
Product data arrives from many suppliers with different column names, units and category trees. Before it can power
search and filters it has to be mapped, cleaned and classified, which teams usually do by hand in spreadsheets.

## Solution / Approach
An import flow that does the repetitive work and asks a person only where it is unsure: upload a feed, review the
suggested column mapping, clean values, accept or correct category suggestions.

## Architecture
- Next.js web app on the Kalaa design system; FastAPI service with PostgreSQL.
- Field mapping: local open-weight model plus deterministic rules, with strict output validation.
- Categories: embedding-based nearest-neighbour suggestions with confidence scores.
- Evaluation harness on an open product dataset, re-run after every change.

## What I Learned
Accuracy claims only mean something with a fixed evaluation set: one hardening change once dropped mapping accuracy
sharply, and only the evaluation run caught it.
