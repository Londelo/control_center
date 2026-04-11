# Control Center V2 - Design Schematic

## Application Overview

A personal dashboard for daily life management that combines practical task tracking with a visually immersive 3D exploration interface. The app helps users organize their daily rituals, long-term goals, and priorities while providing a cosmic, universe-aligned visualization of their life's work.

---

## Core Windows & Functionality

### 1. Dashboard (Home View)
**Purpose:** Central workspace displaying date-specific data and active modules

**Functionality:**
- Displays data for a specific date (navigable backward/forward through calendar)
- Modular widget system - users can add/remove widgets
- Widgets are draggable and resizable
- Date navigation controls show current date and allow movement through time
- Status indicator showing daily WIN/LOSS/IN PROGRESS state

**Available Widget Modules:**
- **Daily Ritual Widget:** Two sections
  - PowerList: 1-5 critical daily tasks being built into habits, with progress tracking
  - Standards: Simple checklist of established daily habits
- **Active Tasks Widget:** Quick-access list of todo items the user is currently focusing on

**Design Direction:** Clean, functional, professional. Grid-based layout. Widgets feel like organized panels on a command center dashboard.

---

### 2. Map View (3D Visualization)
**Purpose:** Visually immersive exploration of the user's goal hierarchy

**Functionality:**
- 3D space with full camera orbit, zoom, and pan controls
- Central "Serve God" node at the center (the sun)
- 5 life pillars (Cornerstones) orbiting around the center like planets
- Goal/task nodes branching outward from cornerstones like expanding solar systems
- Color-coded nodes indicating status (on track, overdue, completed, etc.)
- Nodes pulse or glow based on urgency
- Interactive: click nodes to zoom in, double-click to open detail pages
- Connection lines show parent-child relationships
- Orphaned tasks appear as small asteroids drifting in space
- Search bar to find and zoom to specific nodes

**Design Direction:** Cosmic, celestial. Think solar system meets constellation map. Nodes are spheres with varying sizes based on hierarchy depth. Gold shimmering for completed items. Subtle animations (orbiting, pulsing, glowing). Black space background. This is the "wow" view - visually striking and metaphorically meaningful.

---

### 3. Node Detail Pages
**Purpose:** Focused workspace for managing individual goals/tasks

**Functionality:**
- View and edit node details (title, description, due date)
- Add/view comments (timestamped log)
- View parent nodes (buttons to navigate upward in hierarchy)
- View/manage child nodes (todo list with checkboxes, drag-to-reorder)
- Add new child nodes
- Complete/uncomplete the node
- Delete the node
- "Set Active" button to pin node to dashboard Active Tasks widget

**Three Variants:**
- Serve God page (read-only, can add new Cornerstones)
- Cornerstone pages (no completion, shows health status indicator)
- Regular todo node pages (full edit/complete functionality)

**Design Direction:** Clean, focused, utilitarian. Single-column layout. Feels like a detailed project card or issue tracker. Information hierarchy is clear.

---

### 4. Priorities Page
**Purpose:** Automatic priority list showing what needs attention

**Functionality:**
- Single sorted list of incomplete todo items
- Smart prioritization (items nearing deadlines, items behind schedule, items ready to close, stagnant items)
- Each item shows title, due date, priority label
- Color-coded by urgency
- Dropdown actions per item: view details, set active, mark complete

**Design Direction:** List-based, scannable. Priority labels are prominent. Color coding draws eye to urgent items.

---

### 5. History & Stats Page
**Purpose:** Visualize progress and performance over time

**Functionality:**
**Top Section - Stats:**
- Display computed metrics: total wins/losses, win rate, current streak, best streak, task completion stats
- Numbers-focused, clean layout

**Bottom Section - History Timeline:**
- Horizontal bar chart showing task completion over time
- Zoomable: day view, week view, month view
- At full zoom, task names visible inside bars
- Bar height represents number of tasks completed in that period

**Design Direction:** Data visualization focused. Clean charts and graphs. Bars feel substantial. Timeline feels like a journey through time.

---

### 6. Settings/Configuration
**Purpose:** Customize dashboard, widgets, and WIN/LOSS rules

**Functionality:**
**Widget Management Section:**
- Toggle widgets on/off
- Configure widget sizes

**Deadline Threshold Section:**
- Set how many days before due date triggers "approaching" warnings

**WIN/LOSS Configuration Section:**
- Choose which modules contribute to daily WIN/LOSS
- Configure specific rules per module (e.g., "all PowerList items must be complete")
- Tab-based interface for each module's rules

**Design Direction:** Settings panels. Clean forms. Organized sections. Feels like control panel configuration.

---

### 7. User Profile
**Purpose:** Basic account/personalization

**Functionality:**
- Display/edit username
- (Future: export data, theme settings, reset app)

**Design Direction:** Simple profile card. Minimal, clean.

---

## Key Interactions

- **Date Navigation:** Move backward/forward through calendar to view past/future dashboard states
- **Widget Manipulation:** Drag widgets to reorder, resize handles to adjust dimensions
- **3D Map Navigation:** Orbit camera with click-drag, zoom with scroll, pan with right-click-drag
- **Node Connections (Map):** Toggle connection editing mode, click nodes to create/remove parent-child relationships
- **Task Completion:** Checkboxes throughout for marking items complete
- **Drill-Down Navigation:** Click items to open detail pages, navigate up/down hierarchy via parent/child links
- **Quick Capture:** Add button on Active Tasks widget for instantly creating new orphaned tasks

---

## Visual Direction & Aesthetic

**Overall Vibe:**
Serious, intentional, purposeful. But with subtle mystical/cosmic undertones. Think "mission control meets astrology chart."

**Tone:**
- Professional and functional (this is a tool, not a game)
- Cosmic alignment - the universe as a metaphor for life's order
- Clarity over decoration - every element serves a purpose
- Quiet power - understated confidence, no flashiness

**Metaphors:**
- The solar system (hierarchy, orbits, gravity)
- Constellations (connected nodes, patterns in chaos)
- Space exploration (navigating your life's universe)
- Command center (dashboard, control, monitoring)

**Feeling:**
Users should feel like they're piloting their life from a control room while simultaneously contemplating their place in a greater cosmic order. Practical meets philosophical.

**Color Palette Direction:**
- Base: Dark/neutral tones (black, deep grays, whites)
- Accents: Color used meaningfully (status indicators, urgency warnings, completion)
- Map: Space-like (dark backgrounds, glowing nodes, gold for central node and completion)
- Not bright/playful - muted, intentional, serious

**Typography Direction:**
- Clean, readable, modern
- Monospace for data/numbers (feels precise, technical)
- Sans-serif for body text
- Clear hierarchy

**Interaction Feedback:**
- Smooth transitions
- Subtle animations (nothing jarring)
- Responsive hover states
- Loading states feel purposeful, not gimmicky

---

## Design Principles

1. **Clarity First:** Information should be instantly readable. No ambiguity about status, state, or next action.

2. **Metaphor as Meaning:** The solar system visualization isn't decoration - it communicates structure, relationships, and importance through spatial metaphor.

3. **Functionality Over Aesthetics:** Beautiful, yes. But every design choice serves the user's ability to organize, track, and complete their work.

4. **Cosmic Seriousness:** This app helps you align with your highest purpose. Design should feel weighty, meaningful, purposeful - not playful or casual.

5. **Progressive Complexity:** Simple at first glance, depth revealed through interaction. Dashboard is clean, map view is immersive.

6. **Timeless, Not Trendy:** Avoid design trends. Aim for something that feels enduring, classic, and serious.
