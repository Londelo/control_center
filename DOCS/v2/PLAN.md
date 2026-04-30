# Control Center V2 - Implementation Plan

## OVERVIEW: What You're Building

This is the **step-by-step implementation guide** for building Control Center V2 from the ground up using **Test-Driven Development (TDD)**. This plan consists of **39 sequential commits**, each representing a complete, tested milestone. Every commit includes all modified files together with a detailed commit message documenting what was tested and what was built.

---

## INSTRUCTIONS: Before You Start

### Step 1: Read the Documentation (In This Order)

You must read and understand the following documentation files before beginning implementation:

#### **Foundation Documents (Read First)**
Located in `.claude/docs/v2/`:

1. **`architecture.md`** - Core architecture philosophy, layering strategy, SOLID principles, directory structure, design system, and performance considerations. This is your blueprint.

2. **`tech.md`** - Technology stack overview (Next.js, TypeScript, D3.js, Zustand, Dexie, Jest, Playwright). Understand what tools you're using and why.

3. **`use-cases.md`** - Complete functional specification of the application. Defines all features, user flows, data models, and behavior. This is your requirements document.

#### **Design References (Read Second)**
Located in `.claude/docs/v2/designs/`:

4. **`mapview.md`** - Detailed design specification for the Map View feature (Tree View and Magnitude View with D3.js). Contains formulas, interaction models, and resolved design decisions.

5. **HTML mockups** - Visual design references:
   - `dashboard.html` - Dashboard layout and widget design
   - `mapview.html` - Map view visual design
   - `nodedetails.html` - Node detail page layout
   - `priorities.html` - Priorities page design
   - `history.html` - History & Stats page design
   
   **IMPORTANT:** These are static HTML mockups using TailwindCSS. You must transform them into proper React/Next.js components using the centralized theme system defined in `styles/theme.ts`. Do NOT copy HTML directly - extract the visual design patterns and implement them as reusable components.

#### **Standards (Read Third - Reference Throughout)**
Located in `.claude/docs/v2/standards/`:

6. **`coding-standards.md`** - Coding conventions specific to this project (naming, Ramda usage, directory structure, pure functions, etc.). Supplements general best practices.

7. **`testing-standards.md`** - Testing strategy for this project (Jest for unit/integration, Playwright for E2E, layer-specific testing approaches).

---

### Step 2: Understand Your Role

This implementation involves **two specialized agents working together**:

#### **Engineer Agent (Implementing Code)**
- Writes all production code following TDD
- **MUST reference `coding-standards.md`** in addition to your own programming instructions
- Implements features defined in the commit plan below
- Ensures all tests pass before committing
- Follows the layered architecture strictly (no shortcuts)

#### **Test-Writer Agent (Writing Tests)**
- Writes all tests BEFORE the engineer implements code (TDD)
- **MUST reference `testing-standards.md`** in addition to your own testing instructions
- Writes comprehensive test coverage (unit, integration, component, E2E)
- Ensures tests define expected behavior clearly

**Both agents must follow this plan sequentially.** Do not skip commits or change the order.

---

### Step 3: Follow the Commit Sequence Below

The commit sequence below is your **step-by-step instruction guide**. Each commit represents one complete milestone with:

- **Tests written first** (test-writer agent)
- **Implementation code** (engineer agent)  
- **Verification that all tests pass**
- **One commit containing all modified files**

**Work through commits 1-39 in order.** Each commit builds on the previous ones. Do not proceed to the next commit until the current commit is complete and all tests are passing.

---

### Step 4: Commit Message Format

Use this exact format for every commit:

```
V2-{PHASE}: {Title}

- Tests: {what was tested}
- Implementation: {what was built}
- {Additional details}
- All tests passing ({count} tests)
```

**Example:**
```
V2-DATA: Repository implementations - Daily Ritual

- Tests: PowerListRepository tests (create, read, update, delete, query by date), StandardsRepository tests
- Implementation: Concrete repository classes in infrastructure/repositories/
- PowerListRepository implementation with Dexie queries
- StandardsRepository implementation with Dexie queries
- Uses database client from Commit 4
- All tests passing (18 tests)
```

