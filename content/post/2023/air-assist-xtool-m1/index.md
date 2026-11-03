---
title: "DIY Air Assist for the Xtool M1"
date: "2023-03-09"
author: "pmoscode"
description: "Fix the design flaw of the xTool M1. The air flow is too weak to make a clean - dust free - cut or engraving."
tags: ["mod"]
categories: ["lasercutter","hardware"]
image: "img/intro.jpg"
---

It has been a long awaited dream of mine to own a laser cutter to cut or engrave lots of awesome things.
For a very long time, most laser cutters were too expensive or did poorly in the ratings. That meant: wait and see...

...until I came across a Kickstarter campaign that changed all that...

<!--more-->

# The story

It is the xTool M1 from Makerblock, which I supported via **[Kickstarter](https://www.kickstarter.com/projects/makeblock/xtool-m1-superb-hybrid-laser-and-blade-cutter-and-engraver/description)**.
This project was successfully funded on 12/10/2021.

On May 30th, 2022 I held the long-awaited device in my hands. After unpacking I tried it right away.
It ran straight away, and I was also able to engrave/cut a few sample designs with the materials that came with it.

# The problem

So far so good...

What I noticed relatively quickly was the fact that the laser left a relatively dark trail of dust after the burning process. This was always aligned to the north - i.e. as seen from the laser head.

![Dust](img/dust.jpg "Dust")

The more I worked with the laser cutter, the more this discoloration bothered me. I was able to mitigate the whole thing a bit by wiping the spots with a damp sponge.
But that's not the point. Something like this shouldn't even happen...

The announcement of Makerblock on Kickstarter on September 7th, 2022 surprised me all the more. Because a so-called "Air Assist Set" was **[announced](https://www.kickstarter.com/projects/makeblock/xtool-m1-superb-hybrid-laser-and-blade-cutter-and-engraver/posts/3602265)**, which was supposed to eliminate this problem.

Here in Germany, this device should cost €159. In the end it was an air blower that is mounted around the laser lens. It then blows air, which gets the fine dust away from the material better and thus no longer sticks to it.

I have my own opinion on this design flaw with the laser's ventilation "placing" that fine dust on the material. (I intentionally do not go into detail here.)
But I'm not willing to pay 160€ for a fix that should have been done before the devices were shipped to the backers.

# The solution

That's why I started looking for an alternative to this "Air Assist".

I found what I was looking for on **[Thingiverse](https://www.thingiverse.com/thing:5493245)**

![Air Assist on Thingiverse](img/thingiverse-1.png "Air Assist on Thingiverse")

This is exactly what is sold by Makerblock, except that it mounts to the laser head a little differently.

So I printed it on my 3D printer and assembled it. It attached very well to the lower part of the laser head. (The existing screws were simply reused).

![Air Assist on Thingiverse](img/thingiverse-2.png "Air Assist on Thingiverse")

Then I ordered a rubber hose, which is actually intended for a **[windshield washer](https://www.amazon.de/dp/B08ZHL16BS)** in the car, and two **[12v air pumps](https://www.amazon.de/dp/B0786L1C3R)**.

![Air pump on Amazon](img/pump.jpg "Air pump on Amazon") ![Hose on Amazon](img/hose.jpg "Hose on Amazon")

After everything arrived, I started to assemble all the stuff. This is, how it looks like now: 

![Hose connection](img/hose_connection.jpg "Hose connection") ![Hose corner](img/hose_corner.jpg "Hose corner")

![Hose mount](img/hose_mount.jpg "Hose mount") ![Pumps assembled](img/pumps_assembled.jpg "Pumps assembled")

These simple air pumps does not have the air flow rate of the real "Air Assist", but it is enough for the time being. The result is perfect:

![Dusty material](img/material_dusty.jpg "Dusty material") ![Clean material](img/material_clean.jpg "Clean material")

Both side by side:

![Both comparison](img/comparison.jpg "Both comparison")

I will also build a case fot it with a power switch to make it look nice and tidy. It will then be next to the xTool. And then I must not forget to turn it on...

With this I made my first mod on the laser cutter. Maybe I'll take care of the fans, which are already spinning very loudly...

# Conclusion

For around €30 you get the same result as with the official Air Assist. So it was worth it...
