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
- **Modes:** four buttons switch between creating states, creating transitions, moving states, and configuring transitions.
- **Create states:** click empty space to add a state.
- **Create transitions:** click a source state, then click a destination state to draw an arrow between them.
- **Move:** drag states with the left mouse button to reposition them.
- **Configure transitions:** click a transition to edit its label or delete it.
- **Pan:** drag with the middle mouse button to move the canvas view.
- **Accepting:** double-click a state to toggle accepting.
- **Import/Export:** use the JSON panel on the right to serialize or load automata.
