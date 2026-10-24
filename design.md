# StokFlow — UI Design Specification

**Version:** 1.0.0  
**Last Updated:** October 24, 2026  
**Design System:** Controlled Skeuomorphism

---

## Design Philosophy

StokFlow uses **controlled skeuomorphism** to create an interface that feels tangible and intuitive, mimicking real-world materials while maintaining modern usability.

**Principles:**
1. **Material Surfaces:** UI elements have depth, texture, and lighting
2. **Physical Affordances:** Buttons look pressable, inputs look editable, containers look containable
3. **Subtle Realism:** Realistic enough to feel familiar, not so realistic it becomes cluttered
4. **Clear Hierarchy:** Z-axis layering creates visual organization
5. **Responsive Interaction:** Elements respond to hover, focus, and active states with realistic transitions

**NOT:**
- Flat Material Design (too abstract)
- Heavy skeuomorphism (too literal/distracting)
- Glassmorphism (readability concerns)

---

## Design Tokens

### Color Palette

#### Neutral Scale (Base Surfaces)
```css
--neutral-50:  #fafafa;  /* Lightest surface */
--neutral-100: #f5f5f5;  /* Light elevated surface */
--neutral-200: #e5e5e5;  /* Light border */
--neutral-300: #d4d4d4;  /* Medium border */
--neutral-400: #a3a3a3;  /* Disabled text */
--neutral-500: #737373;  /* Secondary text */
--neutral-600: #525252;  /* Primary text */
--neutral-700: #404040;  /* Heading text */
--neutral-800: #262626;  /* Strong text */
--neutral-900: #171717;  /* Darkest surface */
```

#### Brand Colors
```css
--brand-primary:   #2563eb; /* Primary actions, links */
--brand-secondary: #7c3aed; /* Secondary actions */
--brand-accent:    #f59e0b; /* Highlights, badges */
```

#### Semantic Colors
```css
--success-light: #dcfce7;
--success:       #16a34a;
--success-dark:  #15803d;

--warning-light: #fef3c7;
--warning:       #f59e0b;
--warning-dark:  #d97706;

--error-light:   #fee2e2;
--error:         #dc2626;
--error-dark:    #b91c1c;

--info-light:    #dbeafe;
--info:          #2563eb;
--info-dark:     #1d4ed8;
```

#### Surface Colors
```css
--surface-base:      #ffffff;  /* Page background */
--surface-raised:    #fafafa;  /* Elevated cards */
--surface-overlay:   #ffffff;  /* Modals, dropdowns */
--surface-inset:     #f5f5f5;  /* Inset areas, inputs */
--surface-hover:     #f0f0f0;  /* Hover state */
--surface-active:    #e8e8e8;  /* Active/pressed state */
```

### Shadows (Depth Layers)

```css
/* Inset shadows for recessed surfaces */
--shadow-inset: inset 0 2px 4px rgba(0, 0, 0, 0.06);
--shadow-inset-deep: inset 0 3px 6px rgba(0, 0, 0, 0.1);

/* Raised element shadows */
--shadow-xs:  0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm:  0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.03);
--shadow-md:  0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.04);
--shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04);
--shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);

/* Modal/overlay shadows */
--shadow-overlay: 0 25px 50px rgba(0, 0, 0, 0.15);
```

### Highlights (Edge Lighting)

```css
/* Subtle top highlight for 3D effect */
--highlight-subtle: inset 0 1px 0 rgba(255, 255, 255, 0.5);
--highlight-strong: inset 0 1px 0 rgba(255, 255, 255, 0.8);
```

### Borders

```css
--border-width: 1px;
--border-radius-sm: 4px;
--border-radius-md: 6px;
--border-radius-lg: 8px;
--border-radius-xl: 12px;
--border-radius-full: 9999px;

--border-color-light: var(--neutral-200);
--border-color-default: var(--neutral-300);
--border-color-strong: var(--neutral-400);
```

### Spacing Scale

```css
--spacing-xs:   4px;
--spacing-sm:   8px;
--spacing-md:   12px;
--spacing-base: 16px;
--spacing-lg:   24px;
--spacing-xl:   32px;
--spacing-2xl:  48px;
--spacing-3xl:  64px;
```

### Typography

#### Font Families
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Font Sizes
```css
--text-xs:   12px;  /* Captions, labels */
--text-sm:   14px;  /* Body small, secondary text */
--text-base: 16px;  /* Body text */
--text-lg:   18px;  /* Lead paragraph */
--text-xl:   20px;  /* Subheadings */
--text-2xl:  24px;  /* Headings */
--text-3xl:  30px;  /* Section titles */
--text-4xl:  36px;  /* Page titles */
```

#### Font Weights
```css
--font-normal:  400;
--font-medium:  500;
--font-semibold: 600;
--font-bold:    700;
```

