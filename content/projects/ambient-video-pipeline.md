---
title: "Ambient Videos - Automated 4K Film Pipeline"
slug: "ambient-video-pipeline"
type: "Independent"
tags:
  - "AI"
  - "Automation"
  - "Media"
timeline: "2026 - Present"
stack:
  - "Python"
  - "FFmpeg"
  - "YOLO object detection"
  - "YouTube Data API"
  - "Playwright"
  - "Docker"
featured: false
links:
  - label: "YouTube channel"
    url: "https://www.youtube.com/channel/UCHqxzwYnBGcCwabpQuQ06fw"
summary: "A pipeline that scouts licensed 4K footage and sound, screens every clip for people and boats with object detection, edits hour-long calm nature films, and publishes them to YouTube through an approval ledger."
metaDescription: "Case study: an automated 4K nature-film pipeline with licensed-source tracking, object-detection QC, approval gates and private-first YouTube publishing."
problem: "Long-form ambient films need dozens of clean licensed clips, consistent sound and careful QC; doing it by hand takes days per film."
outcome: "Hour-long 4K films produced end to end with a review gallery and control panel, live upload progress, and every source and licence recorded."
highlights:
  - "Footage and audio scouting through public APIs with licence and source recorded per clip"
  - "QC: frame strips every 2 s plus full-resolution object detection for people, boats and structures"
  - "Approval ledger tied to file checksums; uploads are private first, public only after sign-off"
  - "Control panel with review queue, live render and upload progress, and push alerts"
---

## Problem
Making calm, long-form nature films at a steady pace needs a lot of careful, repetitive work: finding licensed clips,
rejecting anything with people or buildings, levelling sound and publishing safely.

## Solution / Approach
A pipeline with humans at the decision points: automated scouting, screening and editing, then review in a gallery and
approval before anything goes public.

## What I Learned
Low-resolution checks miss small details: full-resolution object detection plus a manual look at flagged frames caught
people and ships that contact sheets had missed.
