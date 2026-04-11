# Control Center V2 - Technology Stack

## Framework
- **Next.js** - React framework with built-in API routes
- **TypeScript** - Type safety throughout
- **Styled Components** - CSS-in-JS styling
- **Zustand** - State management

## Visualization
- **D3.js** - 2D visualization library for the map view
- Supports two distinct map views:
  - **Tree View:** Static layout with hierarchy-based rings and connector lines
  - **Magnitude View:** Orbital motion with percentile-based rings (no connectors)
- Rendering: SVG for < 500 nodes, Canvas fallback for 500+ nodes
- Custom force calculations for orbital physics in Magnitude View

## Data Layer
- **SQLite** - Primary database (via Next.js API routes)
- **Local Storage** - Fallback/supplementary storage when needed

## Testing
- **Jest** - Unit and integration testing
- **Playwright** - End-to-end testing

## Environment
- **Local development only** - No deployment infrastructure needed
