# Channel Connect Implementation Checklist

**PRD Reference:** [PRD_Channel_Connect_Experience.md](PRD_Channel_Connect_Experience.md)
**Prototype Base:** `onboarding.html` (builds on existing Step 5)
**Last Updated:** January 22, 2026

---

# PART 1: Onboarding Experience (New Users)

*What happens AFTER user clicks "Connect" on a channel in Step 5*

---

## 1.1 Meta Connection Page

### Left Nav - Outer Sidebar
- [ ] No changes (use existing onboarding outer sidebar)
- [ ] Store logo + name
- [ ] "Popsixle Setup" nav item (active)
- [ ] "Skip to Dashboard" at bottom

### Left Nav - Inner Sidebar (Connection Steps)
- [ ] "Connect to Facebook" header
- [ ] Step 1: "Enter Details"
  - [ ] Active state (purple dot) when on form
  - [ ] Completed state (checkmark) after form submitted
- [ ] Step 2: "Test Connection"
  - [ ] Pending state (gray) initially
  - [ ] Active state (purple dot) during/after test
- [ ] Vertical connector line between steps

### Center Wizard Area
- [ ] **Header**
  - [ ] Title: "Connect to Facebook/Meta"
  - [ ] Subtitle: "Send your conversion data to Meta to improve your ad performance"

- [ ] **Data Flow Visual**
  - [ ] Shopify logo with "Your Store" label
  - [ ] Animated dashed line (green)
  - [ ] Popsixle logo with "Popsixle Pixel" label
  - [ ] Animated dashed line (purple)
  - [ ] Meta logo with "Facebook/Meta" label

- [ ] **Need Help Link**
  - [ ] "Need help? Read our step-by-step guide"
  - [ ] Links to: https://info.popsixle.com/knowledge/popsixle-onboarding-fb-pixel-dataset

- [ ] **Form Fields**
  - [ ] Pixel/Dataset ID field
    - [ ] Purple label: "Pixel/Dataset ID"
    - [ ] Helper: "Found in Meta Events Manager: Select your Dataset → Settings Tab → Top of page"
    - [ ] Input with placeholder: "Paste the Pixel/Dataset ID here"
    - [ ] Hint: "Your Pixel/Dataset ID will appear as a number like 1234567890"
  - [ ] CAPI Token field
    - [ ] Purple label: "Conversions API Access Token"
    - [ ] Helper: "Generate in Meta Events Manager → Settings → Conversions API → Generate Token"
    - [ ] Input with placeholder: "Paste the generated CAPI token here"
    - [ ] Hint: "Your CAPI token will appear as a long alpha-numeric string"
  - [ ] Test Event Code field
    - [ ] Purple label: "Test Event Code"
    - [ ] Helper: "Found in Meta Events Manager → Test Events tab"
    - [ ] Input with placeholder: "Paste the Test Event Code here"
    - [ ] Hint: "Starts with TEST followed by numbers like TEST12345"

- [ ] **Form Footer**
  - [ ] "Back" button (returns to channel selection)
  - [ ] "Confirm & Send Test Event" primary button

### Right Panel - Contextual Help
- [ ] Purple label: "STEP 5"
- [ ] Title: "Connect to Facebook/Meta"
- [ ] Description paragraph explaining benefits
- [ ] "Common Questions" section header
- [ ] Q&A: "Where do I find my Pixel/Dataset ID?"
- [ ] Q&A: "How do I generate a CAPI token?"
- [ ] Q&A: "What is a Test Event Code?"
- [ ] Q&A: "Why do I need all three values?"

### Right Panel - Setup Assistance
- [ ] Purple label: "SETUP ASSISTANCE"
- [ ] "Free Onboarding Call" link with avatar
- [ ] "Popsixle Setup Overview" link with play icon
- [ ] "Explore Setup Guides" link with document icon
- [ ] No underlines on hover

---

## 1.2 Google Connection Page

### Left Nav - Outer Sidebar
- [ ] No changes (same as Meta)

### Left Nav - Inner Sidebar (Connection Steps)
- [ ] "Connect to Google Ads" header
- [ ] Step 1: "Enter Details" (with states)
- [ ] Step 2: "Authenticate" (with states)

