# Product Requirements Document
## Channel Connect Experience Revamp

**Version:** 1.0
**Date:** January 22, 2026
**Author:** Product Team
**Status:** Draft

---

## 1. Overview

### 1.1 Problem Statement
Users connecting their ad channels (Meta, Google, TikTok) to Popsixle experience friction and uncertainty. The current flow has inconsistent UI patterns (modals vs. inline), lacks clear success/failure feedback, and doesn't provide enough guidance. Users frequently don't know if their connection was successful.

### 1.2 Goal
Create a unified, educational channel connection experience that:
- Feels consistent across all channels
- Matches the new onboarding wizard aesthetic
- Clearly communicates success/failure states
- Reduces time-to-connect and increases completion rates

### 1.3 Success Metrics
| Metric | Current | Target |
|--------|---------|--------|
| Connection Completion Rate | TBD | +20% |
| Time to Connect (avg) | TBD | -30% |
| Support Tickets (connection-related) | TBD | -40% |

---

## 2. Scope

### 2.1 Entry Points
The channel connect experience will be accessible from:

1. **Onboarding Wizard (Step 5)** - New users connecting channels for the first time
2. **Settings Pages** - Returning users adding/updating channel connections

**Important:** The channel connection form (center area + right panel) should be **identical** in both contexts to maintain consistency and reduce cognitive load. Only the left navigation differs.

### 2.2 Channels in Scope
- Meta (Facebook/Instagram)
- Google Ads
- TikTok

### 2.3 Settings Pages in Scope
For returning users, the Settings navigation includes:
- **Account Settings** - General account configuration
- **Facebook Settings** - Meta channel connection (this PRD)
- **Google Settings** - Google Ads channel connection (this PRD)
- **TikTok Settings** - TikTok channel connection (this PRD)
- **Privacy Settings** - Data privacy controls (future PRD)
- **Restricted Brand Controls** - For health/wellness/CBD brands (future PRD)

### 2.4 Out of Scope (Future Consideration)
- Snapchat channel
- Pinterest channel
- Other ad platforms
- Privacy Settings page (separate PRD)
- Restricted Brand Controls page (separate PRD)

---

## 3. User Personas

### Primary Persona: Marketing Manager / Store Owner
- **Technical Level:** Low to moderate
- **Context:** Managing multiple ad platforms, time-constrained
- **Pain Points:** Unsure where to find credentials, doesn't know if setup worked
- **Needs:** Clear guidance, visual confirmation, easy troubleshooting

**Design Principle:** Assume a low level of technical understanding for all users. Education is paramount.

---

## 4. User Flow

### 4.1 High-Level Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Select Channel │ ──▶ │  Enter Details  │ ──▶ │   Test Event    │ ──▶ │    Complete     │
│                 │     │  (with guidance)│     │   Validation    │     │   (Success!)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼ (if fails)
                                                ┌─────────────────┐
                                                │  Troubleshoot   │
                                                │    & Retry      │
                                                └─────────────────┘