---

### Step 5: Success Criteria Per Commit

Before moving to the next commit, verify:

- ✅ All tests passing (green)
- ✅ No TypeScript errors
- ✅ ESLint/Prettier compliance
- ✅ Code follows architecture patterns (layering, SOLID principles)
- ✅ Commit message documents what was built and tested
- ✅ All files from this milestone committed together

---

## Expected Outcomes

By following this plan, you will deliver:

- **39 commits** representing 39 complete, tested milestones
- **396+ passing tests** covering unit, integration, component, and E2E scenarios
- **90%+ code coverage**
- **Production-ready codebase** following SOLID principles and clean architecture
- **Comprehensive git history** documenting the entire build process

---

## TDD Workflow (Apply to Every Commit)

**Strategy:** Test-Driven Development (TDD) with ground-up architecture build  
**Commit Style:** One commit per milestone, all modified files included together  
**Process:** Tests first → Implementation → Verify tests pass → Commit

### For Every Commit:
1. **Test-writer agent**: Write tests that define expected behavior
2. **Engineer agent**: Implement minimal code to pass tests
3. **Both agents**: Verify all tests pass (run full test suite)
4. **Commit**: All files together with detailed message

---

## The Implementation Plan: 39 Commits in 9 Phases

## Phase 1: Foundation

### Commit 1: V2-FOUNDATION: Project configuration and dependencies
- Updated package.json with V2 dependencies (Next.js, TypeScript, D3.js, Zustand, Dexie, Jest, Playwright)
- Configured tsconfig.json with strict mode and path aliases
- Set up Jest config with test environment
- Configured Playwright for E2E tests
- Added ESLint and Prettier configs aligned with coding standards

### Commit 2: V2-FOUNDATION: Directory structure and core types
- Created complete src/ folder structure (app/, components/, domain/, infrastructure/, etc.)
- Built shared/types/ with base type definitions
- Created domain feature folders (dailyRitual/, todoSystem/, shared/)
- Set up infrastructure folders (database/, repositories/)

### Commit 3: V2-FOUNDATION: Design system and theme
- Implemented styles/theme.ts with complete design tokens (colors, spacing, typography, sizing)
- Created GlobalStyles.tsx with CSS reset and base styles
- Built styles/animations.ts with shared keyframe definitions
- All values match Material Design color palette from HTML mockups

---

## Phase 2: Data Layer

### Commit 4: V2-DATA: Database schema and versioning
- Tests: Database connection test, schema initialization test, version upgrade test
- Implementation: Created Dexie schema with all object stores (powerListTasks, standardsTasks, dailyCompletions, todoNodes, todoRelationships, todoComments, appSettings)
- Defined indexes for efficient queries (compound indexes for userId+date, userId+type, etc.)
- Built Dexie database class in infrastructure/database/schema.ts
- All tests passing

### Commit 5: V2-DATA: Repository interfaces
- Tests: Interface contract tests (mock implementations verify interfaces work)
- Implementation: Defined all repository interfaces in domain layer (IPowerListRepository, IStandardsRepository, ITodoNodeRepository, IAppSettingsRepository)
- Each interface declares CRUD operations needed by domain layer
- No concrete implementations yet - pure contracts
- All tests passing

### Commit 6: V2-DATA: Repository implementations - Daily Ritual
- Tests: PowerListRepository tests (create, read, update, delete, query by date), StandardsRepository tests
- Implementation: Concrete repository classes in infrastructure/repositories/
- PowerListRepository implementation with Dexie queries
- StandardsRepository implementation with Dexie queries
- Uses Dexie database instance from Commit 4
- All tests passing (18 tests)

