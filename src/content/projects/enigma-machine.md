---
title: Enigma Machine
summary: A browser emulator of the Enigma cipher machine, with three settable
  rotors, a reflector, and a QWERTY lightboard.
status: archived
started: 2019-06
tags:
  - javascript
  - python
draft: false
featured: false
---
An emulator of the Enigma cipher machine. Set the three rotor wheels, type, and the lightboard lights up the encrypted letter. The wheel wirings follow the first Enigma machine's original rotors.

The hardest part was modelling the circuit. I settled on arrays for the rotors and the reflector, with a recursive variable system to carry each keypress through them.

I wrote a JavaScript version, which lived in the old site's app library, and a Python version.