```

### 4.2 Detailed Flow States

**State 1: Not Connected**
- Show channel card with "Connect" CTA
- Display data flow visual (Store → Popsixle → Channel)

**State 2: Connection Form**
- Inline form (not modal) with required fields
- Step-by-step guidance for each field
- Links to knowledge base articles
- "Need help?" assistance options

**State 3: Testing Connection**
- Loading state with animation
- "Sending test event to [Channel]..."

**State 4a: Success**
- Clear visual confirmation (checkmark, green indicators)
- "Connected" status badge
- Option to send another test event
- Next steps guidance

**State 4b: Failure**
- Clear error message explaining what went wrong
- Specific troubleshooting steps
- "Common issues" expandable section
- Easy retry without re-entering all fields
- Option to contact support

**State 5: Connected (Ongoing)**
- Show connection status
- Last successful event timestamp
- Option to disconnect/reconnect
- Edit credentials

---

## 5. Detailed Requirements

### 5.1 Layout Structure

The channel connect experience has **two contexts** with different left navigation:

1. **Onboarding Context** - New users going through initial setup (wizard with Setup Steps)
2. **Settings Context** - Returning users managing channels post-onboarding (settings nav with channel list)

The **Center Wizard Area** and **Right Panel** remain identical in both contexts.

---

#### 5.1.1 ONBOARDING CONTEXT (New Users)

Full wizard layout with Setup Steps sidebar:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────────────────┐  ┌─────────────────────┐ │
│  │   OUTER     │  │   SETUP     │  │         CENTER WIZARD              │  │    RIGHT PANEL      │ │
│  │   SIDEBAR   │  │   STEPS     │  │            AREA                    │  │                     │ │
│  │             │  │   SIDEBAR   │  │                                    │  │                     │ │
│  └─────────────┘  └─────────────┘  └────────────────────────────────────┘  └─────────────────────┘ │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Outer Left Sidebar (App Navigation):**
```
┌─────────────────────┐
│  [Logo] Zach's Shop │
│                     │
│  ⚙ Popsixle Setup   │  ← Active/highlighted
│                     │
│                     │
│                     │
│  ─────────────────  │
│  Skip to Dashboard  │
└─────────────────────┘
```

**Inner Left Sidebar (Setup Steps):**
```
┌─────────────────────┐
│  Setup Steps   5/5  │
│                     │
│  ◉ Overview         │
│  │                  │
│  ✓ 1 Product Cat.   │  completed
│  │                  │
│  ✓ 2 Pixel Setup    │  completed
│  │                  │
│  ✓ 3 Special Cases  │  completed
│  │                  │
│  ✓ 4 Review         │  completed
│  │                  │
│  ◉ 5 Connect Chan.  │  ← ACTIVE (purple)
│                     │
└─────────────────────┘
```

---

#### 5.1.2 SETTINGS CONTEXT (Returning Users)

Post-onboarding layout with channel selection sidebar:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────────────────┐  ┌─────────────────────┐ │
│  │   OUTER     │  │  SETTINGS   │  │         CENTER WIZARD              │  │    RIGHT PANEL      │ │
│  │   SIDEBAR   │  │    NAV      │  │            AREA                    │  │                     │ │
│  │             │  │             │  │                                    │  │                     │ │
│  └─────────────┘  └─────────────┘  └────────────────────────────────────┘  └─────────────────────┘ │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Outer Left Sidebar (App Navigation):**

Channels are surfaced directly in the main nav for easy access:

```
┌──────────────────────────┐
│  [Logo] Zach's Shop      │
│                          │
│  📊 Dashboard            │
│                          │
│  ─── CHANNELS ─────────  │
│                          │
│  Ⓕ Facebook Settings  🟢 │  ← Connected (green dot)
│                          │
│  🔺 Google Settings    🟢 │  ← Connected (green dot)
│                          │
│  ♪ TikTok Settings    ⚪ │  ← Not connected (gray)
│                          │
│  ─────────────────────── │
│                          │
│  ⚙ Settings              │  ← Opens inner nav
│                          │
│  📈 Analytics            │
│                          │
│  📚 Help & Resources     │
│                          │
└──────────────────────────┘
```

**Channel Status Indicators (in outer nav):**
- 🟢 Green dot = Connected
- 🟡 Yellow dot = Needs attention
- ⚪ Gray dot = Not connected

---

**Inner Left Sidebar - When Channel is Selected (Not Connected):**

Shows the connection flow steps:

```
┌─────────────────────────┐
│  Connect to Facebook    │
│                         │
│  ● 1 Enter Details      │  ← ACTIVE
│  │                      │
│  ○ 2 Test Connection    │  pending
│                         │
└─────────────────────────┘
```

**Inner Left Sidebar - When on Test Connection Step:**

```
┌─────────────────────────┐
│  Connect to Facebook    │
│                         │
│  ✓ 1 Enter Details      │  completed
│  │                      │
│  ● 2 Test Connection    │  ← ACTIVE
│                         │
└─────────────────────────┘
```

**Inner Left Sidebar - When Channel is Connected:**

Shows management options:

```
┌─────────────────────────┐
│  Facebook Settings      │
│                         │
│  ● Connection Status    │  ← ACTIVE
│                         │
│  ○ Event Configuration  │  (future)
│                         │
│  ○ Advanced Settings    │  (future)
│                         │
└─────────────────────────┘
```

---

**Inner Left Sidebar - When "Settings" is Selected:**

Shows other settings pages:

```
┌─────────────────────────┐
│  Settings               │
│                         │
│  ⚙ Account Settings     │  ← General account config
│                         │
│  🔒 Privacy Settings    │  ← Data privacy controls
│                         │
│  🌿 Restricted Brand    │  ← Health/CBD brand controls
│     Controls            │
│                         │
└─────────────────────────┘
```

---

**Inner Left Sidebar - When "Analytics" is Selected (Placeholder):**

```
┌─────────────────────────┐
│  Analytics              │
│                         │
│  📈 Overview            │
│                         │
│  📊 Channel Performance │
│                         │
│  🔄 Event History       │
│                         │
└─────────────────────────┘
```

---

**Inner Left Sidebar - When "Help & Resources" is Selected (Placeholder):**

```
┌─────────────────────────┐
│  Help & Resources       │
│                         │
│  📚 Knowledge Base      │
│                         │
│  💬 Contact Support     │
│                         │
│  📞 Book a Call         │
│                         │
└─────────────────────────┘
```

---

#### 5.1.3 Center Wizard Area (Main Content) - SHARED

This is where the channel connection form lives. **Identical in both contexts:**

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  Connect to [Channel Name]                                     │
│  Send your conversion data to [Channel] to improve ad perf.   │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                                                          │ │
│  │   [Shopify] ----→ [Popsixle] ----→ [Channel Logo]       │ │
│  │   Your Store      Popsixle Pixel    [Channel Name]       │ │
│  │                                                          │ │
│  │   Data Flow Visual (animated dashed lines)               │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  [Purple Label] Pixel/Dataset ID                         │ │
│  │                                                          │ │
│  │  Found in Meta Events Manager > Settings Tab             │ │
│  │                                                          │ │
│  │  ┌────────────────────────────────────────────────────┐ │ │
│  │  │ Paste the Pixel/Dataset ID here                    │ │ │
│  │  └────────────────────────────────────────────────────┘ │ │
│  │                                                          │ │
│  │  Your Pixel ID will appear as a number like 1234567890  │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  [Purple Label] CAPI Token                               │ │
│  │  ... (same pattern for each field)                       │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  [Purple Label] Test Event Code                          │ │
│  │  ...                                                     │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────┐                             │
│  │  Confirm & Send Test Event   │  Purple primary button     │
│  └──────────────────────────────┘                             │
│                                                                │
│  ─────────────────────────────────────────────────────────── │
│  [Back]                                          [Continue]   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### 5.1.4 Right Panel (Contextual Help + Persistent Assistance) - SHARED

Two sections - contextual explanation that changes per channel, and persistent support options.
**Identical in both contexts:**

```
┌─────────────────────────────────┐
│  STEP 5                         │  ← Purple label
│                                 │
│  Connect Your Ad Channels       │  ← Bold title
│                                 │
│  Connecting to your ad channels │
│  allows Popsixle to send        │
│  tracked conversion data        │
│  directly to each platform.     │
│                                 │
│  This will enable improved      │
│  attribution and event match    │
│  quality that boost your ad     │
│  performance.                   │
│                                 │
│  ─────────────────────────────  │
│                                 │
│  ⓘ Common Questions             │  ← Expandable section
│                                 │
│  Where do I find my Pixel ID?   │
│  Your Pixel ID is located in    │
│  the Meta Events Manager...     │
│                                 │
│  Is my data secure?             │
│  Yes. Data is secured and       │
│  de-identified...               │
│                                 │
│  What if the test fails?        │
│  Don't worry! Check that your   │
│  credentials are correct...     │
│                                 │
├─────────────────────────────────┤
│                                 │
│  SETUP ASSISTANCE               │  ← Purple label (persistent)
│                                 │
│  ┌─────────────────────────────┐│
│  │ [Avatar] Free Onboarding    ││
│  │          Call               ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ [▷] Popsixle Setup Overview ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ [📄] Explore Setup Guides   ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

