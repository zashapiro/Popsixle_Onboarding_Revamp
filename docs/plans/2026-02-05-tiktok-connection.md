# TikTok Connection Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add TikTok channel connection flow to onboarding wizard with 5-step flow + confetti celebration.

**Architecture:** Same two-panel layout as Meta/Google. Manual credential entry (no OAuth). Partner setup → credentials → test event → turn off Shopify → celebration.

**Tech Stack:** HTML, CSS, vanilla JavaScript, canvas-confetti library

---

## Context

- **Design spec:** `tiktok-connection.md`
- **Primary file:** `onboarding.html` (all HTML, CSS, JS in single file)
- **Pattern reference:** Meta connection (~line 4845), Google connection (~line 5105)
- **Meta "Disable Data Sharing" pattern:** lines 5031-5059

---

## Flow Summary (5 Steps)

```
Step 1: Add Popsixle as Partner
        • Instructions with numbered steps
        • Copy-to-clipboard Business ID: 7306194182450888705
        • [Back] [I've Added the Partner]
         ↓
Step 2: Enter Credentials
        • Pixel ID input
        • Access Token input
        • Server Events Test Code input
        • Validation on empty fields
        • [Back] [Continue]
         ↓
Step 3: Test Connection
        • [Confirm & Send Test Event] button
        • Success state: checkmark + message
        • Error state: alert with retry
        • [Back] [Continue] (disabled until success)
         ↓
Step 4: Turn Off Shopify Connection
        • Card 1: Why (duplicate events explanation)
        • Card 2: How (step-by-step with screenshots)
        • Link to full guide
        • [Back] [I've Done This]
         ↓
Step 5: What's Next 🎉
        • CONFETTI FIRES on load
        • Success banner: "TikTok Connected!"
        • What to expect info
        • [Connect Another Channel] [Finish Setup]
```

---

## Task 1: Verify Assets

**Files:**
- Check: `assets/` folder

**Step 1: Check for TikTok logo**

```bash
dir "C:\Users\shapi\Documents\Popsixle_Onboarding_Revamp\assets" | findstr -i tiktok
```

If missing, use placeholder (black square with "TT" text via onerror handler).

**Step 2: Note screenshots needed for Step 4**

Screenshots to add (can be placeholders initially):
- `assets/tiktok-create-pixel.png` — TikTok Events Manager "Create Pixel"
- `assets/shopify-tiktok-settings.png` — Shopify TikTok sales channel settings

---

## Task 2: Add TikTok CSS (~90 lines)

**Files:**
- Modify: `onboarding.html` (CSS section, after Google styles)

**Step 1: Add TikTok-specific CSS**

Add after Google CSS (around `.google-error-alert` styles):

```css
/* ===== TikTok Connection Styles ===== */

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

.tiktok-step-content strong {
  display: block;
  color: #111827;
  font-size: 14px;
}

.tiktok-step-content p {
  margin: 4px 0 0 0;
  color: #6B7280;
  font-size: 14px;
}

/* Copy field for Business ID */
.tiktok-copy-field {
  display: inline-flex;
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

/* TikTok error alert */
.tiktok-error-alert {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 8px;
  margin-top: 16px;
}

.tiktok-error-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: #DC2626;
}

.tiktok-error-content {
  flex: 1;
}

.tiktok-error-title {
  font-weight: 600;
  color: #991B1B;
  margin-bottom: 4px;
}

.tiktok-error-body {
  color: #7F1D1D;
  font-size: 14px;
}

.tiktok-error-alert ul {
  margin: 8px 0 12px 0;
  padding-left: 20px;
}

.tiktok-error-alert li {
  margin: 4px 0;
  color: #7F1D1D;
}

/* Success celebration banner */
.channel-success-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border: 1px solid #10B981;
  border-radius: 12px;
  margin-bottom: 24px;
}

.channel-success-banner .success-icon {
  width: 48px;
  height: 48px;
  background: #10B981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.channel-success-banner .success-icon svg {
  width: 24px;
  height: 24px;
  color: #fff;
}

.channel-success-banner strong {
  font-size: 18px;
  color: #065F46;
  display: block;
}

.channel-success-banner p {
  color: #047857;
  margin: 4px 0 0 0;
  font-size: 14px;
}

/* Connect another channel CTA */
.channel-next-cta {
  background: linear-gradient(135deg, #F5F3FF 0%, #FDF2F8 100%);
  border: 1px solid #E9D5FF;
  padding: 24px;
  border-radius: 12px;
  margin-top: 24px;
}

.channel-next-cta .cta-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

/* Screenshot container */
.tiktok-screenshot {
  margin: 12px 0;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
}

.tiktok-screenshot img {
  width: 100%;
  display: block;
}

.tiktok-screenshot-placeholder {
  background: #F3F4F6;
  padding: 40px;
  text-align: center;
  color: #9CA3AF;
  font-size: 14px;
}
```

