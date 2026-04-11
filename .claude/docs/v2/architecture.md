# Control Center V2 - Architecture

## Core Philosophy

**Strict separation of concerns with strong type boundaries between layers.**

The architecture follows a layered approach where each layer has a single, well-defined responsibility. Frontend never directly touches the database. Backend never directly manipulates UI state. Business logic lives in a pure domain layer that knows nothing about HTTP, databases, or React.

This approach enables:
- Easy testing through mocking
- Swappable implementations (e.g., LocalStorage → API)
- Clear contracts between layers
- Independent evolution of each layer
- Strong adherence to SOLID principles

---

## Architectural Layers

### Layer 1: Presentation Layer
**Purpose:** Render UI, handle user interactions, display data

**Characteristics:**
- React components, pages, and UI elements
- Only interacts with the Application Layer
- Receives data as simple objects (DTOs)
- Emits user actions as function calls
- No business logic, no database access, no computations

**Location:** `app/`, `components/`

---

### Layer 2: Application Layer
**Purpose:** Coordinate between UI and backend, manage application state

**Characteristics:**
- Custom React hooks for component logic
- Zustand stores for global state
- Service modules that call API routes
- Transforms data between UI format and API format
- Orchestrates workflows but doesn't contain business rules

**Location:** `hooks/`, `stores/`, `services/`

**Key Concept:** This layer is the glue. It knows about React (hooks) and HTTP (API calls) but delegates all business decisions to the domain layer.

---

### Layer 3: API Routes (HTTP Boundary)
**Purpose:** Accept HTTP requests, route to domain logic, return responses

**Characteristics:**
- Thin routing layer
- Validates incoming requests
- Calls domain use cases
- Serializes responses
- No business logic lives here

**Location:** `app/api/`

**Key Concept:** This is just a translation layer between HTTP and the domain. It should be almost boring - just routing.

---

### Layer 4: Domain Layer
**Purpose:** Business logic, rules, computations

**Characteristics:**
- Pure business logic - no dependencies on frameworks
- Works with domain entities (rich objects with behavior)
- Depends on repository interfaces (abstractions), not implementations
- Contains use cases (business operations) and computations (pure functions)
- This layer could theoretically be extracted and run in Node.js, Python, or any environment

**Location:** `domain/`

**Sub-structure:**
- **Entities:** Domain models with behavior
- **Use Cases:** Single business operations (e.g., "Complete PowerList Task")
- **Computations:** Pure functions (e.g., "Calculate Progress")
- **Types:** Domain-specific type definitions

**Key Concept:** This is the heart of the application. All business rules live here. It's framework-agnostic and could run anywhere.

---

### Layer 5: Data Access Layer
**Purpose:** Interact with external data sources (database, localStorage)

**Characteristics:**
- Implements repository interfaces defined by domain layer
- Only layer that touches SQLite and localStorage directly
- Converts between database rows and domain entities
- No business logic - just CRUD operations

**Location:** `infrastructure/`

**Sub-structure:**
- **Database:** SQLite client, migrations
- **Repositories:** Abstract data access patterns
  - **Interfaces:** Contracts (what operations are available)
  - **Implementations:** Concrete implementations (how to do it)

**Key Concept:** The domain layer defines what data operations it needs (interfaces). This layer provides the implementation. Swap implementations without touching business logic.

---

## Directory Structure Philosophy

### Organized by Feature and Layer

```
src/
├── app/                          # Presentation (Next.js pages)
├── components/                   # Presentation (UI components)
│   ├── shared/                  # Reusable UI primitives
│   ├── layout/                  # App layout components
│   └── features/                # Feature-specific components
├── hooks/                        # Application (React integration)
├── stores/                       # Application (state management)
├── services/                     # Application (API clients)
├── domain/                       # Domain (business logic)
│   ├── daily-ritual/            # Feature-based
│   ├── todo-system/             # Feature-based
│   └── shared/
├── infrastructure/              # Data Access
│   ├── database/
│   └── repositories/
├── shared/                      # Cross-cutting utilities
└── styles/                      # Design tokens and theming
    ├── theme.ts                 # Single source of truth
    ├── GlobalStyles.tsx
    └── animations.ts
```

