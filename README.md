# HR Workflow Designer

A mini HR Workflow Designer module built with React (Vite + TypeScript) and React Flow, enabling HR admins to visually design and test workflows such as onboarding, leave approvals, and more.

## Architecture

This application adopts a clean separation of concerns:

- **Canvas (`components/flow`)**: Handles React Flow integration and Node drops via HTML5 native drag and drop events.
- **Nodes (`components/nodes`)**: Highly specialized and abstracted UI layers mapped dynamically by React Flow.
- **Config Panel (`components/config-panel`)**: Adaptable dynamic forms representing `Zustand` model mutations.
- **Store (`store/useWorkflowStore.ts`)**: Central unified source of truth built heavily utilizing reactive sub-stores.
- **API (`services/api.ts`)**: Mock interface layer abstracting promise-based operations simulating remote execution contexts.
- **Sandbox (`components/sandbox`)**: Simulation panel implementing depth-first traversal to resolve cycles, dead-ends, and logging the runtime sequences natively.

## Design Decisions

- **Premium CSS Native Theming**: Rejects standard overly-verbose tailwind setups and instead encapsulates logic using native CSS variables (`var(--bg-panel)`, etc.) mimicking sophisticated dark themes found in tools like modern UI editors.
- **Zustand over Context**: Chosen for its lack of boilerplate needed to expose standard `.getState()` non-reactive helpers commonly needed within React Flow cyclic interactions, providing immense performance scaling.
- **Simulation Validation**: Validation fires off synchronously upon Edge Connect preventing simple errors (Incoming edge to Start). Complex cycles are halted naturally during simulation runtime execution.

## Setup Instructions

1. `npm install`
2. `npm run dev`
3. Drag nodes from the sidebar onto the canvas space
4. Connect them via the node edge handles!
