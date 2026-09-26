/**
 * Furnace Repair Allen, TX - Lightweight Production Scripts
 * Minimal vanilla JS for high Core Web Vitals, mobile menu, and accessible FAQ accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // 1b. Mobile Submenu Toggle
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    mobileDropdownBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parentItem = btn.closest('.mobile-dropdown-item');
        if (parentItem) {
          const isExpanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', !isExpanded);
          parentItem.classList.toggle('open');
        }
      });
    });
  }

  // 2. Accessible FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other FAQ items in same container
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current FAQ
        item.classList.toggle('active', !isOpen);
        questionBtn.setAttribute('aria-expanded', !isOpen);
      });
    }
  });

  // 3. Dynamic Copyright Year
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });

  // 4. Click-to-Call Tracking Hook
  const callButtons = document.querySelectorAll('a[href^="tel:"]');
  callButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'Phone Call',
          event_label: btn.getAttribute('data-cta') || 'Click to Call',
          value: 1
        });
      }
    });
  });
});
