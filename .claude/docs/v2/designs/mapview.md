# Map View - Detailed Design Specification

## Final Output: Two Distinct Map Views

The Map View consists of **two distinct views** with shared interaction mechanics, both powered by D3.js in 2D (not 3D).

---

## View 1: Tree/Connectivity View

**Purpose**: Understand relationships and structure

### Layout
- **Static** (no orbital motion)
- **Rings = hierarchy depth** from Serve God
  - Ring 0: Serve God (center, 96px)
  - Ring 1: Direct children (cornerstones, 48px)
  - Ring 2: Grandchildren (32px)
  - Ring N: Depth N (size decreases with depth)
- All nodes at same depth share one ring
- **Multi-parent nodes**: positioned at midpoint ring between parents
  - Example: parents at Ring 2 & Ring 4 → child at Ring 3
  - Edge case: parents at Ring 2 & Ring 3 → child at Ring 2.5 (fractional ring)
- **Connector lines visible** showing parent-child relationships
- Nodes evenly spaced around ring
- All nodes are **squares**

### Node Sizing
- Size based on hierarchy depth
- 96px → 48px → 32px → 24px → 16px → 12px (minimum)

---

## View 2: Solar System/Magnitude View

**Purpose**: Understand importance by volume of work

### Layout
- **Orbital motion** (very slow, continuous)
- **Rings = percentile buckets** of descendant todo count:
  - Ring 1: Top 10% (nodes with most todos)
  - Ring 2: 10-20%
  - Ring 3: 20-30%
  - Ring N: Continues in 10% increments
- **Dynamic repositioning**: nodes jump rings as todo counts change
- **No connector lines**
- Node size correlates with ring (inner rings = larger nodes)
- Random angles on rings
- All nodes are **squares**
- Cornerstones typically on inner rings (they have most descendants)

### Node Sizing
Size correlates with ring position using exponential decay:
- **Formula**: `size = 48px × (0.85 ^ (ring - 1))`
- Ring 1 (top 10%): 48px
- Ring 2 (10-20%): 41px
- Ring 3 (20-30%): 35px
- Ring 4 (30-40%): 30px
- Ring 5 (40-50%): 25px
- Ring 6+: Continues decreasing to minimum 16px
- Minimum size enforced: No node smaller than 16px regardless of ring

---

## Shared Interaction Model (Both Views)

### Navigation
- **Middle-mouse-button drag** to pan
- **No traditional zoom** at all

### Focus System
- **Default state**: Ring 1 focused (large nodes)
- **Hover ring**: Subtle glow appears on that ring
- **Click ring**: All nodes in that ring grow large, other rings shrink
- **Click empty space**: Reset to default (Ring 1 focused)

### Node Selection
- **1st click on node**: Select (node grows larger than others in its ring)
- **2nd click on same node**: Navigate to node detail page
- **Click empty space**: Deselect node, return to default zoom

### View Toggle
- **Button in top-right corner** with opacity/glass effect
- Switching views **resets focus to default**

---

## Visual Design (Both Views)

### Technology Stack
- **D3.js** - Positioning, orbital simulation, rendering (2D, not 3D)
- **SVG or Canvas** - Rendering layer (performance-dependent)
- **React** - Component wrapper and UI controls
- **Styled Components** - Overlay UI styling
- **Zustand** - State management

### Visual Elements

