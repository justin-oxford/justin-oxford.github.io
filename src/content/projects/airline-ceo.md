---
title: Airline CEO (working title)
summary: An airline management game in Unity (because I don't get enough airline
  ops at work apparently). Early in design with hopes of a deep simulation.
status: active
started: 2026-10
tags:
  - unity
  - game-dev
  - simulation
  - aviation
draft: false
featured: true
---
An airline management game in Unity, in early design. Play is planned to start in 1950.

## Design

- **Systems publish, views read.** The simulation runs with no engine or UI references, so it can be tested headless.
- **Demand by city.** Passenger demand is calculated per city, not per agent, and real connections are modelled, so a wide network with thin frequency is penalised.
- **Scale.** A stress-test harness is planned to push the sim toward thousands of flights.

Planned systems include fleet management, scheduling, maintenance, financing, hubs, delays, and crew training.