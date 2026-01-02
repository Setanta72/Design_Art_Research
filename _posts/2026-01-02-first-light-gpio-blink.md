---
layout: post
title: "First Light: How much can you learn from one blinking red light?"
date: 2025-01-02
categories: [pi-sandbox, physical-computing]
---

There's something about using a computer programme to effect something in the physical world, even if its just a blinking LED. I think its the fundamental attraction of physical computing and the energy behind all those coder-dojo builds.Its the  "Hello World" of physical computing - proof that your code has reached out into the real world and made something happen.

I'm working with Claude code to build out and document examples as we go and in this session I got my Pi 5 sandbox project to first light: a simple LED blinking on GPIO17. Which is the 101 of physical computing but there was a lot to learn nonetheless. The principle of setting up to run in a virtual environment disrupts a lot of your assumptions of what "just works" on a raspberry pi. This is where we run into the challenge of Claude code being too technically competent for its own good. 

## The Circuit

Nothing fancy:
**First Test**
First test was a simple circuit just using power off the pi. Live was connected to the 3 volt pin then on to a 220Ω resistor through the LED (long leg to live) and back to GND. This produces a dim but safe LED. The hardest part of this build was finding the right resistor. I managed to blow an LED by connecting without a resistor. To avoid this brief but brilliant end here's the maths. 
Current calculation (Ohm's Law):
  I = (Vsupply - Vled) / R
  I = (3.3V - ~2V) / 220Ω
  I ≈ 6mA

  LEDs are typically rated for 10-20mA for good brightness, so 6mA is dim but safe.

  Options to increase brightness:

  | Option                                   | Result                         |
  |------------------------------------------|--------------------------------|
  | Use 5V pin (pin 2 or 4) instead of 3.3V  | ~14mA - noticeably brighter    |
  | Use 100Ω resistor (you have 4) with 3.3V | ~13mA - good brightness        |
  | Use 100Ω with 5V                         | ~30mA - too much, may burn LED |

Challenge I had here is I cant for the life of me find the 100Ω resistor in the box of tricks. I have also lost my multimeter.


**Next the blink circuit**
```
GPIO17 (pin 11) → 220Ω resistor → LED → GND (pin 6)
```


## The Code (Eventually)

The end result is beautifully simple:

```python
from gpiozero import LED
from signal import pause

led = LED(17)
led.blink()
pause()
```

But getting there was more complicated than it needed to be.

## The venv Trap

I started with best practices: create an isolated virtual environment, install only what you need, keep things clean.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install gpiozero
```

Then tried to blink an LED. Errors. gpiozero couldn't find lgpio (the GPIO library for Pi 5). Fine, install it:

```bash
pip install lgpio
```

More errors. lgpio needs to be compiled, which requires `swig` and `liblgpio-dev`. Down the rabbit hole we go, installing build dependencies just to blink an LED.

## Too good for its own good

This is not a novice level of intervention to get a simple blinking LED.Claude does not recognise its taken a wrong turn earlier and because it is so technically powerful will happily plough on fixing the problem in front of it rather than consider the context it is operating in. It took the human in the loop to point out that this was all getting too heavy and we must have gone wrong.

## The Pragmatic Solution

So as it happens we set ourselves up for failure by building the venv totally independent of the system packages on the Pi as Raspberry Pi OS already has all this installed and working. The system Python can blink an LED with zero setup:

```bash
python3 -c "from gpiozero import LED; LED(17).blink()"
```

The solution shows both the challenge and advantage of using the venv approach. Because the environment is all in one directory we could simply delete it and start over with a new environment which also inherited the system packages

```bash
python3 -m venv --system-site-packages .venv
```

Now your venv inherits `gpiozero`, `lgpio`, and `pigpio` from the system - pre-compiled, pre-configured, and ready to go. You still get isolation for your project-specific packages (numpy, scipy, etc.), but the Pi-specific hardware libraries just work.

## Pin Numbering: A Brief Confusion

While sorting out the venv issues, I also documented the GPIO pin numbering schemes, because this has changed since I first started with Raspberry Pi and Claude jumps right to the most recent method which is fine but fails to engage with the basic approach of setting pins to high and low.

| Scheme | Pin 11 is... | Used by |
|--------|--------------|---------|
| Physical (BOARD) | Pin 11 | Counting on the header |
| BCM | GPIO17 | Most documentation, gpiozero default |
| WiringPi | 0 | Deprecated, avoid |

The `pinout` command is your friend here - run it in a terminal for a nice ASCII diagram.

## Lessons Learned

1. **Pragmatism beats purity** for Pi hardware projects. Use `--system-site-packages` and move on.

2. **The Pi 5 uses lgpio**, not the older RPi.GPIO. Old tutorials may not work directly.

3. **gpiozero is the right abstraction** for most GPIO work - clean API, automatic cleanup, works across Pi models.

4. **Start simple**. One LED, one resistor, one GPIO pin. Get that working before adding complexity.
---
## Other stuff
- Learned you have to open the root folder of your virtual environment in VSCode if you want it to be available
- Changed the overall work plan to get more use out of the micro:bit v2 that I have as these are vastly more capable than the appear
- Cloning the whole sandbox via git to my Pi 400 as it is a physically more robust platform to build with on the bench

---

*This is part of my [Pi Sandbox](https://github.com/Setanta72/pi-sandbox) project - an AI guided structured exploration of physical computing, engineering mathematics, and eventually machine learning, all running on a Raspberry Pi 5.*
