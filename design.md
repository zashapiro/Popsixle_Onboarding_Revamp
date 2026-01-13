# Popsixle Onboarding - Design Principles

## Status: COMPLETE

This document captures the design principles used in the completed prototype.

## Core Design Philosophy

### 1. Shopify-Native Feel
The UI must feel like a natural extension of the Shopify Admin experience. Merchants spend most of their time in Shopify Admin, so Popsixle should feel familiar and trustworthy.

**Implementation:**
- Use Shopify Polaris design patterns and spacing
- Match Shopify's visual language (cards, buttons, typography)
- Avoid custom UI patterns that feel foreign to Shopify users
- Build trust through consistency

---

## Visual Design System

### Typography
| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| Page Title | 24-28px | Bold | Main headings |
| Section Title | 18-20px | Semi-bold | Card headers, step titles |
| Body | 14-16px | Regular | Primary content |
| Helper Text | 12-14px | Regular | Muted, secondary info |
| Labels | 12px | Medium | Form labels, status badges |

### Spacing (Polaris-aligned)
- **Base unit:** 16px
- **Card padding:** 20px
- **Section gap:** 24px
- **Element gap:** 8-16px

### Colors
| Purpose | Color | Hex |
|---------|-------|-----|
| Primary CTA | Purple (solid) | #A855F7 |
| Primary CTA Hover | Purple (darker) | #9333EA |
| Brand Gradient | Purple (logo only) | #D946EF → #8B5CF6 |
| Success | Green | #10B981 |
| Warning | Yellow/Amber | #F59E0B |
| Error | Red | #EF4444 |
| Critical/Blocker | Dark Red | #DC2626 |
| Neutral | Gray | #6B7280 |
| Background | Light Gray | #FAFBFC |
| Card Background | White | #FFFFFF |
| Border | Light Gray | #E5E7EB |