---

## Task 3: Add Confetti Library

**Files:**
- Modify: `onboarding.html` (add script tag in `<head>`)

**Step 1: Add canvas-confetti CDN**

Add before closing `</head>`:

```html
<!-- Confetti library for celebration -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
```

---

## Task 4: Add TikTok Step Panel HTML (Step 1 - Partner Setup)

**Files:**
- Modify: `onboarding.html` (after Google panel)

**Step 1: Add TikTok step panel structure**

Add after the closing `</div>` of `data-step="5-google"` panel:

```html
<!-- ===== STEP 5 - TIKTOK CONNECTION ===== -->
<div class="wizard-step-panel" data-step="5-tiktok" style="display: none;">
  <div class="wizard-content-area">
    <!-- Connection Steps Sidebar -->
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
            <span class="wizard-step-title">Turn off Shopify</span>
          </div>
        </li>
        <li class="wizard-step-item" id="tiktok-connection-step-5">
          <span class="wizard-step-number">5</span>
          <div class="wizard-step-content">
            <span class="wizard-step-title">What's next</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="wizard-main">
      <div class="wizard-content-header">
        <div class="connection-test-badge status-pending" id="tiktok-status-badge">
          <span class="status-dot"></span>
          Not Connected
        </div>
        <h1>Connect to TikTok</h1>
        <p>Send your conversion data to TikTok to improve ad targeting and campaign performance</p>
        <a href="https://popsixle.frontkb.com/en/articles/7938177" target="_blank" class="channel-form-help-link">
          Need help? Read our step-by-step guide
        </a>
      </div>

      <!-- Flow Diagram -->
      <div class="channel-connect-flow">
        <div class="flow-source">
          <div class="flow-node shopify">
            <img src="assets/Shopify_Logo.png" alt="Shopify">
          </div>
          <span class="flow-node-label">Your Store</span>
        </div>
        <svg class="flow-line-svg" width="60" height="20" style="margin: 0 8px;">
          <path class="dashed-line green" d="M 0,10 L 60,10" />
        </svg>
        <div class="flow-node popsixle">
          <img src="popsixle_logo_gradient_circle_500 (1).png" alt="Popsixle" class="flow-logo">
        </div>
        <svg class="flow-line-svg" width="60" height="20" style="margin: 0 8px;">
          <line x1="0" y1="10" x2="60" y2="10" class="dashed-line tiktok-black"/>
        </svg>
        <div class="flow-node tiktok">
          <img src="assets/tiktok-logo.png" alt="TikTok" class="flow-logo" onerror="this.style.display='none'; this.parentElement.innerHTML += '<div style=\'width:40px;height:40px;background:#000;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:12px;\'>TT</div>';">
        </div>
      </div>

      <div class="wizard-content-body">
        <!-- Section 1: Partner Setup -->
        <div id="tiktok-partner-section">
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

          <!-- Demo Controls -->
          <div class="pixel-demo-controls">
            <div class="pixel-demo-controls-label">Demo Controls (preview version)</div>
            <div class="pixel-demo-controls-buttons" id="tiktok-demo-controls">
              <button class="pixel-demo-btn demo-version-btn active" onclick="resetTikTokForm()">Reset</button>
            </div>
          </div>
        </div>

        <!-- Section 2: Credentials -->
        <div id="tiktok-credentials-section" style="display: none;">
        </div>

        <!-- Section 3: Test Connection -->
        <div id="tiktok-test-section" style="display: none;">
        </div>

        <!-- Section 4: Turn Off Shopify -->
        <div id="tiktok-shopify-section" style="display: none;">
        </div>

        <!-- Section 5: What's Next -->
        <div id="tiktok-whatsnext-section" style="display: none;">
        </div>
      </div>

      <div class="wizard-footer">
        <button class="wizard-btn wizard-btn-secondary" onclick="navigateToStep('5')">Back</button>
        <button class="wizard-btn wizard-btn-primary" onclick="showTikTokSection('tiktok-credentials-section')">I've Added the Partner</button>
      </div>
    </div>

    <!-- Explanation Panel -->
    <div class="explanation-panel" data-explanation="5-tiktok">
      <div class="explanation-content">
        <span class="explanation-label">TikTok</span>
        <h3 class="explanation-title">Connect to TikTok</h3>
        <p class="explanation-body">
          Connecting to TikTok allows Popsixle to send server-side conversion data directly to your TikTok Pixel, improving attribution accuracy and campaign optimization.
        </p>
        <div class="faq-section">
          <div class="faq-item">
            <div class="faq-question">Why do I need to add Popsixle as a partner?</div>
            <div class="faq-answer">TikTok requires partner authorization before external systems can send events to your Pixel. This is a security measure to protect your ad account.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Where do I find my TikTok Business Center?</div>
            <div class="faq-answer">Go to business.tiktok.com and sign in with the account that manages your TikTok Ads.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">What permission level does Popsixle need?</div>
            <div class="faq-answer">Popsixle needs "Manage" permission on your Events Manager asset to send conversion events.</div>
          </div>
        </div>
      </div>
      <div class="assistance-card">
        <div class="assistance-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div class="assistance-content">
          <h4>Setup Assistance</h4>
          <p>Need help? Watch our TikTok setup video or contact support.</p>
          <a href="#" class="assistance-link">Watch TikTok Setup Overview →</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Task 5: Add Credentials Section HTML

**Files:**
- Modify: `onboarding.html` (inside tiktok-credentials-section div)

**Step 1: Add credentials section content**

```html
<div class="channel-connect-card">
  <label class="channel-form-label">Enter your TikTok Pixel ID</label>
  <div class="channel-form-helper">
    Found in TikTok Events Manager: click your pixel name, then copy the Pixel ID from the overview page.
  </div>
  <input type="text" id="tiktok-pixel-id" class="channel-form-input" placeholder="e.g., CXXXXXXXXXXXXXXX">
  <div class="channel-form-error" id="tiktok-pixel-id-error" style="display: none;">Please enter a valid Pixel ID</div>
