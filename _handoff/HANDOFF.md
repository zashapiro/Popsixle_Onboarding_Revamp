# Onboarding Redesign - Developer Handoff

**Date:** 2026-01-26
**Product Owner:** Zach
**Developer:** Dylan
**Build Tool:** Cursor AI
**Kickoff Meeting:** Tuesday Jan 27

---

## Quick Start

1. Read `.cursorrules` (AI context file in project root)
2. Open `onboarding.html` in browser to see the prototype
3. Review `popsixle_onboarding_content -NEW.md` for all copy
4. Check `_handoff/` folder for additional docs

---

## Screens Overview

| File | Title | Purpose |
|------|-------|---------|
| `index.html` | Popsixle - Onboarding | Entry point (redirects to onboarding.html) |
| `onboarding.html` | Popsixle - Get Started | Pricing + 5-step wizard |
| `dashboard.html` | Popsixle - Dashboard | Post-onboarding with conditional banners |
| `components.html` | Component Library | Reference only |

---

## Acceptance Criteria

### Phase 1: Core Flow

#### Pricing Screen
- [ ] Two-column layout matches prototype
- [ ] "Start 14-Day Free Trial" initiates Shopify billing
- [ ] Pricing details accordion works
- [ ] Mobile responsive

#### Wizard Shell
- [ ] Left sidebar with step navigation
- [ ] Progress shows current step
- [ ] "Skip to Dashboard" with warning modal
- [ ] Back/Next navigation
- [ ] State persists on refresh

#### Step 1: Product Type
- [ ] Four radio options
- [ ] Unrestricted banner for Health/CBD/Restricted
- [ ] Selection saves to backend
- [ ] Required (can't skip)

#### Step 2: Pixel Setup
- [ ] "Open Theme Editor" deep links to Shopify
- [ ] Pixel detection polls (every 5s)
- [ ] 4 states: Not Started → Checking → Enabled/Not Found
- [ ] "Show me how" modal
- [ ] Required (must reach Enabled state)

#### Step 3: Special Cases
- [ ] Three toggle options
- [ ] URL input for landing pages
- [ ] Optional (can skip)

#### Step 4: Review
- [ ] Shows all prior selections
- [ ] Edit links jump to correct step
- [ ] Confirm proceeds

#### Step 5: Connect Channels
- [ ] Visual flow diagram
- [ ] Meta/Google/TikTok OAuth cards
- [ ] Status updates after OAuth
- [ ] Requires 1+ channel to proceed

#### Dashboard
- [ ] Red banner when pixel not setup
- [ ] Red banner when no channels connected
- [ ] Banners link back to relevant step

---

## Key Documents

| Doc | What It Contains |
|-----|------------------|
| `popsixle_onboarding_content -NEW.md` | All copy/text (source of truth) |
| `planning.md` | Full PRD/spec |
| `design.md` | UX principles |
| `AI_Studio_System_Prompt.md` | Design tokens for AI |
| `_handoff/dynamic-values.md` | What's hardcoded → dynamic |
| `_handoff/assets.md` | Missing assets list |
| `_handoff/states.md` | UI state documentation |

---

## Open Questions for Kickoff

1. Where does onboarding live in production codebase?
2. What's the current auth/session setup?
3. Is there an existing pixel detection endpoint?
4. Do we have OAuth flows for Meta/Google/TikTok?
5. Where should user selections be stored?
6. What's the deploy/PR process?

---

## Definition of Done

A feature is done when:
1. Works locally
2. Matches prototype visually
3. Copy matches content doc exactly
4. All acceptance criteria checked
5. Works in Chrome, Safari, Firefox
6. Mobile responsive at 375px
7. Deployed to staging

---

## Communication

- **Daily:** Async Slack update
- **Blockers:** Tag Zach immediately
- **PRs:** Keep small (one step at a time is fine)
