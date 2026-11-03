---
title: "DIY cash register toy - part 2 (Testing)"
date: "2022-02-10"
author: "pmoscode"
description: "Second part of DIY cash register toy from actually real parts. Doing some testing..."
tags: ["raspberry pi", "mod"]
categories: ["hardware"]
image: "img/intro.gif"
series: ["DIY cash register toy"]
---

So, in the first part of the DIY cash register toy I introduced the parts which will be used for the cash register.

Now, I will do test with the Rfid reader I already owned and the thermal printer which I bought and which arrived at first...

<!--more-->

## The Rfid reader
I bought the Rfid reader from AliExpress some time ago. Originally I bought it for my DIY Media Player Box, but I couldn't use it, because it only reads the code once.
It behaves like an ordinary keyboard.

But in this case, this is exactly the behaviour I need...

So, here is a picture of it:

![RFid-Reader](img/rfid-reader.jpg)

If you connect it to USB, and type this in your terminal:

```bash
lsusb
```

You will get this (somewhere in between the other output):
```bash
...
Bus 003 Device 048: ID ffff:0035 Sycreader USB Reader
...
```

So, it is recognised, great!

Like said, it behaves like an ordinary keyboard, so you will find it under */dev/input/*.
It will have a name like *eventXX*, where XX is a number.

But how to get the right one?
And how to utilize the reader?

For that I wrote a small GO util application: https://github.com/pmoscode/diy-cash-register-toy/tree/main/input-reader

This application can help you to get the right event and to get the data from the reader (You will need the name which "lsusb" provides you).
As an addition, when you have a mqtt broker configured, you can provide the host and topic to the application, and the read code will be sent there.

That's all for the Rfid reader. Now, the thermal printer will be tested...

# The Thermal printer

The Thermal Printer is a funny little thing. You can print almost "everything" in b&w...

Here it is, how it looks like:

![Overview](img/tp-1.jpg)

## Wiring

The printer came with a power adapter and a controller PBC. The PCB has a USB port, so it's possible to connect it there.

![Connection](img/tp-3.jpg)

But in my case, the USB didn't work. I couldn't figure out why and how to fix it.
So, I used the direct connection to the printer (via the three wires - black, green and yellow). It's a serial connection, which is perfect for the Raspberry Pi.
I also could wire it without the need to cut the wires:

![Connection](img/tp-4.jpg)

### Configuration

Now that the wiring is done, the Raspberry Pi needs to be configured.

First, you need to enable the Serial Console:

#### Via /boot/config.txt

Edit the */boot/config.txt* on the SD card directly with
```bash
sudo nano /boot/config.txt
```
At the bottom, last line, add the line *enable_uart=1*.

![Via config.txt](img/sc-boot.png)

#### Via raspi-config

Connected to the Raspberry Pi, run

```bash
sudo raspi-config
```

Go down to *Advanced Options*  
![Main menu](img/sc-config-1.png)

Then go down to *Serial*  
![Advanced options](img/sc-config-2.png)

Then select *Yes*  
![Enable serial](img/sc-config-3.png)

It should be enabled now  
![Confirmation](img/sc-config-4.png)

When it asks you to reboot, go to Yes, and you're done with the first configuration part.

Now it's time to test the printer...

#### Testing

When the Raspberry Pi is rebooted, connect to it. You should now get an additional device in */dev*, like */dev/serial0*

But before you can send text to the printer, you have to configure the serial speed with

```bash
stty -F /dev/serial0 19200
```

Where *19200* is the baud rate. It may vary, if you have a different thermal printer.

After that is done, you can send text to the printer now:

```bash
echo -e "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890\\n\\n" > /dev/serial0
```

*_Et voilà!_*


In the next article I will show how to print graphics with that printer.

Ah, and last but not least, here is the printer in action (with a sneak peek on the graphics):

{{< video src="/mov/2022/cash-register-part-2/tp-5.mp4" autoplay="false" >}}