### Commit 7: V2-DATA: Repository implementations - Todo System
- Tests: TodoNodeRepository tests (CRUD, relationships, multi-parent queries), TodoRelationshipRepository tests
- Implementation: TodoNodeRepository with discriminated union handling (serve_god, cornerstone, todo types)
- TodoRelationshipRepository with order field handling
- Complex queries for graph traversal using Dexie indexes (get children, get parents, get full subtree)
- All tests passing (24 tests)

---

## Phase 3: Domain Layer

### Commit 8: V2-DOMAIN: Daily Ritual computations
- Tests: PowerList progress computation tests (completedCount, losingStreak, resetDates), WIN/LOSS calculation tests for Daily Ritual
- Implementation: Pure functions in domain/dailyRitual/computations/
- calculatePowerListProgress() function
- calculateDailyRitualWinLoss() function
- Edge cases: task active periods, miss limits, reset date recording
- All tests passing (32 tests)

### Commit 9: V2-DOMAIN: Daily Ritual use cases
- Tests: Use case tests with mock repositories (complete task, add task, convert to standard)
- Implementation: Use cases in domain/dailyRitual/useCases/
- CompletePowerListTask use case
- AddPowerListTask use case
- ConvertPowerListToStandard use case
- Dependency injection pattern - repositories passed as constructor args
- All tests passing (16 tests)

### Commit 10: V2-DOMAIN: Todo System computations
- Tests: Cornerstone health calculation tests (Thriving/Stale/Neglected), todo node deadline color tests, descendant count tests
- Implementation: Pure functions in domain/todoSystem/computations/
- calculateCornerstoneHealth() - scans full subtree depth
- calculateDeadlineColor() - uses configurable threshold
- calculateDescendantCount() - for Magnitude View ring assignment
- All tests passing (28 tests)

### Commit 11: V2-DOMAIN: Todo System use cases
- Tests: Use case tests (create node, complete node, connect nodes, set active)
- Implementation: Use cases in domain/todoSystem/useCases/
- CreateTodoNode, CompleteTodoNode, ConnectNodes, SetNodeActive
- Multi-parent relationship handling
- Orphan node creation
- All tests passing (22 tests)

---

## Phase 4: Application Layer

### Commit 12: V2-APP: State management stores
- Tests: Zustand store tests (actions update state correctly)
- Implementation: stores/ folder with all Zustand stores
- dateStore (current date, navigation)
- mapStore (view mode, selected node, focused ring)
- dashboardStore (widget config, layout)
- All tests passing (12 tests)

### Commit 13: V2-APP: Custom hooks - Daily Ritual
- Tests: Hook tests with React Testing Library
- Implementation: hooks/usePowerList.ts, hooks/useStandards.ts
- Hooks directly instantiate and call domain use cases with dependency injection
- Cache results in Zustand stores
- Optimistic updates for task completion
- All tests passing (10 tests)

### Commit 14: V2-APP: Custom hooks - Todo System
- Tests: Hook tests for todo nodes and map data
- Implementation: hooks/useTodoNode.ts, hooks/useMapData.ts
- Hooks call use cases directly (CreateTodoNode, GetTodoNode, etc.)
- Node detail page data fetching
- Map view data transformation (prepare for D3)
- All tests passing (14 tests)

---

## Phase 5: Presentation Layer - Shared Components

### Commit 15: V2-UI: Shared component library - Buttons
- Tests: Component tests for all button variants and sizes
- Implementation: components/shared/Button.tsx
- Variants: primary, secondary, tertiary, ghost
- Sizes: sm, md, lg
- Uses theme tokens exclusively
- All tests passing (16 tests)

### Commit 16: V2-UI: Shared component library - Inputs and Panels
- Tests: Input and Panel component tests
- Implementation: components/shared/Input.tsx, Panel.tsx, Badge.tsx
- Glass morphism panel with backdrop blur
- Input with variants and validation states
- All tests passing (12 tests)

---

## Phase 6: Presentation Layer - Features

