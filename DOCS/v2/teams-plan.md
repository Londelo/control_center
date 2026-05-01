# Claude Teams Orchestration Plan — Control Center V2

## Team Composition (6 agents max)

| Role | Agent | Responsibility |
|---|---|---|
| **Orchestrator (Captain)** | This session | Breaks plan into batches, assigns to agents, coordinates handoffs, verifies test passes |
| **Engineer 1** | `brodie:engineer` | Production code — foundation, data layer, domain layer |
| **Test Writer 1** | `brodie:jester` | Tests for Engineer 1's domains |
| **Engineer 2** | `brodie:engineer` | Production code — app layer, UI, map view |
| **Test Writer 2** | `brodie:jester` | Tests for Engineer 2's domains |
| **Engineer 3** | `brodie:engineer` | Production code — E2E, polish, integration |
| **Test Writer 3** | `brodie:jester` | Tests for E2E and integration |

Pairs work together: Test Writer writes failing tests → Engineer implements code to pass them → Orchestrator verifies → move to next batch.

---

## Execution Strategy

**Commits are sequential** (each builds on the previous), but **pairs within a phase work in parallel** — one pair handles the first commit of a phase while another pair starts the second commit if the code paths are independent.

The orchestrator batches commits into **wave groups** and dispatches them as engineer + test writer pairs.

---

## Wave 1: Foundation (Phases 1-2)

**Commits 1-7** — Foundation + Data Layer

| Batch | Commit | Pair | What |
|---|---|---|---|
| 1a | Fdn-1: Project config | Eng 1 + Test 1 | package.json, tsconfig, jest, eslint, prettier |
| 1b | Fdn-2: Dir structure + types | Eng 1 + Test 1 | src/ tree, shared/types/base.ts, shared/types/dtos.ts |
| 1c | Fdn-3: Design system | Eng 1 + Test 1 | theme.ts, GlobalStyles.tsx, animations.ts |
| 2a | Data-1: DB schema | Eng 1 + Test 1 | Dexie schema, object stores, indexes |
| 2b | Data-2: Repo interfaces | Eng 1 + Test 1 | Domain-layer interface contracts |
| 2c | Data-3: Repo impl — Daily Ritual | Eng 1 + Test 1 | PowerListRepository, StandardsRepository |
| 2d | Data-4: Repo impl — Todo System | Eng 1 + Test 1 | TodoNodeRepository, TodoRelationshipRepository |

**Note:** Batches 2c and 2d are **independent** — can dispatch simultaneously as separate pairs (or same pair sequentially).

---

## Wave 2: Domain Layer (Phase 3)

**Commits 8-11** — Domain computations + use cases

| Batch | Commit | Pair | What |
|---|---|---|---|
| 3a | Domain-1: Daily Ritual computations | Eng 1 + Test 1 | Pure functions: progress, WIN/LOSS |
| 3b | Domain-2: Daily Ritual use cases | Eng 1 + Test 1 | CompleteTask, AddTask, ConvertToStandard |
| 3c | Domain-3: Todo System computations | Eng 1 + Test 1 | Cornerstone health, deadline colors, descendant count |
| 3d | Domain-4: Todo System use cases | Eng 1 + Test 1 | CreateNode, CompleteNode, ConnectNodes, SetNodeActive |

**Pairs used:** Eng 1 + Test 1 (can do 3a/3b in one pass, 3c/3d in next — same code paths, sequential).

---

## Wave 3: Application Layer (Phase 4)

**Commits 12-15** — Stores, hooks, DTOs

| Batch | Commit | Pair | What |
|---|---|---|---|
| 4a | App-1: Zustand stores | Eng 2 + Test 2 | dateStore, mapStore, dashboardStore |
| 4b | App-2: Daily Ritual hooks | Eng 2 + Test 2 | usePowerList, useStandards |
| 4c | App-3: Todo System hooks | Eng 2 + Test 2 | useTodoNode, useMapData |
| 4d | App-4: DTOs | Eng 2 + Test 2 | All DTO interfaces in shared/types/dtos.ts |

**All 4 batches independent enough** — could dispatch as 2 pairs: (4a+4b) with Eng 2/Test 2, (4c+4d) with Eng 3/Test 3. Domain layer is already in place so stores, hooks, and DTOs can be built from a shared type base.

---

## Wave 4: Shared UI Components (Phase 5)

**Commits 16-17** — Button, Input, Panel, Badge

| Batch | Commit | Pair | What |
|---|---|---|---|
| 5a | UI-1: Buttons | Eng 2 + Test 2 | Button variants + sizes |
| 5b | UI-2: Inputs + Panels | Eng 2 + Test 2 | Input, Panel, Badge |

Sequential (both touch components/shared/) — same pair.

---

## Wave 5: Feature Pages (Phase 6)

**Commits 18-26** — Dashboard, widgets, pages