</div>

<div class="channel-connect-card">
  <label class="channel-form-label">Enter your Access Token</label>
  <div class="channel-form-helper">
    Generate this in TikTok: Events Manager → Settings → System Users → Generate Token → select your pixel.
  </div>
  <input type="text" id="tiktok-access-token" class="channel-form-input" placeholder="Paste your access token">
  <div class="channel-form-error" id="tiktok-access-token-error" style="display: none;">Please enter a valid Access Token</div>
</div>

<div class="channel-connect-card">
  <label class="channel-form-label">Enter your Server Events Test Code</label>
  <div class="channel-form-helper">
    Found in TikTok: Events Manager → your pixel → Test Events tab. Look for "Server events test code".
  </div>
  <input type="text" id="tiktok-test-code" class="channel-form-input" placeholder="e.g., TEST12345">
  <div class="channel-form-error" id="tiktok-test-code-error" style="display: none;">Please enter a valid Test Code</div>
</div>

<!-- Demo Controls -->
<div class="pixel-demo-controls">
  <div class="pixel-demo-controls-label">Demo Controls (preview version)</div>
  <div class="pixel-demo-controls-buttons">
    <button class="pixel-demo-btn demo-version-btn active" onclick="resetTikTokForm()">Reset</button>
    <button class="pixel-demo-btn demo-version-btn" onclick="simulateTikTokCredentials()">Fill Credentials</button>
  </div>
</div>
```

---

## Task 6: Add Test Section HTML

**Files:**
- Modify: `onboarding.html` (inside tiktok-test-section div)

**Step 1: Add test section content**

```html
<div class="channel-connect-card" id="tiktok-test-card">
  <label class="channel-form-label">Send a test event</label>
  <div class="channel-form-helper">
    Click the button below to send a test conversion event to TikTok. Then check your
    TikTok Events Manager → Test Events tab to confirm it arrived.
  </div>
  <button type="button" class="wizard-btn wizard-btn-primary" id="tiktok-send-test-btn" onclick="sendTikTokTestEvent()">
    Confirm & Send Test Event
  </button>
</div>

<div class="channel-connect-card" id="tiktok-test-success" style="display: none;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#10B981"/>
      <path d="M8 12l3 3 5-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <label class="channel-form-label" style="margin: 0;">Test Event Sent</label>
  </div>
  <div class="channel-form-helper">
    A test event has been sent to TikTok. Check your Events Manager → Test Events tab
    to confirm it arrived. Events typically appear within 1-2 minutes.
  </div>
</div>

<div class="tiktok-error-alert" id="tiktok-test-error" style="display: none;">
  <div class="tiktok-error-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#DC2626"/>
      <path d="M12 8v4M12 16h.01" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    </svg>
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

