# Popsixle Onboarding Prototype - Planning Document

## Status: COMPLETE

All screens and flows have been implemented as a clickable HTML/CSS/JS prototype.

---

## Overview
Build a high-fidelity clickable HTML/CSS/JS prototype for the new Popsixle onboarding experience based on the design spec and Shopify best practices.

**Delivery Location:** `c:\Users\shapi\Documents\Popsixle_Onboarding_Revamp`

**Brand Colors:**
- Primary CTA: Solid purple #A855F7 (hover: #9333EA)
- Gradient reserved for logo only: #D946EF → #8B5CF6
- Critical/Blocker banners: Red #DC2626

---

## Onboarding Flow Structure

### Pre-Step: Pricing & Plan Selection (NOT in step counter)
**IMPLEMENTED** - Clean Elevar-inspired design

#### Layout
- Two-column grid layout (1fr left : 1.4fr right)
- Sticky nav bar with circle logo only (no step indicators)
- "View Pricing Details" accordion below the two-column layout

#### Left Column - Pricing Card
- Plan name: "Popsixle Core" (uppercase label)
- Price: "$95/month" (large, bold)
- Features list with checkmarks:
  - Includes the first $10,000/month in revenue
  - + $1 per $1,000 after that
  - Setup in 10 minutes, no engineer required
  - Send all your conversion data to Meta, Google & TikTok