### Commit 17: V2-UI: Dashboard page and layout
- Tests: Dashboard page tests (date navigation, widget rendering)
- Implementation: app/dashboard/page.tsx, components/layout/NavBar.tsx, components/layout/Sidebar.tsx
- Date navigation with chevrons
- WIN/LOSS status display
- Sidebar with navigation links
- All tests passing (8 tests)

### Commit 18: V2-UI: Dashboard grid system

- Tests: Widget drag tests (drag to reorder changes persisted order), grid rendering tests (widgets render in order), persistence tests (layout survives reload)
- Implementation: components/features/Dashboard/DashboardGrid.tsx
- Uses react-grid-layout for drag-and-drop widget reordering
- Grid stores {x, y, w, h} per widget in IndexedDB (appSettings store, settingType: "widget_config")
- order derived from x position at render time (sorted ascending)
- Hover handles appear on widget containers; drag updates persist immediately
- Resize capabilities excluded from this commit
- All tests passing (10 tests)


### Commit 19: V2-UI: Daily Ritual widget - PowerList
- Tests: PowerList component tests (task list, completion, progress display)
- Implementation: components/features/Dashboard/PowerListWidget.tsx
- Task list with checkboxes
- Progress indicators per task
- Completion triggers optimistic update + use case call via hook
- All tests passing (14 tests)

### Commit 20: V2-UI: Daily Ritual widget - Standards
- Tests: Standards component tests (simple checklist, drag-drop)
- Implementation: components/features/Dashboard/StandardsWidget.tsx
- Simple checklist with completion tracking
- Drag-and-drop reordering (order field updated)
- All tests passing (10 tests)

### Commit 21: V2-UI: Active Tasks widget
- Tests: Active Tasks component tests (quick capture, completion, navigation)
- Implementation: components/features/Dashboard/ActiveTasksWidget.tsx
- Quick capture creates orphan todo nodes
- Deadline color coding
- Click text navigates to detail page
- All tests passing (12 tests)

### Commit 22: V2-UI: Node detail page - base layout
- Tests: Node detail page tests (breadcrumbs, parent links, title, description)
- Implementation: app/node/[id]/page.tsx, components/features/NodeDetails/NodeDetailLayout.tsx
- Dynamic routing based on node ID
- Breadcrumbs show multiple parent paths
- Edit mode toggle
- All tests passing (10 tests)

### Commit 23: V2-UI: Node detail page - child list and comments
- Tests: Child list tests (add child, reorder, navigate), comments tests
- Implementation: components/features/NodeDetails/ChildList.tsx, CommentSection.tsx
- Add child modal
- Drag-drop reorder
- Jira-style comments with edit/delete
- All tests passing (16 tests)

### Commit 24: V2-UI: Priorities page
- Tests: Priorities page tests (priority tiers, sorting, actions)
- Implementation: app/priorities/page.tsx, components/features/Priorities/PriorityList.tsx
- Automatic priority calculation (Ready to close, Behind schedule, Due soon, Stagnant)
- Dropdown actions per item
- All tests passing (12 tests)

### Commit 25: V2-UI: History & Stats page
- Tests: Stats component tests (computed metrics), Timeline component tests (bar chart zoom)
- Implementation: app/history/page.tsx, components/features/History/StatsGrid.tsx, TimelineChart.tsx
- Stats computed from database (wins, losses, streaks, averages)
- Bar chart with zoom levels (day, week, month)
- All tests passing (14 tests)

---

## Phase 7: Map View (Complex Feature)

### Commit 26: V2-MAP: D3 data transformation layer
- Tests: Data transformer tests (nodes to D3 format, ring assignment, position calculation)
- Implementation: components/features/MapView/utils/dataTransformer.ts
- Transform graph to Tree View layout (hierarchy rings)
- Transform graph to Magnitude View layout (percentile rings)
- Multi-parent fractional ring calculation
- All tests passing (18 tests)

### Commit 27: V2-MAP: Tree View renderer
- Tests: Tree View rendering tests (nodes at correct positions, connector lines, ring spacing)
- Implementation: components/features/MapView/TreeView.tsx
- D3 SVG rendering
- Static layout with connector lines
- Ring-based hierarchy display
- All tests passing (12 tests)