<!-- Demo Controls -->
<div class="pixel-demo-controls">
  <div class="pixel-demo-controls-label">Demo Controls (preview version)</div>
  <div class="pixel-demo-controls-buttons">
    <button class="pixel-demo-btn demo-version-btn active" onclick="resetTikTokForm()">Reset</button>
    <button class="pixel-demo-btn demo-version-btn" onclick="simulateTikTokTestSuccess()">Test Success</button>
    <button class="pixel-demo-btn demo-version-btn" onclick="simulateTikTokTestError()">Test Error</button>
  </div>
</div>
```

---

## Task 7: Add Turn Off Shopify Section HTML

**Files:**
- Modify: `onboarding.html` (inside tiktok-shopify-section div)

**Step 1: Add Shopify disconnect section content**

```html
<div class="channel-connect-card">
  <label class="channel-form-label">Optimize your data quality</label>
  <div class="channel-form-helper">
    You're connected to TikTok! But there's one important step: Shopify's built-in TikTok connection
    sends duplicate events alongside Popsixle, causing TikTok to count each sale twice. This hurts
    your attribution accuracy and wastes ad spend.
  </div>
</div>

<div class="channel-connect-card">
  <label class="channel-form-label">How to fix this</label>

  <div class="tiktok-steps-list" style="margin-top: 12px;">
    <div class="tiktok-step">
      <span class="tiktok-step-number">1</span>
      <div class="tiktok-step-content">
        <strong>Create a dummy pixel in TikTok</strong>
        <p>Go to TikTok Events Manager and create a new pixel named "Browser Only" or similar. This pixel will only receive browser events, not server events.</p>
        <div class="tiktok-screenshot">
          <img src="assets/tiktok-create-pixel.png" alt="TikTok Events Manager - Create Pixel"
               onerror="this.parentElement.innerHTML = '<div class=\'tiktok-screenshot-placeholder\'>[Screenshot: TikTok Events Manager → Create Pixel]</div>';">
        </div>
      </div>
    </div>

    <div class="tiktok-step">
      <span class="tiktok-step-number">2</span>
      <div class="tiktok-step-content">
        <strong>Update Shopify to use the dummy pixel</strong>
        <p>In Shopify Admin, go to <strong>Sales Channels → TikTok → Settings</strong> and change the connected pixel to your new dummy pixel.</p>
        <div class="tiktok-screenshot">
          <img src="assets/shopify-tiktok-settings.png" alt="Shopify TikTok Settings"
               onerror="this.parentElement.innerHTML = '<div class=\'tiktok-screenshot-placeholder\'>[Screenshot: Shopify → Sales Channels → TikTok → Settings]</div>';">
        </div>
      </div>
    </div>
  </div>

  <a href="https://info.popsixle.com/knowledge/how-to-turn-off-the-shopify-tiktok-capi-connection"
     target="_blank" class="channel-form-help-link" style="margin-top: 16px; display: inline-block;">
    Read the full guide →
  </a>
</div>

<!-- Demo Controls -->
<div class="pixel-demo-controls">
  <div class="pixel-demo-controls-label">Demo Controls (preview version)</div>
  <div class="pixel-demo-controls-buttons">
    <button class="pixel-demo-btn demo-version-btn active" onclick="resetTikTokForm()">Reset</button>
  </div>
</div>
```

---

## Task 8: Add What's Next Section HTML (with Celebration)

**Files:**
- Modify: `onboarding.html` (inside tiktok-whatsnext-section div)

**Step 1: Add celebration + what's next content**

```html
<!-- Success Celebration Banner -->
<div class="channel-success-banner">
  <div class="success-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  </div>
  <div>
    <strong>TikTok Connected!</strong>
    <p>Your store is now sending conversion data to TikTok</p>
  </div>
</div>

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

<!-- Connect Another Channel CTA -->
<div class="channel-next-cta">
  <label class="channel-form-label">Ready to maximize your data coverage?</label>
  <div class="channel-form-helper">
    Connect more channels to improve attribution across all your ad platforms.
  </div>
  <div class="cta-buttons">
    <button class="wizard-btn wizard-btn-primary" onclick="navigateToStep('5')">
      Connect Another Channel
    </button>
    <button class="wizard-btn wizard-btn-secondary" onclick="navigateToStep('6')">
      Finish Setup
    </button>
  </div>
</div>

<!-- Demo Controls -->
<div class="pixel-demo-controls">
  <div class="pixel-demo-controls-label">Demo Controls (preview version)</div>
  <div class="pixel-demo-controls-buttons">
    <button class="pixel-demo-btn demo-version-btn active" onclick="resetTikTokForm()">Reset</button>
    <button class="pixel-demo-btn demo-version-btn" onclick="replayTikTokConfetti()">Replay Confetti</button>
  </div>
