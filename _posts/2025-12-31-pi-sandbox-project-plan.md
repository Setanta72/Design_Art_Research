---
layout: post
title: "Pi Sandbox: A 16-Session Learning Plan"
date: 2025-12-31
categories: [pi-sandbox, planning, physical-computing, mathematics]
---

# Pi Sandbox: A 16-Session Learning Plan

Following on from my [initial sandbox setup](/Design_Art_Research/2025/12/05/rpi-sandbox-setup.html), I've now developed a comprehensive project plan with the help of Claude Code. The goal: refresh my physical computing and engineering mathematics skills while building a properly documented portfolio of projects.

## The Problem I'm Solving

I've done a lot of this work before - Python maths, GPIO programming, sensors - but documented it poorly. This time I want to:

- Create well-structured, reusable code
- Build a knowledge base with linked notes (using ObsLite)
- Document the learning process for future reference
- Work at a sustainable pace (~3 hours/week)

## What I'm Working With

### Hardware
- **Raspberry Pi 5** - Main development machine
- **Sunfounder Super Kit V2.0** - LEDs, sensors, displays, motors
- **micro:bits** - Wireless sensor nodes
- **Arduinos** - Analog sensing (Pi has no ADC)
- **Mac Mini M4 Pro** - Heavy compute for ML work
- **Ender 3 + OctoPi** - 3D printing for enclosures

### Existing Resources
During the planning session, Claude explored my existing codebase and found:

- **60+ Python maths notebooks** covering SymPy, NumPy, SciPy
- **ObsLite** - A markdown editor I built with Tauri/Svelte/Rust
- **14 Sunfounder lessons** with Python code and Fritzing schematics

## The 16-Session Plan

### Phase 1: Foundation (Sessions 1-2)
- Environment setup: VSCode, venv, Jupyter
- **Hardware Catalog**: A living document of all components for project planning

### Phase 2: Physical Computing (Sessions 3-5)
- Pi GPIO essentials (curated, not all 14 tutorials)
- **micro:bit as wireless sensor node**
- I2C sensors (accelerometer, LCD display)

### Phase 3: Engineering Mathematics (Sessions 6-10)

This is the core of the project - building **5 polished notebooks** covering 1st year engineering maths:

| Notebook | Topics | Tools |
|----------|--------|-------|
| 01_calculus | Differentiation, integration | SymPy, NumPy |
| 02_differential_equations | RC circuits, oscillations | SciPy, Mathematica |
| 03_linear_algebra | Circuits, statics, eigenvalues | NumPy linalg |
| 04_statistics | Sensor data analysis | SciPy stats, Pandas |
| 05_mathematica_comparison | When to use which tool | Wolfram Language |

Each notebook will include:
- Theory with worked examples
- Engineering application
- Python + Mathematica comparison
- Exercises with solutions

### Phase 4: Applied Projects (Sessions 11-13)
- Sensor + maths integration (FFT, filtering)
- Control systems introduction
- 3D printed sensor mounts

### Phase 5: ML & AI (Sessions 14+)
- PyTorch on Mac Mini
- Local LLMs with Ollama
- Capstone projects

## The Workflow

### Session Structure (~3 hours)
```
0:00 - 0:10  Review SESSION_LOG, check plan
0:10 - 0:30  Setup hardware, activate venv
0:30 - 2:30  Main work
2:30 - 2:50  Document, commit with clear messages
2:50 - 3:00  Write "Next Steps" for next session
```

### Documentation Stack
- **Code**: VSCode on Pi with Jupyter extension
- **Notes**: ObsLite with wiki-links
- **Blog**: Posts here to Design_Art_Research
- **Version Control**: Git with explanatory commits

## Key Planning Decisions

1. **VSCode runs on the Pi** - not Remote-SSH from another machine
2. **Curated sensors** - skip 7-segment, dot-matrix, NE555
3. **micro:bit priority** - great for wireless sensor networks
4. **Mathematica included** - it's free on Pi, why not use it?
5. **Hardware catalog** - a living reference for project planning

## Next Steps

Session 1 will focus on:
1. Installing/verifying VSCode on Pi 5
2. Creating the project venv
3. Configuring Jupyter
4. Setting up ObsLite vault
5. Running the hello_world notebook

The full project plan and session logs are in the [pi-sandbox repo](https://github.com/Setanta72/pi-sandbox).

---

*This planning session was conducted with Claude Code, which explored my existing codebase, identified resources, and helped design a realistic learning plan.*