### Center Wizard Area
- [ ] **Header**
  - [ ] Title: "Connect to Google Ads"
  - [ ] Subtitle: "Send your conversion data to Google to improve your ad performance"

- [ ] **Data Flow Visual**
  - [ ] Shopify logo with "Your Store" label
  - [ ] Animated dashed line (green)
  - [ ] Popsixle logo with "Popsixle Pixel" label
  - [ ] Animated dashed line (purple)
  - [ ] Google Ads logo with "Google Ads" label

- [ ] **Need Help Link**
  - [ ] "Need help? Read our step-by-step guide"
  - [ ] Links to: https://info.popsixle.com/knowledge/adding-a-popsixle-google-data-connection

- [ ] **Form Fields**
  - [ ] Google Ad Account ID field
    - [ ] Purple label: "Google Ads Account ID"
    - [ ] Helper: "Found in Google Ad Account at top right corner of the screen"
    - [ ] Input with placeholder: "Paste the Google Ad Account ID here"
    - [ ] Hint: "10 hyphenated digits like 321-654-0987"

- [ ] **OAuth Button**
  - [ ] "Begin Google Authentication" primary button
  - [ ] OAuth popup handling
  - [ ] Loading state while authenticating
  - [ ] Success/failure callback handling

- [ ] **Form Footer**
  - [ ] "Back" button (returns to channel selection)

### Right Panel - Contextual Help
- [ ] Purple label: "STEP 5"
- [ ] Title: "Connect to Google Ads"
- [ ] Description paragraph explaining benefits
- [ ] "Common Questions" section header
- [ ] Q&A: "Where do I find my Account ID?"
- [ ] Q&A: "What permissions does Popsixle need?"
- [ ] Q&A: "Can I connect multiple accounts?"

### Right Panel - Setup Assistance
- [ ] Same as Meta (reuse component)

---

## 1.3 TikTok Connection Page

### Left Nav - Outer Sidebar
- [ ] No changes (same as Meta)

### Left Nav - Inner Sidebar (Connection Steps)
- [ ] "Connect to TikTok" header
- [ ] Step 1: "Enter Details" (with states)
- [ ] Step 2: "Test Connection" (with states)

### Center Wizard Area
- [ ] **Header**
  - [ ] Title: "Connect to TikTok"
  - [ ] Subtitle: "Send your conversion data to TikTok to improve your ad performance"

- [ ] **Data Flow Visual**
  - [ ] Shopify logo with "Your Store" label
  - [ ] Animated dashed line (green)
  - [ ] Popsixle logo with "Popsixle Pixel" label
  - [ ] Animated dashed line (purple)
  - [ ] TikTok logo with "TikTok" label

- [ ] **Need Help Link**
  - [ ] "Need help? Read our step-by-step guide"
  - [ ] Links to: https://info.popsixle.com/knowledge/how-to-send-popsixle-data-to-tiktok

- [ ] **Form Fields**
  - [ ] Pixel ID field
    - [ ] Purple label: "TikTok Pixel ID"
    - [ ] Helper: "Found in TikTok Tools > Events"
    - [ ] Input with placeholder: "Paste the Pixel ID here"
    - [ ] Hint: "Alpha-numeric string like C1234ABC5678DEFG01"
  - [ ] Events API Access Token field
    - [ ] Purple label: "Events API Access Token"
    - [ ] Helper: "Generate in TikTok Events Settings Tab > Events API section > Generate Token"
    - [ ] Input with placeholder: "Paste the generated access token here"
    - [ ] Hint: "Long alpha-numeric string"
  - [ ] Test Event Code field
    - [ ] Purple label: "Test Event Code"
    - [ ] Helper: "Found in TikTok Events Test Events Tab > Test Server Events > Test Code"
    - [ ] Input with placeholder: "Paste the Test Event Code here"

- [ ] **Form Footer**
  - [ ] "Back" button (returns to channel selection)
  - [ ] "Confirm & Send Test Event" primary button

### Right Panel - Contextual Help
- [ ] Purple label: "STEP 5"
- [ ] Title: "Connect to TikTok"
- [ ] Description paragraph explaining benefits
- [ ] "Common Questions" section header
- [ ] Q&A: "Where do I find my Pixel ID?"
- [ ] Q&A: "How do I generate an Events API token?"
- [ ] Q&A: "What events will Popsixle send?"