</div>
```

---

## Task 9: Add Additional Explanation Panels

**Files:**
- Modify: `onboarding.html` (explanation panels section, after Google panels)

**Step 1: Add 4 TikTok explanation panels**

```html
<!-- TikTok Credentials Explanation -->
<div class="explanation-panel" data-explanation="5-tiktok-credentials" style="display: none;">
  <div class="explanation-content">
    <span class="explanation-label">TikTok</span>
    <h3 class="explanation-title">Enter Your Credentials</h3>
    <p class="explanation-body">
      These three pieces of information allow Popsixle to securely send conversion events to your TikTok Pixel.
    </p>
    <div class="faq-section">
      <div class="faq-item">
        <div class="faq-question">Where is my Pixel ID?</div>
        <div class="faq-answer">In TikTok Events Manager, click on your pixel name. The Pixel ID is shown at the top of the overview page (starts with 'C').</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">How do I generate an Access Token?</div>
        <div class="faq-answer">In Events Manager, go to Settings → System Users → Generate Token. Select your pixel when prompted.</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">What is the Test Event Code for?</div>
        <div class="faq-answer">It lets you verify that Popsixle is successfully sending events before going live.</div>
      </div>
    </div>
  </div>
  <div class="assistance-card">
    <div class="assistance-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    </div>
    <div class="assistance-content">
      <h4>Setup Assistance</h4>
      <p>Need help? Watch our TikTok setup video or contact support.</p>
      <a href="#" class="assistance-link">Watch TikTok Setup Overview →</a>
    </div>
  </div>
</div>

<!-- TikTok Test Explanation -->
<div class="explanation-panel" data-explanation="5-tiktok-test" style="display: none;">
  <div class="explanation-content">
    <span class="explanation-label">TikTok</span>
    <h3 class="explanation-title">Test Your Connection</h3>
    <p class="explanation-body">
      Sending a test event verifies that Popsixle can successfully communicate with your TikTok Pixel before you go live.
    </p>
    <div class="faq-section">
      <div class="faq-item">
        <div class="faq-question">How long until I see the test event?</div>
        <div class="faq-answer">Test events typically appear in TikTok within 1-2 minutes. Refresh the Test Events tab if you don't see it immediately.</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">What if my test event doesn't appear?</div>
        <div class="faq-answer">Double-check your credentials, ensure Popsixle is added as a partner, and verify your Access Token hasn't expired.</div>
      </div>
    </div>
  </div>
  <div class="assistance-card">
    <div class="assistance-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    </div>
    <div class="assistance-content">
      <h4>Setup Assistance</h4>
      <p>Need help? Watch our TikTok setup video or contact support.</p>
      <a href="#" class="assistance-link">Watch TikTok Setup Overview →</a>
    </div>
  </div>
</div>

<!-- TikTok Shopify Explanation -->
<div class="explanation-panel" data-explanation="5-tiktok-shopify" style="display: none;">
  <div class="explanation-content">
    <span class="explanation-label">TikTok</span>
    <h3 class="explanation-title">Turn Off Shopify Connection</h3>
    <p class="explanation-body">
      Popsixle sends both browser and server-side events to TikTok, so Shopify's native TikTok connection is no longer needed.
    </p>
    <div class="faq-section">
      <div class="faq-item">
        <div class="faq-question">Why create a dummy pixel?</div>
        <div class="faq-answer">TikTok requires Shopify to have a pixel connected. The dummy pixel receives only browser events, while Popsixle handles all server events — eliminating duplicates.</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">What if I skip this step?</div>
        <div class="faq-answer">TikTok will receive duplicate events from both Shopify and Popsixle, which inflates your conversion counts and wastes ad spend on over-attributed conversions.</div>
      </div>
    </div>
  </div>
  <div class="assistance-card">
    <div class="assistance-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    </div>
    <div class="assistance-content">
      <h4>Setup Assistance</h4>
      <p>Need help? Watch our TikTok setup video or contact support.</p>
      <a href="#" class="assistance-link">Watch TikTok Setup Overview →</a>
    </div>
  </div>
</div>

