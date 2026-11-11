---
title: NASCAR 06 Modding
summary: Python tooling that reads and writes NASCAR 06 Total Team Control's memory through the PCSX2 emulator to research and extend its career mode.
status: active          # TODO(Justin): last board activity 2026-08; active or shelved?
started: 2026-08
tags: [python, modding, racing, reverse-engineering]
draft: true
---
TODO(Justin): does this mod have a public name? Is it the same effort as "NR2003: Total Team Control"?

A research and tooling project for modding EA's *NASCAR 06: Total Team Control* on PlayStation 2, running in PCSX2 and talking to the game through the emulator's PINE interface from Python.

## Approach

Work started against NASCAR 07, then moved to 06 for its existing mod community, HD texture work, and the Fight to the Top career mode.

Tools built so far:

- A harness that diffs emulator save states to find where the game keeps its data
- A rig that measures AI race pace

## Findings

- AI pace is driven by per-driver attribute values that the game reads once, when the race session is built.
- Sponsor names can be edited and appear on the career offer screen.

## Goals

Reworking career, contracts, difficulty, and qualifying, with between-race bookkeeping kept in a Python ledger.