| Batch | Commit | Pair | What |
|---|---|---|---|
| 6a | UI-3: Dashboard page + layout | Eng 3 + Test 3 | NavBar, Sidebar, Dashboard page |
| 6b | UI-4: Dashboard grid system | Eng 3 + Test 3 | react-grid-layout integration |
| 6c | UI-5: PowerList widget | Eng 2 + Test 2 | Task list, checkboxes, progress |
| 6d | UI-6: Standards widget | Eng 2 + Test 2 | Checklist, drag-drop |
| 6e | UI-7: Active Tasks widget | Eng 3 + Test 3 | Quick capture, orphan nodes |
| 6f | UI-8: Node detail layout | Eng 2 + Test 2 | Breadcrumbs, parents, edit mode |
| 6g | UI-9: Child list + comments | Eng 2 + Test 2 | Add child, reorder, Jira-style comments |
| 6h | UI-10: Priorities page | Eng 3 + Test 3 | Priority tiers, dropdowns |
| 6i | UI-11: History & Stats | Eng 3 + Test 3 | StatsGrid, TimelineChart |

**Parallel groups:**
- Pair A (Eng 3/Test 3): 6a, 6b, 6e, 6h, 6i — dashboard and pages
- Pair B (Eng 2/Test 2): 6c, 6d, 6f, 6g — widgets and node details

Each pair takes 5 commits and 4 commits respectively, running sequentially but the pairs run in parallel.

---

## Wave 6: Map View (Phase 7)

**Commits 27-32** — D3 rendering, interactions, search

| Batch | Commit | Pair | What |
|---|---|---|---|
| 7a | MAP-1: D3 data transformer | Eng 2 + Test 2 | Transform graph to D3 format |
| 7b | MAP-2: Tree View renderer | Eng 2 + Test 2 | D3 SVG tree layout |
| 7c | MAP-3: Magnitude View | Eng 3 + Test 3 | D3 + RAF orbital physics |
| 7d | MAP-4: Interaction layer | Eng 3 + Test 3 | Focus, select, pan |
| 7e | MAP-5: Search + filter | Eng 3 + Test 3 | Search panel, filter chips |
| 7f | MAP-6: Map page integration | Eng 2 + Test 2 | app/map/page.tsx assembly |

**Parallel groups:**
- Pair A (Eng 2/Test 2): 7a, 7b, 7f — data + tree view + page assembly (sequential within pair)
- Pair B (Eng 3/Test 3): 7c, 7d, 7e — magnitude view + interactions + search (sequential within pair)

These are the most complex commits (D3, physics, animations). Extra care needed.

---

## Wave 7: Settings + Onboarding (Phase 8)

**Commits 33-36**

| Batch | Commit | Pair | What |
|---|---|---|---|
| 8a | Settings-1: Widget mgmt | Eng 3 + Test 3 | Toggle widgets, thresholds |
| 8b | Settings-2: WIN/LOSS config | Eng 3 + Test 3 | Tabbed interface |
| 8c | Onboarding-1: First launch modal | Eng 1 + Test 1 | Welcome flow, Serve God + cornerstones |
| 8d | Onboarding-2: Default data creation | Eng 1 + Test 1 | Initialize settings, default nodes |

Eng 1/Test 1 are free now (did foundation). Eng 3/Test 3 do settings, then Eng 1/Test 1 do onboarding. Sequential — small feature surface.

---

## Wave 8: E2E + Polish (Phase 9)

**Commits 37-39**

| Batch | Commit | Pair | What |
|---|---|---|---|
| 9a | E2E-1: Core workflows | Eng 3 + Test 3 | Playwright: first launch → dashboard → complete tasks |
| 9b | E2E-2: Map workflows | Eng 3 + Test 3 | Playwright: map navigation, view toggle |
| 9c | Polish-1: Responsive + mobile | Eng 1 + Test 1 | Bottom sheets, touch gestures |
| 9d | Polish-2: Animations | Eng 1 + Test 1 | Page transitions, skeleton screens |
| 9e | COMPLETE: Final integration | All | Integration tests, README, cleanup |

E2E is Eng 3/Test 3 only (2 sequential commits). Polish is Eng 1/Test 1 (2 sequential commits). Final integration involves the orchestrator verifying the full suite — 474+ tests, 90%+ coverage.

---

## Summary

| Wave | Commits | Agents Used | Parallel? |
|---|---|---|---|
| Foundation + Data | 1-7 | Eng1/Test1 | Partial (2c/2d independent) |
| Domain | 8-11 | Eng1/Test1 | No |
| Application | 12-15 | Eng2/Test2 + Eng3/Test3 | Yes (2 pairs) |
| Shared UI | 16-17 | Eng2/Test2 | No |
| Feature Pages | 18-26 | Both pairs | Yes (split by feature area) |
| Map View | 27-32 | Both pairs | Yes (split by component) |
| Settings/Onboard | 33-36 | Eng3/Test3 + Eng1/Test1 | Yes |
| E2E + Polish | 37-39 | Eng3/Test3 + Eng1/Test1 | Yes (independent features) |
| Final | 39 | Orchestrator | Verify only |

**Total:** 39 commits, ~474 tests, 3 waves of parallel work, ~70% utilization of all 3 pairs. Each commit is a TDD cycle: test writer produces failing tests → engineer implements → orchestrator verifies suite passes → batch moves forward.