### 5.2 Channel-Specific Right Panel Content

Each channel should have tailored Common Questions in the right panel:

#### Meta Common Questions:
- "Where do I find my Pixel/Dataset ID?"
- "How do I generate a CAPI token?"
- "What is a Test Event Code?"
- "Why do I need all three values?"

#### Google Common Questions:
- "Where do I find my Account ID?"
- "What permissions does Popsixle need?"
- "Can I connect multiple accounts?"

#### TikTok Common Questions:
- "Where do I find my Pixel ID?"
- "How do I generate an Events API token?"
- "What events will Popsixle send?"

### 5.3 Meta (Facebook/Instagram) Connection

**Knowledge Base:** https://info.popsixle.com/knowledge/popsixle-onboarding-fb-pixel-dataset

**Required Fields:**

| Field | Label | Helper Text | Format Hint |
|-------|-------|-------------|-------------|
| Pixel/Dataset ID | Pixel/Dataset ID | Found in Meta Events Manager: Select your Dataset → Settings Tab → Top of page | Numbers only (e.g., 1234567890) |
| CAPI Token | Conversions API Access Token | Generate in Meta Events Manager → Settings → Conversions API → Generate Token | Long alphanumeric string |
| Test Event Code | Test Event Code | Found in Meta Events Manager → Test Events tab | Starts with "TEST" (e.g., TEST12345) |

