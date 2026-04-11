# Control Center V2 - Technology Stack

## Framework
- **Next.js** - React framework with built-in API routes
- **TypeScript** - Type safety throughout
- **Styled Components** - CSS-in-JS styling
- **Zustand** - State management

## Visualization
- **React Three Fiber** - React wrapper for Three.js
- **Three.js** - 3D rendering engine for the map view
- Instanced meshes for performance (supports ~10,000-50,000 nodes)

## Data Layer
- **SQLite** - Primary database (via Next.js API routes)
- **Local Storage** - Fallback/supplementary storage when needed

## Testing
- **Jest** - Unit and integration testing
- **Playwright** - End-to-end testing

## Environment
- **Local development only** - No deployment infrastructure needed
