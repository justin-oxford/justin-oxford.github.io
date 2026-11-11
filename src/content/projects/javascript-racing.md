---
title: JavaScript Racing
summary: An F1-style time-trial racing game that runs in the browser, with a
  scratch-built physics model, tyre wear, fuel burn, and sector timing. This was
  my first ever coding project that I used to teach my self JavaScript, PHP, and
  other web development basics. I created all graphics and assets for the game
  using Photoshop. At its peak the game had its own website, completely with a
  leaderboard and tutorial. Now it survives as a basic demo you can access with
  the link below. Soon to be succeeded by JavaScript Racing 2.
status: archived
started: 2019-06
ended: 2019-08
tags:
  - javascript
  - game-dev
  - racing
  - physics
draft: false
links:
  repo: https://github.com/justin-oxford/javascript-racing
  live: /play/javascript-racing/
featured: false
---
An F1-style time-trial game that runs in the browser. It was my first large-scale personal project, and it taught me PHP, SQL, and JavaScript in more detail than any tutorial had.

## The car model

Version 0.16 rebuilt the physics around forces. Each car models engine power, drag, downforce, weight, fuel load, and tyre grip:

- **Tyre wear.** Accelerating wears the rears, braking wears the fronts, and cornering wears both.
- **Fuel burn.** The car gets lighter as the run goes on.
- **Setup.** In the pits you can adjust downforce, gearing, suspension, and brake pressure.

## Timing

Lap and sector times were saved to a database through a small PHP backend and shown on a leaderboard. Hitting the tyre barriers invalidated a lap.

## Tracks

Three circuits: Indiana Speedway, Fort Smith, and Napoli.

## Built with

JavaScript and jQuery on the front end, PHP and SQL for timing, and Photoshop for the car and track graphics. It started as a yellow rectangle you could drive around the screen (v0.01) and grew from there.