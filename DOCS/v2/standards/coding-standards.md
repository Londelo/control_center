# Control Center V2 - Additive Coding Standards

*These standards supplement the JP standards. JP standards remain the foundation.*

---

## Higher-Order Function Distinction

**PascalCase** - Functions that return functions:
```typescript
const CreateCompleter = (repo) => (id) => ...
const FilterByDate = (date) => (items) => ...
```

**camelCase** - Regular functions:
```typescript
const completePowerListTask = (taskId) => ...
const calculateProgress = (history) => ...
```

---

## Ramda Wrapper Utility

**Location:** `src/shared/utils/ramda.ts`

```typescript
export * from 'ramda';
import { pipeWith, andThen } from 'ramda';
export const pipeP = (...fns) => pipeWith(andThen)([...fns]);
```

**Import in domain layer and data transformation code as:**
```typescript
import * as R from '@/shared/utils/ramda';
```

---

## Preferred Ramda Methods

Use these freely:
- `pipe`, `pipeP`
- `prop`, `path`, `pick`, `pluck`
- `applySpec`
- `groupBy`, `sortBy`
- `map`, `filter`, `reduce`

**Avoid:** `compose`, and anything complex. When Ramda obscures intent, use standard JS.

---

## Directory Naming

- **React components:** PascalCase (`components/ActiveTasks/`)
- **Domain features:** camelCase (`domain/dailyRitual/`, `domain/todoSystem/`)

---

## Pure Functions

Pure functions only. Isolate side effects to repositories and API boundaries.

---

## Types

Types per feature: `domain/dailyRitual/types.ts`

---

## Exports

- Named exports by default
- Default export only when single main function in file
