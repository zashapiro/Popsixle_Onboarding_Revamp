# Google Ads Connection Page — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a 3-step Google Ads connection flow to the existing onboarding wizard, matching the Meta connection page exactly.

**Architecture:** New `data-step="5-google"` panel inside `onboarding.html` (alongside existing `5-meta`). Reuses the same `goToChannelStep()` / `returnToChannelSelection()` / `completeChannelConnection()` infrastructure. Google gets its own connection-steps-list (3 items vs Meta's 4) and its own explanation panels. The `connect-google` button on the Step 5 channel select already exists — it just needs a panel to navigate to.

**Tech Stack:** HTML/CSS/JS (single-page prototype), no build tools.

---

## Critical Context for Implementation

### Files to modify
- `onboarding.html` — ALL changes go here (HTML panels + inline `<script>`)

### Files to READ before touching anything
- `google-ads-connection.md` (design spec — root of project)
- `CLAUDE.md` (design philosophy, CSS rules, event handler rules)
- Design system: `C:\Users\shapi\Documents\Osidian\Zach\Reference\Work\Popsixle\design-system.md`
- Copy guidelines: `C:\Users\shapi\Documents\Osidian\Zach\Reference\Work\Popsixle\copy-guidelines.md`
- Build prototype skill: `C:\Users\shapi\Documents\Osidian\Zach\.claude\skills\build-prototype.md`

### Design Rules (NEVER violate)
- Max 30 lines new CSS. Reuse existing classes: `.channel-connect-card`, `.channel-form-label`, `.channel-form-helper`, `.channel-form-input`, `.channel-form-hint`, `.channel-form-error`, `.wizard-btn-primary`, `.wizard-btn-secondary`, `.pixel-demo-controls`, `.connection-test-badge`
- Primary CTA: `#A855F7` (solid purple). Google sign-in button is the ONE exception — white bg per Google brand guidelines.
- All buttons: `type="button"` + inline `onclick="functionName()"`
- No hardcoded colors — use CSS variables except for Google-specific brand colors (`#4285F4`, `#1F1F1F`, `#747775`)
- If it looks busier than the Meta credentials page, strip it down

### Existing JS Infrastructure (DO NOT duplicate)
These functions already exist and handle Google correctly:
- `goToChannelStep('google')` — shows `data-step="5-google"` panel, swaps sidebar, updates explanation (**line 6173**)
- `returnToChannelSelection()` — restores Step 5 channel select (**line 6228**)
- `completeChannelConnection('google')` — marks channel connected, updates flow line, returns to channel select (**line 6291**)
- `updateExplanationPanel(panelId)` — swaps explanation panel by data attribute (**line 5895**)
- `connectChannel('google')` — called by existing `#connect-google` button, calls `goToChannelStep('google')` (**line 6268**)

### Existing CSS (reuse all of these)
- `.connection-test-badge` + `.status-pending/.status-testing/.status-success/.status-failed` — status badge (line 2454)
- `.connection-steps-list` — inner nav sidebar (line 3720)
- `.channel-connect-flow` + `.flow-node` + `.dashed-line` — flow diagram (lines 2941, 2990, 3793)
- `.channel-connect-card` — white card container (line 3851)
- `.channel-form-label/.channel-form-helper/.channel-form-input/.channel-form-hint/.channel-form-error` — form elements
- `.wizard-footer` + `.wizard-btn-primary/.wizard-btn-secondary` — footer buttons
- `.pixel-demo-controls` + `.pixel-demo-btn` — demo controls bar
- `.explanation-content/.explanation-header/.explanation-label/.explanation-title/.explanation-body/.explanation-section/.faq-item/.faq-question/.faq-answer` — right panel

### Known Event Handler Gotcha
Generic `.wizard-btn-primary` handler exists at **line 5600**. It already skips buttons with `onclick` attributes AND buttons inside `[data-step="5-meta"]`. **You must add the same exclusion for `[data-step="5-google"]`** at line 5602:
```javascript
// BEFORE (line 5602):
if (btn.hasAttribute('onclick') || btn.closest('[data-step="5-meta"]')) return;

// AFTER:
if (btn.hasAttribute('onclick') || btn.closest('[data-step="5-meta"]') || btn.closest('[data-step="5-google"]')) return;
```
Same for the Back button handler at **line 5616**:
```javascript
// BEFORE:
if (btn.closest('[data-step="5-meta"]')) return;

// AFTER:
if (btn.closest('[data-step="5-meta"]') || btn.closest('[data-step="5-google"]')) return;
```

---

## Task 1: Add Google Assets (SVG inline — no image files needed)

**Files:**
- Modify: `onboarding.html` (the Google Ads logo on the Step 5 channel select already uses an inline SVG at lines 4792-4796 — reuse this exact SVG for the flow diagram)

**Step 1:** Confirm the inline Google "G" SVG already exists in `onboarding.html` at lines 4792-4796. This same SVG will be reused in both the flow diagram destination node and the sign-in button. No new image files needed.

**Step 2: Commit**
```bash
# Nothing to commit yet — just verification
```

---

## Task 2: Add Google Step Panel HTML

**Files:**
- Modify: `onboarding.html` — insert after the Meta step panel closing `</div>` (after line 5059)

**Step 1: Add the Google step panel**

Insert this HTML immediately after line 5059 (`</div>` closing the Meta `data-step="5-meta"` panel):

```html
        <!-- Step 5-Google: Google Ads Connection Form -->
        <div class="step-panel" data-step="5-google">
          <div class="wizard-content-header" style="position: relative;">
            <!-- Status Badge - Top Right of Header -->
            <div class="connection-test-badge status-pending" id="google-test-badge">
              <span class="status-dot"></span>
              <span class="status-text">Not Connected</span>
            </div>
            <h1>Connect to Google Ads</h1>
            <p style="color: #1E293B;">Send your conversion data to Google to improve your ad targeting and campaign performance</p>
            <!-- Help Link - below header -->
            <a href="https://info.popsixle.com/knowledge/adding-a-popsixle-google-data-connection" target="_blank" class="channel-form-help-link" style="margin-top: 12px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Need help? Read our step-by-step guide
            </a>
          </div>
          <div class="wizard-content-body">
            <!-- Data Flow Visual - Single Channel -->
            <div class="channel-connect-flow">
              <div class="flow-source">
                <div class="flow-node shopify">
                  <img src="assets/Shopify_Logo.png" alt="Shopify">
                </div>
                <span class="flow-node-label">Your Store</span>
              </div>
              <svg class="flow-line-svg" width="48" height="20">
                <path class="dashed-line green" d="M 0,10 L 48,10" />
              </svg>
              <div class="flow-hub">
                <div class="flow-node popsixle">
                  <img src="popsixle_logo_gradient_circle_500 (1).png" alt="Popsixle">
                </div>
                <span class="flow-node-label">Popsixle Pixel</span>
              </div>
              <svg class="flow-line-svg" width="48" height="20">
                <path class="dashed-line" style="stroke: #4285F4; stroke-width: 3; stroke-dasharray: 12, 10; fill: none; stroke-linecap: round;" d="M 0,10 L 48,10" />
              </svg>
              <div class="flow-destination">
                <div class="flow-node" style="border: 2px solid #4285F4; background: white;">
                  <svg width="40" height="40" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Phase 1: Account ID + OAuth -->
            <div class="google-connect-section" id="google-connect-section">
              <div class="channel-form-container">
                <!-- Account ID Card -->
                <div class="channel-connect-card">
                  <label class="channel-form-label">Enter your Google Ads Account ID</label>
                  <div class="channel-form-helper">
                    Found in Google Ads: click the Settings gear icon, then Account Settings. Your Customer ID is displayed at the top of the page.
                  </div>
                  <input type="text" id="google-account-id" class="channel-form-input" placeholder="Paste your Account ID (xxx-xxx-xxxx)">
                  <div class="channel-form-hint">Format: xxx-xxx-xxxx (10 digits with dashes)</div>
                  <div class="channel-form-error">Please enter a valid Google Ads Account ID</div>
                </div>

                <!-- Google OAuth Card -->
                <div class="channel-connect-card">
                  <label class="channel-form-label">Authenticate with Google</label>
                  <div class="channel-form-helper">
                    Sign in with your Google account to authorize Popsixle to send conversion data to your Google Ads account.
                  </div>
                  <button type="button" class="google-signin-btn" id="google-signin-btn" onclick="startGoogleOAuth()">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </button>
                </div>
              </div>
            </div>

            <!-- Phase 2: Create Conversion Action (shown after OAuth success) -->
            <div class="google-conversion-section" id="google-conversion-section" style="display: none;">
              <div class="channel-form-container">
                <div class="channel-connect-card">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#10B981" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span style="color: #10B981; font-weight: 500; font-size: 14px;">Google account connected</span>
                  </div>
                  <label class="channel-form-label">Create conversion action</label>
                  <div class="channel-form-helper">
                    This creates a "Purchase" conversion action in your Google Ads account so Google can receive and track your conversion data from Popsixle. The action starts as Secondary (reporting-only) so it won't affect your existing campaigns.
                  </div>
                  <button type="button" class="wizard-btn wizard-btn-primary" id="google-create-conversion-btn" onclick="createGoogleConversionAction()" style="margin-top: 12px;">
                    Create Conversion Action
                  </button>
                </div>
              </div>
            </div>

            <!-- Phase 3: Verify Connection (shown after conversion action created) -->
            <div class="google-verify-section" id="google-verify-section" style="display: none;">
              <div class="channel-form-container">
                <div class="channel-connect-card">
                  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#10B981" style="width: 24px; height: 24px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <label class="channel-form-label" style="margin: 0;">Connection Verified</label>
                  </div>
                  <div class="channel-form-helper">
                    Your Google Ads account is now connected and a Purchase conversion action has been created. Popsixle will automatically start sending conversion data within approximately 6 hours.
                  </div>
                </div>

                <div class="channel-connect-card">
                  <label class="channel-form-label">What to expect</label>
                  <div class="channel-form-helper">
                    Google Ads needs approximately 6 hours to propagate your new conversion action. After that, Popsixle will automatically begin sending server events — no action needed from you.
                  </div>
                  <div class="channel-form-helper" style="margin-top: 8px;">
                    To confirm data is flowing, check Google Ads tomorrow: go to Goals, then Conversions, and look for "purchase-popsixle-yourstore" with Secondary status.
                  </div>
                </div>
              </div>
            </div>

            <!-- Phase 4: What's Next (shown after verify) -->
            <div class="google-whatsnext-section" id="google-whatsnext-section" style="display: none;">
              <div class="channel-form-container">
                <div class="channel-connect-card">
                  <label class="channel-form-label">Secondary to primary</label>
                  <div class="channel-form-helper">
                    Your Popsixle conversion action starts as Secondary (reporting-only), running alongside your existing Google Ads tracking. After 2 or more weeks and at least 20-30 tracked conversions, you can upgrade it to Primary status for maximum attribution accuracy.
                  </div>
                </div>

                <div class="channel-connect-card">
                  <label class="channel-form-label">Monitor your performance</label>
                  <div class="channel-form-helper">
                    Check your Google Ads Conversions page to compare Popsixle-attributed conversions against your existing tracking. Look for improved match rates and conversion counts.
                  </div>
                </div>
              </div>
            </div>

            <!-- Demo Controls -->
            <div class="pixel-demo-controls">
              <div class="pixel-demo-controls-label">Demo Controls (preview version)</div>
              <div class="pixel-demo-controls-buttons">
                <button class="pixel-demo-btn" onclick="resetGoogleForm()">Reset</button>
                <button class="pixel-demo-btn" onclick="simulateGoogleOAuth()">After OAuth</button>
                <button class="pixel-demo-btn" onclick="simulateGoogleFullConnect()">Full Connect</button>
              </div>
            </div>
          </div>
          <div class="wizard-footer" id="google-wizard-footer">
            <div class="wizard-footer-left">
              <button type="button" class="wizard-btn wizard-btn-secondary" id="google-back-btn">Back</button>
            </div>
            <div class="wizard-footer-right">
              <button type="button" class="wizard-btn wizard-btn-primary" id="google-continue-btn" style="display: none;" onclick="navigateGoogleStep('next')">Continue</button>
              <button type="button" class="wizard-btn wizard-btn-primary" id="google-done-btn" style="display: none;" onclick="completeChannelConnection('google')">Done — Return to Channels</button>
            </div>
          </div>
        </div>
```

**Step 2: Verify** — Open `onboarding.html` in browser, navigate to Step 5, click "Connect" on Google. You should see the panel (unstyled sign-in button, but layout should be recognizable).

**Step 3: Commit**
```bash
git add onboarding.html
git commit -m "feat: add Google Ads connection HTML panel (step 5-google)"
```

---

## Task 3: Add Google Explanation Panels

**Files:**
- Modify: `onboarding.html` — insert after the last Meta explanation panel (after line 5313, the closing `</div>` of `data-explanation="5-meta-adaccount"`)

**Step 1: Add 3 explanation panels**

Insert after line 5313:

```html
        <!-- Step 5-Google: Google Ads Connection Explanation -->
        <div class="explanation-content" data-explanation="5-google">
          <div class="explanation-header">
            <div class="explanation-label">Google Ads</div>
            <h3 class="explanation-title">Connect to Google Ads</h3>
          </div>
          <div class="explanation-body">
            <p>Connecting to Google Ads allows Popsixle to send conversion data directly to your ad account, improving campaign optimization and attribution accuracy.</p>
          </div>
          <div class="explanation-section">
            <div class="explanation-section-title">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
              Common Questions
            </div>
            <div class="faq-item">
              <div class="faq-question">Where do I find my Ad Account ID?</div>
              <div class="faq-answer">In Google Ads, click the Settings gear icon, then Account Settings. Your Customer ID is at the top of the page.</div>
            </div>
            <div class="faq-item">
              <div class="faq-question">Do I need admin access?</div>
              <div class="faq-answer">Yes, you need admin or standard access to the Google Ads account to authorize the connection.</div>
            </div>
            <div class="faq-item">
              <div class="faq-question">What is the conversion action?</div>
              <div class="faq-answer">A Purchase conversion action in Google Ads that receives data from Popsixle. It starts as Secondary (reporting-only) so it won't disrupt your existing tracking.</div>
            </div>
          </div>
        </div>

        <!-- Step 5-Google-Verify: Verify Connection Explanation -->
        <div class="explanation-content" data-explanation="5-google-verify">
          <div class="explanation-header">
            <div class="explanation-label">Google Ads</div>
            <h3 class="explanation-title">Verify Your Connection</h3>
          </div>
          <div class="explanation-body">
            <p>Popsixle has created a conversion action and will automatically begin sending data after the 6-hour propagation window. No manual toggle required.</p>
          </div>
          <div class="explanation-section">
            <div class="explanation-section-title">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
              Common Questions
            </div>
            <div class="faq-item">
              <div class="faq-question">How long until I see data in Google Ads?</div>
              <div class="faq-answer">The conversion action appears immediately, but event data takes approximately 6 hours to begin flowing. Full attribution data within 24-48 hours.</div>
            </div>
            <div class="faq-item">
              <div class="faq-question">What if I see "Needs Action" in Google Ads?</div>
              <div class="faq-answer">This can appear briefly during the 6-hour propagation window. If it persists after 24 hours, contact support@popsixle.com.</div>
            </div>
          </div>
        </div>

        <!-- Step 5-Google-WhatsNext: What's Next Explanation -->
        <div class="explanation-content" data-explanation="5-google-whatsnext">
          <div class="explanation-header">
            <div class="explanation-label">Google Ads</div>
            <h3 class="explanation-title">What's Next</h3>
          </div>
          <div class="explanation-body">
            <p>Your Google Ads connection is active. Here's what to expect in the coming weeks.</p>
          </div>
          <div class="explanation-section">
            <div class="explanation-section-title">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
              Common Questions
            </div>
            <div class="faq-item">
              <div class="faq-question">When should I switch to primary?</div>
              <div class="faq-answer">After 2+ weeks of running side-by-side with at least 20-30 conversions tracked, once you've confirmed Popsixle matches or exceeds your current attribution accuracy.</div>
            </div>
            <div class="faq-item">
              <div class="faq-question">Can I disconnect later?</div>
              <div class="faq-answer">Yes, from your Popsixle dashboard under Channel Settings.</div>
            </div>
          </div>
        </div>
```

**Step 2: Commit**
```bash
git add onboarding.html
git commit -m "feat: add Google Ads explanation panels (connect, verify, what's next)"
```

---

## Task 4: Add Google Sign-in Button CSS

**Files:**
- Modify: `onboarding.html` — add CSS inside the existing `<style>` block

**Step 1: Add CSS**

Find the end of the existing inline styles (before the closing `</style>` tag) and add:

```css
    /* Google Sign-in Button (Google brand guidelines) */
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
      transition: background 0.15s ease;
    }
    .google-signin-btn:hover { background: #F2F2F2; }
    .google-signin-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
```

That's 15 lines. No other new CSS needed — everything else uses existing classes.

**Step 2: Verify** — open in browser, navigate to Google page, confirm the sign-in button renders correctly (white bg, gray border, Google "G" icon + text).

**Step 3: Commit**
```bash
git add onboarding.html
git commit -m "feat: add Google sign-in button CSS (15 lines)"
```

---

## Task 5: Add Event Handler Exclusions

**Files:**
- Modify: `onboarding.html` — lines 5602 and 5616

**Step 1: Update generic primary button handler (line 5602)**

Find:
```javascript
      if (btn.hasAttribute('onclick') || btn.closest('[data-step="5-meta"]')) return;
```

Replace with:
```javascript
      if (btn.hasAttribute('onclick') || btn.closest('[data-step="5-meta"]') || btn.closest('[data-step="5-google"]')) return;
```

**Step 2: Update generic back button handler (line 5616)**

Find:
```javascript
      if (btn.closest('[data-step="5-meta"]')) return;
```

Replace with:
```javascript
      if (btn.closest('[data-step="5-meta"]') || btn.closest('[data-step="5-google"]')) return;
```

**Step 3: Commit**
```bash
git add onboarding.html
git commit -m "fix: exclude Google panel from generic wizard button handlers"
```

---

## Task 6: Add Google Connection-Steps-List to Sidebar

**Files:**
- Modify: `onboarding.html` — The existing `connection-steps-list` (line 4300) is Meta-specific (4 items). Google needs its own 3-item list.

**Step 1: Understand the current behavior**

Currently `goToChannelStep()` (line 6196-6219) shows the single `connection-steps-list` and resets steps 1-4. For Google, we need a separate list with 3 steps. The cleanest approach: add a second `connection-steps-list` with id `google-connection-steps-list`, and update `goToChannelStep()` to show the right one.

**Step 2: Add Google connection steps HTML**

Insert after line 4328 (closing `</div>` of the Meta connection-steps-list):

```html
          <!-- Google Connection Steps (shown when on Google form) -->
          <div class="connection-steps-list" id="google-connection-steps-list" style="display: none;">
            <ul class="wizard-step-list">
              <li class="wizard-step-item active" id="google-step-1">
                <span class="wizard-step-number">1</span>
                <div class="wizard-step-content">
                  <span class="wizard-step-title">Connect account</span>
                </div>
              </li>
              <li class="wizard-step-item" id="google-step-2">
                <span class="wizard-step-number">2</span>
                <div class="wizard-step-content">
                  <span class="wizard-step-title">Verify connection</span>
                </div>
              </li>
              <li class="wizard-step-item" id="google-step-3">
                <span class="wizard-step-number">3</span>
                <div class="wizard-step-content">
                  <span class="wizard-step-title">What's next</span>
                </div>
              </li>
            </ul>
          </div>
```

**Step 3: Update `goToChannelStep()` to show the correct connection steps**

In the `goToChannelStep()` function (line 6196-6202), replace:

```javascript
      const setupStepsList = document.querySelector('.setup-steps-list');
      const connectionStepsList = document.getElementById('connection-steps-list');
      const setupStepsHeader = document.querySelector('.setup-steps-header');

      if (setupStepsList) setupStepsList.style.display = 'none';
      if (connectionStepsList) connectionStepsList.style.display = 'block';
```

With:

```javascript
      const setupStepsList = document.querySelector('.setup-steps-list');
      const metaConnectionSteps = document.getElementById('connection-steps-list');
      const googleConnectionSteps = document.getElementById('google-connection-steps-list');
      const setupStepsHeader = document.querySelector('.setup-steps-header');

      if (setupStepsList) setupStepsList.style.display = 'none';
      // Show the correct connection steps list
      if (metaConnectionSteps) metaConnectionSteps.style.display = (channel === 'meta') ? 'block' : 'none';
      if (googleConnectionSteps) googleConnectionSteps.style.display = (channel === 'google') ? 'block' : 'none';
```

**Step 4: Update `returnToChannelSelection()` to hide both**

In `returnToChannelSelection()` (line 6250-6255), replace:

```javascript
      const setupStepsList = document.querySelector('.setup-steps-list');
      const connectionStepsList = document.getElementById('connection-steps-list');
      const setupStepsHeader = document.querySelector('.setup-steps-header');

      if (setupStepsList) setupStepsList.style.display = 'block';
      if (connectionStepsList) connectionStepsList.style.display = 'none';
```

With:

```javascript
      const setupStepsList = document.querySelector('.setup-steps-list');
      const metaConnectionSteps = document.getElementById('connection-steps-list');
      const googleConnectionSteps = document.getElementById('google-connection-steps-list');
      const setupStepsHeader = document.querySelector('.setup-steps-header');

      if (setupStepsList) setupStepsList.style.display = 'block';
      if (metaConnectionSteps) metaConnectionSteps.style.display = 'none';
      if (googleConnectionSteps) googleConnectionSteps.style.display = 'none';
```

**Step 5: Update `goToChannelStep()` reset logic for Google steps**

In `goToChannelStep()` (lines 6211-6224), after the existing Meta step reset block, add Google reset:

```javascript
      // Reset Google-specific state when entering Google form
      if (channel === 'google') {
        resetGoogleForm();
        // Reset Google connection steps
        var gs1 = document.getElementById('google-step-1');
        var gs2 = document.getElementById('google-step-2');
        var gs3 = document.getElementById('google-step-3');
        if (gs1) { gs1.classList.add('active'); gs1.classList.remove('completed'); }
        if (gs2) { gs2.classList.remove('active', 'completed'); }
        if (gs3) { gs3.classList.remove('active', 'completed'); }
      }
```

**Step 6: Verify** — navigate to Google page, confirm 3-step sidebar appears. Navigate to Meta, confirm 4-step sidebar appears. Return to channel select, confirm setup steps restore.

**Step 7: Commit**
```bash
git add onboarding.html
git commit -m "feat: add Google 3-step connection sidebar + update nav functions"
```

---

## Task 7: Add Google JavaScript Functions

**Files:**
- Modify: `onboarding.html` — add inside the inline `<script>` block, after the Meta functions (after the `resetMetaForm` function, around line 5960)

**Step 1: Add Google state variable**

Near line 5531 (after `let currentMetaStep = 1;`), add:

```javascript
    let currentGoogleStep = 1; // Track Google sub-step: 1=connect, 2=verify, 3=whatsnext
```

**Step 2: Add all Google functions**

Add after the Meta functions block:

```javascript
    // ============================================
    // GOOGLE ADS CONNECTION FUNCTIONS
    // ============================================

    function showGoogleTestStatus(status) {
      var badge = document.getElementById('google-test-badge');
      if (!badge) return;
      var statusText = badge.querySelector('.status-text');

      badge.classList.remove('status-pending', 'status-testing', 'status-success', 'status-failed');

      switch(status) {
        case 'pending':
          badge.classList.add('status-pending');
          statusText.textContent = 'Not Connected';
          break;
        case 'testing':
          badge.classList.add('status-testing');
          statusText.textContent = 'Connecting...';
          break;
        case 'success':
          badge.classList.add('status-success');
          statusText.textContent = 'Connected';
          break;
        case 'failed':
          badge.classList.add('status-failed');
          statusText.textContent = 'Connection Failed';
          break;
      }
    }

    function updateGoogleConnectionStep(step) {
      currentGoogleStep = step;

      var gs1 = document.getElementById('google-step-1');
      var gs2 = document.getElementById('google-step-2');
      var gs3 = document.getElementById('google-step-3');

      [gs1, gs2, gs3].forEach(function(s) {
        if (s) s.classList.remove('active', 'completed');
      });

      if (step >= 1 && gs1) gs1.classList.add(step > 1 ? 'completed' : 'active');
      if (step >= 2 && gs2) gs2.classList.add(step > 2 ? 'completed' : 'active');
      if (step >= 3 && gs3) gs3.classList.add('active');
    }

    function showGoogleSection(sectionId) {
      // Hide all Google sections
      var sections = ['google-connect-section', 'google-conversion-section', 'google-verify-section', 'google-whatsnext-section'];
      sections.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });

      // Show requested section
      var target = document.getElementById(sectionId);
      if (target) target.style.display = 'block';

      // Update footer buttons
      var continueBtn = document.getElementById('google-continue-btn');
      var doneBtn = document.getElementById('google-done-btn');

      if (continueBtn) continueBtn.style.display = (sectionId === 'google-verify-section') ? 'inline-flex' : 'none';
      if (doneBtn) doneBtn.style.display = (sectionId === 'google-whatsnext-section') ? 'inline-flex' : 'none';
    }

    function startGoogleOAuth() {
      var accountId = document.getElementById('google-account-id').value.trim();
      if (!accountId) {
        document.getElementById('google-account-id').classList.add('error');
        return;
      }
      document.getElementById('google-account-id').classList.remove('error');

      // Disable button, show loading
      var signinBtn = document.getElementById('google-signin-btn');
      if (signinBtn) {
        signinBtn.disabled = true;
        signinBtn.innerHTML = '<svg style="width:20px;height:20px;animation:spin 1s linear infinite" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle style="opacity:0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path style="opacity:0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Connecting...';
      }

      showGoogleTestStatus('testing');

      // Simulate OAuth return after delay
      setTimeout(function() {
        showGoogleTestStatus('success');
        showGoogleSection('google-conversion-section');
      }, 1500);
    }

    function createGoogleConversionAction() {
      var btn = document.getElementById('google-create-conversion-btn');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Creating...';
      }

      setTimeout(function() {
        if (btn) {
          btn.textContent = 'Conversion action created';
          btn.style.background = '#10B981';
        }

        // Advance to verify step
        updateGoogleConnectionStep(2);
        updateExplanationPanel('5-google-verify');

        setTimeout(function() {
          showGoogleSection('google-verify-section');
        }, 800);
      }, 1200);
    }

    function navigateGoogleStep(direction) {
      if (direction === 'next') {
        if (currentGoogleStep === 2) {
          // Move from verify to what's next
          currentGoogleStep = 3;
          updateGoogleConnectionStep(3);
          showGoogleSection('google-whatsnext-section');
          updateExplanationPanel('5-google-whatsnext');
        }
      }
    }

    function resetGoogleForm() {
      currentGoogleStep = 1;
      showGoogleTestStatus('pending');

      // Reset section visibility
      showGoogleSection('google-connect-section');

      // Reset connection steps
      updateGoogleConnectionStep(1);

      // Reset sign-in button
      var signinBtn = document.getElementById('google-signin-btn');
      if (signinBtn) {
        signinBtn.disabled = false;
        signinBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Sign in with Google';
      }

      // Reset conversion action button
      var convBtn = document.getElementById('google-create-conversion-btn');
      if (convBtn) {
        convBtn.disabled = false;
        convBtn.textContent = 'Create Conversion Action';
        convBtn.style.background = '';
      }

      // Reset account ID input
      var accountInput = document.getElementById('google-account-id');
      if (accountInput) {
        accountInput.value = '';
        accountInput.classList.remove('error');
      }

      // Update explanation
      updateExplanationPanel('5-google');
    }

    // Demo controls
    function simulateGoogleOAuth() {
      // Pre-fill account ID and jump to Phase 2
      var accountInput = document.getElementById('google-account-id');
      if (accountInput) accountInput.value = '123-456-7890';
      showGoogleTestStatus('success');
      showGoogleSection('google-conversion-section');
    }

    function simulateGoogleFullConnect() {
      var accountInput = document.getElementById('google-account-id');
      if (accountInput) accountInput.value = '123-456-7890';
      showGoogleTestStatus('success');
      updateGoogleConnectionStep(2);
      showGoogleSection('google-verify-section');
      updateExplanationPanel('5-google-verify');
    }
```

**Step 3: Add Google Back button handler**

In the event handler section (near line 6407 where Meta back button is handled), add:

```javascript
    // Google back button
    var googleBackBtn = document.getElementById('google-back-btn');
    if (googleBackBtn) {
      googleBackBtn.addEventListener('click', returnToChannelSelection);
    }
```

**Step 4: Add spin keyframe** (if not already present)

Check if `@keyframes spin` exists. If not, add to the `<style>` block:

```css
    @keyframes spin { to { transform: rotate(360deg); } }
```

**Step 5: Verify** — test all demo controls (Reset, After OAuth, Full Connect). Test full flow: enter Account ID → Sign in with Google → Create Conversion Action → Continue → Done.

**Step 6: Commit**
```bash
git add onboarding.html
git commit -m "feat: add Google Ads connection JS (OAuth sim, conversion action, step nav)"
```

---

## Task 8: Add Google to Debug Panel

**Files:**
- Modify: `onboarding.html` — the debug panel at lines 6561-6577

**Step 1: Add Google debug buttons**

After the Meta Flow section (after line 6576), add:

```html
    <div class="debug-panel-header" style="margin-top: 8px;">Google Flow</div>
    <button type="button" class="debug-btn" onclick="debugGoToGoogle(1)">G1. Connect</button>
    <button type="button" class="debug-btn" onclick="debugGoToGoogle(2)">G2. Conversion</button>
    <button type="button" class="debug-btn" onclick="debugGoToGoogle(3)">G3. Verify</button>
    <button type="button" class="debug-btn" onclick="debugGoToGoogle(4)">G4. What's Next</button>
```

**Step 2: Add debug function**

In the debug script section (after `debugGoToMeta`), add:

```javascript
    function debugGoToGoogle(googleStep) {
      var pricingScreen = document.getElementById('pricing-screen');
      var wizardScreen = document.getElementById('wizard-screen');
      if (pricingScreen) pricingScreen.style.display = 'none';
      if (wizardScreen) wizardScreen.classList.add('active');

      goToStep(5);

      setTimeout(function() {
        goToChannelStep('google');

        setTimeout(function() {
          var accountInput = document.getElementById('google-account-id');
          if (accountInput) accountInput.value = '123-456-7890';

          if (googleStep >= 2) {
            showGoogleTestStatus('success');
            showGoogleSection('google-conversion-section');
          }
          if (googleStep >= 3) {
            updateGoogleConnectionStep(2);
            showGoogleSection('google-verify-section');
            updateExplanationPanel('5-google-verify');
          }
          if (googleStep >= 4) {
            updateGoogleConnectionStep(3);
            showGoogleSection('google-whatsnext-section');
            updateExplanationPanel('5-google-whatsnext');
          }
        }, 100);
      }, 100);
    }
```

**Step 3: Commit**
```bash
git add onboarding.html
git commit -m "feat: add Google flow to debug panel"
```

---

## Task 9: Update Setup Assistance Card for Google

**Files:**
- Modify: `onboarding.html` — the assistance card (line 5318-5336) and `goToChannelStep()`/`returnToChannelSelection()` functions

**Step 1: Add IDs to assistance card links**

Update the assistance card video link (line 5328) to have an ID:

```html
<a href="#" class="assistance-card-link" id="assistance-video-link">
  <svg ...>...</svg>
  <span id="assistance-video-text">Meta Setup Overview</span>
</a>
```

**Step 2: Update `goToChannelStep()` to swap assistance text**

In `goToChannelStep()`, after the `setupStepsHeader` update block (around line 6209), add:

```javascript
      // Update assistance card video text
      var assistanceVideoText = document.getElementById('assistance-video-text');
      if (assistanceVideoText) {
        var videoLabels = { meta: 'Meta Setup Overview', google: 'Google Ads Setup Overview', tiktok: 'TikTok Setup Overview' };
        assistanceVideoText.textContent = videoLabels[channel] || 'Setup Overview';
      }
```

**Step 3: Update `returnToChannelSelection()` to restore default**

In `returnToChannelSelection()`, after restoring the header text (around line 6260), add:

```javascript
      // Restore assistance card video text
      var assistanceVideoText = document.getElementById('assistance-video-text');
      if (assistanceVideoText) {
        assistanceVideoText.textContent = 'Meta Setup Overview';
      }
```

**Step 4: Commit**
```bash
git add onboarding.html
git commit -m "feat: update assistance card video text per channel"
```

---

## Task 10: Full Integration Test

**Step 1: Open `onboarding.html` in browser**

**Step 2: Test complete Google flow**
1. Navigate to Step 5 (Channels)
2. Click "Connect" on Google Ads card
3. Verify: 3-step sidebar appears, outer nav shows "Popsixle Setup", header says "Connect to Google Ads"
4. Verify: explanation panel shows "Google Ads" label + "Connect to Google Ads" title + 3 FAQ items
5. Verify: Setup Assistance card shows "Google Ads Setup Overview"
6. Try clicking Sign in without Account ID — should show error
7. Enter "123-456-7890" → click Sign in with Google → loading state → conversion action card appears
8. Click "Create Conversion Action" → loading → success → auto-advance to verify step
9. Verify: sidebar step 2 active, explanation panel shows verify content
10. Click "Continue" → What's Next step appears, step 3 active
11. Click "Done — Return to Channels" → returns to channel select, Google shows "Connected"

**Step 3: Test demo controls**
- Reset: returns to initial state
- After OAuth: shows conversion action card
- Full Connect: jumps to verify step

**Step 4: Test debug panel**
- G1-G4 buttons jump to correct states

**Step 5: Test Meta still works**
- Navigate to Meta, run through full flow, confirm nothing broke

**Step 6: Visual check**
- Compare Google page against Meta page side-by-side
- Confirm same card sizes, spacing, font sizes, color usage
- The ONLY visual differences should be: Google logo instead of Meta, blue flow line instead of purple, sign-in button instead of 3 text inputs, 2 cards instead of 4

**Step 7: Commit**
```bash
git add onboarding.html
git commit -m "feat: Google Ads connection page complete — 3-step flow with OAuth + conversion action"
```

---

## Summary

| Task | What | Lines Changed |
|------|------|---------------|
| 1 | Verify SVG assets exist inline | 0 |
| 2 | Google step panel HTML | ~150 lines added |
| 3 | Google explanation panels | ~75 lines added |
| 4 | Google sign-in button CSS | ~15 lines added |
| 5 | Event handler exclusions | 2 lines changed |
| 6 | Connection steps sidebar + nav updates | ~40 lines added, ~15 lines changed |
| 7 | Google JS functions | ~180 lines added |
| 8 | Debug panel | ~30 lines added |
| 9 | Assistance card update | ~10 lines added/changed |
| 10 | Integration test | 0 |

**Total new CSS:** ~15 lines (within 30-line budget)
**Total new HTML:** ~265 lines
**Total new JS:** ~210 lines
**Existing classes reused:** `.channel-connect-card`, `.channel-form-label`, `.channel-form-helper`, `.channel-form-input`, `.channel-form-hint`, `.channel-form-error`, `.wizard-btn-primary`, `.wizard-btn-secondary`, `.connection-test-badge`, `.pixel-demo-controls`, `.channel-connect-flow`, `.flow-node`, `.dashed-line`, `.wizard-footer`, `.explanation-content`, `.faq-item`