### Commit 28: V2-MAP: Magnitude View renderer with orbital motion
- Tests: Magnitude View tests (orbital motion, ring transitions, percentile bucketing)
- Implementation: components/features/MapView/MagnitudeView.tsx
- D3 with RequestAnimationFrame loop
- Orbital physics calculations
- Smooth ring transitions when descendant count changes
- All tests passing (14 tests)

### Commit 29: V2-MAP: Interaction system (focus, selection, navigation)
- Tests: Interaction tests (ring focus, node selection, pan, view toggle)
- Implementation: components/features/MapView/InteractionLayer.tsx
- Focus system (click ring to enlarge)
- Node selection (1st click = select, 2nd click = navigate)
- Middle-mouse pan
- All tests passing (16 tests)

### Commit 30: V2-MAP: Search and filter UI
- Tests: Search component tests (filter results, camera fly-to)
- Implementation: components/features/MapView/SearchPanel.tsx
- Search input with dropdown results
- Filter chips (ACTIVE, MILESTONE, DRIFTING)
- Camera animation to selected node
- All tests passing (8 tests)

### Commit 31: V2-MAP: Map page integration
- Tests: Full map page integration tests
- Implementation: app/map/page.tsx
- Combines all map components
- View toggle button
- Status readout panel
- All tests passing (10 tests)

---

## Phase 8: Settings & First Launch

### Commit 32: V2-SETTINGS: Settings page and widget management
- Tests: Settings page tests (widget toggle, deadline threshold)
- Implementation: app/settings/page.tsx, components/features/Settings/WidgetManagement.tsx
- Widget enable/disable toggles
- Deadline proximity threshold input
- All tests passing (8 tests)

### Commit 33: V2-SETTINGS: WIN/LOSS configuration
- Tests: WIN/LOSS config tests (component selection, criteria setting)
- Implementation: components/features/Settings/WinLossConfig.tsx
- Tabbed interface for each component
- Daily Ritual criteria (PowerList, Standards, both)
- Active Tasks criteria (count threshold)
- All tests passing (10 tests)

### Commit 34: V2-ONBOARDING: First launch flow
- Tests: First launch tests (userId generation, welcome modal, default data creation)
- Implementation: components/FirstLaunchModal.tsx, domain/onboarding/useCases/InitializeUser.ts
- Check localStorage for userId
- Welcome modal asks for username
- Create Serve God node + 5 default cornerstones
- Initialize default settings
- All tests passing (12 tests)

---

## Phase 9: E2E Testing & Polish

### Commit 35: V2-E2E: End-to-end test suite - Core workflows
- Tests: Playwright E2E tests (first launch → dashboard → complete tasks → WIN/LOSS)
- Implementation: e2e/core-workflows.spec.ts
- Full user journey tests
- Tests passing (6 scenarios)

### Commit 36: V2-E2E: End-to-end test suite - Map workflows
- Tests: Playwright E2E tests (map navigation, node creation, view toggle)
- Implementation: e2e/map-workflows.spec.ts
- Map interaction tests
- Tests passing (5 scenarios)

### Commit 37: V2-POLISH: Responsive design and mobile optimization
- Tests: Mobile viewport tests
- Implementation: Mobile-specific styles, touch gesture handlers
- Bottom sheet for map filters on mobile
- Touch gestures for map interactions
- All tests passing (8 tests)

### Commit 38: V2-POLISH: Animations and transitions
- Tests: Animation tests (timing, easing, completion)
- Implementation: Transition effects, loading states, skeleton screens
- Smooth page transitions
- Map view animations (ring transitions, camera fly-to)
- All tests passing (6 tests)

### Commit 39: V2-COMPLETE: Final integration, documentation, and cleanup
- Final integration tests across all features
- Updated README with V2 setup instructions
- Removed unused code and dependencies
- All tests passing (Total: 396 tests)

