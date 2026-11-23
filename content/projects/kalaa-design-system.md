---
title: "Kalaa - Open-Source Design System"
slug: "kalaa-design-system"
type: "Independent"
tags:
  - "Design System"
  - "Frontend"
  - "Platform"
timeline: "2026 - Present"
stack:
  - "React"
  - "TypeScript"
  - "Base UI"
  - "Style Dictionary"
  - "Storybook"
  - "Playwright"
featured: true
links:
  - label: "Kalaa site"
    url: "https://kalaa.buildwithshashank.com"
  - label: "Storybook"
    url: "https://kalaa.buildwithshashank.com/storybook/"
summary: "A design system with tokens, 70+ accessible React components and a framework-free theme picker, used across my products so every app shares one look and lets users choose theme, accent colour and corners."
metaDescription: "Case study: Kalaa, a token-based React design system with accessible components, switchable accents and visual and accessibility tests on every story."
problem: "Each of my apps had its own colours, components and dark-mode logic, so fixes and accessibility work were repeated per app."
outcome: "One design system used by my live products, with three switchable accents, light and dark themes, two corner styles and an appearance menu that works in React and plain HTML apps."
highlights:
  - "Three-layer tokens (palette, roles, components) so accent, theme and corner style switch at runtime"
  - "Accessible components on headless primitives, keyboard and screen-reader checked"
  - "Visual regression and axe accessibility tests on every Storybook story (545 checks)"
  - "Contrast gate in the token build: every colour pair must pass before release"
stats:
  - value: "70+"
    label: "components"
  - value: "545"
    label: "visual + accessibility checks"
  - value: "3"
    label: "accents, light and dark"
---

## Problem
Consistent, accessible UI across several products is hard when every app re-implements buttons, tables, dark mode and
focus handling.

## Solution / Approach
A shared system: design tokens built with Style Dictionary, React components on headless primitives with my own
styling, and a small framework-free theme helper so even non-React pages get the same appearance options.

## Architecture
- Tokens: palette to semantic roles to component tokens, exported as CSS variables and JSON.
- Components: React on Base UI primitives, plain CSS with tokens only.
- Quality: Storybook stories with Playwright visual snapshots and axe checks, unit tests, a contrast check in the build.
- Distribution: versioned packages with changesets; apps pin a release.

## What I Learned
A design system pays off in the boring parts: one fix to focus rings or contrast lands in every product at once.
