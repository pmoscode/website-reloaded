import math, sys
out = sys.argv[1]
f = lambda v: f"{v:.2f}".rstrip("0").rstrip(".")
O = "var(--orange)"
def mix(p, c): return f"color-mix(in srgb, var(--orange) {p}%, {c})"

# ── Sägeblatt ───────────────────────────────────────────
C, N = 100, 36
R_TIP, R_FACE, R_GUL = 94, 88.5, 85
s = 2*math.pi/N
pt = lambda r, a: (C + r*math.cos(a), C + r*math.sin(a))
d, tips = [], []
for i in range(N):
    a = i*s - math.pi/2
    g0 = pt(R_GUL, a)
    tip = pt(R_TIP, a + .72*s)
    face = pt(R_FACE, a + .80*s)
    gq = pt(R_GUL - 3.2, a + .92*s)
    g1 = pt(R_GUL, a + s)
    d.append(("M" if i == 0 else "L") + f"{f(g0[0])} {f(g0[1])}")
    d.append(f"L{f(tip[0])} {f(tip[1])}L{f(face[0])} {f(face[1])}Q{f(gq[0])} {f(gq[1])} {f(g1[0])} {f(g1[1])}")
    # Hartmetall-Schneide: kleines Viereck an der Zahnspitze
    t = [pt(R_TIP, a + .72*s), pt(R_TIP - 4.2, a + .64*s), pt(R_TIP - 4.6, a + .74*s), pt(R_FACE + .6, a + .79*s)]
    tips.append("M" + "L".join(f"{f(x)} {f(y)}" for x, y in t) + "Z")
blade = "".join(d) + "Z"

slots = []
for k in range(4):
    a = k*math.pi/2 + math.pi/4 + .5*s
    p0, p1, p2 = pt(R_GUL - 1, a), pt(76, a + .03), pt(66, a + .1)
    slots.append(f'<path d="M{f(p0[0])} {f(p0[1])}Q{f(p1[0])} {f(p1[1])} {f(p2[0])} {f(p2[1])}"/>'
                 f'<circle cx="{f(p2[0])}" cy="{f(p2[1])}" r="2.1"/>')

saw = f'''<svg class="saw" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
<defs>
<linearGradient id="sawBody" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" style="stop-color:{mix(82, 'white')}"/><stop offset=".55" style="stop-color:{O}"/><stop offset="1" style="stop-color:{mix(72, 'black')}"/>
</linearGradient>
<radialGradient id="sawHub" cx=".4" cy=".35" r=".75">
<stop offset="0" stop-color="#E9E5E0"/><stop offset=".6" stop-color="#B9B2AA"/><stop offset="1" stop-color="#7E776F"/>
</radialGradient>
<path id="sawText" d="M{C-56} {C}a56 56 0 1 1 112 0a56 56 0 1 1 -112 0"/>
</defs>
<path class="body" d="{blade}" fill="url(#sawBody)" style="stroke:{mix(60, 'black')}" stroke-width=".6" stroke-linejoin="round"/>
<path d="{''.join(tips)}" fill="#D6D1CB" style="stroke:{mix(40, 'black')}" stroke-width=".3"/>
<g fill="none" stroke="rgb(255 255 255 / .09)" stroke-width=".5"><circle cx="{C}" cy="{C}" r="70"/><circle cx="{C}" cy="{C}" r="62"/><circle cx="{C}" cy="{C}" r="48"/><circle cx="{C}" cy="{C}" r="40"/></g>
<g class="cut" fill="var(--surface)" stroke="var(--surface)" stroke-width="1.5" stroke-linecap="round">{''.join(slots)}</g>
<text font-family="var(--mono)" font-size="5.6" letter-spacing=".6" style="fill:{mix(30, 'white')}" opacity=".75"><textPath href="#sawText" startOffset="2%">PMOSCODE · Ø 216 × 30 mm · Z 36 · max 5800 min⁻¹</textPath></text>
<circle cx="{C}" cy="{C}" r="25" fill="url(#sawHub)" stroke="rgb(0 0 0 / .35)" stroke-width=".5"/>
<circle cx="{C}" cy="{C}" r="18" fill="none" stroke="rgb(0 0 0 / .18)" stroke-width=".5"/>
<circle cx="{C}" cy="{C}" r="8.5" fill="var(--surface)" stroke="rgb(0 0 0 / .45)" stroke-width=".6"/>
</svg>'''
open(f"{out}/saw.svg", "w").write(saw + "\n")

# ── Slicer-Vorschau: halb gedruckte Vase auf dem Druckbett ──
BX, BY, H, DONE = 80, 84, 66, .62
def iso(x, y, z=0): return (BX + (x - y)*.86, BY + (x + y)*.42 - z)
def r_at(z): return 15 + 7*math.sin(z/H*math.pi*1.15) - 3*(z/H)
RX, RY = 1.22, .6
bed = [iso(-46, -46), iso(46, -46), iso(46, 46), iso(-46, 46)]
grid = []
for v in range(-46, 47, 23):
    a, b = iso(v, -46), iso(v, 46); grid.append(f"M{f(a[0])} {f(a[1])}L{f(b[0])} {f(b[1])}")
    a, b = iso(-46, v), iso(46, v); grid.append(f"M{f(a[0])} {f(a[1])}L{f(b[0])} {f(b[1])}")