**Background**:
- Dark space black (#131313)
- Starfield pattern (radial gradient dots, 40px grid)
- Atmospheric glows: Large blurred orbs in corners (blue/gold)

**Serve God (Center Node)**:
- 96x96px gold square (#e9c349)
- Center of viewport, stationary
- Glowing effect (60px blur shadow)
- Light bulb icon (filled)

**Rings**:
- Faint concentric circle outlines (#8e9192 at 10% opacity)
- 1px stroke
- Always visible

**Cornerstone Nodes** (Level 1):
- Squares with Material icons
- Background color = health status:
  - Green (#4ade80) = Thriving
  - Yellow (#facc15) = Stale
  - Red (#ffb4ab) = Neglected
- Border: 1px solid white/10
- Hover: White background, black icon

**Todo Nodes** (Level 2+):
- Squares (size based on depth or ring)
- Background color = deadline proximity:
  - Green (#4ade80) = On track
  - Yellow (#facc15) = Approaching
  - Red (#ffb4ab) = Overdue
  - Gray (#444748) = No due date
  - Gold (#e9c349, shimmering) = Completed
- Border: 1px solid colored/50

**Orphan Nodes**:
- Gray diamonds (rotated 45° squares)
- Gray background (#444748)
- Float randomly in outer space (beyond outermost ring)
- Slow drift (no orbital motion)
- Metaphor: Unorganized thoughts, asteroids floating in space

### Visual Effects
- **Glows**: Serve God golden glow, overdue nodes subtle pulse
- **Shimmers**: Completed nodes gold shimmer animation
- **Ring hover glow**: Subtle highlight when hovering over a ring
- **Node selection glow**: Selected node has temporary glow or border pulse

---

## UI Overlays (Absolute Positioned)

### Top-Left: Search & Filter Panel
- Glass morphism panel (backdrop blur)
- Search input: Find nodes by title
- Filter chips: ACTIVE / MILESTONE / DRIFTING
- Clicking result: Camera flies to node

### Top-Right: View Toggle
- Button to switch between Tree View and Magnitude View
- Opacity/glass effect styling

### Bottom-Right: Controls
- **Add Node button** (gold, glowing)

### Bottom-Left: Status Readout
- "Current Vector" label (decorative)
- Progress bars:
  - ALIGNMENT percentage (computed stat)
  - HARVEST percentage (computed stat)
- Global metrics, not tied to specific nodes

### Top Bar & Sidebar
- Standard app navigation
- "MAP_VIEW" is active/highlighted
- Navigation to other pages (Dashboard, Priorities, History, Settings)

---

## Orbital Motion (View 2 Only)

### Motion Characteristics
- **Very slow** continuous rotation (almost imperceptible)
- All nodes on same ring orbit at same speed (uniform angular velocity)
- Inner rings orbit faster than outer rings
- Counter-clockwise direction
- Motion continues even when ring is focused or node is selected

### Implementation
- D3 force simulation with custom force, or
- RequestAnimationFrame loop updating node angles
- Each node tracks: `{ angle, angularVelocity, radius }`
- Update: `angle += angularVelocity * deltaTime`
- Render: `x = centerX + radius * cos(angle); y = centerY + radius * sin(angle)`

---

## Data Flow

### From Database to Visualization

1. **Fetch node graph** from backend:
   - All `todo_nodes` (with type, title, dueDate, completed, completedAt)
   - All `todo_relationships` (parent-child connections)

2. **Build hierarchy tree**:
   - Start with Serve God (root)
   - Recursively attach children via relationships
   - Calculate depth for each node

3. **View 1 (Tree) - Assign positions**:
   - Ring = hierarchy depth
   - Multi-parent nodes: calculate midpoint ring
   - Evenly space nodes around ring
   - Generate connector lines between parents/children

4. **View 2 (Magnitude) - Assign positions**:
   - Calculate descendant todo count for each node
   - Sort nodes by count, assign percentile buckets
   - Ring = percentile bucket (top 10%, 10-20%, etc.)
   - Random angle on ring
   - Initialize angular velocity for orbital motion

5. **Render**:
   - D3 selection bind data
   - Draw nodes (squares) at calculated positions
   - View 2: Update positions each frame for orbital motion

---

## State Management

### Zustand Store: `mapStore`

```typescript
{
  currentView: 'tree' | 'magnitude',   // Which view is active
  nodes: Node[],                       // All nodes with positions
  selectedNodeId: string | null,       // Currently selected node
  focusedRing: number,                 // Which ring is focused (default: 1)
  panOffset: { x: number, y: number }, // Camera pan offset
  showLabels: boolean,                 // Toggle all labels (future)
  filterTags: string[],                // Active filter chips
  searchQuery: string                  // Search input value
}
```

### Animation State (View 2 Only)
- Managed outside Zustand (performance)
- RequestAnimationFrame loop
- Mutates node positions directly for orbital motion
- Triggers re-render on each frame

---

## Performance Considerations

### Rendering Strategy

**For < 500 nodes**: SVG rendering
- D3 renders each node as `<rect>` element
- Smooth animations via D3 transitions
- Easy interaction (click handlers on elements)

**For 500+ nodes**: Canvas rendering
- D3 calculates positions
- Manual canvas draw loop
- Interaction via hitbox calculations
- Better performance at scale

### Optimization Techniques
- **Culling**: Don't render nodes outside viewport
- **Level of Detail**: At outer rings with small nodes, render as simple dots
- **Throttle orbital updates**: 30fps animation is sufficient for View 2
- **Connector line optimization**: In View 1, only render visible connector lines

---

## Implementation Priority

### Phase 1 (MVP - Tree View Static)
- Render View 1 (Tree) with static nodes
- Hierarchy-based ring layout
- Connector lines visible
- Basic pan (middle-mouse drag)
- Click node to select, double-click to navigate
- Focus system (click ring to enlarge)

### Phase 2 (Magnitude View)
- Implement View 2 (Magnitude) with percentile-based rings
- Orbital motion (slow, continuous)
- Dynamic repositioning as todo counts change
- View toggle button

### Phase 3 (Interactions)
- Hover tooltips
- Ring hover glow
- Search and filter panel
- Status readout metrics

### Phase 4 (Polish)
- Visual effects (glows, pulses, shimmers)
- Smooth transitions between focus states
- Orphan node drift animation
- Performance optimization (canvas fallback if needed)

### Phase 5 (Advanced - Future)
- Connection editing mode (toggle to show/hide lines in View 2)
- Multi-select nodes
- Bulk operations
- Mobile touch gestures

---

## Resolved Design Decisions

### Ring Spacing Formula (Tree View)
**Decision:** Exponential spacing with base increment
- Ring 0 (Serve God): radius = 0
- Ring 1: radius = 200px
- Ring N: radius = 200px + (N-1) × 150px
- Spacing increases linearly to maintain readability as nodes multiply

### Multi-Parent Node Ring Calculation
**Decision:** Weighted average based on depth, rounded to nearest 0.5
- Formula: `ring = round(average(parent_depths) + 1, to_nearest_0.5)`
- Example: Parents at depth 2 and 4 → child at depth 3.5 (ring 3.5)
- Visual treatment: Fractional rings render between their integer neighbors
- Node positioned at exact fractional radius (e.g., Ring 2.5 = 275px from center)

### Orphan Node Drift Physics
**Decision:** Bounded area with soft bounce
- Drift bounds: Rectangular area extending 300px beyond outermost occupied ring
- Drift velocity: 5-15px per second (randomized per node)
- Drift direction: Random walk with directional persistence (70% chance to continue direction)
- Soft bounce: When hitting bounds, velocity reverses with 80% damping
- Initial placement: Random position within drift bounds at spawn time

### Label Positioning (Both Views)
**Decision:** Always horizontal (no rotation)
- Labels remain upright and readable regardless of node position or orbital motion
- Labels appear on hover only (to reduce visual clutter)
- Label placement: Centered above node with 8px gap
- Semi-transparent black background panel for readability

### Percentile Bucket Edge Cases (Magnitude View)
**Decision:** Minimum 1 ring, maximum 10 rings, dynamic bucketing
- If < 10 nodes: Create 1 ring per node (no bucketing)
- If 10-99 nodes: Create N/10 rings (rounded up)
- If 100+ nodes: Create exactly 10 rings (percentile buckets as designed)
- Ensures meaningful visualization at any node count

### Dynamic Repositioning Animation (Magnitude View)
**Decision:** Smooth transition with easing
- When node's descendant count changes and causes ring jump:
  - Animate radius change over 800ms with ease-out curve
  - Maintain angular position (no rotation during transition)
  - Maintain orbital velocity of destination ring after arrival
- When multiple nodes reposition simultaneously: Stagger animations by 50ms per node

### Mobile Responsiveness
**Decision:** Touch gesture mapping
- **Pan**: Single-finger drag (replaces middle-mouse-button drag)
- **Ring focus**: Single tap on ring outline
- **Node selection**: Single tap on node (1st tap = select/grow, 2nd tap = navigate)
- **View toggle**: Standard button tap (top-right)
- **Pinch-to-zoom**: Disabled (use focus system instead)
- Bottom sheet overlay: Filter/search panel slides up from bottom on mobile instead of top-left positioning
