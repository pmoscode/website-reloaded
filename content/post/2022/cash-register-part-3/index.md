---
title: "DIY cash register toy - part 3 (Testing)"
date: "2022-06-29"
author: "pmoscode"
description: "Third part of DIY cash register toy from actually real parts. Doing more testing..."
tags: ["raspberry pi", "mod"]
categories: ["hardware"]
image: "img/intro.gif"
series: ["DIY cash register toy"]
---

In this article I will continue to write about my testing of the components for the DIY cash register. Starting by the configuration of the thermal printer to print graphics...

<!--more-->

This article will continue the tests from link: [Part 2](../cash-register-part-2/)

## Thermal printer Graphics

So, thw simple text print is working now, and it was very easy. Compared to that, to get that printer to print graphics was more challenging.
The main thing is, that I had to install a driver to get this working. And also there was some CUPS configuration needed...

Here is how I did it:

### First connect the thermal printer to the Raspberry Pi

I used the TTL connectivity instead of the USB, because USB didn't work for me. If you want to use USB, here is how to do this:

https://learn.adafruit.com/networked-thermal-printer-using-cups-and-raspberry-pi/connect-and-configure-printer

Here I also got the instruction, how to connect it via TTL:

1. Connect the printer to a 5V power source with 2A or larger
2. The TX/RX pins should be "cross" connected between Pi and printer (TX on printer should go to RX on Pi.)
3. Connect GND between printer and Pi
4. Disable the serial console option and enable the serial port hardware -> Is described in the link:../cash-register-part-2/[last article].

Now, it's time to install the printer driver and cups.

```bash
sudo apt-get update
sudo apt-get install libcups2-dev libcupsimage2-dev git build-essential cups system-config-printer
git clone https://github.com/adafruit/zj-58
cd zj-58
make
sudo ./install
```

You’ll see some warning messages as this compiles. That’s normal and these can be ignored.

When that is done, all the things has to be configured. After that the printer is ready for work:

```bash
sudo systemctl start cups && sudo systemctl enable cups # if needed
lpinfo -v  # should show the serial port
sudo lpadmin -p ThermalPrinter -v serial:/dev/serial0?baud=19200 -P /usr/share/cups/model/zjiang/ZJ-58.ppd  # Add printer to cups
pstat -v
lpoptions -p ThermalPrinter -l  # Show available driver options including possible values
sudo lpadmin -p ThermalPrinter -o FeedDist=3feed12mm # Set values
lpoptions -d ThermalPrinter # Set default printer
sudo cupsaccept ThermalPrinter # Enable printer job processing
sudo cupsenable ThermalPrinter # Activate printer for printing
```

"ThermalPrinter" is the name of the printer. You can choose your own... :)

Don't forget to set this everytime the Pi restart (otherwise you cannot print anything):

```bash
stty -F /dev/serial0 19200
```


## LCD display

The next thing was the LCD, which dimension is 128x64 pixels. I tried to use the original one.
The driver on that display was the *ks0108*. All this information I - luckily - found on the service manual for the cash register on the internet.

Therefore, I searched a lot, and what I found was this:

https://github.com/olikraus/u8g2/wiki/u8g2setupcpp#ks0108-128x64

and

https://www.instructables.com/Arduino-GPS-speedometer-with-a-ks0108-128x64-GLCD-/

But unfortunately none of the two solutions worked for me... :(
On te other side - the bright one -, I noticed, that the dimension of the PCB and the screw holes were standardized. So, I could use an LCD with a newer driver chip on it.

So, I ordered this one: https://www.ebay.de/itm/271513573302

Now, I could use the lib for go for the ST7920 driver, which has a SPI interface: https://github.com/olikraus/u8g2/wiki/u8g2setupcpp#st7920-128x64-2

And besides that, I could use the periph.io library for GOLang to get it working: https://github.com/periph/cmd/blob/main/ssd1306/main.go

This is everything for now. In the next article, I will add a short video of the LCD in action... Stay tuned.
