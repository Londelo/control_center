# Control Center V2 - Use Cases & Design

## Core Concept

The Control Center is a **customizable dashboard for daily life management**. Users configure their dashboard with different modules that track various aspects of their life. Everything in the app is **date-based and calendar-driven** - a centralized date/time system keeps all modules synced together.

WIN/LOSS tracking is **decoupled from individual modules** and configured at the dashboard level (defined later).

---

## User Model

**Single-user local app**, but architected as if multi-user to enable future cloud/server deployment without data model changes.

### User Identity

**LocalStorage:**
- `userId` - UUID generated on first launch, persists forever
- `username` - User-chosen display name

### Database Architecture

All user-owned data includes a `userId` column:
```
power_list_tasks: id, userId, text, description, ...
standards_tasks: id, userId, text, order, ...
daily_completions: id, userId, date, powerListCompletedIds, ...
todo_nodes: id, userId, title, type, ...
todo_comments: id, userId, nodeId, text, ...
app_settings: id, userId, settingType, value
```

**Note:** `todo_relationships` does NOT need `userId` - it only references `todo_nodes`, which already have `userId`. Querying nodes by userId inherently filters their relationships.

**All queries filter by userId** - standard pattern for user-owned data.

### First Launch Flow

1. Check localStorage for `userId`
2. **If not found (first launch):**
   - **Show welcome modal** asking for username
   - **Generate UUID** for `userId`
   - **Store** `userId` and `username` in localStorage
   - **Initialize database with default data:**
     - Create "Serve God" node (`type: "serve_god"`, associated to `userId`)
     - Create 5 default cornerstones (`type: "cornerstone"`, associated to `userId`):
       - Faith
       - Finances
       - Family
       - Friends
       - Fitness
     - Create relationships in `todo_relationships` between Serve God (parent) and each cornerstone (child)
     - Create widget config in `app_settings`:
       - Both widgets enabled: Daily Ritual (order: 1), Active Tasks (order: 2)
       - Set default dimensions
     - Create WIN/LOSS config in `app_settings`:
       - Daily Ritual: PowerList completion required
       - Standards: NOT required
       - Active Tasks: NOT required
   - Onboarding completes — app loads with default data
3. **If found:**
   - Load app and query all data filtered by `userId`

### User Profile Page

Accessed via "User Profile" button in the left sidebar.

**Contents:**
- Display/edit username
- Future: theme preferences, export data, reset app

**No authentication.** The username is for display/personalization only.

---

## Module: Daily Ritual

The Daily Ritual module consists of two sections: **PowerList** and **Standards**.

### PowerList

1-5 must-do tasks that the user is actively building into habits.

**Behavior:**
- Each task has its own configurable completion timeframe and miss limit
- Progress is **computed** from completion history across dates (not stored on the task)
- A computed progress function scans IndexedDB completion history to derive: completedCount, losingStreak, and resetDates
- When consecutive misses hit the task's `missLimit`, progress resets to zero and the reset date is recorded
- When a task reaches its `daysRequired` completion count, the user can convert it to a Standard
- Tasks carry forward from the most recent PowerList by default (completion reset to false)

**Type:**
```typescript
PowerListTask {
  id: string
  text: string
  description?: string
  why?: string
  completed: boolean
  config: {
    daysRequired: number  // default 30, editable per task
    missLimit: number     // default 3, editable per task
  }
}
```

### Standards

A simple checklist of daily habits - things the user does every day. These are often tasks that "graduated" from the PowerList.

**Behavior:**
- No progress tracking or countdown
- Completion history is recorded over time (can look back at any date)
- Standards carry forward daily, completion resets each day
- Reorderable via drag-and-drop

**Type:**
```typescript
StandardTask {
  id: string
  text: string
  completed: boolean
  order: number  // drag-and-drop positioning
}
```

### PowerList-to-Standard Conversion

When a PowerList task reaches its `daysRequired` completion count, the user is given the option to convert it to a Standard. The task moves from the PowerList section to the Standards section.

### Data Model