<!-- TikTok What's Next Explanation -->
<div class="explanation-panel" data-explanation="5-tiktok-whatsnext" style="display: none;">
  <div class="explanation-content">
    <span class="explanation-label">TikTok</span>
    <h3 class="explanation-title">What's Next</h3>
    <p class="explanation-body">
      Your TikTok connection is active. Here's what to expect in the coming weeks.
    </p>
    <div class="faq-section">
      <div class="faq-item">
        <div class="faq-question">When will I see improved results?</div>
        <div class="faq-answer">TikTok typically needs 1-2 weeks of data to optimize. Monitor your Events Manager to confirm events are flowing correctly.</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">Can I disconnect Popsixle later?</div>
        <div class="faq-answer">Yes, from your Popsixle dashboard under Channel Settings.</div>
      </div>
    </div>
  </div>
  <div class="assistance-card">
    <div class="assistance-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    </div>
    <div class="assistance-content">
      <h4>Setup Assistance</h4>
      <p>Need help? Watch our TikTok setup video or contact support.</p>
      <a href="#" class="assistance-link">Watch TikTok Setup Overview →</a>
    </div>
  </div>
</div>
```

---

## Task 10: Add TikTok JavaScript Functions (~200 lines)

**Files:**
- Modify: `onboarding.html` (JS section, after Google functions)

**Step 1: Add TikTok state and navigation functions**

```javascript
// ===== TikTok Connection Functions =====

let currentTikTokStep = 1;

function showTikTokTestStatus(status) {
  var badge = document.getElementById('tiktok-status-badge');
  if (!badge) return;

  badge.className = 'connection-test-badge';

  switch(status) {
    case 'pending':
      badge.className += ' status-pending';
      badge.innerHTML = '<span class="status-dot"></span>Not Connected';
      break;
    case 'testing':
      badge.className += ' status-testing';
      badge.innerHTML = '<span class="status-dot"></span>Testing...';
      break;
    case 'success':
      badge.className += ' status-success';
      badge.innerHTML = '<span class="status-dot"></span>Connected';
      break;
    case 'failed':
      badge.className += ' status-failed';
      badge.innerHTML = '<span class="status-dot"></span>Failed';
      break;
  }
}

function updateTikTokConnectionStep(step) {
  currentTikTokStep = step;
  for (var i = 1; i <= 5; i++) {
    var stepEl = document.getElementById('tiktok-connection-step-' + i);
    if (stepEl) {
      stepEl.classList.remove('active', 'completed');
      if (i < step) {
        stepEl.classList.add('completed');
        var numEl = stepEl.querySelector('.wizard-step-number');
        if (numEl) numEl.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      } else if (i === step) {
        stepEl.classList.add('active');
        var numEl = stepEl.querySelector('.wizard-step-number');
        if (numEl) numEl.textContent = i;
      } else {
        var numEl = stepEl.querySelector('.wizard-step-number');
        if (numEl) numEl.textContent = i;
      }
    }
  }
}

function showTikTokSection(sectionId) {
  // Hide all sections
  var sections = ['tiktok-partner-section', 'tiktok-credentials-section', 'tiktok-test-section', 'tiktok-shopify-section', 'tiktok-whatsnext-section'];
  sections.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Show target section
  var target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';

  // Update step indicator and explanation panel
  var stepMap = {
    'tiktok-partner-section': { step: 1, explanation: '5-tiktok' },
    'tiktok-credentials-section': { step: 2, explanation: '5-tiktok-credentials' },
    'tiktok-test-section': { step: 3, explanation: '5-tiktok-test' },
    'tiktok-shopify-section': { step: 4, explanation: '5-tiktok-shopify' },
    'tiktok-whatsnext-section': { step: 5, explanation: '5-tiktok-whatsnext' }
  };

  var config = stepMap[sectionId];
  if (config) {
    updateTikTokConnectionStep(config.step);
    showExplanation(config.explanation);
  }

  // Update footer buttons
  var footer = document.querySelector('[data-step="5-tiktok"] .wizard-footer');
  if (footer) {
    if (sectionId === 'tiktok-partner-section') {
      footer.innerHTML = '<button class="wizard-btn wizard-btn-secondary" onclick="navigateToStep(\'5\')">Back</button>' +
        '<button class="wizard-btn wizard-btn-primary" onclick="showTikTokSection(\'tiktok-credentials-section\')">I\'ve Added the Partner</button>';
    } else if (sectionId === 'tiktok-credentials-section') {
      footer.innerHTML = '<button class="wizard-btn wizard-btn-secondary" onclick="showTikTokSection(\'tiktok-partner-section\')">Back</button>' +
        '<button class="wizard-btn wizard-btn-primary" onclick="validateAndContinueTikTok()">Continue</button>';
    } else if (sectionId === 'tiktok-test-section') {
      footer.innerHTML = '<button class="wizard-btn wizard-btn-secondary" onclick="showTikTokSection(\'tiktok-credentials-section\')">Back</button>' +
        '<button class="wizard-btn wizard-btn-primary" id="tiktok-test-continue-btn" onclick="showTikTokSection(\'tiktok-shopify-section\')" disabled>Continue</button>';
    } else if (sectionId === 'tiktok-shopify-section') {
      footer.innerHTML = '<button class="wizard-btn wizard-btn-secondary" onclick="showTikTokSection(\'tiktok-test-section\')">Back</button>' +
        '<button class="wizard-btn wizard-btn-primary" onclick="completeTikTokShopifyStep()">I\'ve Done This</button>';
    } else if (sectionId === 'tiktok-whatsnext-section') {
      footer.innerHTML = ''; // No footer - CTAs are inline
    }
  }

  // Fire confetti on What's Next
  if (sectionId === 'tiktok-whatsnext-section' && typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A855F7', '#7C3AED', '#EC4899', '#10B981']
    });
  }
}

