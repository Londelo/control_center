# Control Center V2 - History & Stats Page Design

## Page Overview

A dedicated page for visualizing progress and performance over time. Accessed via the left sidebar. Two distinct sections stacked vertically.

---

## Section 1: Stats (Top)

**Purpose:** At-a-glance performance metrics

### Metrics Displayed

| Metric | Description |
|--------|-------------|
| Total Wins | All-time WIN days |
| Total Losses | All-time LOSS days |
| Win Rate | (Wins / Total judged days) x 100% |
| Current Win Streak | Consecutive wins from today backward |
| Best Win Streak | Longest consecutive wins ever |
| Total Tasks Completed | All-time across all task types |
| Highest Tasks in a Day | Most tasks completed in a single day |
| Average Tasks Per Day | Average daily task completion |

### Layout

- Grid of metric cards
- Each card: Large number + label beneath
- Numbers are the hero element - big, bold, readable
- Monospace font for numbers (precise, technical feel)
- Subtle background differentiation between cards

### Visual Treatment

- Win-related stats: Subtle green undertone
- Loss-related stats: Subtle red undertone
- Neutral stats: Base card color
- No icons or decorations - let the numbers speak

---

## Section 2: History Timeline (Bottom)

**Purpose:** Visualize task completion patterns over time

### Core Concept

A horizontal bar chart where each bar represents a time period. Bar height = total tasks completed in that period.

### Bar Design

- Single color per bar (no color-coded breakdown by task type)
- All task types combined: PowerList + Standards + Todo items
- Bar width consistent within zoom level
- Subtle rounded corners on bars
- Bars grow upward from a baseline

### Zoom Levels

**Zoomed In (Day View):**
- Each bar = one day
- Task names listed vertically inside the bar (small print)
- Scrollable horizontally to navigate through days
- Most detailed view

**Mid-Level (Week View):**
- Each bar = one week
- Bar height = sum of all tasks completed that week
- Week label below each bar (e.g., "Mar 3-9")
- No task names visible

**Zoomed Out (Month View):**
- Each bar = one month
- Bar height = sum of all tasks completed that month
- Month label below each bar (e.g., "March")
- Broadest overview

### Zoom Interaction

- Scroll wheel or pinch to zoom
- Smooth transition between levels
- Days merge into weeks merge into months as you zoom out
- Zoom centers on current view position

### Timeline Navigation

- Horizontal scroll to move through time
- Today indicator (subtle vertical line or highlight)
- Date range displayed in corner (e.g., "Jan 2026 - Apr 2026")

### Visual Treatment

- Dark background (consistent with app theme)
- Bars in a muted accent color
- Hover state: Bar brightens, tooltip shows exact count
- Today's bar: Subtle glow or different shade
- Grid lines: Very subtle, horizontal only

---

## Page Layout

```
+--------------------------------------------------+
|  STATS SECTION                                   |
|  +--------+ +--------+ +--------+ +--------+     |
|  | Total  | | Total  | | Win    | | Current|     |
|  | Wins   | | Losses | | Rate   | | Streak |     |
|  |  47    | |  12    | | 79.7%  | |   5    |     |
|  +--------+ +--------+ +--------+ +--------+     |
|  +--------+ +--------+ +--------+                |
|  | Best   | | Tasks  | | Highest| | Average|     |
|  | Streak | | Done   | | /Day   | | /Day   |     |
|  |  14    | |  892   | |  23    | |  8.2   |     |
|  +--------+ +--------+ +--------+ +--------+     |
+--------------------------------------------------+
|  HISTORY TIMELINE                                |
|                                                  |
|    |                                             |
|   ||     |                                       |
|  |||    ||  |       |                            |
| |||| | ||| |||  |  ||   |                        |
| |||| ||||| |||| || |||  ||   |                   |
| ████ █████ ████ ██ ███  ██   █                   |
|  Jan  Feb   Mar  Apr May Jun  Jul                |
|                                                  |
|  [---- Zoom: Month View ----]     Today: Apr 10  |
+--------------------------------------------------+
```

---

## Interactions

| Action | Result |
|--------|--------|
| Scroll wheel on timeline | Zoom in/out |
| Horizontal scroll/drag | Navigate through time |
| Hover on bar | Show tooltip with exact count and date |
| Click on bar (day view) | Navigate to dashboard for that date |

---

## Visual Direction

**Aesthetic:**
- Data-forward, clean, analytical
- Numbers are heroes - large, clear, monospace
- Minimal decoration
- Dark theme with subtle accents

**Feeling:**
- Looking at mission control telemetry
- Reviewing a personal performance dashboard
- Quiet confidence in the data

**Color Usage:**
- Bars: Single muted accent color
- Stats cards: Subtle tints based on metric type
- Background: Dark, recedes behind data
- Text: High contrast, readable

---

## Responsive Behavior

- Stats grid reflows on narrow screens (2 columns instead of 4)
- Timeline maintains horizontal scroll on all sizes
- Minimum bar width ensures tappability on mobile
- Zoom controls accessible on touch devices
