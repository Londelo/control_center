# Control Center V2 - Testing Standards

*These standards supplement the JP testing standards and testing-standards.md.*

---

## Testing Systems

### Jest (Unit & Integration)

**What:** Tests individual pieces in isolation

**Covers:**
- Domain layer computations (pure functions)
- Use cases (business logic)
- Hooks (application logic)
- API routes (request/response handling)
- Repositories (with test SQLite)
- React components (with Testing Library)

**Focus:** Does each piece work correctly in isolation?

**File location:** Co-located with source files as `*.spec.ts`

---

### Playwright (End-to-End)

**What:** Tests full user workflows

**Covers:**
- Full user workflows (complete a PowerList task, see progress update)
- Page navigation (dashboard to map to detail pages)
- Dashboard interactions (widget drag/drop, date navigation)
- Map interactions (click nodes, focus rings, view toggle, search)
- Cross-feature flows (complete tasks → WIN/LOSS update → stats change)
- First launch flow (welcome modal, default data creation)

**Focus:** Does the app work correctly from a user's perspective?

**File location:** `e2e/` directory at project root

---

## Layer Testing Summary

| Layer | Tool | What to Test |
|-------|------|--------------|
| Presentation | Jest + Testing Library | Component rendering, user interactions |
| Application | Jest | Hooks, stores, services |
| API Routes | Jest | Request validation, response format |
| Domain | Jest | Use cases, computations, pure functions |
| Data Access | Jest + test SQLite | Repository CRUD operations |
| Full Workflows | Playwright | User journeys, cross-feature flows |