function completeTikTokShopifyStep() {
  showTikTokTestStatus('success');
  showTikTokSection('tiktok-whatsnext-section');
}

function copyBusinessId() {
  var code = document.getElementById('popsixle-business-id');
  if (code) {
    navigator.clipboard.writeText(code.textContent).then(function() {
      var btn = document.querySelector('.tiktok-copy-btn');
      if (btn) {
        var original = btn.innerHTML;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
        setTimeout(function() { btn.innerHTML = original; }, 2000);
      }
    });
  }
}

function validateAndContinueTikTok() {
  var valid = true;

  // Validate Pixel ID
  var pixelId = document.getElementById('tiktok-pixel-id');
  var pixelError = document.getElementById('tiktok-pixel-id-error');
  if (!pixelId.value.trim()) {
    pixelError.style.display = 'block';
    valid = false;
  } else {
    pixelError.style.display = 'none';
  }

  // Validate Access Token
  var token = document.getElementById('tiktok-access-token');
  var tokenError = document.getElementById('tiktok-access-token-error');
  if (!token.value.trim()) {
    tokenError.style.display = 'block';
    valid = false;
  } else {
    tokenError.style.display = 'none';
  }

  // Validate Test Code
  var testCode = document.getElementById('tiktok-test-code');
  var testCodeError = document.getElementById('tiktok-test-code-error');
  if (!testCode.value.trim()) {
    testCodeError.style.display = 'block';
    valid = false;
  } else {
    testCodeError.style.display = 'none';
  }

  if (valid) {
    showTikTokSection('tiktok-test-section');
  }
}

function sendTikTokTestEvent() {
  var btn = document.getElementById('tiktok-send-test-btn');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  showTikTokTestStatus('testing');

  // Simulate API call
  setTimeout(function() {
    btn.textContent = 'Confirm & Send Test Event';
    btn.disabled = false;

    // Show success
    document.getElementById('tiktok-test-card').style.display = 'none';
    document.getElementById('tiktok-test-success').style.display = 'block';
    document.getElementById('tiktok-test-error').style.display = 'none';
    showTikTokTestStatus('success');

    // Enable continue button
    var continueBtn = document.getElementById('tiktok-test-continue-btn');
    if (continueBtn) continueBtn.disabled = false;
  }, 1500);
}

function retryTikTokTest() {
  document.getElementById('tiktok-test-card').style.display = 'block';
  document.getElementById('tiktok-test-error').style.display = 'none';
  document.getElementById('tiktok-test-success').style.display = 'none';
  showTikTokTestStatus('pending');

  var btn = document.getElementById('tiktok-send-test-btn');
  if (btn) {
    btn.disabled = false;
    btn.textContent = 'Confirm & Send Test Event';
  }
}

// Demo control functions
function resetTikTokForm() {
  showTikTokSection('tiktok-partner-section');
  showTikTokTestStatus('pending');

  // Clear all inputs
  var inputs = ['tiktok-pixel-id', 'tiktok-access-token', 'tiktok-test-code'];
  inputs.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });

  // Hide all errors
  var errors = ['tiktok-pixel-id-error', 'tiktok-access-token-error', 'tiktok-test-code-error'];
  errors.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Reset test section
  var testCard = document.getElementById('tiktok-test-card');
  var testSuccess = document.getElementById('tiktok-test-success');
  var testError = document.getElementById('tiktok-test-error');
  if (testCard) testCard.style.display = 'block';
  if (testSuccess) testSuccess.style.display = 'none';
  if (testError) testError.style.display = 'none';

  // Reset step indicators
  for (var i = 1; i <= 5; i++) {
    var stepEl = document.getElementById('tiktok-connection-step-' + i);
    if (stepEl) {
      stepEl.classList.remove('active', 'completed');
      if (i === 1) stepEl.classList.add('active');
      var numEl = stepEl.querySelector('.wizard-step-number');
      if (numEl) numEl.textContent = i;
    }
  }
}

