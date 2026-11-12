---
title: Slot Car Racing
summary: A 1:32-scale slot car racing game in Unity with a custom guide-pin
  physics model, procedurally generated tracks, and race series. Currently in
  early alpha builds, hoping to release in 2027.
status: active
started: 2026-07
tags:
  - unity
  - game-dev
  - racing
  - physics
draft: false
featured: true
cover: ./images/officiallogov2alpha.png
---
A slot car racing game at 1:32 scale, built in Unity.

## Physics

Each car is modelled as two points, the guide pin and the rear axle, with track banking and a deslot condition based on angle and lateral force. The motor follows a torque–speed curve with discrete pinion and crown gearing, and throttle is a fraction of track voltage.

## Tracks

Tracks are generated procedurally and saved in a custom `.track` format, with elevation, banking, variable lane counts, and multiple lane changes per piece. A standalone HTML sketching tool solves loop closure for planning layouts.

## Progress

Time Trial and Race modes, Club / Sport / Pro series, controller support, save/load, and a full audio stack are in. Networking replicates each car's state with the car's owner authoritative.