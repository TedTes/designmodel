# designmodel — iteration contract

Source of truth for the visual board. Edit `demos/board.html` (and this file) on GitHub when the chat iterates the design.

## Product

A human playground for reasoning about **one system at a time**. Chat is a seed profile, not the product.

Profiles today: home-service quoting, realtime messaging, file/job ingest. A profile owns layers, scale units, palette, binder, ignore, doors.

## Chrome

- Top: profile picker + constraint controls (scale sliders, force, tradeoff, binder, ignore)
- Left: tools for the active profile (icon + name + layer)
- Canvas: figures for that profile. Context / Path / Tools and Bind / Doors sit on the canvas.

## Rules

1. Never hardcode a single system into the chrome.
2. A tool sits on a layer. Adding it is a pick.
3. Ignore line stays in the top strip.
4. No invented dollars or fake percentages.
5. New integrations enter the active profile palette with mark, name, layer, door-or-not.
