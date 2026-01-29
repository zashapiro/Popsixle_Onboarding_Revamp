# UI States Documentation

All UI states shown in the prototype that must be implemented.

---

## Pixel Status (Step 2)

The prototype has demo buttons to toggle between states.

| State | Trigger | Visual | Next Button |
|-------|---------|--------|-------------|
| **Not Started** | Default/initial | Gray badge: "Pixel Not Connected" | Disabled |
| **Checking** | User clicks "I've enabled it" | Spinner + "Checking..." | Disabled |
| **Enabled** | Pixel detected by API | Green badge + checkmark: "Pixel Enabled" | Enabled |
| **Not Found** | Pixel not detected | Red badge: "Pixel Not Detected" + Retry button | Disabled |

### Implementation Notes
- Poll pixel status endpoint every 5 seconds when in "Checking" state
- Timeout after 30 seconds → show "Not Found" with help link
- User can manually trigger re-check with "I've enabled it" button

---

## Channel Connection Status (Step 5)

Each channel card (Meta, Google, TikTok) has two states:

| State | Visual | Action |
|-------|--------|--------|
| **Not Connected** | Gray status dot, "Ready to connect" | Show "Connect" button |
| **Connected** | Green status dot + checkmark | Hide button, show connected state |

### Flow Diagram Lines
- Ghost lines (15% opacity) before connection
- Animated dashed lines after connection
- Lines connect from Popsixle node to each connected channel

---

## Dashboard Conditional Banners

The dashboard shows contextual warning banners based on setup status.

| Condition | Banner Shown | CTA |
|-----------|--------------|-----|
| Pixel not enabled | Red: "Popsixle is not setup - Enable the Pixel..." | "Enable Pixel" → Step 2 |
| No channels connected | Red: "Popsixle is not setup - Connect a Channel..." | "Connect Channel" → Step 5 |
| All good | No banner | - |

### Banner Styling
- Background: #DC2626 (dark red)
- Pulsing warning icon
- White CTA button with red text
- Box shadow for prominence

---

## Product Type Selection (Step 1)

Radio card selection with conditional banner:

| Selection | Unrestricted Banner |
|-----------|---------------------|
| Regular Products | Hidden |
| Health & Wellness | Shown |
| CBD or Hemp | Shown |
| Other Restricted | Shown |

---

## Special Cases Toggles (Step 3)

Three independent toggles:

| Toggle | When ON |
|--------|---------|
| Landing Pages | Show URL input field |
| Headless Storefront | Just record selection |
| Custom Cart | Just record selection |

---

## Skip to Dashboard Modal

Appears when user clicks "Skip to Dashboard":

| State | Content |
|-------|---------|
| Modal open | Warning icon, "Setup Not Complete" message, help links |
| Actions | "Skip Anyway" (secondary) / "Continue Setup" (primary) |

---

## Pricing Details Accordion

| State | Visual |
|-------|--------|
| Collapsed | "View Pricing Details" with down arrow |
| Expanded | Arrow rotates, content slides down |

---

## Wizard Step Indicators (Sidebar)

| State | Visual |
|-------|--------|
| Not Started | Gray circle, gray text |
| Current | Purple circle (filled), purple text |
| Completed | Green circle with checkmark, dark text |

---

## Testing Checklist

Use demo selectors in prototype to verify all states:

- [ ] Pixel: cycle through all 4 states
- [ ] Channels: connect/disconnect each
- [ ] Dashboard: toggle banner states
- [ ] Product type: verify banner shows for restricted
- [ ] Skip modal: opens and closes correctly
