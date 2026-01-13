/**
 * Popsixle Onboarding Wizard
 * Handles step navigation, state management, and validation
 */

class OnboardingWizard {
  constructor() {
    // State
    this.currentStep = 0; // 0 = pricing, 1-5 = wizard steps
    this.totalSteps = 5;
    this.state = {
      pricingAccepted: false,
      productType: null,
      pixelEnabled: false,
      pixelStatus: 'not-started', // not-started, checking, enabled, not-found
      specialCases: {
        landingPage: false,
        headless: false,
        customCart: false
      },
      channels: {
        meta: false,
        google: false,
        tiktok: false
      }
    };

    // DOM elements
    this.pricingScreen = document.getElementById('pricing-screen');
    this.wizardScreen = document.getElementById('wizard-screen');
    this.stepContents = document.querySelectorAll('.step-content-panel');
    this.stepItems = document.querySelectorAll('.step-item');
    this.progressBar = document.querySelector('.progress-bar-fill');
    this.stepCounter = document.getElementById('step-counter');

    // Initialize
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateUI();
  }

  bindEvents() {
    // Pricing CTA
    const startTrialBtn = document.getElementById('start-trial-btn');
    if (startTrialBtn) {
      startTrialBtn.addEventListener('click', () => this.startTrial());
    }

    // Navigation buttons
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const skipBtn = document.getElementById('skip-btn');

    if (nextBtn) nextBtn.addEventListener('click', () => this.nextStep());
    if (backBtn) backBtn.addEventListener('click', () => this.prevStep());
    if (skipBtn) skipBtn.addEventListener('click', () => this.skipStep());

    // Skip to dashboard
    const skipToDashboard = document.getElementById('skip-to-dashboard');
    if (skipToDashboard) {
      skipToDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToDashboard();
      });
    }

    // Product type selection
    document.querySelectorAll('.radio-card').forEach(card => {
      card.addEventListener('click', () => this.selectProductType(card));
    });

    // Pixel verification
    const checkPixelBtn = document.getElementById('check-pixel-btn');
    if (checkPixelBtn) {
      checkPixelBtn.addEventListener('click', () => this.checkPixelStatus());
    }

    // Special cases toggles
    document.querySelectorAll('.special-case-toggle').forEach(toggle => {
      toggle.addEventListener('change', (e) => this.toggleSpecialCase(e));
    });

    // Channel connect buttons
    document.querySelectorAll('.connect-channel-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.connectChannel(e));
    });

    // Accordion toggles
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => this.toggleAccordion(header));
    });

    // Modal handling
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const modalId = trigger.dataset.modal;
        this.openModal(modalId);
      });
    });

    document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el) this.closeAllModals();
      });
    });
  }

  startTrial() {
    this.state.pricingAccepted = true;
    this.currentStep = 1;
    this.showWizard();
    this.updateUI();
  }

  showWizard() {
    if (this.pricingScreen) this.pricingScreen.classList.add('hidden');
    if (this.wizardScreen) this.wizardScreen.classList.remove('hidden');
  }

  showPricing() {
    if (this.pricingScreen) this.pricingScreen.classList.remove('hidden');
    if (this.wizardScreen) this.wizardScreen.classList.add('hidden');
  }

  nextStep() {
    if (!this.canProceed()) {
      this.showValidationError();
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateUI();
    } else {
      this.goToDashboard();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateUI();
    } else if (this.currentStep === 1) {
      this.currentStep = 0;
      this.showPricing();
    }
  }

  skipStep() {
    // Only certain steps can be skipped
    const skippableSteps = [3]; // Special Cases
    if (skippableSteps.includes(this.currentStep)) {
      this.currentStep++;
      this.updateUI();
    }
  }

  goToStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
      this.currentStep = stepNumber;
      this.updateUI();
    }
  }

  canProceed() {
    switch (this.currentStep) {
      case 1: // Product Type
        return this.state.productType !== null;
      case 2: // Pixel Setup
        return this.state.pixelStatus === 'enabled';
      case 3: // Special Cases - optional
        return true;
      case 4: // Review
        return true;
      case 5: // Channels - at least one connected
        return Object.values(this.state.channels).some(v => v);
      default:
        return true;
    }
  }

  updateUI() {
    // Update step content visibility
    this.stepContents.forEach((content, index) => {
      const stepNum = parseInt(content.dataset.step);
      content.classList.toggle('hidden', stepNum !== this.currentStep);
    });

    // Update sidebar steps
    this.stepItems.forEach((item, index) => {
      const stepNum = index + 1;
      item.classList.remove('active', 'completed');

      if (stepNum < this.currentStep) {
        item.classList.add('completed');
      } else if (stepNum === this.currentStep) {
        item.classList.add('active');
      }
    });

    // Update progress bar
    const progress = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = `${Math.max(0, progress)}%`;
    }

    // Update step counter
    if (this.stepCounter) {
      this.stepCounter.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
    }

    // Update navigation buttons
    this.updateNavigation();

    // Update step-specific UI
    this.updateStepUI();
  }

  updateNavigation() {
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const skipBtn = document.getElementById('skip-btn');

    // Back button
    if (backBtn) {
      backBtn.classList.toggle('hidden', this.currentStep <= 1);
    }

    // Skip button - only on skippable steps
    if (skipBtn) {
      const skippableSteps = [3];
      skipBtn.classList.toggle('hidden', !skippableSteps.includes(this.currentStep));
    }

    // Next button text
    if (nextBtn) {
      if (this.currentStep === this.totalSteps) {
        nextBtn.textContent = 'Go to Dashboard';
      } else {
        nextBtn.textContent = 'Continue';
      }

      // Disable if can't proceed (for required steps)
      const requiredSteps = [1, 2];
      if (requiredSteps.includes(this.currentStep) && !this.canProceed()) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }
    }
  }

  updateStepUI() {
    // Product type - show Unrestricted banner if applicable
    if (this.currentStep === 1) {
      const unrestrictedBanner = document.getElementById('unrestricted-banner');
      if (unrestrictedBanner) {
        const restrictedTypes = ['health-wellness', 'cbd-hemp', 'restricted'];
        const showBanner = restrictedTypes.includes(this.state.productType);
        unrestrictedBanner.classList.toggle('hidden', !showBanner);
      }
    }

    // Pixel status
    if (this.currentStep === 2) {
      this.updatePixelStatusUI();
    }

    // Review configuration
    if (this.currentStep === 4) {
      this.updateReviewUI();
    }

    // Channels
    if (this.currentStep === 5) {
      this.updateChannelsUI();
    }
  }

  // Product Type Selection
  selectProductType(card) {
    document.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    this.state.productType = card.dataset.type;
    this.updateUI();
  }

  // Pixel Status
  checkPixelStatus() {
    this.state.pixelStatus = 'checking';
    this.updatePixelStatusUI();

    // Simulate checking (in real app, this would be an API call)
    setTimeout(() => {
      // For demo purposes, randomly succeed or fail
      // In production, this would check actual pixel status
      this.state.pixelStatus = 'enabled'; // or 'not-found'
      this.state.pixelEnabled = this.state.pixelStatus === 'enabled';
      this.updatePixelStatusUI();
      this.updateNavigation();
    }, 2000);
  }

  updatePixelStatusUI() {
    const statusElements = {
      'not-started': document.getElementById('pixel-status-not-started'),
      'checking': document.getElementById('pixel-status-checking'),
      'enabled': document.getElementById('pixel-status-enabled'),
      'not-found': document.getElementById('pixel-status-not-found')
    };

    Object.entries(statusElements).forEach(([status, el]) => {
      if (el) el.classList.toggle('hidden', status !== this.state.pixelStatus);
    });
  }

  // Special Cases
  toggleSpecialCase(e) {
    const caseType = e.target.dataset.case;
    this.state.specialCases[caseType] = e.target.checked;
  }

  // Channels
  connectChannel(e) {
    const channel = e.target.closest('[data-channel]').dataset.channel;

    // Simulate connection (in real app, would open OAuth flow)
    e.target.disabled = true;
    e.target.innerHTML = '<span class="spinner"></span> Connecting...';

    setTimeout(() => {
      this.state.channels[channel] = true;
      this.updateChannelsUI();
      this.updateNavigation();
    }, 1500);
  }

  updateChannelsUI() {
    Object.entries(this.state.channels).forEach(([channel, connected]) => {
      const card = document.querySelector(`[data-channel="${channel}"]`);
      if (!card) return;

      const statusEl = card.querySelector('.channel-status');
      const actionEl = card.querySelector('.channel-action');

      if (connected) {
        if (statusEl) {
          statusEl.innerHTML = '<span class="status-chip status-connected">Connected</span>';
        }
        if (actionEl) {
          actionEl.innerHTML = '<button class="btn btn-secondary btn-sm" disabled>Connected</button>';
        }
      }
    });

    // Check if all channels connected for celebration
    const allConnected = Object.values(this.state.channels).every(v => v);
    const celebrationEl = document.getElementById('channel-celebration');
    if (celebrationEl) {
      celebrationEl.classList.toggle('hidden', !allConnected);
    }
  }

  // Review
  updateReviewUI() {
    // Product type
    const productTypeEl = document.getElementById('review-product-type');
    if (productTypeEl) {
      const typeLabels = {
        'regular': 'Regular Products',
        'health-wellness': 'Health & Wellness',
        'cbd-hemp': 'CBD / Hemp Products',
        'restricted': 'Other Restricted Category'
      };
      productTypeEl.textContent = typeLabels[this.state.productType] || 'Not selected';
    }

    // Pixel status
    const pixelStatusEl = document.getElementById('review-pixel-status');
    if (pixelStatusEl) {
      pixelStatusEl.innerHTML = this.state.pixelEnabled
        ? '<span class="status-chip status-connected">Enabled</span>'
        : '<span class="status-chip status-not-connected">Not Enabled</span>';
    }

    // Special cases
    const specialCasesEl = document.getElementById('review-special-cases');
    if (specialCasesEl) {
      const activeCases = Object.entries(this.state.specialCases)
        .filter(([_, enabled]) => enabled)
        .map(([key]) => {
          const labels = {
            landingPage: 'Landing Page',
            headless: 'Headless Storefront',
            customCart: 'Custom Cart'
          };
          return labels[key];
        });

      specialCasesEl.textContent = activeCases.length > 0
        ? activeCases.join(', ')
        : 'None selected';
    }
  }

  // Accordion
  toggleAccordion(header) {
    const item = header.closest('.accordion-item');
    item.classList.toggle('open');
  }

  // Modal
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
  }

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  }

  // Validation
  showValidationError() {
    // Show appropriate error message based on current step
    let message = '';
    switch (this.currentStep) {
      case 1:
        message = 'Please select a product type to continue.';
        break;
      case 2:
        message = 'Please enable the Popsixle Pixel to continue.';
        break;
      case 5:
        message = 'Please connect at least one channel.';
        break;
    }

    if (message) {
      // Could show a toast or inline error
      alert(message);
    }
  }

  // Dashboard
  goToDashboard() {
    window.location.href = 'dashboard.html';
  }
}

// Initialize wizard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.wizard = new OnboardingWizard();
});
