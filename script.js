/* ============================================
   LT.Solutions Website JavaScript - Phase 4 Enhanced
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  /* ============================================
     1. MOBILE MENU TOGGLE
     ============================================ */
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      }
    });

    // Close menu when clicking a nav link
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ============================================
     2. PARALLAX EFFECT FOR HERO BRAND ELEMENTS
     ============================================ */
  const brandElements = document.querySelectorAll('.hero-brand-element');

  if (brandElements.length > 0 && window.matchMedia('(min-width: 769px)').matches) {
    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;

      brandElements.forEach((element, index) => {
        const speed = parallaxSpeed * (index + 1) * 0.3;
        const yPos = scrolled * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  /* ============================================
     3. SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Don't prevent default for empty hash or just "#"
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ============================================
     4. SCROLL REVEAL ANIMATION
     ============================================ */
  // Animation disabled - all elements show immediately via CSS
  // Can be re-enabled in future phases if needed

  /* ============================================
     5. ACTIVE NAV HIGHLIGHTING
     ============================================ */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav__link');

  function highlightNavOnScroll() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('nav__link--active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  /* ============================================
     6. HEADER SHADOW ON SCROLL
     ============================================ */
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ============================================
     7. FORM VALIDATION
     ============================================ */
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');

    formInputs.forEach(input => {
      // Validate on blur
      input.addEventListener('blur', function() {
        validateField(this);
      });

      // Clear error on input
      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          this.classList.remove('error');
          const errorElement = this.parentElement.querySelector('.form-error');
          if (errorElement) {
            errorElement.classList.remove('visible');
          }
        }
      });
    });

    // Validate on submit
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      let isValid = true;

      formInputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (isValid) {
        // Form is valid - show success message
        showFormSuccess();

        // In Phase 5, this will be replaced with actual form submission
        console.log('Form would be submitted with data:', new FormData(contactForm));
      } else {
        // Focus first error field
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
          firstError.focus();
        }
      }
    });
  }

  /* ============================================
     FORM VALIDATION HELPER FUNCTIONS
     ============================================ */
  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';

    // Check if required field is empty
    if (required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation (optional - if field has name="phone")
    else if (field.name === 'phone' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Minimum length check for textareas
    else if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
      isValid = false;
      errorMessage = 'Please provide more detail (minimum 10 characters)';
    }

    // Show/hide error
    if (!isValid) {
      field.classList.add('error');
      showFieldError(field, errorMessage);
    } else {
      field.classList.remove('error');
      hideFieldError(field);
    }

    return isValid;
  }

  function showFieldError(field, message) {
    let errorElement = field.parentElement.querySelector('.form-error');

    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      field.parentElement.appendChild(errorElement);
    }

    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }

  function hideFieldError(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.classList.remove('visible');
    }
  }

  function showFormSuccess() {
    const form = document.querySelector('.contact-form');

    // Create success message using DOM methods (CSP-compliant)
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = 'background-color: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 1rem; border-radius: 4px; margin-bottom: 1rem; text-align: center;';

    const strongEl = document.createElement('strong');
    strongEl.textContent = 'Thank you!';

    const textNode = document.createTextNode(' Your message has been received. We will get back to you soon.');

    successDiv.appendChild(strongEl);
    successDiv.appendChild(textNode);

    // Insert at top of form
    form.insertBefore(successDiv, form.firstChild);

    // Reset form
    form.reset();

    // Remove success message after 5 seconds
    setTimeout(function() {
      successDiv.remove();
    }, 5000);

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ============================================
     8. SCROLL REVEAL - DISABLED
     ============================================ */
  // Scroll reveal animations disabled for now
  // All elements show immediately via CSS

  /* ============================================
     9. FLIP CARD INTERACTIONS
     ============================================ */
  const flipCards = document.querySelectorAll('.service-card-flip');
  console.log('Found flip cards:', flipCards.length);

  flipCards.forEach(card => {
    card.addEventListener('click', function(e) {
      console.log('Card clicked!', e.target);
      // Don't flip if clicking on a link
      if (e.target.tagName === 'A') {
        console.log('Link clicked, not flipping');
        return;
      }
      this.classList.toggle('flipped');
      console.log('Card flipped! Has flipped class:', this.classList.contains('flipped'));
    });
  });

  /* ============================================
     10. INITIALIZE EVERYTHING
     ============================================ */
  console.log('🎨 LT.Solutions - The Living Brand Experience initialized! 🚀');

});