#### Line Heights
```css
--leading-tight:  1.25;  /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Long-form content */
```

### Transitions

```css
--transition-fast:   150ms ease-in-out;
--transition-base:   200ms ease-in-out;
--transition-slow:   300ms ease-in-out;
--transition-slower: 500ms ease-in-out;
```

---

## Component Specifications

### Buttons

#### Primary Button
```css
.button-primary {
  background: linear-gradient(to bottom, var(--brand-primary), color-mix(in srgb, var(--brand-primary) 90%, black));
  color: white;
  padding: 10px 20px;
  border-radius: var(--border-radius-md);
  border: 1px solid color-mix(in srgb, var(--brand-primary) 80%, black);
  box-shadow: var(--shadow-sm), var(--highlight-subtle);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
}

.button-primary:hover {
  background: linear-gradient(to bottom, color-mix(in srgb, var(--brand-primary) 105%, white), var(--brand-primary));
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.button-primary:active {
  background: var(--brand-primary);
  box-shadow: var(--shadow-inset);
  transform: translateY(0);
}
```

#### Secondary Button
```css
.button-secondary {
  background: linear-gradient(to bottom, white, var(--neutral-50));
  color: var(--neutral-700);
  padding: 10px 20px;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color-default);
  box-shadow: var(--shadow-xs), var(--highlight-subtle);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
}

.button-secondary:hover {
  background: linear-gradient(to bottom, white, white);
  border-color: var(--border-color-strong);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.button-secondary:active {
  background: var(--neutral-50);
  box-shadow: var(--shadow-inset);
  transform: translateY(0);
}
```

### Input Fields

```css
.input-field {
  background: var(--surface-inset);
  color: var(--neutral-800);
  padding: 10px 12px;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color-default);
  box-shadow: var(--shadow-inset);
  font-size: var(--text-base);
  transition: all var(--transition-fast);
}

.input-field:focus {
  background: white;
  border-color: var(--brand-primary);
  box-shadow: var(--shadow-inset), 0 0 0 3px rgba(37, 99, 235, 0.1);
  outline: none;
}

.input-field:disabled {
  background: var(--neutral-100);
  color: var(--neutral-400);
  cursor: not-allowed;
}

.input-field::placeholder {
  color: var(--neutral-400);
}
```

### Cards

```css
.card {
  background: var(--surface-raised);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color-light);
  box-shadow: var(--shadow-sm), var(--highlight-subtle);
  padding: var(--spacing-lg);
  transition: all var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-interactive:active {
  box-shadow: var(--shadow-xs);
  transform: translateY(0);
}
```

### Tables

```css
.table {
  width: 100%;
  background: white;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color-light);
  box-shadow: var(--shadow-xs);
  overflow: hidden;
}

.table-header {
  background: linear-gradient(to bottom, var(--neutral-50), var(--neutral-100));
  border-bottom: 2px solid var(--border-color-default);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  font-size: var(--text-xs);
  letter-spacing: 0.05em;
  color: var(--neutral-600);
}

.table-row {
  border-bottom: 1px solid var(--border-color-light);
  transition: background var(--transition-fast);
}

.table-row:hover {
  background: var(--surface-hover);
}

.table-cell {
  padding: var(--spacing-md) var(--spacing-base);
}
```

### Modals / Overlays

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal {
  background: var(--surface-overlay);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-color-light);
  box-shadow: var(--shadow-overlay), var(--highlight-strong);
  padding: var(--spacing-xl);
  max-width: 600px;
}
```

### Badges / Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--border-radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border: 1px solid;
  box-shadow: var(--shadow-xs);
}

.badge-success {
  background: var(--success-light);
  color: var(--success-dark);
  border-color: var(--success);
}

.badge-warning {
  background: var(--warning-light);
  color: var(--warning-dark);
  border-color: var(--warning);
}

.badge-error {
  background: var(--error-light);
  color: var(--error-dark);
  border-color: var(--error);
}
```

---

## Component States

All interactive components must implement these states:

### Visual States
- **Default:** Normal resting state
- **Hover:** Subtle lift, increased shadow
- **Focus:** Border highlight + ring (for keyboard navigation)
- **Active/Pressed:** Inset shadow, slight downward movement
- **Disabled:** Reduced opacity, greyed out, no-cursor
- **Loading:** Spinner or skeleton state

### Data States
- **Empty:** Clear message, illustration, action CTA
- **Error:** Red border/background, error icon, message
- **Success:** Green border/background, success icon, message
- **Loading:** Skeleton or spinner overlay

---

## Layout Guidelines