### Right Panel - Setup Assistance
- [ ] Same as Meta (reuse component)

---

## 1.4 Test Event Validation (Shared - All Channels)

### Center Wizard Area - Loading State
- [ ] Loading spinner/animation
- [ ] "Sending test event to [Channel]..." text
- [ ] "This usually takes 5-10 seconds" helper text

### Center Wizard Area - Success State
- [ ] Green checkmark icon
- [ ] "Connection Successful!" heading
- [ ] "Popsixle is now sending conversion data to [Channel]"
- [ ] "Events will appear in your Events Manager within 24 hours"
- [ ] "What's next?" section with guidance
- [ ] "Send Another Test" secondary button
- [ ] "Done" primary button

### Center Wizard Area - Failure State
- [ ] Red X icon
- [ ] "Connection Failed" heading
- [ ] Specific error message based on error type
- [ ] Troubleshooting suggestion
- [ ] "Common Issues & Solutions" expandable section
- [ ] "Try Again" primary button (preserves entered data)
- [ ] "Get Help" secondary button

### Right Panel
- [ ] No changes during validation states

---

## 1.5 Return to Channel Selection

### Center Wizard Area Updates
- [ ] Update connected channel card to show "Connected" badge (green)
- [ ] Animate purple line to "connected" state for that channel
- [ ] "Go to Dashboard" button enabled after 1+ connections

---

## Part 1 Review Checkpoints

| Checkpoint | What to Review |
|------------|----------------|
| **1A** | Meta page - all UI sections |
| **1B** | Google page - all UI sections |
| **1C** | TikTok page - all UI sections |
| **1D** | Test validation - loading state |
| **1E** | Test validation - success state |
| **1F** | Test validation - failure state |
| **1G** | Return to channel selection |
| **1H** | End-to-end onboarding flow |

---

# PART 2: Settings Experience (Returning Users)

*For users who completed onboarding and return to manage channels*

---

## 2.1 Settings Shell (Shared Navigation)

### Left Nav - Outer Sidebar
- [ ] Store logo + name at top
- [ ] "Dashboard" link
- [ ] "CHANNELS" section divider
- [ ] "Facebook Settings" link
  - [ ] Meta icon
  - [ ] Status dot (green/yellow/gray)
- [ ] "Google Settings" link
  - [ ] Google icon
  - [ ] Status dot (green/yellow/gray)
- [ ] "TikTok Settings" link
  - [ ] TikTok icon
  - [ ] Status dot (green/yellow/gray)
- [ ] Divider line
- [ ] "Settings" link
- [ ] "Analytics" link (placeholder)
- [ ] "Help & Resources" link (placeholder)

### Left Nav - Inner Sidebar (When Channel Selected - Not Connected)
- [ ] "Connect to [Channel]" header
- [ ] Step 1: "Enter Details" (active/completed states)
- [ ] Step 2: "Test Connection" (pending/active states)
- [ ] Vertical connector line between steps

### Left Nav - Inner Sidebar (When Channel Selected - Connected)
- [ ] "[Channel] Settings" header
- [ ] "Connection Status" nav item (active)
- [ ] "Event Configuration" nav item (placeholder/disabled)
- [ ] "Advanced Settings" nav item (placeholder/disabled)

### Left Nav - Inner Sidebar (When Settings Selected)
- [ ] "Settings" header
- [ ] "Account Settings" nav item
- [ ] "Privacy Settings" nav item (placeholder)
- [ ] "Restricted Brand Controls" nav item (placeholder)

### Left Nav - Inner Sidebar (When Analytics Selected - Placeholder)
- [ ] "Analytics" header
- [ ] "Overview" nav item (placeholder)
- [ ] "Channel Performance" nav item (placeholder)
- [ ] "Event History" nav item (placeholder)

### Left Nav - Inner Sidebar (When Help Selected - Placeholder)
- [ ] "Help & Resources" header
- [ ] "Knowledge Base" nav item (placeholder)
- [ ] "Contact Support" nav item (placeholder)
- [ ] "Book a Call" nav item (placeholder)