**Important:** Use solid purple (#A855F7) for all CTAs and buttons. Gradient is reserved for logo/branding only.

### Cards
- Border radius: 8px
- Shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Background: White (#FFFFFF)
- Padding: 20px

### Buttons
| Type | Style | Usage |
|------|-------|-------|
| Primary | Filled, solid purple #A855F7 | Main actions (Start Trial, Next, Connect) |
| Secondary | Outlined | Alternative actions (Back, Skip) |
| Tertiary | Text link (purple) | Low-priority actions (See details, Learn more) |

### Navigation
- Sticky nav bar (white background, border-bottom)
- Circle logo only (32px height)
- No step indicators in pricing screen nav
- Wizard screens will have step indicators

---

## Implemented Patterns

### Pricing Screen (Pre-Step)
**Style:** Clean, Elevar-inspired design

**Layout:**
- Two-column grid (1fr : 1.4fr ratio - right column wider)
- Cards stretch to equal height via flexbox
- Accordion positioned below the grid (full width)

**Left Column:**
- Single pricing card with plan name, price, features, CTA
- CTA button at bottom of card (flex layout)

**Right Column:**
- Two stacked cards (flex: 1 each for equal height)
- Trust card with checkmark list (uppercase label)
- Testimonial card with italic quote

**Key Decisions:**
- No gradient backgrounds - clean white/gray only
- Solid purple CTA button (not gradient)
- Circle logo in nav (not full logo)
- Pricing details as accordion below layout (doesn't affect column heights)

### Channel Connect (Step 5)
**Style:** Elevar-inspired visual flow diagram

**Layout:**
- Visual flow diagram at top: Shopify → Popsixle → Ad Channels
- Three channel cards below (Meta, Google, TikTok)
- "Go to Dashboard" CTA requires at least 1 connection

**Flow Diagram:**
- Shopify node (green, shopping bag icon)
- Popsixle node (purple gradient, logo)
- Channels node (gray, platform icons)
- Arrows connecting nodes to show data flow

**Channel Cards:**
- Platform icon + name + status
- Connect button that simulates OAuth
- Connected state shows green checkmark

### Dashboard Conditional Banners
**Style:** Prominent blocker for incomplete setup

**Banner Design:**
- Solid red background (#DC2626)
- White text, 16px font-weight 600
- Pulsing warning icon (triangle with animation)
- White CTA button with red text
- Shadow for visual prominence

**Banner Text Format:**
- "Popsixle is not setup - [specific issue]"
- Examples:
  - "Popsixle is not setup - Enable the Pixel to start tracking events"
  - "Popsixle is not setup - Connect a Channel to start tracking events"

**Demo Selector:**
- Fixed position UI for testing different states
- Radio buttons for: All Good / Pixel Not Setup / Channel Not Connected

---

## UX Principles

### 1. Progressive Disclosure
Don't overwhelm users with all information at once. Reveal details progressively.

**Application:**
- Pricing details hidden in accordion by default
- "Why do I need this?" expandable sections
- "Learn more" links for advanced options
- "Show me how" modals for step-by-step guidance

### 2. Path to Value
Every screen should clearly communicate what value the user will get and how to get there.

**Application:**
- Value prop visible: "Server-side tracking that actually works"
- Clear benefit statements before asking for action
- Step 2 explains WHY pixel is needed before asking to enable it

### 3. Reduce Cognitive Load
Minimize decisions and mental effort required at each step.

**Application:**
- One primary action per screen
- Smart defaults pre-selected where possible
- Simple pricing: "$0 today" not complex fee breakdowns
- Maximum 5 wizard steps (after pricing)

### 4. Build Confidence Through Feedback
Users should always know their current status and what to do next.

**Application:**
- Progress indicator: "Step X of 5"
- Status chips on channels (Connected/Not Connected)
- Pixel verification states with clear feedback
- Success celebrations on completion

### 5. Support Recovery
Users may leave mid-flow or make mistakes. Make recovery easy.

**Application:**
- "Skip to Dashboard" always available
- Edit links on Review screen
- Persistent setup checklist on Dashboard
- "Having trouble?" help links

---

## Onboarding-Specific Principles

### 1. Activation Over Information
Focus on getting users to their "aha moment" (first event tracked), not teaching everything.

**Application:**
- Only require what's essential
- Smart defaults for event configuration
- Skip optional steps guilt-free

### 2. Shopify Best Practices
Based on [Shopify's official onboarding guidelines](https://shopify.dev/docs/apps/design/user-experience/onboarding):

- **Brief and direct:** Share benefits quickly, no self-discovery required
- **Max 5 steps:** Prevent merchant dropout
- **Progress indicators:** Show advancement with encouraging feedback
- **Dismissible/skippable:** Non-essential onboarding should be skippable
- **Remind me later:** Option for complex steps that disrupt workflow

### 3. Education at Point of Need
Don't front-load education. Teach when relevant.

**Application:**
- Pixel explanation appears IN Step 2, not before
- Tooltips explain concepts when user encounters them
- "What is this?" icons next to confusing fields

---

## Component Patterns

### Status Indicators
Consistent visual language for connection states:

| State | Visual | Color |
|-------|--------|-------|
| Connected | Filled circle | Green (#10B981) |
| Not Connected | Empty circle | Gray (#6B7280) |
| Needs Attention | Filled circle | Yellow (#F59E0B) |
| Error | Filled circle | Red (#EF4444) |

### Help System Hierarchy
1. **Inline tooltips** - Quick explanations for terms/fields
2. **"Learn more" links** - Expandable content within page
3. **"Show me how" modals** - Step-by-step instructions with visuals
4. **Persistent help panel** - "Book onboarding session" + "Watch video"

### Progress Visualization
- Step counter: "Step X of 5" (text)
- Progress bar: Visual representation of completion
- Step list sidebar: All steps with status (not started / current / complete)

---

## Accessibility Considerations

- Color is not the only indicator (always pair with text/icons)
- Sufficient color contrast (WCAG AA minimum)
- Keyboard navigation support
- Focus states on interactive elements
- Clear error messages with remediation steps

---

## Mobile Considerations

While this is primarily a desktop experience (Shopify Admin), ensure:
- Minimum 1200px width support
- Readable text at all sizes
- Touch-friendly button sizes (minimum 44px)
- No horizontal scrolling at standard widths

---

## Anti-Patterns to Avoid

1. **Competing typography** - Don't use multiple large font sizes that compete for attention
2. **Information overload** - Don't show all pricing details upfront
3. **Empty states** - Don't show metrics dashboards before data exists
4. **Forced registration** - Don't require additional sign-up beyond Shopify OAuth
5. **Long tutorials** - Don't front-load education before activation
6. **Vague CTAs** - Use "Connect Facebook" not "Submit" or "Configure"

---

## Reference Apps (Competitor Patterns)

### AIMerce
- Left-hand navigation with step progress
- "Skip to Dashboard" option in top-right
- Video prominently featured
- "Book a free onboarding session" CTA

### OnePixel
- Persistent "Setup guide" accordion on dashboard
- Top banner for critical missing requirements
- Progress indicator: "0/4 completed"

### Elevar
- Step-by-step wizard flow
- Auto-detect options
- "How do I get it?" inline help links

---

## Sources

- [Shopify Polaris Design System](https://polaris.shopify.com/)
- [Shopify App Onboarding Guidelines](https://shopify.dev/docs/apps/design/user-experience/onboarding)
- [Improving Shopify App Onboarding Flow](https://www.shopify.com/partners/blog/improving-your-shopify-apps-onboarding-flow)
- Popsixle_Onboarding_Design_Spec.pdf (Veb Bansal recommendations)
