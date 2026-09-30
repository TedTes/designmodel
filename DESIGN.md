# designmodel — iteration contract

Source of truth for the visual board. Edit `demos/board.html` (and this file) on GitHub when the chat iterates the design.

## Product

A human playground for reasoning about one system. Not a diagram editor. Not a chatbot.

The board is the human view of a living model:

- layers on a path (Connections, Presence, Fanout, History, Search)
- tools / MCP / integrations attached to a layer
- scale controls rewrite which figure binds
- an ignore line and a door mark are mandatory outputs

Agents may later consume the same model. They do not drive the UI.

## Current human chrome

- Top: system name, level view (Context / Live path / Tooling), lens (Bind / Doors / Tradeoff)
- Strip under that: concurrent, room, rate, constraint, tradeoff, binder + ignore
- Left rail: 72px icon + name + layer. No cards.
- Canvas: figures update when controls or attached tools change
- No right inspector column

## Rules that must survive edits

1. A tool sits on a layer. Adding it is a pick, not a restyle.
2. Kafka-as-log (and similar) is a one-way door. Show it.
3. Ignore line is always visible in the top strip.
4. No invented dollar amounts or fake percentages.
5. New integrations (including MCP servers) enter the palette with: mark, name, layer, door-or-not.
6. Do not auto-import every available MCP onto the canvas.

## Files

- `index.html` + `src/*` — original L1–L6 lens playground (leave unless a change is explicit)
- `demos/board.html` — visual board (this iteration)
- `demos/README.md` — how to open the board