**Database Tables:**

```
power_list_tasks:
  id, userId, text, description, why, daysRequired, missLimit, createdAt, removedAt (nullable)

standards_tasks:
  id, userId, text, order, createdAt, removedAt (nullable)

daily_completions:
  id, userId, date, 
  powerListCompletedIds (JSON array),
  standardsCompletedIds (JSON array),
  activeTodosCompletedIds (JSON array)
```

**Storage Strategy:**
- Task definitions stored once (one row per task)
- Completion tracking via `daily_completions` table (one row per day)
- Each day stores three JSON arrays of IDs representing completed tasks

**Task Active Period Logic:**
- A task is **active** on date X if: `X >= createdAt AND (removedAt is null OR X < removedAt)`
- A task was **completed** on date X if: task is active on X AND its ID appears in the appropriate completed array for that date
- A task was **missed** on date X if: task is active on X, X < today, and its ID does NOT appear in the completed array

**Progress Computation:**
- Query all `daily_completions` rows, check which dates contain the task's ID
- Calculate: completedCount, losingStreak, resetDates from this history
- Progress is never stored, always computed on demand

**WIN/LOSS Calculation:**
- Get all PowerList tasks active on date X
- Check if all their IDs are in `powerListCompletedIds` for date X
- WIN = all active PowerList tasks completed; LOSS = any active task missed (when X < today)

**History/Stats:**
- Aggregate array lengths from `daily_completions` across date ranges
- Cross-reference with task active periods for accurate counts

---

## Module: Todo System

A recursive, infinitely-nested goal and task management system structured as a **directed graph** (many-to-many relationships). Every node can contain its own child todo list. Two views: a 2D map visualization (with two view modes) and flat detail pages.

### Graph Structure

**Level 0 - Root: "Serve God"**
- Permanent, undeletable, uneditable
- Always at the center of the map
- Glowing gold like the sun

**Level 1 - Cornerstones**
- Direct children of Serve God
- Life pillars / domains the user wants to manage
- Defaults: Faith, Finances, Family, Friends, Fitness
- User can add new cornerstones or delete existing ones
- At least one cornerstone must always exist
- Cannot connect to each other - only connect to Serve God
- Cannot be disconnected from Serve God
- Never marked as "completed"
- Have a **health status** (computed from full depth of their subtree)

**Level 2+ - Todo Nodes**
- Everything below a cornerstone
- Infinitely nestable - each node can have its own child todo list
- Can have multiple parents (many-to-many graph)
- Can belong to multiple cornerstones
- One-time tasks only (not recurring like Standards or PowerList)

**Orphan Nodes**
- Todo nodes with no parent connections
- Can be created from the Active Tasks dashboard component (quick capture)
- Appear on the map as small asteroids floating randomly in space - not orbiting, just drifting
- Can be connected to cornerstones or other nodes later via the map's connection manager or the node detail page

### Cornerstone Health System

Health is **computed** from the full depth of a cornerstone's subtree. Priority: Neglected > Stale > Thriving.

- **Thriving** (green) - Tasks are being added and completed within their due dates. Active, healthy flow.
- **Stale** (yellow) - All items complete, no new items added within a default threshold (e.g., 30 days). The cornerstone is coasting.
- **Neglected** (red) - Any item in the full subtree is overdue or has no due date set.

### Todo Node Color System (Deadline Proximity)

Every todo node is color-coded by how close it is to its due date. The threshold for "approaching" is **user-configurable** in dashboard settings.

- **Green** - More than X days before due date (on track)
- **Yellow** - Within X days of due date (approaching)
- **Red** - Past due date (overdue)
- **Gray** - No due date set
- **Gold** (shimmering) - Completed

### Data Model

**Database Tables:**

```
todo_nodes:
  id, userId, title, type, description, dueDate, completed, createdAt, completedAt, activatedAt (nullable)

todo_relationships:
  id, parentId, childId, order

todo_comments:
  id, userId, nodeId, text, createdAt, updatedAt
```