---

## 2.2 Meta Settings Page (Not Connected)

### Left Nav - Outer Sidebar
- [ ] "Facebook Settings" highlighted/active
- [ ] Gray status dot (not connected)

### Left Nav - Inner Sidebar (Connection Steps)
- [ ] "Connect to Facebook" header
- [ ] Step 1: "Enter Details" - active (purple)
- [ ] Step 2: "Test Connection" - pending (gray)

### Center Wizard Area
- [ ] Same as Part 1.1 (Meta Connection Page)
- [ ] Reuse all form components

### Right Panel - Contextual Help
- [ ] Same as Part 1.1

### Right Panel - Setup Assistance
- [ ] Same as Part 1.1

---

## 2.3 Meta Settings Page (Connected)

### Left Nav - Outer Sidebar
- [ ] "Facebook Settings" highlighted/active
- [ ] Green status dot (connected)

### Left Nav - Inner Sidebar (Management)
- [ ] "Facebook Settings" header
- [ ] "Connection Status" - active
- [ ] "Event Configuration" - placeholder (future)
- [ ] "Advanced Settings" - placeholder (future)

### Center Wizard Area
- [ ] **Header**
  - [ ] Title: "Facebook/Meta Settings"
  - [ ] Subtitle: "Manage your Meta connection"

- [ ] **Data Flow Visual**
  - [ ] Same as connection page
  - [ ] Lines show "connected" state (solid or animated)

- [ ] **Connection Status Card**
  - [ ] "Connected" badge (green)
  - [ ] "Last event sent: [timestamp]"
  - [ ] Masked credentials display:
    - [ ] "Pixel ID: ****7890"
    - [ ] "CAPI Token: ****configured"

- [ ] **Actions**
  - [ ] "Send Test Event" button (re-verify connection)
  - [ ] "Update Credentials" link
  - [ ] "Disconnect" button (with confirmation)

### Right Panel - Contextual Help
- [ ] Purple label: "FACEBOOK/META"
- [ ] Title: "Connection Status"
- [ ] Description about managing connection
- [ ] "Common Questions" section
- [ ] Q&A: "How often should I verify my connection?"
- [ ] Q&A: "What happens if I disconnect?"
- [ ] Q&A: "How do I update my credentials?"

### Right Panel - Setup Assistance
- [ ] Same as onboarding

---

## 2.4 Google Settings Page (Not Connected)

### Left Nav - Outer Sidebar
- [ ] "Google Settings" highlighted/active
- [ ] Gray status dot

### Left Nav - Inner Sidebar (Connection Steps)
- [ ] "Connect to Google Ads" header
- [ ] Step 1: "Enter Details" - active (purple)
- [ ] Step 2: "Authenticate" - pending (gray)

### Center Wizard Area
- [ ] Same as Part 1.2 (Google Connection Page)

### Right Panel - Contextual Help
- [ ] Same as Part 1.2

### Right Panel - Setup Assistance
- [ ] Same as onboarding

---

## 2.5 Google Settings Page (Connected)

### Left Nav - Outer Sidebar
- [ ] "Google Settings" highlighted/active
- [ ] Green status dot

### Left Nav - Inner Sidebar (Management)
- [ ] "Google Ads Settings" header
- [ ] "Connection Status" - active
- [ ] "Event Configuration" - placeholder (future)
- [ ] "Advanced Settings" - placeholder (future)

### Center Wizard Area
- [ ] **Header**
  - [ ] Title: "Google Ads Settings"
  - [ ] Subtitle: "Manage your Google Ads connection"

- [ ] **Data Flow Visual**
  - [ ] Same as connection page, connected state

- [ ] **Connection Status Card**
  - [ ] "Connected" badge (green)
  - [ ] "Last event sent: [timestamp]"
  - [ ] "Account ID: 321-***-0987"
  - [ ] "Authenticated as: [email]"

- [ ] **Actions**
  - [ ] "Re-authenticate" button
  - [ ] "Disconnect" button (with confirmation)

### Right Panel - Contextual Help
- [ ] Same structure as Meta connected state

### Right Panel - Setup Assistance
- [ ] Same as onboarding

