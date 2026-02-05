# TikTok Connection Page - Design Spec

## Overview

Add a TikTok connection flow to the onboarding wizard (Step 5). Follows the same layout and component patterns as Meta and Google, but with a different credential flow (manual entry vs OAuth).

**Reference:** `onboarding.html` Meta step panel (lines 4845-5059), Google step panel (~line 5105)

**Source:**
- [Adding a Popsixle TikTok Data Connection](https://popsixle.frontkb.com/en/articles/7938177)
- [How to Turn Off Shopify-TikTok CAPI](https://info.popsixle.com/knowledge/how-to-turn-off-the-shopify-tiktok-capi-connection)

---

## TikTok Connection Flow (from KB)

**Prerequisites:**
- TikTok Business Center account
- TikTok Ads Manager access
- TikTok Business ID

**Phase 1: TikTok Setup (done outside Popsixle)**
1. Add Popsixle as a Partner in TikTok Business Center (Business ID: `7306194182450888705`)
2. Assign Popsixle the "Events Manager" asset with "Manage" permission
3. Get Pixel ID from Events Manager
4. Generate Access Token (System User > Generate Token > Select Pixel)
5. Get Server Events Test Code from Pixel > Test Events tab

**Phase 2: Popsixle Setup**
1. Enter Pixel ID
2. Enter Access Token
3. Enter Server Events Test Code
4. Click "Confirm & Send Test Event"
5. Wait for confirmation (check TikTok Test Events tab)

**Critical Warning:** Users must turn off Shopify-TikTok CAPI to avoid data duplication. This requires creating a dummy pixel in TikTok and updating the Shopify sales channel.

---

## Page Structure

Identical to Meta/Google: two-panel layout inside `.wizard-content-area`.

```
┌──────────┬──────────────────────────────────────────┬────────────────────────┐
│ OUTER    │ INNER NAV        MAIN CONTENT             │ EXPLANATION PANEL      │
│ SIDEBAR  │ (connection-     (wizard-main)             │ (explanation-panel)    │
│ NAV      │  steps-list)                               │                        │
│          │                                            ├────────────────────────┤
│          │                                            │ SETUP ASSISTANCE       │
│          │                                            │ (assistance-card)      │
└──────────┴──────────────────────────────────────────┴────────────────────────┘
```

### Connection Steps List (Inner Nav)
**4 steps** (matches Meta complexity due to partner setup + credentials + test + next):

```html
<div class="connection-steps-list" id="tiktok-connection-steps-list">
  <ul class="wizard-step-list">
    <li class="wizard-step-item active" id="tiktok-connection-step-1">
      <span class="wizard-step-number">1</span>
      <div class="wizard-step-content">
        <span class="wizard-step-title">Add Popsixle as partner</span>
      </div>
    </li>
    <li class="wizard-step-item" id="tiktok-connection-step-2">
      <span class="wizard-step-number">2</span>
      <div class="wizard-step-content">
        <span class="wizard-step-title">Enter credentials</span>
      </div>
    </li>
    <li class="wizard-step-item" id="tiktok-connection-step-3">
      <span class="wizard-step-number">3</span>
      <div class="wizard-step-content">
        <span class="wizard-step-title">Test connection</span>
      </div>
    </li>
    <li class="wizard-step-item" id="tiktok-connection-step-4">
      <span class="wizard-step-number">4</span>
      <div class="wizard-step-content">
        <span class="wizard-step-title">What's next</span>
      </div>
    </li>
  </ul>
</div>
```

---

## Step 1: Add Popsixle as Partner

`data-step="5-tiktok"`

### Header (`.wizard-content-header`)
- **Status badge** (`.connection-test-badge .status-pending`): "Not Connected"
- **h1:** "Connect to TikTok"
- **Description:** "Send your conversion data to TikTok to improve ad targeting and campaign performance"
- **Help link:** `<a href="https://popsixle.frontkb.com/en/articles/7938177" target="_blank" class="channel-form-help-link">` "Need help? Read our step-by-step guide"

### Flow Diagram (`.channel-connect-flow`)
Same 3-node pattern:

| Node | Class | Image | Label |
|------|-------|-------|-------|
| Source | `.flow-node.shopify` | `assets/Shopify_Logo.png` | "Your Store" |
| Hub | `.flow-node.popsixle` | `popsixle_logo_gradient_circle_500 (1).png` | "Popsixle Pixel" |
| Destination | `.flow-node.tiktok` | `assets/tiktok-logo.png` | (none) |

- Line 1: green dashed (Shopify → Popsixle)
- Line 2: black dashed `#000000` (Popsixle → TikTok)

**Asset needed:** `assets/tiktok-logo.png` — TikTok logo (~40x40px)

### Form Content (`.wizard-content-body`)

**Card 1: Partner Setup Instructions**
```html
<div class="channel-connect-card">
  <label class="channel-form-label">Add Popsixle as a Partner</label>
  <div class="channel-form-helper">
    Before connecting, you need to add Popsixle as a partner in your TikTok Business Center.
    This gives Popsixle permission to send conversion events to your TikTok Pixel.
  </div>

  <div class="tiktok-steps-list">
    <div class="tiktok-step">
      <span class="tiktok-step-number">1</span>
      <div class="tiktok-step-content">
        <strong>Open TikTok Business Center</strong>
        <p>Go to <a href="https://business.tiktok.com" target="_blank">business.tiktok.com</a> and sign in</p>
      </div>
    </div>
    <div class="tiktok-step">
      <span class="tiktok-step-number">2</span>
      <div class="tiktok-step-content">
        <strong>Navigate to Partners</strong>
        <p>Click Users → Partners → Add Partner</p>
      </div>
    </div>
    <div class="tiktok-step">
      <span class="tiktok-step-number">3</span>
      <div class="tiktok-step-content">
        <strong>Enter Popsixle's Business ID</strong>
        <div class="tiktok-copy-field">
          <code id="popsixle-business-id">7306194182450888705</code>
          <button type="button" class="tiktok-copy-btn" onclick="copyBusinessId()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy
          </button>
        </div>
      </div>
    </div>
    <div class="tiktok-step">
      <span class="tiktok-step-number">4</span>
      <div class="tiktok-step-content">
        <strong>Assign Events Manager access</strong>
        <p>Select "Events Manager" as the asset type, then grant "Manage" permission</p>
      </div>
    </div>
  </div>
</div>
```

### Footer
- Left: "Back" (`.wizard-btn-secondary`, returns to channel select)
- Right: "I've Added the Partner" (`.wizard-btn-primary`, advances to Step 2)

### Demo Controls
```html
<div class="pixel-demo-controls">
  <div class="pixel-demo-controls-label">Demo Controls (preview version)</div>
  <div class="pixel-demo-controls-buttons">
    <button class="pixel-demo-btn demo-version-btn active" onclick="resetTikTokStep1()">Reset</button>
  </div>
</div>
```

### Explanation Panel (`data-explanation="5-tiktok"`)
- **label:** "TikTok"
- **title:** "Connect to TikTok"
- **body:** "Connecting to TikTok allows Popsixle to send server-side conversion data directly to your TikTok Pixel, improving attribution accuracy and campaign optimization."
- **FAQ:**
  1. "Why do I need to add Popsixle as a partner?" — "TikTok requires partner authorization before external systems can send events to your Pixel. This is a security measure to protect your ad account."
  2. "Where do I find my TikTok Business Center?" — "Go to business.tiktok.com and sign in with the account that manages your TikTok Ads."
  3. "What permission level does Popsixle need?" — "Popsixle needs 'Manage' permission on your Events Manager asset to send conversion events."

---

## Step 2: Enter Credentials

Displayed after user clicks "I've Added the Partner".

### Main Content
- Connection steps list: step 2 highlighted
- Status badge: still "Not Connected"

**Card 1: Pixel ID**
```html
<div class="channel-connect-card">
  <label class="channel-form-label">Enter your TikTok Pixel ID</label>
  <div class="channel-form-helper">
    Found in TikTok Events Manager: click your pixel name, then copy the Pixel ID from the overview page.
  </div>
  <input type="text" id="tiktok-pixel-id" class="channel-form-input"
         placeholder="e.g., CXXXXXXXXXXXXXXX">
  <div class="channel-form-error" id="tiktok-pixel-id-error">Please enter a valid Pixel ID</div>
</div>
```

**Card 2: Access Token**
```html
<div class="channel-connect-card">
  <label class="channel-form-label">Enter your Access Token</label>
  <div class="channel-form-helper">
    Generate this in TikTok: Events Manager → Settings → System Users → Generate Token → select your pixel.
  </div>
  <input type="text" id="tiktok-access-token" class="channel-form-input"
         placeholder="Paste your access token">
  <div class="channel-form-error" id="tiktok-access-token-error">Please enter a valid Access Token</div>
</div>
```

**Card 3: Test Event Code**
```html
<div class="channel-connect-card">
  <label class="channel-form-label">Enter your Server Events Test Code</label>
  <div class="channel-form-helper">
    Found in TikTok: Events Manager → your pixel → Test Events tab. Look for "Server events test code".
  </div>
  <input type="text" id="tiktok-test-code" class="channel-form-input"
         placeholder="e.g., TEST12345">
  <div class="channel-form-error" id="tiktok-test-code-error">Please enter a valid Test Code</div>
</div>
```

### Footer
- Left: "Back" (`.wizard-btn-secondary`)
- Right: "Continue" (`.wizard-btn-primary`, validates fields then advances to Step 3)

### Demo Controls
```html
<button class="pixel-demo-btn demo-version-btn" onclick="resetTikTokForm()">Reset</button>
<button class="pixel-demo-btn demo-version-btn" onclick="simulateTikTokCredentials()">Fill Credentials</button>
```

### Explanation Panel (`data-explanation="5-tiktok-credentials"`)
- **label:** "TikTok"
- **title:** "Enter Your Credentials"
- **body:** "These three pieces of information allow Popsixle to securely send conversion events to your TikTok Pixel."
- **FAQ:**
  1. "Where is my Pixel ID?" — "In TikTok Events Manager, click on your pixel name. The Pixel ID is shown at the top of the overview page (starts with 'C')."
  2. "How do I generate an Access Token?" — "In Events Manager, go to Settings → System Users → Generate Token. Select your pixel when prompted."
  3. "What is the Test Event Code for?" — "It lets you verify that Popsixle is successfully sending events before going live. You'll see test events appear in TikTok."

---

## Step 3: Test Connection

Displayed after credentials are validated.

### Main Content
- Connection steps list: step 3 highlighted
- Status badge: "Testing..." (yellow) initially

**Card 1: Send Test Event**
```html
<div class="channel-connect-card" id="tiktok-test-card">
  <label class="channel-form-label">Send a test event</label>
  <div class="channel-form-helper">
    Click the button below to send a test conversion event to TikTok. Then check your
    TikTok Events Manager → Test Events tab to confirm it arrived.
  </div>
  <button type="button" class="wizard-btn wizard-btn-primary"
          id="tiktok-send-test-btn" onclick="sendTikTokTestEvent()">
    Confirm & Send Test Event
  </button>
</div>
```

**Card 2: Test Success (hidden initially)**
```html
<div class="channel-connect-card" id="tiktok-test-success" style="display: none;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <svg class="verify-checkmark"><!-- green checkmark --></svg>
    <label class="channel-form-label" style="margin: 0;">Test Event Sent</label>
  </div>
  <div class="channel-form-helper">
    A test event has been sent to TikTok. Check your Events Manager → Test Events tab
    to confirm it arrived. Events typically appear within 1-2 minutes.
  </div>
</div>
```

**Card 3: Test Error (hidden initially)**
```html
<div class="tiktok-error-alert" id="tiktok-test-error" style="display: none;">
  <div class="tiktok-error-icon">
    <svg><!-- warning icon --></svg>
  </div>
  <div class="tiktok-error-content">
    <div class="tiktok-error-title">Test event failed</div>
    <div class="tiktok-error-body">
      We couldn't send a test event to TikTok. Please check that:
      <ul>
        <li>Your Pixel ID is correct</li>
        <li>Your Access Token hasn't expired</li>
        <li>Popsixle has been added as a partner with "Manage" permission</li>
      </ul>
    </div>
    <button type="button" class="wizard-btn wizard-btn-secondary" onclick="retryTikTokTest()">
      Try Again
    </button>
  </div>
</div>
```

### Footer
- Left: "Back" (`.wizard-btn-secondary`)
- Right: "Continue" (`.wizard-btn-primary`, disabled until test succeeds, then advances to Step 4)

### Demo Controls
```html
<button class="pixel-demo-btn demo-version-btn" onclick="resetTikTokForm()">Reset</button>
<button class="pixel-demo-btn demo-version-btn" onclick="simulateTikTokTestSuccess()">Test Success</button>
<button class="pixel-demo-btn demo-version-btn" onclick="simulateTikTokTestError()">Test Error</button>
```

### Explanation Panel (`data-explanation="5-tiktok-test"`)
- **label:** "TikTok"
- **title:** "Test Your Connection"
- **body:** "Sending a test event verifies that Popsixle can successfully communicate with your TikTok Pixel before you go live."
- **FAQ:**
  1. "How long until I see the test event?" — "Test events typically appear in TikTok within 1-2 minutes. Refresh the Test Events tab if you don't see it immediately."
  2. "What if my test event doesn't appear?" — "Double-check your credentials, ensure Popsixle is added as a partner, and verify your Access Token hasn't expired."

---

## Step 4: What's Next

Educational step with critical data duplication warning.

### Main Content
- Connection steps list: step 4 highlighted
- Status badge: "Connected" (green)

**Card 1: Data Duplication Warning (CRITICAL)**
```html
<div class="channel-connect-card tiktok-warning-card">
  <div style="display: flex; align-items: flex-start; gap: 12px;">
    <svg class="warning-icon" style="flex-shrink: 0; color: #F59E0B;">
      <!-- warning triangle icon -->
    </svg>
    <div>
      <label class="channel-form-label" style="color: #B45309;">Important: Avoid Data Duplication</label>
      <div class="channel-form-helper">
        If you're using Shopify's built-in TikTok connection, you're likely sending duplicate events.
        TikTok will count each conversion twice, causing over-attribution and wasted ad spend.
      </div>
      <div class="channel-form-helper" style="margin-top: 8px;">
        <strong>Recommended:</strong> Create a "dummy" pixel in TikTok for browser events only,
        then update your Shopify-TikTok sales channel to use the dummy pixel. This lets Popsixle
        handle all server-side events.
      </div>
      <a href="https://info.popsixle.com/knowledge/how-to-turn-off-the-shopify-tiktok-capi-connection"
         target="_blank" class="channel-form-help-link" style="margin-top: 12px; display: inline-block;">
        Read the full guide →
      </a>
    </div>
  </div>
</div>
```

**Card 2: What to Expect**
```html
<div class="channel-connect-card">
  <label class="channel-form-label">What to expect</label>
  <div class="channel-form-helper">
    Popsixle will now send server-side conversion events to TikTok in real-time.
    You should start seeing events in your TikTok Events Manager within a few hours.
  </div>
  <div class="channel-form-helper" style="margin-top: 8px;">
    Monitor your TikTok Ads reporting over the next 1-2 weeks to compare
    Popsixle-attributed conversions against your previous tracking.
  </div>
</div>
```

### Footer
- Left: "Back" (`.wizard-btn-secondary`)
- Right: "Done — Return to Channels" (`.wizard-btn-primary`, returns to Step 5 channel select)

### Demo Controls
```html
<button class="pixel-demo-btn demo-version-btn" onclick="resetTikTokForm()">Reset</button>
```

### Explanation Panel (`data-explanation="5-tiktok-whatsnext"`)
- **label:** "TikTok"
- **title:** "What's Next"
- **body:** "Your TikTok connection is active. Here's what to expect in the coming weeks."
- **FAQ:**
  1. "Why do I need to turn off Shopify's TikTok connection?" — "Shopify and Popsixle both send server events. Running both causes TikTok to count each conversion twice, inflating your metrics and wasting ad spend."
  2. "Can I disconnect Popsixle later?" — "Yes, from your Popsixle dashboard under Channel Settings."

---

## Explanation Panels Summary

| data-explanation | label | title | FAQ count |
|-----------------|-------|-------|-----------|
| `5-tiktok` | TikTok | Connect to TikTok | 3 |
| `5-tiktok-credentials` | TikTok | Enter Your Credentials | 3 |
| `5-tiktok-test` | TikTok | Test Your Connection | 2 |
| `5-tiktok-whatsnext` | TikTok | What's Next | 2 |

---

## New Assets Needed

| File | Description | Size |
|------|-------------|------|
| `assets/tiktok-logo.png` | TikTok logo for flow diagram | ~40x40px |

---

## New CSS Required (~40 lines)

```css
/* TikTok flow node border */
.flow-node.tiktok { border-color: #000000; }

/* TikTok black dashed flow line */
.dashed-line.tiktok-black { stroke: #000000; stroke-width: 2; stroke-dasharray: 6 4; }

/* TikTok setup steps list */
.tiktok-steps-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.tiktok-step {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.tiktok-step-number {
  width: 24px;
  height: 24px;
  background: #000;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.tiktok-step-content p {
  margin: 4px 0 0 0;
  color: #6B7280;
  font-size: 14px;
}

/* Copy field for Business ID */
.tiktok-copy-field {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 8px 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
}

.tiktok-copy-field code {
  font-family: monospace;
  font-size: 14px;
  color: #111827;
}

.tiktok-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #fff;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  font-size: 12px;
  color: #374151;
  cursor: pointer;
}

.tiktok-copy-btn:hover { background: #F3F4F6; }

/* TikTok error alert (same pattern as Google) */
.tiktok-error-alert {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 8px;
  margin-top: 16px;
}

.tiktok-error-alert ul {
  margin: 8px 0 0 0;
  padding-left: 20px;
}

.tiktok-error-alert li {
  margin: 4px 0;
  color: #7F1D1D;
}

/* Warning card styling */
.tiktok-warning-card {
  background: #FFFBEB;
  border: 1px solid #FCD34D;
}
```

---

## JS Functions Needed

| Function | Purpose |
|----------|---------|
| `showTikTokSection(sectionId)` | Navigate between 4 sections + update demo controls |
| `updateTikTokConnectionStep(step)` | Update connection-steps-list active state |
| `copyBusinessId()` | Copy Popsixle Business ID to clipboard |
| `validateTikTokCredentials()` | Validate all 3 credential fields |
| `sendTikTokTestEvent()` | Simulate test event (loading → success) |
| `navigateTikTokStep(direction)` | Handle Continue/Back navigation |
| `resetTikTokForm()` | Demo control: reset to Step 1 |
| `simulateTikTokCredentials()` | Demo control: fill sample credentials |
| `simulateTikTokTestSuccess()` | Demo control: jump to test success state |
| `simulateTikTokTestError()` | Demo control: show test error state |
| `retryTikTokTest()` | Hide error, re-enable test button |

---

## Implementation Checklist

- [ ] Add TikTok logo to `assets/`
- [ ] Add `data-step="5-tiktok"` panel to `onboarding.html` (after Google panel)
- [ ] Add 4 explanation panels (`5-tiktok`, `5-tiktok-credentials`, `5-tiktok-test`, `5-tiktok-whatsnext`)
- [ ] Add TikTok connection-steps-list (4 items)
- [ ] Add ~40 lines CSS (steps list, copy field, error alert, warning card)
- [ ] Add JS functions for navigation + credential handling + test event
- [ ] Update channel select card for TikTok to navigate to `5-tiktok` step
- [ ] Update Setup Assistance card video link text when on TikTok page
- [ ] Add TikTok to debug panel with buttons for each step
- [ ] Test: All 4 steps navigate correctly
- [ ] Test: Copy Business ID works
- [ ] Test: Credential validation shows errors
- [ ] Test: Test event success/error states
- [ ] Test: Demo controls work for each section
- [ ] Test: Back button returns to channel select from Step 1
- [ ] Test: "Done — Return to Channels" returns to channel select