One `todo_nodes` table with a `type` discriminator column. Relationships use a **junction table** (many-to-many). The `order` field lives on the relationship, not the node, because a child's position can differ under each parent.

**Active Tasks Tracking:**
- `activatedAt` field on `todo_nodes` tracks when a node was added to the Active Tasks widget
- When a node is set active: store the date it was activated
- When removed from active: set `activatedAt` to null
- To query active tasks: `WHERE activatedAt IS NOT NULL AND activatedAt <= currentDate AND completedAt IS NULL`
- **Dual tracking (intentional):** Active todo completions also recorded in `daily_completions.activeTodosCompletedIds` for WIN/LOSS calculations
  - `activatedAt`: Current state (which tasks are active now?)
  - `activeTodosCompletedIds`: Historical record (which active tasks were completed on date X?)
  - Different purposes: state vs. history

**Types (Discriminated Union):**

```typescript
type NodeType = "serve_god" | "cornerstone" | "todo"

interface BaseNode {
  id: string
  title: string
  type: NodeType
  createdAt: string
}

interface ServeGodNode extends BaseNode {
  type: "serve_god"
  // title is always "Serve God" - enforced by app logic
  // Cannot be deleted, edited, or completed
  // Has no parents
}

interface CornerstoneNode extends BaseNode {
  type: "cornerstone"
  description?: string
  // Can be edited and deleted (except the last one)
  // Cannot be completed
  // Cannot connect to other cornerstones
  // Cannot be disconnected from Serve God
  // Has health status instead of deadline color
}

interface TodoNode extends BaseNode {
  type: "todo"
  description?: string
  dueDate?: string
  completed: boolean
  completedAt?: string
  activatedAt?: string  // When added to Active Tasks widget (null if not active)
  // Can be edited, deleted, completed
  // Can have multiple parents
  // Has deadline color system
}

// Union type for handling any node generically
type Node = ServeGodNode | CornerstoneNode | TodoNode

interface TodoRelationship {
  id: string
  parentId: string
  childId: string
  order: number  // position of child within this parent's list
}

interface TodoComment {
  id: string
  nodeId: string
  text: string
  createdAt: string
  updatedAt: string
}
```

---

### Map View (2D Visualization)

A 2D visualization rendered with **D3.js** featuring two distinct views. The map is meant to be **visually striking and immersive** - not the practical workspace. It's the "wow" view.

**Two View Modes:**

1. **Tree/Connectivity View** - Understand relationships and structure
   - Static layout with nodes arranged in rings by hierarchy depth
   - Connector lines visible showing parent-child relationships
   - Ring 0: Serve God (center, largest)
   - Ring 1+: Children at increasing depths (decreasing size)
   - Multi-parent nodes positioned at midpoint ring between parents

2. **Magnitude View** - Understand importance by volume of work
   - Orbital motion (slow, continuous)
   - Rings represent percentile buckets of descendant todo count
   - Inner rings = nodes with most todos (top 10%, 10-20%, etc.)
   - No connector lines
   - Dynamic repositioning as todo counts change

**Core Interaction (Both Views):**
- **Middle-mouse-button drag** to pan
- **Focus system**: Click a ring to enlarge all nodes in that ring, others shrink
- **Node selection**: 1st click selects (node grows), 2nd click navigates to detail page
- **View toggle button** (top-right) to switch between Tree and Magnitude views