**Rationale:**
- Features are grouped together in the domain layer
- Each layer is physically separated
- Component organization by reusability (shared → layout → features)
- Design tokens centralized in styles/theme.ts
- Easy to navigate: "Where's the business logic for PowerList?" → `domain/daily-ritual/`
- Easy to test: Mock repositories, test domain logic in isolation

---

## Type Boundaries

### DTOs (Data Transfer Objects)
Used at layer boundaries, especially between frontend and backend.

**Purpose:** Define clear contracts. Frontend and backend agree on shape of data being exchanged.

**Characteristics:**
- Simple, serializable objects
- No methods, no behavior
- Used for API requests/responses
- Frontend sends DTOs, receives DTOs

**Location:** `services/types/dtos.ts`

---

### Domain Entities
Used within the domain layer.

**Purpose:** Rich objects that encapsulate business rules and behavior.

**Characteristics:**
- May contain methods (business logic)
- May have computed properties
- Represent core business concepts
- Not directly serialized over HTTP

**Location:** `domain/{feature}/entities/`

---

### Mapping Between Types
The Application Layer and API Routes handle conversion:
- DTO → Domain Entity (when calling domain)
- Domain Entity → DTO (when returning to frontend)

This keeps the domain layer pure and the frontend simple.

---

## SOLID Principles in Practice

### Single Responsibility Principle
**Each class/module has one reason to change.**

- Use cases do one business operation
- Repositories handle one entity's persistence
- Components render one UI concern
- Computations perform one calculation

### Open/Closed Principle
**Open for extension, closed for modification.**

- Add new use cases without changing existing ones
- Add new repository implementations without changing domain logic
- Add new API endpoints without touching business rules

### Liskov Substitution Principle
**Implementations can be swapped without breaking contracts.**

- Any implementation of `IPowerListRepository` works
- Mock repositories for tests, SQLite repositories for production
- Could swap LocalStorage for Cookies without changing domain logic

### Interface Segregation Principle
**Many specific interfaces, not one giant interface.**

- `IPowerListRepository` for PowerList operations
- `ITodoNodeRepository` for TodoNode operations
- `IUserRepository` for user data
- No monolithic `IDatabase` interface

### Dependency Inversion Principle
**Depend on abstractions, not concretions.**

- Domain layer depends on repository **interfaces**
- Concrete implementations are injected at runtime
- Business logic never imports `SQLite` or `localStorage` directly

---

## Key Architectural Patterns

### Repository Pattern
Abstract data access behind interfaces. Domain layer defines what it needs, infrastructure layer provides it.

**Benefits:**
- Swappable data sources
- Easy testing (mock repositories)
- Domain logic doesn't know about database structure

---

### Use Case Pattern
Each business operation is a discrete class or function.

**Benefits:**
- Clear entry points for business logic
- Easy to test individual operations
- Easy to trace: "Where does X happen?" → Find the use case

---

### Dependency Injection
Use cases and repositories are constructed with their dependencies, not creating them internally.

**Benefits:**
- Testability (inject mocks)
- Flexibility (swap implementations)
- Clear dependency graph

---

### Pure Functions for Computations
Business calculations are pure functions: same input always produces same output, no side effects.

**Benefits:**
- Extremely testable
- No hidden dependencies
- Easy to reason about
- Can be memoized/cached

---

## Centralized Date/Time System

**Problem:** Date-based logic scattered across components leads to inconsistency.

**Solution:** Zustand store manages current date as single source of truth.

**Implementation:**
- `dateStore` holds current date being viewed
- All components read from this store
- Date navigation updates the store
- WIN/LOSS, history, and stats all reference this date

**Benefits:**
- No prop drilling
- Consistent date across all widgets
- Easy to implement "time travel" features

---

## State Management Strategy

### Local Component State
Use React `useState` for:
- UI-only state (modal open/closed, form inputs)
- Ephemeral state that doesn't affect other components

### Zustand Stores
Use for:
- Cross-component state (current date, dashboard layout)
- Cached API responses
- UI state that multiple components need

### Server State (via API)
Source of truth for:
- All persisted data (tasks, nodes, settings)
- Computed data (WIN/LOSS, progress, stats)

**Pattern:** Fetch from API, cache in Zustand, display in components. Mutations go through API, then update local cache.

