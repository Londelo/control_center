# Control Center V2 - Technology Stack

## Framework
- **Next.js** - React framework (client-side rendering, static export)
- **TypeScript** - Type safety throughout
- **Styled Components** - CSS-in-JS styling for all components. HTML mockups are auto-generated references only — extract visual design patterns and translate them to Styled Components using the centralized theme tokens from `styles/theme.ts`.
- **Zustand** - State management

## Visualization
- **D3.js** - 2D visualization library for the map view
- Supports two distinct map views:
  - **Tree View:** Static layout with hierarchy-based rings and connector lines
  - **Magnitude View:** Orbital motion with percentile-based rings (no connectors)
- Rendering: SVG for < 500 nodes, Canvas fallback for 500+ nodes
- Custom force calculations for orbital physics in Magnitude View

## Data Layer
- **IndexedDB** - Native browser database (NoSQL, key-value store)
- **Dexie.js** - Promise-based IndexedDB wrapper with TypeScript support
- **LocalStorage** - User identity only (userId, username)

## Testing
- **Jest** - Unit and integration testing
- **Playwright** - End-to-end testing

## Environment
- **Local development only** - No deployment infrastructure needed