---

## 2.6 TikTok Settings Page (Not Connected)

### Left Nav - Outer Sidebar
- [ ] "TikTok Settings" highlighted/active
- [ ] Gray status dot

### Left Nav - Inner Sidebar (Connection Steps)
- [ ] "Connect to TikTok" header
- [ ] Step 1: "Enter Details" - active (purple)
- [ ] Step 2: "Test Connection" - pending (gray)

### Center Wizard Area
- [ ] Same as Part 1.3 (TikTok Connection Page)

### Right Panel - Contextual Help
- [ ] Same as Part 1.3

### Right Panel - Setup Assistance
- [ ] Same as onboarding

---

## 2.7 TikTok Settings Page (Connected)

### Left Nav - Outer Sidebar
- [ ] "TikTok Settings" highlighted/active
- [ ] Green status dot

### Left Nav - Inner Sidebar (Management)
- [ ] "TikTok Settings" header
- [ ] "Connection Status" - active
- [ ] "Event Configuration" - placeholder (future)
- [ ] "Advanced Settings" - placeholder (future)

### Center Wizard Area
- [ ] **Header**
  - [ ] Title: "TikTok Settings"
  - [ ] Subtitle: "Manage your TikTok connection"

- [ ] **Data Flow Visual**
  - [ ] Same as connection page, connected state

- [ ] **Connection Status Card**
  - [ ] "Connected" badge (green)
  - [ ] "Last event sent: [timestamp]"
  - [ ] Masked credentials display

- [ ] **Actions**
  - [ ] "Send Test Event" button
  - [ ] "Update Credentials" link
  - [ ] "Disconnect" button (with confirmation)

### Right Panel - Contextual Help
- [ ] Same structure as Meta connected state

### Right Panel - Setup Assistance
- [ ] Same as onboarding

---

## 2.8 Disconnect Flow (All Channels)

### Center Wizard Area - Confirmation Modal
- [ ] Modal overlay
- [ ] "Disconnect from [Channel]?" heading
- [ ] Warning text explaining consequences
- [ ] "Cancel" button
- [ ] "Disconnect" button (destructive style)

### After Disconnect
- [ ] Update outer nav status dot to gray
- [ ] Show connection form (not connected state)
- [ ] Success message: "Disconnected from [Channel]"

---

## 2.9 Update Credentials Flow (Meta/TikTok)

### Center Wizard Area
- [ ] Same form as connection page
- [ ] Pre-filled with masked current values
- [ ] "Update & Verify" primary button
- [ ] "Cancel" secondary button

### After Update
- [ ] Run test event validation
- [ ] On success: update stored credentials, show success
- [ ] On failure: show error, keep old credentials

---

## Part 2 Review Checkpoints

| Checkpoint | What to Review |
|------------|----------------|
| **2A** | Settings shell - outer nav |
| **2B** | Settings shell - inner nav variations |
| **2C** | Meta not connected page |
| **2D** | Meta connected page |
| **2E** | Google not connected page |
| **2F** | Google connected page |
| **2G** | TikTok not connected page |
| **2H** | TikTok connected page |
| **2I** | Disconnect flow |
| **2J** | Update credentials flow |
| **2K** | End-to-end returning user flow |

---

# PART 3: Polish & QA

---

## 3.1 Responsive Design
- [ ] Test all pages at max-height: 900px
- [ ] Test all pages at max-height: 850px
- [ ] Verify no horizontal scrolling
- [ ] Test form usability on smaller screens

## 3.2 Analytics Events
- [ ] channel_connect_started
- [ ] channel_connect_success
- [ ] channel_connect_failed
- [ ] channel_connect_retry
- [ ] channel_disconnect
- [ ] channel_credentials_updated

## 3.3 Accessibility
- [ ] All form fields have labels
- [ ] Error messages announced to screen readers
- [ ] Keyboard navigation works
- [ ] Color not sole indicator of state

## 3.4 Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## Final Review Checklist

- [ ] All Part 1 checkpoints passed
- [ ] All Part 2 checkpoints passed
- [ ] Responsive design verified
- [ ] Analytics events firing
- [ ] Accessibility requirements met
- [ ] Cross-browser testing complete