**Visual Design:**
- All nodes are **squares**
- Serve God: 96x96px gold square (#e9c349) with light bulb icon and glow effect
- Cornerstones: Squares colored by health status (green/yellow/red)
- Todo nodes: Squares colored by deadline proximity (green/yellow/red/gray/gold shimmer)
- Orphan nodes: Gray diamonds (rotated 45°) floating in outer space with slow drift

**For complete map design specification, see:** `.claude/docs/v2/designs/mapview.md`

**Node creation is NOT available from the map view.** Nodes are created from a node's detail page or via the Active Tasks dashboard component (which creates orphan nodes).

**Node deletion is NOT available from the map view.** Nodes are only deleted from their detail page.

---

### Node Detail Pages

The practical workspace where all real work happens. Three variants based on node type.

#### Serve God Detail Page
- No parent links, no edit button, no delete button
- Title ("Serve God") - read only
- Child list (cornerstones with checkboxes - though cornerstones can't be completed, they appear here with an "Add new item" button to create new cornerstones)
- Comments section

#### Cornerstone Detail Page
- Parent link (Serve God - large button at top)
- Title (editable via edit button) + Edit button (top right corner)
- Health status indicator (green/yellow/red) near the title
- Description (editable)
- No due date, no completion checkbox
- Child todo list (checkboxes, drag-and-drop reorder, completed items strikethrough and sink to bottom, "Add new item" button always visible)
- Comments section (Jira-style, always visible)
- Delete button (blocked if it's the last cornerstone)

#### Todo Node Detail Page
- Parent links (large buttons at top - multiple if node has multiple parents)
  - **If orphan (no parents):** Parent link area shows a dropdown/search field to search all node titles and assign a parent. Once assigned, switches to normal button display.
- Title (left) + Due date (right) + Edit button (top right corner)
- **"Set Active" button** (top right area) - Adds this node to the Active Tasks dashboard component
- Deadline color indicator (green/yellow/red/gray/gold) near the title
- Description
- Completion checkbox
- Child todo list (checkboxes, drag-and-drop reorder, completed items strikethrough and sink to bottom, "Add new item" button always visible)
- Comments section (Jira-style, always visible)
- Delete button (with option to delete all children or orphan them)

#### Layout (All Detail Pages)
Single column, top to bottom:
1. Parent links (large buttons)
2. Title + due date (if applicable) + edit button
3. Status indicator (health or deadline color)
4. Description
5. Child todo list
6. Comments section

#### Edit Mode
- Triggered by edit button (top right)
- Fields become editable **inline** (same page transforms)
- Can edit title, description, due date
- Can delete the node

#### Add Child Modal
- Triggered by "Add new item" button in the child list
- Modal pops up over the page with blurred background
- Fields: Title (required), Description (optional), Due date (optional)
- Cannot add grandchildren from within the modal - save first, then click into the new item
- After saving, modal closes, new item appears in child list

#### Navigation Between Pages
- Click a parent link button: Navigate to that parent's detail page (up)
- Click a child item's text (not checkbox): Navigate to that child's detail page (down)
- No back button - navigate via parent/child links only

#### Comments Section
- Always visible at the bottom of every detail page
- Jira-style: Add comment input, timestamped entries
- Comments are editable and deletable
- Best practice flow for comment interaction

---

### Search

A reusable search component for finding nodes by title.

**Current Placement:** Map page only

**Behavior:**
- Search input field on the map page
- Type to search node titles
- Shows dropdown of matching results
- Selecting a result: camera flies to that node and zooms in (same behavior as single-clicking a node on the map)

**Implementation note:** Reusable React component that can be placed in other locations if needed. Uses the same camera navigation function as single-click interaction for consistent zoom behavior.

---

## Priorities Page

A full page (accessed via the left sidebar) that serves as an **automatic priority list**.

### Priority Hierarchy (sorted top to bottom)

1. **Ready to close** - All children complete, parent not marked done. Just needs a review and a click.
2. **Behind schedule** - Approaching due date with incomplete children. You're behind.
3. **Due soon** - Approaching due date, on track but coming up. Uses the same configurable threshold (X days) as the map view deadline color system.
4. **Stagnant** - No due date, sitting incomplete the longest. The longer it sits, the higher it rises within this tier.
5. **Everything else** - Sorted by due date.

### Display

- Single sorted list, no filtering
- Each item shows: Title, due date, priority label/tag (e.g., "Ready to close", "Behind schedule", "Due in 3 days", "No date - 45 days old")
- Items are color-coded matching their deadline color
- Completed items do NOT appear
- No limit on list length

### Actions

Each item has a **dropdown action menu** with:
- **View details** - Navigate to the node's detail page
- **Set Active** - Add the item to the Active Tasks dashboard component
- **Mark as complete** - Complete the node directly from this component

---

## Dashboard Component: Active Tasks

A dashboard component showing todo nodes the user has chosen to actively focus on. Lives alongside the Daily Ritual on the dashboard.

### Display

- Simple checklist: Title + due date + checkbox per item
- Color-coded by deadline proximity (green/yellow/red/gray)
- Completed items show strikethrough for the rest of the day, then disappear the next day
- Edit button (top right) enters edit mode to remove items from the active list (unpins them, does not delete the node)

### Actions

- **Click item text** = Navigate to the node's detail page
- **Click checkbox** = Mark complete (updates the todo system, strikethrough until tomorrow)
- **Add button** = Quick capture: type a title, hit enter. Creates a new orphan todo node and adds it to the active list immediately.
- **Edit mode** = Remove items from active list without completing them

### How Items Get Added to Active

- From the **Priorities component** dropdown: "Set Active"
- From a **node detail page**: "Set Active" button
- From the **Active Tasks component** itself: Add button (creates orphan node)

---

## Dashboard

### Layout

- **Left sidebar (collapsible):**
  - Navigation to full pages: Map, Priorities, History & Stats
  - User profile button (account details)
  - Settings button (dashboard configuration)
- **Main area:** Draggable widget grid
  - Widgets can be moved (drag handle reorders)
  - Layout (size + position) persists across sessions
  - One instance of each widget max
  - **Default: Daily Ritual and Active Tasks enabled.** Dashboard starts with default widgets. User can add/remove via settings.

### Date Navigation

The dashboard displays data for a specific date (default: today). All widgets reflect data for the currently selected date.

**Navigation Bar (Top of Dashboard):**
- **Display:** Day of week, WIN/LOSS status (color-coded), current date
- **Controls:** Left/right chevron buttons (← →)
- **Backward navigation:** Allowed if not editing and there's data for the previous date
- **Forward navigation:** Allowed if not editing and current date < today (cannot navigate to future dates)
- **Disabled while editing:** Navigation is locked when any widget is in edit mode

**WIN/LOSS Status Component:**
- Separate reusable component displaying WIN / LOSS / IN PROGRESS
- Likely placement: In or near the NavBar
- Exact placement and design treatment to be finalized in UI/UX Design section

**Past dates are editable:** Users can navigate backward and modify/complete tasks they missed.

**Implementation note:** Uses the same NavBar component pattern from V1 (`ChevronLeft`/`ChevronRight` from lucide-react, centered date display, status badge).

### Available Widgets

- **Daily Ritual** (PowerList + Standards)
- **Active Tasks**

### Full Pages (via sidebar navigation)

- **Map** (2D todo system visualization with Tree and Magnitude views)
- **Priorities** (automatic priority list)
- **History & Stats** (timeline of activity and computed metrics)
- **Node Detail Pages** (accessed by clicking into nodes from map, pages, or other detail pages)

---

## Dashboard Configuration (Settings)

Accessed via the Settings button in the left sidebar. Contains multiple sections.

### Section: Widget Management

A simple list of all available widgets. Each has a plus/minus toggle indicating whether it's added to the dashboard or not.

### Section: Deadline Proximity Threshold

Asks the user: "How long before a due date should we start warning you?"

A single input that sets the X days threshold used by:
- The todo node deadline color system (green → yellow transition)
- The Priorities component "Due soon" tier

### Section: WIN/LOSS Configuration

**Completely separate section** from other settings. The WIN/LOSS system is an independent computation layer - it reads data from the database and computes results. It does not own or modify any component data.

**Structure:**
- Checkboxes to select which components participate in WIN/LOSS (Priorities is excluded, never participates)
- Tab-like interface where each participating component has its own configuration panel

**Daily Ritual tab:**
- Checkbox options:
  - All PowerList items completed
  - All Standards completed
  - Both all PowerList AND all Standards completed

**Active Tasks tab:**
- Number input: How many active tasks must be completed per day? (0, 1, 2, etc.)

**Default configuration:** All PowerList items completed (Daily Ritual only).

**Computation rules:**
- WIN/LOSS is **always computed**, never stored
- Computed against the **current configuration retroactively** - changing rules recalculates all past days
- **WIN** = All participating components meet their configured criteria for that day
- **LOSS** = Day is past and any participating component failed its criteria
- **IN PROGRESS** = Today, not all criteria met yet

**Display:**
- Status banner/badge visible on the dashboard (WIN / LOSS / IN PROGRESS)
- Results also feed into the Stats and History pages

### Settings Persistence

All user settings are stored in a single IndexedDB object store:

```
appSettings object store:
  id, userId, settingType, value (JSON object)
```

**Widget Configuration** (`settingType: "widget_config"`):
```json
{
  "daily_ritual": { enabled: true, order: 1, width: 2, height: 3 },
  "active_tasks": { enabled: true, order: 2, width: 1, height: 2 }
}
```
- `enabled`: Whether the widget appears on the dashboard
- `order`: Left-to-right rendering order (1, 2, 3...)
- `width`/`height`: Widget dimensions in grid units
- Dashboard renders widgets using flexbox, wrapping naturally based on dimensions

**Other Settings** (same table, different `settingType` values):
- `"deadline_threshold"`: Days before due date threshold
- `"win_loss_config"`: WIN/LOSS configuration rules

---

## History & Stats Page

One page with two sections. Accessed via the left sidebar.

### Stats Section (Top)

Computed metrics displayed as simple numbers:

- **Total Wins** - All-time WIN days
- **Total Losses** - All-time LOSS days
- **Win Rate** - (Wins / Total judged days) x 100%
- **Current Win Streak** - Consecutive wins from today backward
- **Best Win Streak** - Longest consecutive wins ever
- **Total Tasks Completed** - All-time across all task types
- **Highest Tasks in a Day** - Most tasks completed in a single day
- **Average Tasks Per Day** - Average daily task completion

All stats are **computed** from the database, not stored.

### History Section (Bottom)

A horizontal bar chart timeline showing task completion over time.

**Bar design:**
- Each bar represents a time period (day, week, or month depending on zoom level)
- Bar height = total number of tasks completed in that period (PowerList + Standards + Todo items combined, single color)
- All task types in one bar, no color-coded breakdown

**Zoom behavior:**
- **Zoomed all the way in:** Each bar is one day. Task names are listed vertically inside the bar, readable in small print.
- **Zoomed to mid-level:** Bars represent weeks. Height is the sum of all tasks completed that week.
- **Zoomed all the way out:** Bars represent months. Height is the sum of all tasks completed that month.
- Smooth zoom transition - days merge into weeks merge into months as you zoom out

---

## Architecture

_To be defined..._

---

## UI/UX Design

_To be defined..._

---

## TODO: Discussion Points & Next Steps

### Outstanding Design Questions

_All outstanding design questions have been resolved._

### Architecture Discussion

- System architecture overview
- Data flow between components
- Centralized date/time system design
- State management strategy (Zustand structure)
- API route organization for Next.js backend
- IndexedDB/Dexie query patterns and schema versioning
- Computation layer design (WIN/LOSS, progress, health status)
- Performance considerations for large datasets

### UI/UX Design Discussion

- Visual design system (colors, typography, spacing)
- Component library and reusable patterns
- Dashboard grid system and responsive behavior
- Map view visual effects and performance (D3.js, SVG/Canvas)
- Widget design patterns
- Modal and overlay design
- Animation and transitions
- Mobile responsiveness strategy

### Code Structure & Conventions

- Project directory structure
- File naming conventions
- TypeScript patterns and best practices
- Component architecture (presentational vs container)
- Custom hooks strategy
- API route structure
- Database query organization
- Testing strategy and coverage goals
- Code style and linting rules

### Implementation Plan

- Step-by-step build order
- Critical path items
- Dependency sequencing
- Milestone definitions
- Testing checkpoints
- Migration strategy from V1 to V2 (if applicable)