zt = H*DONE
def prof(z0, z1, side, n=24):
    return [(BX + side*r_at(z0 + (z1-z0)*i/n)*RX, BY - (z0 + (z1-z0)*i/n)) for i in range(n+1)]
L, Rr = prof(0, zt, -1), prof(0, zt, 1)
# Körper: linke Kontur hoch, obere Ellipse (vordere Hälfte zurück ist verdeckt), rechte Kontur runter, untere Ellipsenhälfte
rt = r_at(zt)
body = "M" + "L".join(f"{f(x)} {f(y)}" for x, y in L)
body += f"A{f(rt*RX)} {f(rt*RY)} 0 0 0 {f(Rr[-1][0])} {f(Rr[-1][1])}"
body += "L" + "L".join(f"{f(x)} {f(y)}" for x, y in reversed(Rr))
body += f"A{f(r_at(0)*RX)} {f(r_at(0)*RY)} 0 0 1 {f(L[0][0])} {f(L[0][1])}Z"
layers = []
z = 2.0
while z < zt - .5:
    r = r_at(z); layers.append(f"M{f(BX - r*RX)} {f(BY - z)}A{f(r*RX)} {f(r*RY)} 0 0 0 {f(BX + r*RX)} {f(BY - z)}"); z += 2.0
ghostL, ghostR = prof(zt, H, -1), prof(zt, H, 1)
rH = r_at(H)
ghost = "M" + "L".join(f"{f(x)} {f(y)}" for x, y in ghostL) + "M" + "L".join(f"{f(x)} {f(y)}" for x, y in ghostR)
ghost += f"M{f(BX - rH*RX)} {f(BY - H)}a{f(rH*RX)} {f(rH*RY)} 0 1 0 {f(2*rH*RX)} 0a{f(rH*RX)} {f(rH*RY)} 0 1 0 {f(-2*rH*RX)} 0"
# Infill auf der aktuellen Schicht
cy = BY - zt
infill = "".join(f"M{f(BX + k - 30)} {f(cy - 15)}l30 30" for k in range(-24, 50, 6))
nx, ny = BX + rt*RX*.55, cy - rt*RY*.83
print_svg = f'''<svg class="preview" viewBox="0 0 160 124" aria-hidden="true" focusable="false">
<defs>
<linearGradient id="vase" x1="0" x2="1">
<stop offset="0" style="stop-color:{mix(70, 'black')}"/><stop offset=".38" style="stop-color:{mix(88, 'white')}"/><stop offset="1" style="stop-color:{mix(66, 'black')}"/>
</linearGradient>
<clipPath id="topLayer"><ellipse cx="{BX}" cy="{f(cy)}" rx="{f(rt*RX - 1.4)}" ry="{f(rt*RY - .8)}"/></clipPath>
</defs>
<path d="M{'L'.join(f'{f(x)} {f(y)}' for x, y in bed)}Z" fill="var(--surface-2)" stroke="var(--line)" stroke-width=".8"/>
<path d="{''.join(grid)}" stroke="var(--line)" stroke-width=".4" fill="none"/>
<ellipse cx="{BX + 3}" cy="{BY + 2}" rx="{f(r_at(0)*RX + 4)}" ry="{f(r_at(0)*RY + 2)}" fill="rgb(0 0 0 / .12)"/>
<path d="{ghost}" fill="none" stroke="var(--mute)" stroke-width=".6" stroke-dasharray="2 2" opacity=".7"/>
<path d="{body}" fill="url(#vase)"/>
<path d="{''.join(layers)}" fill="none" style="stroke:{mix(55, 'black')}" stroke-width=".45" opacity=".55"/>
<ellipse cx="{BX}" cy="{f(cy)}" rx="{f(rt*RX)}" ry="{f(rt*RY)}" style="fill:{mix(55, 'var(--surface)')};stroke:{mix(70, 'black')}" stroke-width=".7"/>
<path d="{infill}" clip-path="url(#topLayer)" style="stroke:{mix(80, 'black')}" stroke-width=".45" opacity=".6"/>
<g fill="none" stroke="var(--ink)" stroke-width=".8" stroke-linejoin="round">
<path d="M8 {f(ny - 20)}H152" opacity=".35"/>
<rect x="{f(nx - 9)}" y="{f(ny - 24)}" width="18" height="13" rx="1.5" fill="var(--surface)"/>
<path d="M{f(nx - 4)} {f(ny - 11)}h8v5l-3 3.5v2.5h-2v-2.5l-3-3.5z" fill="var(--surface)"/>
</g>
<circle cx="{f(nx)}" cy="{f(ny)}" r="1.1" style="fill:{O}"/>
</svg>'''
open(f"{out}/print-preview.svg", "w").write(print_svg + "\n")
