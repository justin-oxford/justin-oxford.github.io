---
title: Airline CEO
summary: An airline management game in Unity, early in design, with a simulation core that runs without any UI.
status: active          # TODO(Justin): early design; active or shelved?
started: 2026-10
tags: [unity, game-dev, simulation, aviation]
draft: true
---
TODO(Justin): is "Airline CEO" the final title? It's very close to the commercial game Airport CEO.

An airline management game in Unity, in early design. Play is planned to start in 1950.

## Design

- **Systems publish, views read.** The simulation runs with no engine or UI references, so it can be tested headless.
- **Demand by city.** Passenger demand is calculated per city, not per agent, and real connections are modelled, so a wide network with thin frequency is penalised.
- **Scale.** A stress-test harness is planned to push the sim toward thousands of flights.

Planned systems include fleet management, scheduling, maintenance, financing, hubs, delays, and crew training.
