/**
 * Popsixle Onboarding - Main JavaScript
 * General interactions, utilities, and shared functionality
 */

// Utility functions
const Utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  // Show element
  show(element) {
    if (element) element.classList.remove('hidden');
  },

  // Hide element
  hide(element) {
    if (element) element.classList.add('hidden');
  },

  // Toggle element
  toggle(element) {
    if (element) element.classList.toggle('hidden');
  }
};

// Accordion functionality
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('open');

      // Close all other accordions in the same group
      const accordion = header.closest('.accordion');
      if (accordion && !accordion.classList.contains('accordion-multi')) {
        accordion.querySelectorAll('.accordion-item').forEach(i => {
          if (i !== item) i.classList.remove('open');
        });
      }

      // Toggle current
      item.classList.toggle('open');
    });
  });
}

// Tooltip functionality
function initTooltips() {
  document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
    const tooltip = trigger.querySelector('.tooltip-content');
    if (!tooltip) return;

    trigger.addEventListener('mouseenter', () => {
      // Position tooltip
      const rect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      // Check if tooltip would go off screen
      if (rect.left + (rect.width / 2) - (tooltipRect.width / 2) < 0) {
        tooltip.style.left = '0';
        tooltip.style.transform = 'none';
      }
    });
  });
}

// Modal functionality
function initModals() {
  // Open modal
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modalOpen;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close modal on close button
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-overlay.open');
      if (openModal) closeModal(openModal);
    }
  });
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Toggle switch functionality
function initToggles() {
  document.querySelectorAll('.toggle').forEach(toggle => {
    const input = toggle.querySelector('.toggle-input');
    if (!input) return;

    toggle.addEventListener('click', (e) => {
      if (e.target !== input) {
        input.checked = !input.checked;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// External links - open in new tab
function initExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname || link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// Copy to clipboard functionality
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
}

// Loading state helpers
const Loading = {
  show(element, text = 'Loading...') {
    if (!element) return;
    element.disabled = true;
    element.dataset.originalText = element.textContent;
    element.innerHTML = `<span class="spinner"></span> ${text}`;
  },

  hide(element) {
    if (!element) return;
    element.disabled = false;
    element.textContent = element.dataset.originalText || 'Submit';
  }
};

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initTooltips();
  initModals();
  initToggles();
  initSmoothScroll();
  initExternalLinks();
  initCopyButtons();
});

// Export utilities for use in other scripts
window.Utils = Utils;
window.Loading = Loading;
