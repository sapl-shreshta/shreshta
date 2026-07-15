# How to Create Mindmaps - Instructions Guide

## Overview
All mindmaps in this project use **Markmap**, a markdown-based mindmap visualization tool. This document explains how to create new mindmaps following the established pattern.

## Template Structure

Every mindmap HTML file should follow this structure:

### 1. HTML Head Section
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>[TOPIC NAME] - Mind Map</title>
<style>
  :root{
    --purple:#[COLOR_HEX];  <!-- Change this to topic color -->
  }
  /* CSS styling (copy from any existing mindmap and adjust color) */
</style>
</head>
```

### 2. Navigation Buttons
```html
<div class="nav-top nav-back">
  <a href="../index.html" style="text-decoration:none;">
    <button class="icon-btn" title="Back">⬅️</button>
  </a>
</div>
<div class="nav-top nav-home">
  <a href="../../index.html" style="text-decoration:none;">  <!-- Adjust depth as needed -->
    <button class="icon-btn" title="Go to Home">🏠</button>
  </a>
</div>
```

### 3. Header Section
```html
<header>
  <h1>🏛️ [TOPIC NAME]</h1>  <!-- Add appropriate emoji -->
  <p class="sub">Click a circle to expand or collapse a branch — scroll to zoom, drag to pan</p>
</header>
```

### 4. Mindmap Container
```html
<div id="mindmap-wrap">
<div class="markmap">
<script type="text/template">
---
markmap:
  initialExpandLevel: 1      <!-- Level 1-3 determines how expanded to show initially -->
  colorFreezeLevel: 2        <!-- Freezes color after this level -->
  maxWidth: 340              <!-- Max width for node text before wrapping -->
  spacingHorizontal: 100     <!-- Horizontal spacing between branches -->
  spacingVertical: 10        <!-- Vertical spacing between items -->
---

# [MAIN TOPIC]

## Main Branch 1
- Subpoint 1
- Subpoint 2
- Subpoint 3

## Main Branch 2
- Subpoint 1
- Subpoint 2
- Sub-branch
  - Deep point 1
  - Deep point 2

## Main Branch 3
- Subpoint 1

</script>
</div>
</div>
```

### 5. Footer and Scripts
```html
<div class="hint">🖱️ Click a circle to expand a branch · Drag to pan · Scroll (or pinch) to zoom</div>

<script>
  window.markmap = {
    autoLoader: { toolbar: true }
  };
</script>
<script src="https://cdn.jsdelivr.net/npm/markmap-autoloader"></script>
</body>
</html>
```

## Markdown Format Rules

### Hierarchy Levels
- `# Main Topic` - Top level (only one)
- `## Main Branch` - First level branches
- `- Bullet point` - Sub-items under branches
- `  - Indented point` - Deeper levels (2 spaces for indentation)

### Example Structure
```markdown
# Physics

## Mechanics
- Force and Motion
  - Newton's Laws
    - First Law
    - Second Law
    - Third Law
  - Gravity
- Energy
  - Kinetic Energy
  - Potential Energy

## Thermodynamics
- Heat
- Temperature
```

## Styling Customization

### Color Scheme
Change the `--purple` variable in CSS to match your topic:
- Physics: `#4cc9f0` (cyan)
- History: `#a06cd5` (purple)
- Biology: `#8bc34a` (green)
- Chemistry: `#06d6a0` (teal)
- Mathematics: `#ef476f` (red)

### Font
Already set to: `'Comic Sans MS','Chalkboard SE','Trebuchet MS',sans-serif`

### Background Gradient
Standard gradient: `linear-gradient(135deg,#ffe0f0,#e0f7ff,#fff5d6)`

## Steps to Create a New Mindmap

1. **Extract Content**: From screenshots or existing documents, extract the main topics and subtopics
2. **Organize Hierarchically**: Arrange content with main topics at level 2 (`##`) and subpoints as bullets
3. **Create HTML File**: Copy template structure and update:
   - Title tag
   - Color variable (`--purple`)
   - Navigation paths (back and home)
   - Header title and emoji
   - Markdown content in the template
4. **Test**: Open in browser and verify:
   - Navigation buttons work
   - All branches expand/collapse correctly
   - Text is readable and not cut off
5. **Adjust Spacing**: If text wraps oddly, adjust `maxWidth`, `spacingHorizontal`, or `spacingVertical`

## Important Notes

- **Max Width**: Increase `maxWidth` (in template YAML) if text is wrapping too much. Standard is 340.
- **Initial Expand Level**: Set `initialExpandLevel: 2` or `3` if you want branches pre-expanded on load
- **External CDN**: The mindmap uses Markmap from CDN (`https://cdn.jsdelivr.net/npm/markmap-autoloader`), so internet connection is required for rendering
- **Indentation**: Use exactly 2 spaces for each indentation level in markdown
- **Navigation Paths**: Adjust `../` count in links based on how deep the mindmap file is nested

## Example Files

Existing mindmap examples:
- `History/Introduction_to_History/index.html` - Complete example
- `Physics/Physical_Quantities_and_Measurements/Mindmap/index.html` - Physics example

Copy the structure from these files and modify the content and styling as needed.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Text is cut off | Increase `maxWidth` value (try 380 or 420) |
| Branches overlap | Increase `spacingHorizontal` or `spacingVertical` |
| Won't load | Check CDN link is accessible, verify YAML syntax in template |
| Colors look wrong | Ensure `--purple` variable has correct hex value |
| Navigation buttons don't work | Verify `../` path count matches folder depth |

