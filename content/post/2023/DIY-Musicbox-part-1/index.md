---
title: "DIY Music Box - Part 1"
date: "2023-01-31"
author: "pmoscode"
description: "A DIY musix box (not only) for children. Based on Raspberry Pi Zero."
tags: ["raspberry pi","gift"]
categories: ["hardware","lasercutter"]
image: "img/intro.jpg"
draft: true
series: ["DIY Music Box"]
---

It is a good choice to let children read books. But... when they are very young, so they can't read yet, it's better to
let them listen to stories / tales or even listen to music.

There are many "Music Boxes" out there, you can buy, but why not do it by yourself and add some personal touch?

So, let's get to it...

<!--more-->

## The IDEA

It should be something like the https://tonies.com[Toniebox]. But just to buy it was way too easy, and one won't learn
anything...
And the main issue when buying something: There is no personal touch...

So, the idea was born and luckily very early, because it took "some" time to get it done...

After some brainstorming with myself, I have written down some rough points:
It should...

* ...consist of wood
* ...have a simple but "breakable" power connection (wire)
* ...have a battery (so said: be portable)
* ...have some buttons (probably volume and back/forward)
* ...be easy to use
* ...work with nfc to distinguish between the audio files (music tracks or audiobooks)

This was my starting point. ^^

With that, I took care about the hardware...

## The HARDWARE

In this section I will show the hardware I started with and the wiring of the hardware components.

### The COMPONENTS

The main target was: It should be lightweight and stable...

So, with that in mind, I digged around and ended up with these components (German shops):

> **_NOTE:_** I recommend a PowerBank with Pass-Through capability, to charge and power the Pi. Otherwise, you will need
> the Battery Expansion Shield, because then you won't get any power from the Power-bank while charging it...

| Component                | Product                                      | Link                                                                                                             | Picture                                        |
|--------------------------|----------------------------------------------|------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| "Machine"                | Raspberry Pi Zero W                          | [BerryBase](https://www.berrybase.de/raspberry-pi-zero-wh)                                                       | ![Raspberry Pi Zero WH](img/RaspiZero.jpg)     |
| Power-bank               | Green Cell Powerbank GC PowerPlay20 20000mAh | [Amazon](https://smile.amazon.de/gp/product/B08BPJ9QW3)                                                          | ![Powerbank](img/Powerbank.jpg)                |
| RFID reader              | RFID Kit RC522                               | [AZ-Delivery](https://www.az-delivery.de/products/rfid-set)                                                      | ![RFID](img/RFID_RC522.webp)                   |
| Speaker                  | Diameter: 80mm                               | (from old PC speakers)                                                                                           |                                                |
| Audio-DAC                | HifiBerry Dac Zero                           | [BuyZero.de](https://buyzero.de/products/hifiberry-dac-zero-raw)                                                 | ![DAC Zero](img/DACPZ.webp)                    |
| Mini Amp.                | PAM8403                                      | [Eckstein-shop](https://eckstein-shop.de/PAM8403VolumeAdjustment2-KanalDigitalAmplifierModuleAudioverstC3A4rker) | ![PAM8403](img/pam8403_amplifier.webp)         |
| Battery Expansion Shield | 18650 V3                                     | [AZ-Delivery](https://www.az-delivery.de/products/battery-expansion-shield-18650-v3-inkl-usb-kabel)              | ![18650](img/BatteryExpansionShield18650.webp) |
| Buttons                  | Arcade buttons 24mm                          | like: [Amazon](https://smile.amazon.de/UYUYong-Schalter-Arcade-Taste-Druckknopf-Kampfspiele/dp/B09T5VXG8Z)       | ![Buttons](img/Buttons.jpg)                    |

...and "some" wiring...

### The WIRING

Now, the fun part comes: Put the hardware together.

> **_NOTE:_** Fritzing pic of wiring layout

## The CASE

The case should be simple and form wood. Every part should have enough space to fit into it. Because there will be only
one access - at the bottom - the placement of the part is very important.
Ideally the Raspi should be mounted on the side wall, the rfid reader on top - of course - and the power bank on the
bottom for easy remove (if necessary).

### Fusion 360

All that in mind, I started with a first sketch in Fusion360. For a better visualization, I got some 3D models for the
Raspberry Pi Zero and the rfid-reader. For all remaining parts, I got the measurements and created a simple cube mock
object.

Basically, the case is just a cube. Which would not necessarily be the problem for a 3D printer. But in this case the
wood has to be connected somehow. The usual way would be simple gluing, dowels or nailing. But that's not possible here
because the connections would be too weak.
Instead, finger joints has proven to be ideal here. Fortunately, there is a suitable plugin for Fusion360.

https://github.com/FlorianPommerening/FingerJoints

Now that the cube was finished in shape and connection, the positions for the wooden plates, the buttons, the power
connector and the base plate were added.

![Fusion360 Model](img/fusion360-box.png)

The next step was to export all surfaces for Inkscape for further process...

### Inkscape

Once imported into Inkscape, all areas to be engraved were provided with the appropriate SVG graphics. For example:
The front features a house with children playing and the sides feature a sunflower encasing the speakers.

![Front design](img/Vorn.svg) ![Side design](img/Seite.svg)

The challenging part here wasn't piecing the graphics together in Inkscape but finding the right graphics. Sometimes I
had to put the pictures together from many or adapt them.

Next part: the magic of laser...

### xTool M1

For this I used 6 mm cottonwood as the material. I set up everything with the own software of Makerblock (the
manufacturer of the xTool M1).
It was very straight forward. The result (here already assembled) was:

![Final box](img/box-final.jpg)

The only flaw was the dust the laser left (you can see it around the finger joints). But I managed this a little later.
You can read it [here]({{< ref "/post/2023/air-assist-xtool-m1" >}}).

## Conclusion

That was part one of my documentation. So far it's been exciting, challenging, and I've learned a lot about CAD
drawings, SVG and lasers.

Part two will follow soon. It deals with the software and details of the assembly. I will also tell you about my
experiences with the finished music box.
