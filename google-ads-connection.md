# Google Ads Connection Page - Design Spec

## Overview

Add a Google Ads connection flow to the onboarding wizard (Step 5). Follows the exact same layout, component patterns, and interaction model as the existing Meta connection page.

**Reference:** `onboarding.html` lines 4845-5059 (Meta step panel), 5225-5313 (Meta explanation panels)

**Source:** [KB Article — Adding a Popsixle Google Data Connection](https://info.popsixle.com/knowledge/adding-a-popsixle-google-data-connection)

---

## Google Connection Flow (from KB)

1. Enter Google Ads Account ID
2. Click "Begin Google Authentication" → OAuth flow (leaves Popsixle, returns on success)
3. On return: click "Create Conversion Action" → Popsixle creates a `purchase-popsixle-{storename}` conversion action in Google Ads (set to Secondary/reporting-only)
4. Wait ~6 hours for Google to propagate the conversion action
5. Google Server Events auto-enable after 6 hours (no manual toggle needed)
6. Verify in Google Ads: Goals → Purchase grid → confirm `purchase-popsixle-{storename}` appears
7. After 2+ weeks and 20-30 conversions, optionally upgrade to Primary

**Open question:** The conversion action creation (step 3) may be fully automatic after OAuth. Prototype includes a button as the default — can be removed if engineering confirms it's automatic.

---

## Page Structure

Identical to Meta: two-panel layout inside `.wizard-content-area`.

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

### Outer Sidebar Nav
Same as all steps. `.outer-sidebar-nav` with "Popsixle Setup" link + "Skip to Dashboard" below.

### Connection Steps List (Inner Nav)
Replaces `.setup-steps-list` when Google page is active. **3 steps** (vs Meta's 4):

```html
<div class="connection-steps-list" id="google-connection-steps-list">
  <ul class="wizard-step-list">
    <li class="wizard-step-item active" id="google-connection-step-1">
      <span class="wizard-step-number">1</span>
      <div class="wizard-step-content">
        <span class="wizard-step-title">Connect account</span>
      </div>
    </li>
    <li class="wizard-step-item" id="google-connection-step-2">
      <span class="wizard-step-number">2</span>
      <div class="wizard-step-content">
        <span class="wizard-step-title">Verify connection</span>
      </div>
    </li>
    <li class="wizard-step-item" id="google-connection-step-3">
      <span class="wizard-step-number">3</span>
      <div class="wizard-step-content">
        <span class="wizard-step-title">What's next</span>
      </div>
    </li>
  </ul>
</div>
```

### Setup Assistance Card (persistent)
Same card below explanation panel. Video link changes to "Google Ads Setup Overview".

---

## Step 1: Connect Account

`data-step="5-google"`

### Header (`.wizard-content-header`)
- **Status badge** (`.connection-test-badge .status-pending`): "Not Connected" (top-right)
- **h1:** "Connect to Google Ads"
- **Description:** "Send your conversion data to Google to improve your ad performance"
- **Help link:** `<a href="https://info.popsixle.com/knowledge/adding-a-popsixle-google-data-connection" target="_blank" class="channel-form-help-link">` "Need help? Read our step-by-step guide"

### Flow Diagram (`.channel-connect-flow`)
Same 3-node pattern as Meta:

| Node | Class | Image | Label |
|------|-------|-------|-------|
| Source | `.flow-node.shopify` | `assets/Shopify_Logo.png` | "Your Store" |
| Hub | `.flow-node.popsixle` | `popsixle_logo_gradient_circle_500 (1).png` | "Popsixle Pixel" |
| Destination | `.flow-node.google` | `assets/google-ads.png` | (none) |

- Line 1: green dashed (Shopify → Popsixle)
- Line 2: blue dashed `#4285F4` (Popsixle → Google)

**Asset needed:** `assets/google-ads.png` — Google Ads logo (~40x40px)

### Form Content (`.wizard-content-body`)

Two phases shown sequentially. Phase 2 appears after OAuth success.

#### Phase 1: Account ID + OAuth (default state)

**Card 1: Account ID input**
```html
<div class="channel-connect-card">
  <label class="channel-form-label">Enter your Google Ads Account ID</label>
  <div class="channel-form-helper">
    Found in Google Ads: click the Settings gear icon, then Account Settings.
    Your Customer ID is displayed at the top of the page.
  </div>
  <input type="text" id="google-account-id" class="channel-form-input"
         placeholder="Paste your Account ID (xxx-xxx-xxxx)">
  <div class="channel-form-hint">Format: xxx-xxx-xxxx (10 digits with dashes)</div>
  <div class="channel-form-error">Please enter a valid Google Ads Account ID</div>
</div>
```

**Card 2: Google OAuth authentication**
```html
<div class="channel-connect-card">
  <label class="channel-form-label">Authenticate with Google</label>
  <div class="channel-form-helper">
    Sign in with your Google account to authorize Popsixle to send
    conversion data to your Google Ads account.
  </div>
  <button type="button" class="google-signin-btn" id="google-signin-btn"
          onclick="startGoogleOAuth()">
    <img src="assets/google-g.png" alt="Google" class="google-signin-icon">
    Sign in with Google
  </button>
</div>
```

**Google Sign-in Button styling:**
- White background, `#747775` border (1px), 8px radius
- Google "G" icon (20x20) + "Sign in with Google" text in `#1F1F1F`
- Hover: light gray `#F2F2F2` background
- Follows Google brand guidelines for sign-in buttons

**Asset needed:** `assets/google-g.png` — Google "G" multicolor icon (~20x20px)

#### Phase 2: Create Conversion Action (shown after OAuth success)

After OAuth returns successfully, the Account ID + OAuth cards dim/collapse and this section appears:

**Card 3: Conversion action creation**
```html
<div class="channel-connect-card" id="google-conversion-action-card" style="display: none;">
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
    <svg class="verify-checkmark-sm"><!-- small green check --></svg>
    <span style="color: #10B981; font-weight: 500;">Google account connected</span>
  </div>
  <label class="channel-form-label">Create conversion action</label>
  <div class="channel-form-helper">
    This creates a "Purchase" conversion action in your Google Ads account
    so Google can receive and track your conversion data from Popsixle.
    The action starts as Secondary (reporting-only) so it won't affect
    your existing campaigns.
  </div>
  <button type="button" class="wizard-btn wizard-btn-primary"
          id="google-create-conversion-btn"
          onclick="createGoogleConversionAction()">
    Create Conversion Action
  </button>
</div>
```

When clicked:
1. Button shows loading state ("Creating...")
2. Success: "Conversion action created: `purchase-popsixle-{storename}`"
3. Status badge transitions: "Not Connected" → "Connected" (green)
4. Connection steps list: step 1 gets checkmark, step 2 becomes active
5. Auto-advance to Step 2 after brief delay

### Demo Controls (`.pixel-demo-controls`)
```html
<div class="pixel-demo-controls">
  <div class="pixel-demo-controls-label">Demo Controls (preview version)</div>
  <div class="pixel-demo-controls-buttons">
    <button class="pixel-demo-btn demo-version-btn active"
            onclick="resetGoogleStep1()">Reset</button>
    <button class="pixel-demo-btn demo-version-btn"
            onclick="simulateGoogleOAuth()">After OAuth</button>
    <button class="pixel-demo-btn demo-version-btn"
            onclick="simulateGoogleFullConnect()">Full Connect</button>
  </div>
</div>
```

- **Reset:** Back to default state (Account ID + OAuth cards)
- **After OAuth:** Jump to Phase 2 (conversion action card visible)
- **Full Connect:** Skip to Step 2 (verify) with everything connected

### Footer (`.wizard-footer`)
- Left: "Back" (`.wizard-btn-secondary`, returns to channel select)
- Right: disabled placeholder — primary action is the inline "Sign in with Google" / "Create Conversion Action" buttons

### Explanation Panel (`data-explanation="5-google"`)
- **label:** "Google Ads"
- **title:** "Connect to Google Ads"
- **body:** "Connecting to Google Ads allows Popsixle to send conversion data directly to your ad account, improving campaign optimization and attribution accuracy."
- **FAQ:**
  1. "Where do I find my Ad Account ID?" — "In Google Ads, click the Settings gear icon, then Account Settings. Your Customer ID is at the top of the page."
  2. "Do I need admin access?" — "Yes, you need admin or standard access to the Google Ads account to authorize the connection."
  3. "What is the conversion action?" — "A Purchase conversion action in Google Ads that receives data from Popsixle. It starts as Secondary (reporting-only) so it won't disrupt your existing tracking."

---

## Step 2: Verify Connection

Displayed after conversion action is created. This is a confirmation + education screen.

### Main Content
- Connection steps list: step 2 highlighted
- Status badge: "Connected" (green)

```html
<div class="google-verify-section" id="google-verify-section">
  <div class="channel-connect-card">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <svg class="verify-checkmark"><!-- green checkmark --></svg>
      <label class="channel-form-label" style="margin: 0;">Connection Verified</label>
    </div>
    <div class="channel-form-helper">
      Your Google Ads account is now connected and a Purchase conversion action
      has been created. Popsixle will automatically start sending conversion
      data within approximately 6 hours.
    </div>
  </div>

  <div class="channel-connect-card">
    <label class="channel-form-label">What to expect</label>
    <div class="channel-form-helper">
      Google Ads needs approximately 6 hours to propagate your new conversion
      action. After that, Popsixle will automatically begin sending server
      events — no action needed from you.
    </div>
    <div class="channel-form-helper" style="margin-top: 8px;">
      To confirm data is flowing, check Google Ads tomorrow: go to
      Goals → Conversions → look for "purchase-popsixle-yourstore" with
      Secondary status.
    </div>
  </div>
</div>
```

### Footer
- Left: "Back" (`.wizard-btn-secondary`)
- Right: "Continue" (`.wizard-btn-primary`)

### Explanation Panel (`data-explanation="5-google-verify"`)
- **label:** "Google Ads"
- **title:** "Verify Your Connection"
- **body:** "Popsixle has created a conversion action and will automatically begin sending data after the 6-hour propagation window. No manual toggle required."
- **FAQ:**
  1. "How long until I see data in Google Ads?" — "The conversion action appears immediately, but event data takes approximately 6 hours to begin flowing. Full attribution data within 24-48 hours."
  2. "What if I see 'Needs Action' in Google Ads?" — "This can appear briefly during the 6-hour propagation window. If it persists after 24 hours, contact support@popsixle.com."

---

## Step 3: What's Next

Celebration and next steps. No form inputs.

### Main Content
- Connection steps list: step 3 highlighted (all steps complete)

```html
<div class="google-whatsnext-section" id="google-whatsnext-section">
  <!-- Success Celebration Banner -->
  <div class="channel-success-banner">
    <div class="success-icon"><svg><!-- checkmark --></svg></div>
    <div>
      <strong>Google Ads Connected!</strong>
      <p>Your store is now sending conversion data to Google</p>
    </div>
  </div>

  <div class="channel-connect-card">
    <label class="channel-form-label">Secondary to primary</label>
    <div class="channel-form-helper">
      Your Popsixle conversion action starts as Secondary (reporting-only),
      running alongside your existing Google Ads tracking. After 2 or more
      weeks and at least 20-30 tracked conversions, you can upgrade it to
      Primary status for maximum attribution accuracy.
    </div>
  </div>

  <div class="channel-connect-card">
    <label class="channel-form-label">Monitor your performance</label>
    <div class="channel-form-helper">
      Check your Google Ads Conversions page to compare Popsixle-attributed
      conversions against your existing tracking. Look for improved match
      rates and conversion counts.
    </div>
  </div>

  <!-- Inline CTAs -->
  <div class="channel-next-cta">
    <label class="channel-form-label">Ready to maximize your data coverage?</label>
    <div class="channel-form-helper">
      Connect more channels to improve attribution across all your ad platforms.
    </div>
    <div class="cta-buttons">
      <button class="wizard-btn wizard-btn-primary" onclick="navigateToStep('5')">Connect Another Channel</button>
      <button class="wizard-btn wizard-btn-secondary" onclick="navigateToStep('6')">Finish Setup</button>
    </div>
  </div>
</div>
```

### Footer
- Empty (CTAs are inline, matching TikTok and Meta pattern)

### Explanation Panel (`data-explanation="5-google-whatsnext"`)
- **label:** "Google Ads"
- **title:** "What's Next"
- **body:** "Your Google Ads connection is active. Here's what to expect in the coming weeks."
- **FAQ:**
  1. "When should I switch to primary?" — "After 2+ weeks of running side-by-side with at least 20-30 conversions tracked. Once you've confirmed Popsixle matches or exceeds your current attribution accuracy."
  2. "Can I disconnect later?" — "Yes, from your Popsixle dashboard under Channel Settings."

---

## Explanation Panels Summary

| data-explanation | label | title | FAQ count |
|-----------------|-------|-------|-----------|
| `5-google` | Google Ads | Connect to Google Ads | 3 |
| `5-google-verify` | Google Ads | Verify Your Connection | 2 |
| `5-google-whatsnext` | Google Ads | What's Next | 2 |

---

## New Assets Needed

| File | Description | Size |
|------|-------------|------|
| `assets/google-ads.png` | Google Ads logo for flow diagram | ~40x40px |
| `assets/google-g.png` | Google "G" multicolor icon for sign-in button | ~20x20px |

---

## New CSS Required (~15 lines)

```css
/* Google sign-in button (Google brand guidelines) */
.google-signin-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  background: #fff;
  border: 1px solid #747775;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #1F1F1F;
  cursor: pointer;
}
.google-signin-btn:hover { background: #F2F2F2; }
.google-signin-icon { width: 20px; height: 20px; }

/* Google blue dashed flow line */
.dashed-line.google-blue { stroke: #4285F4; stroke-width: 2; stroke-dasharray: 6 4; }

/* Google flow node border */
.flow-node.google { border-color: #4285F4; }
```

All other styling reuses existing classes from `css/components.css`.

---

## JS Functions Needed

| Function | Purpose |
|----------|---------|
| `startGoogleOAuth()` | Simulates OAuth: loading state → show conversion action card |
| `createGoogleConversionAction()` | Simulates creation: loading → success → advance to step 2 |
| `simulateGoogleOAuth()` | Demo control: jump to Phase 2 (post-OAuth) |
| `simulateGoogleFullConnect()` | Demo control: jump to Step 2 (fully connected) |
| `resetGoogleStep1()` | Demo control: reset to default state |
| `navigateGoogleStep(n)` | Updates connection-steps-list active state + shows/hides sections |

All follow the same patterns as existing Meta JS functions in `js/wizard.js`.

---

## Implementation Checklist

- [ ] Add Google Ads logo + Google "G" icon to `assets/`
- [ ] Add `data-step="5-google"` panel to `onboarding.html` (after Meta panel)
- [ ] Add 3 explanation panels (`5-google`, `5-google-verify`, `5-google-whatsnext`)
- [ ] Add Google connection-steps-list (3 items)
- [ ] Add ~15 lines CSS (google-signin-btn, flow line, flow node)
- [ ] Add JS functions for OAuth simulation + conversion action + step navigation
- [ ] Update channel select card for Google to navigate to `5-google` step
- [ ] Update Setup Assistance card video link text when on Google page
- [ ] Test: Phase 1 → Phase 2 transition (OAuth → conversion action card)
- [ ] Test: demo controls (Reset, After OAuth, Full Connect)
- [ ] Test: all 3 sub-steps navigate correctly via connection-steps-list
- [ ] Test: Back button returns to channel select
- [ ] Test: "Connect Another Channel" returns to channel select
- [ ] Test: "Finish Setup" advances to next onboarding step