**Validation Rules:**
- Pixel ID: Numeric, 10-20 digits
- CAPI Token: Alphanumeric, 100+ characters
- Test Event Code: Starts with "TEST", alphanumeric

**Inline Guidance (Expandable):**
- "Where do I find my Pixel/Dataset ID?" → Screenshot/GIF showing location in Meta Events Manager
- "How do I generate a CAPI token?" → Step-by-step with screenshot
- "What is a Test Event Code?" → Brief explanation + screenshot

### 5.4 Google Ads Connection

**Knowledge Base:** https://info.popsixle.com/knowledge/adding-a-popsixle-google-data-connection

**Required Fields:**

| Field | Label | Helper Text | Format Hint |
|-------|-------|-------------|-------------|
| Google Ad Account ID | Google Ads Account ID | Found in the top-right corner of your Google Ads dashboard | 10 digits with hyphens (e.g., 123-456-7890) |

**Authentication Flow:**
1. User enters Account ID
2. User clicks "Begin Google Authentication"
3. OAuth popup opens
4. User authorizes Popsixle
5. Popup closes, connection verified

**Validation Rules:**
- Account ID: Format XXX-XXX-XXXX (numbers and hyphens)

**Inline Guidance (Expandable):**
- "Where do I find my Account ID?" → Screenshot showing location in Google Ads

### 5.5 TikTok Connection

**Knowledge Base:** https://info.popsixle.com/knowledge/how-to-send-popsixle-data-to-tiktok

**Required Fields:**

| Field | Label | Helper Text | Format Hint |
|-------|-------|-------------|-------------|
| Pixel ID | TikTok Pixel ID | Found in TikTok Ads Manager → Assets → Events → Web Events | Alphanumeric (e.g., C1234ABC5678DEFG01) |
| Events API Token | Events API Access Token | Generate in TikTok Events Manager → Settings → Events API → Generate Token | Long alphanumeric string |
| Test Event Code | Test Event Code | Found in TikTok Events Manager → Test Events → Test Server Events | Alphanumeric code |

**Validation Rules:**
- Pixel ID: Alphanumeric, ~20 characters
- Events API Token: Alphanumeric, 50+ characters
- Test Event Code: Alphanumeric

**Inline Guidance (Expandable):**
- "Where do I find my Pixel ID?" → Screenshot/GIF
- "How do I generate an Events API token?" → Step-by-step
- "What is a Test Event Code?" → Brief explanation

---

## 6. Test Event Validation Experience

### 6.1 Design Principle
Mirror the Popsixle Pixel verification experience from onboarding - clear, visual feedback with actionable next steps.

### 6.2 States

**Sending Test Event:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     [Animated Loading Indicator]                                │
│                                                                 │
│     Sending test event to Meta...                               │
│     This usually takes 5-10 seconds                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Success State:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     ✓  Connection Successful!                                   │
│                                                                 │
│     Popsixle is now sending conversion data to Meta.            │
│     Events will appear in your Events Manager within 24 hours.  │
│                                                                 │
│     ┌─────────────────────┐  ┌─────────────────────┐           │
│     │  Send Another Test  │  │   Done              │           │
│     └─────────────────────┘  └─────────────────────┘           │
│                                                                 │
│     What's next?                                                │
│     • View your Events Manager to monitor incoming events       │
│     • Set up conversion optimization in your ad campaigns       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Failure State:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     ✗  Connection Failed                                        │
│                                                                 │
│     We couldn't verify your connection. Here's what to check:   │
│                                                                 │
│     ┌─────────────────────────────────────────────────────────┐ │
│     │ ⚠ Your Pixel/Dataset ID may be incorrect                │ │
│     │   Double-check that you copied the full ID              │ │
│     └─────────────────────────────────────────────────────────┘ │
│                                                                 │
│     [▼ Common Issues & Solutions]                               │
│                                                                 │
│     ┌─────────────────────┐  ┌─────────────────────┐           │
│     │    Try Again        │  │   Get Help          │           │
│     └─────────────────────┘  └─────────────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Common Error Messages

| Error Type | User Message | Troubleshooting Suggestion |
|------------|--------------|---------------------------|
| Invalid Pixel ID | "The Pixel/Dataset ID doesn't appear to be valid" | "Make sure you've copied the complete ID without any extra spaces" |
| Invalid Token | "The access token was rejected" | "Try generating a new token in your Events Manager" |
| Permission Error | "Popsixle doesn't have permission to send events" | "Check that your token has the required permissions" |
| Network Error | "We couldn't reach [Channel]" | "Check your internet connection and try again" |
| Test Event Not Found | "The test event code wasn't recognized" | "Make sure Test Events mode is enabled in your Events Manager" |