- CTA: "Start 14-Day Free Trial" (solid purple button #A855F7)

#### Right Column - Two Stacked Cards
1. **Trust Card** - "Why brands choose Popsixle"
   - 20% performance lift
   - Easy install
   - Top notch support
2. **Testimonial Card** - Customer quote
   - "Popsixle has demystified our Facebook attribution..." — Cozy Earth

#### Header (above layout)
- H1: "Start Tracking All Your Conversions"
- Subhead: "Join **200+ brands** getting 20% better ad performance"

#### Pricing Details (expandable accordion below layout)
- Base fee: $95/month after trial
- Usage fee: $1 per $1,000 revenue processed
- Free tier: First $10,000/month always free
- Example calculation included
- "Cancel anytime. No long-term contract."

- NO step counter shown on this screen

---

## Onboarding Wizard (5 Steps)

### Global Wizard Components
- Wizard layout with left sidebar showing all steps + status
- Progress indicator ("Step X of 5" + progress bar) - starts AFTER pricing
- "Skip to Dashboard" link in top-right corner
- Navigation controls (Next, Back, Skip buttons)
- Persistent "Need help?" panel with:
  - "Book a free onboarding session" CTA
  - "Watch onboarding walkthrough" video link

### Step 1: Product Type Selection
- Product type selection UI with 4 options:
  - Regular products (clothing, home goods, electronics)
  - Health & Wellness products (supplements, fitness, beauty)
  - CBD or Hemp products
  - Other restricted category
- Routing logic: If Health/Wellness, CBD/Hemp, or Restricted selected → show Unrestricted info banner with link to unrestricted.popsixle.com
- Tooltip explaining why product type matters
- REQUIRED step

### Step 2: Popsixle Pixel Setup (Enhanced)
**Goal:** Educate user on WHY pixel is needed + verify correct enablement

#### Education Section
- "Why do I need to enable the Popsixle Pixel?" expandable section with:
  - Explanation: The pixel captures conversion events from your store
  - Benefit: Enables server-side tracking that bypasses browser blockers
  - Outcome: Better data = better ad performance
- Visual diagram showing: Store → Popsixle Pixel → Ad Platforms
- "What happens if I don't enable it?" tooltip (answer: no events tracked)

#### Setup Instructions
- Deep link button: "Open Shopify Theme Editor"
- Screenshot preview showing exactly where to enable
- "Show me how" modal with numbered steps + GIF/screenshots:
  1. Click "Open Theme Editor"
  2. Find "App embeds" in left sidebar
  3. Toggle "Popsixle" to ON
  4. Click Save

#### Verification States
- **State 1 - Not Started:** Gray status, "Enable the pixel to continue"
- **State 2 - Checking:** Loading spinner, "Checking pixel status..."
- **State 3 - Enabled:** Green checkmark, "Popsixle Pixel is active!"
- **State 4 - Not Found:** Yellow warning, "Pixel not detected yet" + "Check again" button + "Having trouble?" help link
- Auto-check on return from theme editor (or manual "I've enabled it" button)
- REQUIRED step (cannot proceed until State 3 is reached)

### Step 3: Special Cases
- Special cases selection UI with toggles/checkboxes:
  - Landing page tracking
  - Headless storefront
  - Custom cart implementation
- Each option has "Learn more" expandable section
- All options visible regardless of product type
- OPTIONAL step (can skip)

### Step 4: Review Configuration
- Summary view showing:
  - Selected product type
  - Pixel setup status (complete/pending)
  - Special cases selected
- "Edit" links to jump back to each section
- Confirm settings button to proceed

### Step 5: Channel Connect
- Channel connection UI with platform cards:
  - Meta (Facebook/Instagram) - with status chip
  - Google Ads - with status chip
  - TikTok - with status chip
- Each card has "Connect" button + "Set up manually" option
- Success celebration on completion
- "Go to Dashboard" CTA

---

## Dashboard (Post-Onboarding)

### Layout (matching existing)
- **Left Column - Summary Panel:**
  - Launch Date
  - Status (Trial Active)
  - Days Live
  - Next Billing Date
  - Current Usage Charge
  - Usage Rate info
  - Total Events Processed
- **Right Column - Impact Cards (top):**
  - Incremental Revenue card (green, +$5K style)
  - Incremental Orders card (blue, +56 style)
  - Orders from New Customers card (green, 53% style)
- **Get More From Your Data Section:**
  - "Connect More Channels" subsection with Facebook/Google/TikTok status rows
  - "Customize Your Setup" subsection with links
- **Learn About Popsixle Section:** Embedded video player
- **Popsixle Pixel Helper Section:** Bottom section

### Conditional Blocker Banners (IMPLEMENTED)
Prominent red banners that display when setup is incomplete:

**Pixel Not Setup Banner:**
- Solid red background (#DC2626)
- White text with pulsing warning icon
- Message: "Popsixle is not setup - Enable the Pixel to start tracking events"
- "Enable Pixel" CTA button (white with red text)
- Links back to onboarding wizard

**Channel Not Connected Banner:**
- Same prominent red styling
- Message: "Popsixle is not setup - Connect a Channel to start tracking events"
- "Connect Channel" CTA button
- Links back to onboarding wizard

**Demo Selector:**
- Fixed position selector for testing 3 states:
  1. All Good (no banner)
  2. Pixel Not Setup (shows pixel banner)
  3. Channel Not Connected (shows channel banner)

---

## Component Library

### Status Indicators
- Status chip component with 4 states:
  - Connected (green)
  - Not Connected (gray)
  - Needs Attention (yellow)
  - Error (red)

### Help System
- Tooltip component ("What is this?" icon)
- "Show me how" modal component
- Inline help link style

### Form Elements
- Primary button (filled)
- Secondary button (outlined)
- Tertiary button (text link)
- Card component (8px radius, subtle shadow, 20px padding)
- Progress bar component
- Checkbox/toggle component

---

## Visual Design System

### Polaris Alignment
- 16px base spacing
- 8px border radius on cards
- Consistent typography scale
- Color palette (using Popsixle brand colors)
- Responsive layout (works at 1200px+ width minimum)

---

## File Structure
```
/Popsixle_Onboarding_Revamp
  index.html            (Entry → redirects to onboarding.html)
  onboarding.html       (Pricing pre-step + 5-step wizard)
  components.html       (Component library preview)
  dashboard.html        (Post-onboarding dashboard)
  planning.md           (This file - specifications)
  design.md             (Design principles & patterns)
  todo.md               (Implementation task list)
  /css
    styles.css          (Global styles + design tokens)
    components.css      (Reusable component styles)
  /js
    wizard.js           (Step navigation + state management)
    main.js             (General interactions, modals, tooltips)
  /assets
    popsixle_logo_gradient_1600.png        (Full logo - not used in nav)
    popsixle_logo_gradient_circle_500.png  (Circle logo - used in nav)
    Existing Dashboard.png                  (Reference screenshot)
```

---

## Assets Available
- Dashboard screenshot: `Existing Dashboard.png`
- Full logo: `popsixle_logo_gradient_1600.png`
- Icon logo: `popsixle_logo_gradient_circle_500 (1).png`
- Brand colors: Purple gradient (#D946EF → #8B5CF6)

---

## Sources Referenced
- [Shopify App Onboarding Guidelines](https://shopify.dev/docs/apps/design/user-experience/onboarding)
- [Improving Shopify App Onboarding Flow](https://www.shopify.com/partners/blog/improving-your-shopify-apps-onboarding-flow)
- [Popsixle.com](https://popsixle.com)
- [Unrestricted.popsixle.com](https://unrestricted.popsixle.com)
- Popsixle_Onboarding_Design_Spec.pdf (local)
