---
title: Airport CEO Mods
summary: A suite of BepInEx and Harmony code mods for Airport CEO that add camera, approach, runway, and map-scale options alongside existing community mods.
status: active
started: 2026-11
tags: [csharp, modding, aviation]
draft: true
---
A set of code mods for Apoapsis Studios' *Airport CEO*, written in C# with BepInEx 5 and Harmony and loaded through the community Mod Loader.

## Rules I build by

- Every mod complements popular existing mods instead of fighting them.
- Prefer postfix patches; every feature can be switched off.
- Removing a mod must never break a save.

A dev-only PatchAudit plugin maps where patches from different mods touch the same game code, to catch conflicts early.

## Done so far

- **Camera:** a wider zoom-out range
- **Approach:** a read-only approach statistics dashboard (F8) with CSV export
- **Scale:** longer runways with per-aircraft rollout distances, and bigger maps

## Planned

Airline contract offers, ground vehicle automation, baggage automation, ILS approach categories with weather minimums, and variable taxi speeds.

TODO(Justin): which modules are released, and where (link for `links.live`)? Source license: the Mod Loader is GPL-3.0, so check whether these need to be published under GPL-3.0 too.
