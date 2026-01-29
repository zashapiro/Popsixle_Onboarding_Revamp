# Popsixle Onboarding Revamp - Claude Code Context

## CRITICAL: Read Before ANY Building Task

For ANY task that involves building, modifying, or adding screens/components:

1. **Read the workflow:** `C:\Users\shapi\Documents\Osidian\Zach\.claude\skills\build-prototype.md`
2. **Complete Phase 1 (Explore)** - Read existing files, check for event handlers, ask clarifying questions
3. **Do NOT skip to building** - The workflow exists because skipping causes bugs

Quick questions (colors, where is X, explain Y) don't require the full workflow.

---

## Context Files (Read for building tasks)

| File | Purpose |
|------|---------|
| `build-prototype.md` | Workflow phases, anti-patterns, JS rules |
| `design-system.md` | Colors, typography, spacing, components |
| `business-context.md` | ICP, acquisition channel, pricing |
| `copy-guidelines.md` | Voice, tone, terminology |

Full paths:
- `C:\Users\shapi\Documents\Osidian\Zach\.claude\skills\build-prototype.md`
- `C:\Users\shapi\Documents\Osidian\Zach\Reference\Work\Popsixle\design-system.md`
- `C:\Users\shapi\Documents\Osidian\Zach\Reference\Work\Popsixle\business-context.md`
- `C:\Users\shapi\Documents\Osidian\Zach\Reference\Work\Popsixle\copy-guidelines.md`

---

## Project Status
**Phase:** COMPLETE - Prototype finished

## What's Been Built
- Pricing screen (pre-step)
- 5-step onboarding wizard
- Dashboard with conditional blocker banners
- Component library preview
- Meta 4-step connection flow (Credentials → Test → Data Sharing → Ad Account)

## Local Design Files
- `design.md` - Design principles
- `css/styles.css` - CSS variables
- `css/components.css` - Component patterns
- `planning.md` - Screen specs

## Known Patterns (Check Before Adding)

**Event handlers:** Generic handlers exist on `.wizard-btn-primary` buttons (lines ~5704-5716).
New buttons need either:
- A specific class (not `.wizard-btn-primary`)
- Or exclusion added to generic handler

**Button pattern:** Always use `type="button"` and inline `onclick`:
```html
<button type="button" class="wizard-btn wizard-btn-primary" onclick="myFunction()">
```

## Design Constraints (NEVER VIOLATE)
- Primary CTA: `#A855F7` (solid purple, NOT gradient)
- Gradient reserved for logo only
- Polaris-aligned spacing (4px base)
- Cards: 8px radius, 20px padding, subtle shadow

## Brand Assets
`C:\Users\shapi\Documents\Osidian\Zach\Reference\Work\Popsixle\brand-assets/`
