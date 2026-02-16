# Elm Finite Automaton Simulator

Interactive editor for building and exporting finite automata in Elm.

## How to run
1. Install Elm 0.19.1: https://guide.elm-lang.org/install/elm.html
2. From the project root, you can either build or run the live dev server:

### Build an optimized bundle
```bash
elm make src/Main.elm --optimize --output=main.js
```

Open `index.html` in your browser to use the generated `main.js` bundle.

### Run with Elm Reactor
```bash
elm reactor
```

Then open the URL printed by `elm reactor` and select `src/Main.elm`.

## Controls
- **Modes:** three buttons switch between creating states, creating transitions, and selecting/editing.
- **Create states:** click empty space to add a state.
- **Create transitions:** click a source state, then click a destination state to draw an arrow between them.
- **Select/Edit:** drag states with the left mouse button to reposition them, click a state to edit it, or click a transition to edit its label/delete it.
- **Pan:** drag with the middle mouse button to move the canvas view.
- **Accepting:** double-click a state to toggle accepting.
- **Import/Export:** use the JSON panel on the right to serialize or load automata.