---

## Design System Architecture

### Philosophy: Zero Duplication, Single Source of Truth

**Core Principle**: No visual property (color, spacing, typography, sizing) should ever be hardcoded or duplicated. Everything flows from a centralized theme definition.

**Goal**: Change one value in the theme file and see it update everywhere in real-time.

### Design Token System

**Location:** `src/styles/theme.ts`

All visual design properties are defined once in a single theme object:

```typescript
export const theme = {
  colors: {
    // Semantic color names (what they mean, not what they are)
    background: '#131313',
    backgroundAlt: '#1a1a1a',
    surface: '#20201f',
    surfaceHigh: '#2a2a2a',
    
    primary: '#c9c6c5',
    primaryDark: '#5f5e5e',
    
    secondary: '#b8c3ff',
    secondaryContainer: '#0043eb',
    
    tertiary: '#e9c349',        // Gold/accent
    tertiaryContainer: '#cca730',
    
    error: '#ffb4ab',
    errorContainer: '#93000a',
    
    success: '#4ade80',         // Green
    warning: '#facc15',         // Yellow
    
    textPrimary: '#e5e2e1',
    textSecondary: '#c4c7c7',
    textTertiary: '#8e9192',
    
    border: '#444748',
    borderSubtle: 'rgba(142, 145, 146, 0.1)',
    
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  typography: {
    fontFamily: {
      body: 'Inter, sans-serif',
      heading: 'Space Grotesk, sans-serif',
      mono: 'monospace',
    },
    fontSize: {
      xs: '10px',
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      xxl: '24px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.2em',
      wider: '0.3em',
    },
  },
  
  sizing: {
    buttonHeight: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    inputHeight: {
      sm: '32px',
      md: '40px',
    },
    iconSize: {
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '48px',
    },
    nodeSize: {
      level0: '96px',  // Serve God
      level1: '48px',  // Cornerstones
      level2: '32px',
      level3: '24px',
      level4: '16px',
      level5: '12px',  // minimum
    },
  },
  
  borderRadius: {
    none: '0px',
    sm: '2px',
    md: '4px',
    lg: '8px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.2)',
    glow: {
      gold: '0 0 60px rgba(233, 195, 73, 0.3)',
      blue: '0 0 40px rgba(184, 195, 255, 0.2)',
      tertiary: '0 0 20px rgba(233, 195, 73, 0.2)',
    },
  },
  
  effects: {
    blur: {
      glass: 'blur(12px)',
      atmospheric: 'blur(120px)',
    },
    transition: {
      fast: '150ms ease-out',
      base: '300ms ease-out',
      slow: '500ms ease-out',
    },
  },
};

export type Theme = typeof theme;
```

**Benefits:**
- Change `tertiary` color once → updates all buttons, accents, glows, badges automatically
- TypeScript autocomplete guides developers to valid theme values
- Impossible to have inconsistent colors/spacing across the app
- Theme can be swapped (light mode, different color schemes) by changing this one file

### Component Reusability Strategy

**Philosophy:** If two UI elements look similar, they should share the same component. No duplicate button/input/panel implementations.

**Shared Component Library:**
All reusable UI primitives live in `src/components/shared/`:
- Buttons (all variants: primary, secondary, ghost, sizes)
- Inputs (text, search, all variants)
- Panels (glass morphism cards, containers)
- Icons (Material icon wrapper with consistent sizing)
- Badges (filter chips, status indicators)
- Tooltips
- Modals
- Progress bars

**Component Design Principle:**
- Each component uses theme values exclusively (no hardcoded properties)
- Accepts `variant` and `size` props for flexibility
- Extends existing components rather than creating duplicates

**Example:** One `Button` component with variants (`primary`, `secondary`, `tertiary`, `ghost`) and sizes (`sm`, `md`, `lg`) serves all button needs across the entire app.

### Component Organization

```
src/
├── styles/
│   ├── theme.ts              // Single source of truth for all design tokens
│   ├── GlobalStyles.tsx      // CSS reset, body styles
│   └── animations.ts         // Shared keyframe animations
│
├── components/
│   ├── shared/               // Reusable UI primitives (buttons, inputs, panels)
│   │                         // Used throughout the app, highly generic
│   │
│   ├── layout/               // Layout components (TopBar, Sidebar, MobileNav)
│   │                         // App shell structure
│   │
│   └── features/             // Feature-specific components
│       ├── MapView/          // Map visualization components
│       ├── Dashboard/        // Dashboard widgets
│       ├── NodeDetails/      // Node detail page components
│       └── ...
```