function simulateTikTokCredentials() {
  showTikTokSection('tiktok-credentials-section');
  document.getElementById('tiktok-pixel-id').value = 'CXXXXXXXXXXXXXXXXXX';
  document.getElementById('tiktok-access-token').value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  document.getElementById('tiktok-test-code').value = 'TEST12345';
}

function simulateTikTokTestSuccess() {
  showTikTokSection('tiktok-test-section');
  document.getElementById('tiktok-test-card').style.display = 'none';
  document.getElementById('tiktok-test-success').style.display = 'block';
  document.getElementById('tiktok-test-error').style.display = 'none';
  showTikTokTestStatus('success');

  var continueBtn = document.getElementById('tiktok-test-continue-btn');
  if (continueBtn) continueBtn.disabled = false;
}

function simulateTikTokTestError() {
  showTikTokSection('tiktok-test-section');
  document.getElementById('tiktok-test-card').style.display = 'none';
  document.getElementById('tiktok-test-success').style.display = 'none';
  document.getElementById('tiktok-test-error').style.display = 'block';
  showTikTokTestStatus('failed');
}

function replayTikTokConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A855F7', '#7C3AED', '#EC4899', '#10B981']
    });
  }
}
```

---

## Task 11: Update Channel Select Card and Debug Panel

**Files:**
- Modify: `onboarding.html` (channel select section + debug panel)

**Step 1: Update TikTok channel card onclick**

Find the TikTok channel card in Step 5 (channel select). Update its onclick:

```html
onclick="navigateToStep('5-tiktok'); showTikTokSection('tiktok-partner-section');"
```

**Step 2: Add TikTok section to debug panel**

Add after the Google debug buttons:

```html
<!-- TikTok -->
<div class="debug-group">
  <span class="debug-group-label">TikTok</span>
  <button class="debug-btn" onclick="navigateToStep('5-tiktok'); showTikTokSection('tiktok-partner-section');">TT-1</button>
  <button class="debug-btn" onclick="navigateToStep('5-tiktok'); showTikTokSection('tiktok-credentials-section');">TT-2</button>
  <button class="debug-btn" onclick="navigateToStep('5-tiktok'); showTikTokSection('tiktok-test-section');">TT-3</button>
  <button class="debug-btn" onclick="navigateToStep('5-tiktok'); showTikTokSection('tiktok-shopify-section');">TT-4</button>
  <button class="debug-btn" onclick="navigateToStep('5-tiktok'); showTikTokSection('tiktok-whatsnext-section');">TT-5</button>
  <button class="debug-btn" onclick="navigateToStep('5-tiktok'); simulateTikTokTestError();">TT-Err</button>
</div>
```

---

## Task 12: Final Testing

**Step 1: Test full flow**
- Channel select → Step 1 → Step 2 → Step 3 → Step 4 → Step 5
- Back buttons at each step
- Confetti fires on Step 5
- "Connect Another Channel" returns to channel select
- "Finish Setup" advances to step 6

**Step 2: Test demo controls**
- Reset, Fill Credentials, Test Success, Test Error, Replay Confetti

**Step 3: Test error states**
- Empty credentials validation
- Test error with retry

**Step 4: Test copy Business ID**

**Step 5: Verify screenshots show placeholders gracefully**

**Step 6: Commit**

```bash
git add onboarding.html tiktok-connection.md docs/plans/2026-02-05-tiktok-connection.md
git commit -m "feat: Add TikTok connection page with 5-step flow + confetti celebration

- Step 1: Add Popsixle as partner (copy Business ID)
- Step 2: Enter credentials (Pixel ID, Access Token, Test Code)
- Step 3: Test connection (success/error states)
- Step 4: Turn off Shopify connection (instructions + screenshots)
- Step 5: What's next with confetti + Connect Another Channel CTA
- Demo controls per section
- Debug panel integration

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Screenshots Needed (Placeholders OK)

| File | Description |
|------|-------------|
| `assets/tiktok-create-pixel.png` | TikTok Events Manager "Create Pixel" screen |
| `assets/shopify-tiktok-settings.png` | Shopify TikTok sales channel settings |
| `assets/tiktok-logo.png` | TikTok logo for flow diagram (optional, has fallback) |
