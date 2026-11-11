---
title: Airport Inc
summary: An airport-building sim in Unity at real-world scale, with free-angle runways and physics-grounded aircraft movement.
status: active          # TODO(Justin): last board activity 2026-07; active or shelved?
started: 2026-06
tags: [unity, game-dev, simulation, aviation]
draft: true
---
Airport Inc is an airport-building simulation I'm developing in Unity.

## Design goals

- **Real scale.** One Unity unit is one metre, and runways and taxiways can be laid out at any angle, with no grid.
- **Grounded movement.** Aircraft follow physics-based turn radii and acceleration, so congestion comes out of the player's own layout rather than scripted delays.
- **Abstracted passengers.** Passenger flow is modelled in aggregate instead of as individual agents.

## How it's built

The simulation core is headless: it has no Unity engine references, saves contain only core state, and the view is rebuilt from that state on load. Ground surfaces are drawn as separate meshes with SDF textures per object.

## Progress

Done so far: the time system, map generation, a basic runway build system, taxiway validation, and a single-runway ATC model covering approach, tower, ground, and ramp (pushback). Parking and the runway build UI were next.

TODO(Justin): screenshots, and what you want to say about where it's headed.