---

## 7. Visual Design Specifications

### 7.1 Design System Alignment

The channel connect experience should use the same design tokens as the onboarding wizard:

**Colors:**
- Primary: `#A855F7` (Purple)
- Success: `#10B981` (Green)
- Error: `#EF4444` (Red)
- Warning: `#F59E0B` (Amber)
- Background: `#FAFBFC`
- Card Background: `#FFFFFF`
- Border: `#E2E8F0`
- Text Primary: `#1E293B`
- Text Secondary: `#64748B`

**Typography:**
- Headings: 600 weight
- Body: 400-500 weight
- Helper text: 400 weight, secondary color

**Spacing:**
- Card padding: 24px
- Field spacing: 20px
- Section spacing: 32px

### 7.2 Component Patterns

**Input Fields:**
- Rounded corners (8px)
- Border: 1px solid `#E2E8F0`
- Focus state: Purple border with light purple shadow
- Error state: Red border with error icon

**Buttons:**
- Primary: Purple background, white text
- Secondary: White background, gray border
- Disabled: Reduced opacity

**Cards:**
- White background
- Subtle shadow: `0 1px 3px rgba(0,0,0,0.05)`
- Rounded corners (12px)

**Expandable Sections:**
- Chevron icon
- Smooth expand/collapse animation
- Light gray background when expanded

---

## 8. Responsive Behavior

### 8.1 Desktop (>1024px)
- Two-column layout where appropriate
- Side-by-side assistance panel

### 8.2 Tablet (768px - 1024px)
- Single column layout
- Assistance panel below main content

### 8.3 Mobile (<768px)
- Full-width inputs
- Stacked layout
- Simplified guidance (expandable sections)

---

## 9. Accessibility Requirements

- All form fields must have associated labels
- Error messages must be announced to screen readers
- Focus management during test event validation
- Color is not the only indicator of state (icons + text)
- Minimum touch target size of 44x44px on mobile

---

## 10. Technical Considerations

### 10.1 API Requirements
- Validate credentials before sending test event
- Real-time test event status polling
- Graceful timeout handling (30 second max)

### 10.2 State Persistence
- Save partial form progress (don't lose data on accidental navigation)
- Remember last successful connection for easy reconnection

### 10.3 Analytics Events to Track
- `channel_connect_started` - User begins connection flow
- `channel_connect_field_entered` - Each field completed
- `channel_connect_help_clicked` - User clicked help/KB link
- `channel_connect_test_sent` - Test event initiated
- `channel_connect_success` - Connection successful
- `channel_connect_failed` - Connection failed (include error type)
- `channel_connect_retry` - User retried after failure

---

## 11. Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Create unified layout component
- [ ] Implement form validation
- [ ] Build test event verification flow
- [ ] Design success/error states

### Phase 2: Channel Integration (Week 3-4)
- [ ] Meta connection flow
- [ ] Google connection flow (with OAuth)
- [ ] TikTok connection flow

### Phase 3: Polish & Help (Week 5)
- [ ] Add inline guidance/tooltips
- [ ] Implement expandable help sections
- [ ] Add knowledge base links
- [ ] Error message refinement

### Phase 4: Testing & Launch (Week 6)
- [ ] QA testing
- [ ] User acceptance testing
- [ ] Soft launch to subset of users
- [ ] Monitor metrics and iterate

---

## 12. Open Questions

1. **Retry Limits:** Should we limit the number of test event retries? (Recommendation: No hard limit, but show "Still having trouble? Contact support" after 3 failures)

2. **Partial Connections:** If a user completes one channel but not others during onboarding, how do we handle the wizard completion state?

3. **Credential Storage:** How long should we retain failed credentials for retry purposes?

4. **Offline Handling:** What happens if user loses connection mid-flow?

---

## 13. Appendix

### 13.1 Knowledge Base URLs
- Meta: https://info.popsixle.com/knowledge/popsixle-onboarding-fb-pixel-dataset
- Google: https://info.popsixle.com/knowledge/adding-a-popsixle-google-data-connection
- TikTok: https://info.popsixle.com/knowledge/how-to-send-popsixle-data-to-tiktok

### 13.2 Related Documents
- Onboarding Wizard Prototype: `onboarding.html`
- Design System: (link to Figma/design specs)
- API Documentation: (link to internal docs)

### 13.3 Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-22 | Product Team | Initial draft |