**Directory Rules:**
- `shared/`: Generic, reusable across any feature
- `layout/`: App-level structural components
- `features/`: Feature-specific, not intended for cross-feature reuse

**Before creating a new component:**
1. Check if it exists in `shared/`
2. If 80% similar, extend existing component with new variant
3. Only create new component for truly unique functionality

---

## API Route Organization

**Structure:** Mirror domain structure in API routes.

```
app/api/
├── daily-ritual/
│   ├── power-list/
│   └── standards/
├── todo-system/
│   ├── nodes/
│   ├── relationships/
│   └── comments/
└── settings/
```

**Each route:**
- Validates incoming request
- Calls appropriate use case
- Returns DTO response

**Benefits:**
- Predictable URL structure
- Easy to find: "Where's the API for X?" → `api/{feature}/`
- RESTful conventions

---

## Database Connection Pattern

**Single SQLite client instance**, initialized on server startup.

**Location:** `infrastructure/database/client.ts`

**Usage:** Repositories receive the database client via dependency injection.

**Migration Strategy:** Separate migration files, run on startup or via CLI command.

**Benefits:**
- Connection pooling handled centrally
- Easy to swap for different database (Postgres, etc.)
- Migrations version-controlled

---

## Testing Strategy Enabled by Architecture

### Unit Tests
- Test domain use cases in isolation (mock repositories)
- Test computations as pure functions
- Test repositories with in-memory SQLite

### Integration Tests
- Test API routes with test database
- Test full use case → repository → database flow

### Component Tests
- Test components with mocked hooks/services
- Test UI logic without hitting real APIs

### E2E Tests (Playwright)
- Test full user workflows
- Test against real (test) database

**Key Insight:** Layered architecture makes each level independently testable.

---

## Performance Considerations

### Computation Caching
Progress, WIN/LOSS, and health calculations are expensive. Cache results in:
- Zustand stores (frontend)
- Memoized selectors
- API response headers (cache control)

**WIN/LOSS Retroactive Computation:**
- Changing WIN/LOSS configuration recalculates all historical days on-demand
- Computation is expensive for large date ranges
- Strategy: Compute only visible date range (e.g., current month view in History page)
- Use lazy loading: Compute additional ranges as user scrolls/navigates
- Consider background worker for full recalculation when config changes

### Lazy Loading
- 2D map only loads when user navigates to Map page
- D3.js bundled separately
- Widgets load their data independently

### Optimistic Updates
For instant feedback:
- Update UI immediately on user action
- Call API in background
- Rollback if API fails

### Efficient Queries
Repositories should:
- Use indexes on userId and date fields
- Fetch only needed data (not SELECT *)
- Batch operations when possible

---

## Future-Proofing

This architecture enables future changes:

**Move to cloud/server:**
- Swap SQLite repositories for Postgres repositories
- Swap LocalStorageUserRepository for API-based auth
- Domain layer unchanged

**Add mobile app:**
- Domain layer can be shared (compile to native)
- New presentation layer (React Native)
- Same API routes

**Add real-time sync:**
- Add WebSocket layer above API routes
- Zustand stores subscribe to updates
- Domain layer unchanged

**Add multi-user:**
- Add authentication middleware to API routes
- Repositories already filter by userId
- Domain logic already multi-user ready

---

## Summary: Why This Architecture?

**Maintainability:** Each layer has one job. Changes are localized.

**Testability:** Every layer can be tested in isolation.

**Flexibility:** Swap implementations without rewriting business logic.

**Clarity:** Clear boundaries. "Where does X live?" has an obvious answer.

**Scalability:** Can grow to cloud, mobile, multi-user without fundamental rewrites.

**SOLID Compliance:** Principles aren't just theoretical - they're baked into the structure.

---

The architecture may seem over-engineered for a local app. But it's built to last. When we need to add features, change technologies, or scale up, the foundation is ready.