### Grid System
- Base: 12-column grid
- Gutter: 24px (--spacing-lg)
- Max content width: 1280px
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Spacing Rhythm
- Use spacing scale consistently
- Stack spacing: 16px (--spacing-base) between related elements
- Section spacing: 48px (--spacing-2xl) between major sections
- Component internal padding: 12px-24px

### Z-Index Layers
```css
--z-base:    0;   /* Normal content */
--z-raised:  10;  /* Cards, elevated surfaces */
--z-sticky:  100; /* Sticky headers */
--z-header:  1000; /* Site header */
--z-dropdown: 2000; /* Dropdowns, popovers */
--z-modal:   3000; /* Modals */
--z-toast:   4000; /* Notifications */
--z-tooltip: 5000; /* Tooltips */
```

---

## Responsive Design

### Mobile-First Approach
Design for mobile, enhance for desktop.

### Breakpoint Strategy
```css
/* Mobile: default styles */

/* Tablet */
@media (min-width: 640px) {
  /* Adjust layout, increase spacing */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Multi-column layouts, hover states */
}
```

### Touch Targets
- Minimum: 44x44px
- Preferred: 48x48px
- Spacing between targets: minimum 8px

---

## Accessibility

### Color Contrast
- Text on background: minimum 4.5:1 (WCAG AA)
- Large text (18px+): minimum 3:1
- Interactive elements: minimum 3:1

### Focus Indicators
All focusable elements must have visible focus state:
```css
*:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}
```

### Screen Readers
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Provide `aria-label` for icon-only buttons
- Announce state changes with `aria-live` regions
- Include skip-to-content links

### Keyboard Navigation
- All interactive elements keyboard-accessible
- Logical tab order
- Escape to close modals
- Enter/Space to activate buttons

---

## Animation Guidelines

### Micro-interactions
- Button press: 150ms
- Hover lift: 200ms
- Modal entrance: 300ms
- Page transitions: 400ms

### Easing Functions
```css
--ease-in:     cubic-bezier(0.4, 0, 1, 1);
--ease-out:    cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.27, 1.55);
```

### Reduced Motion
Respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Third-Party Library Rules

### Allowed (No New Dependencies)
Current Phase 1 setup is sufficient. No additional UI libraries yet.

### Future Consideration (Phase 2+)
If complex components needed:
- **Icon Library:** lucide-react (lightweight, tree-shakeable)
- **Date Picker:** react-day-picker (accessible, customizable)
- **Toast Notifications:** sonner (modern, performant)

### Prohibited
- ❌ Heavy UI frameworks (Material-UI, Ant Design) — conflicts with design system
- ❌ jQuery or jQuery-based plugins — outdated, conflicts with React
- ❌ Multiple icon libraries — choose one, stick with it

### Before Adding Any Dependency
1. Document reason in architecture.md
2. Verify license compatibility
3. Check bundle size impact
4. Ensure TypeScript support
5. Confirm accessibility compliance

---

## File Organization

```
apps/web/src/
├── components/
│   ├── ui/              # Core design system components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   └── common/          # Shared app components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── ...
├── features/            # Feature-specific components
│   ├── products/
│   ├── sales/
│   └── ...
└── styles/
    ├── tokens.css       # CSS variables (design tokens)
    ├── reset.css        # CSS reset
    ├── global.css       # Global styles
    └── utilities.css    # Utility classes
```

---

## Implementation Notes

### CSS Strategy
- **CSS Variables** for design tokens
- **CSS Modules** or **Styled Components** for component styling
- **No Tailwind CSS** (conflicts with skeuomorphic design)

### Component Naming
- PascalCase for components: `Button`, `InputField`
- kebab-case for CSS classes: `.button-primary`, `.input-field`
- Prefix variants: `.button-primary`, `.button-secondary`

### Testing Design System
- Visual regression tests (Playwright screenshots)
- Accessibility tests (axe-core)
- Cross-browser testing

---

## Change Management

### Adding New Tokens
1. Add to design.md specification
2. Update `tokens.css`
3. Document usage examples
4. Update components using the token

### Modifying Existing Components
1. Review impact on existing pages
2. Update design.md if behavior changes
3. Test visual regression
4. Update Storybook/documentation if available

### Design System Evolution
Design systems evolve. Changes should be:
- **Documented:** Update this file
- **Backward Compatible:** Avoid breaking changes
- **Tested:** Visual regression + accessibility
- **Communicated:** Note in changelog or PR

---

## References

- `.kiro/steering/` files must reference `design.md` for UI specifications
- PRD.md defines **what** to build
- This file defines **how** it should look and feel

---

**For AI Agents:** When implementing UI:
1. Read this specification first
2. Follow design tokens and component specs exactly
3. Don't create conflicting design systems in steering files
4. Ask user before adding new UI dependencies
5. Maintain consistency across all features

---

**END OF DESIGN SPECIFICATION**
