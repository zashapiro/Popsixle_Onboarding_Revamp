# Popsixle Onboarding Prototype - Todo List

## Status: COMPLETE

All 11 phases have been implemented and tested.

---

## Implementation Progress

### Phase 1: Project Setup
- [x] Create folder structure (`/css`, `/js`, `/assets`)
- [x] Set up `styles.css` with Polaris-aligned design tokens
- [x] Set up `components.css` for reusable components
- [x] Create `index.html` entry point

**REVIEW CHECKPOINT 1:** Complete

---

### Phase 2: Component Library
- [x] Build status chip component (4 states: connected/not-connected/attention/error)
- [x] Build primary/secondary/tertiary button styles
- [x] Build card component (8px radius, shadow, 20px padding)
- [x] Build progress bar component
- [x] Build checkbox/toggle component
- [x] Build tooltip component
- [x] Build modal component shell

**REVIEW CHECKPOINT 2:** Complete

---

### Phase 3: Pre-Step - Pricing Screen
- [x] Build pricing screen layout (two-column grid)
- [x] Add pricing card with headline, price, features list
- [x] Add trust card (Why brands choose Popsixle)
- [x] Add testimonial card (Cozy Earth quote)
- [x] Add "View Pricing Details" expandable accordion
- [x] Wire CTA to navigate to Step 1

**REVIEW CHECKPOINT 3:** Complete

---

### Phase 4: Wizard Shell
- [x] Create `onboarding.html` with wizard layout
- [x] Build left sidebar with step list and status indicators
- [x] Build progress bar ("Step X of 5")
- [x] Add "Skip to Dashboard" link
- [x] Build navigation footer (Back, Skip, Next buttons)
- [x] Add "Need help?" persistent panel
- [x] Set up wizard.js for step navigation and state

**REVIEW CHECKPOINT 4:** Complete

---

### Phase 5: Step 1 - Product Type Selection
- [x] Build product type selection UI with 4 radio options
- [x] Style selection cards
- [x] Add Unrestricted banner (conditional for restricted categories)
- [x] Add tooltip explaining product type importance
- [x] Wire Next button

**REVIEW CHECKPOINT 5:** Complete

---

### Phase 6: Step 2 - Popsixle Pixel Setup (Enhanced)
- [x] Build education section header
- [x] Add "Why do I need this?" expandable content
- [x] Add visual diagram (Store → Pixel → Ad Platforms)
- [x] Add "What happens if I don't enable it?" tooltip
- [x] Build setup instructions section
- [x] Add "Open Shopify Theme Editor" deep link button
- [x] Add screenshot preview placeholder
- [x] Build "Show me how" modal with numbered steps
- [x] Implement State 1: Not Started (gray, "Enable the pixel to continue")
- [x] Implement State 2: Checking (loading spinner)
- [x] Implement State 3: Enabled (green checkmark, success)
- [x] Implement State 4: Not Found (yellow warning, retry button)
- [x] Add demo selector for testing states
- [x] Block Next button until State 3 reached

**REVIEW CHECKPOINT 6:** Complete

---

### Phase 7: Step 3 - Special Cases
- [x] Build special cases UI with 3 toggles
- [x] Add "Learn more" expandable for each option
- [x] Enable Skip functionality

**REVIEW CHECKPOINT 7:** Complete

---

### Phase 8: Step 4 - Review Configuration
- [x] Build summary view layout (dynamic based on selections)
- [x] Display selected product type with Edit link
- [x] Display pixel status with Edit link
- [x] Display special cases with Edit link
- [x] Add "Confirm" button to proceed

**REVIEW CHECKPOINT 8:** Complete

---

### Phase 9: Step 5 - Channel Connect
- [x] Build visual flow diagram (Shopify → Popsixle → Ad Channels)
- [x] Build channel cards for Meta, Google, TikTok
- [x] Add status chips to each card
- [x] Add "Connect" button per card with simulated OAuth
- [x] Require at least 1 channel to proceed
- [x] Add "Go to Dashboard" final CTA

**REVIEW CHECKPOINT 9:** Complete

---

### Phase 10: Dashboard
- [x] Create `dashboard.html`
- [x] Build Summary panel (left column)
- [x] Build Impact cards (right column - green/blue gradient)
- [x] Build "Get More From Your Data" section with channel status
- [x] Build "Learn About Popsixle" video section
- [x] Build "Popsixle Pixel Helper" section
- [x] Add prominent conditional blocker banners (red, pulsing)
- [x] Add demo selector for 3 states (all good, pixel not setup, channel not connected)

**REVIEW CHECKPOINT 10:** Complete

---

### Phase 11: Final Integration & Polish
- [x] Wire all navigation between screens
- [x] Test complete flow: Pricing → Wizard → Dashboard
- [x] Verify Skip to Dashboard works
- [x] Verify banner links back to onboarding
- [x] Update banner text format ("Popsixle is not setup - XXXX")

**FINAL REVIEW:** Complete

---

## Files Created

| File | Purpose |
|------|---------|
| `index.html` | Entry point, redirects to onboarding.html |
| `onboarding.html` | Pricing screen + 5-step wizard |
| `dashboard.html` | Post-onboarding dashboard with conditional banners |
| `components.html` | Component library reference |
| `css/styles.css` | Global styles and design tokens |
| `css/components.css` | Reusable component styles |
| `js/main.js` | General interactions |
| `js/wizard.js` | Wizard state management (inline in onboarding.html) |

---

## Key Features Implemented

1. **Pricing Screen** - Clean Elevar-inspired two-column layout
2. **5-Step Wizard** - With sidebar navigation and progress tracking
3. **Pixel Verification** - 4 states with demo selector for testing
4. **Dynamic Review** - Shows user's selections from previous steps
5. **Channel Connect** - Visual flow diagram + OAuth simulation
6. **Conditional Banners** - Prominent red banners with pulse animation
7. **Demo Selectors** - For testing different UI states
