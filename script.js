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

  // Respect user's motion preferences for accessibility (LS-118)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (brandElements.length > 0 &&
      window.matchMedia('(min-width: 769px)').matches &&
      !prefersReducedMotion) {
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
     4. SCROLL REVEAL ANIMATION - Phase Cards Sequential Float-Up
     ============================================ */
  // Intersection Observer for phase cards sequential reveal
  const phaseCards = document.querySelectorAll('.methodology-grid--4col .phase-card');

  if (phaseCards.length > 0) {
    const observerOptions = {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: unobserve after revealing (animation only happens once)
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe each phase card
    phaseCards.forEach(card => {
      revealObserver.observe(card);
    });
  }

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
});

// =====================================================
// Enhanced Contact Form Validation & Submission (LS-2032)
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    
    // Check if user just submitted form (from page reload or back button)
    const formJustSubmitted = sessionStorage.getItem('formSubmitted');
    const submissionTime = sessionStorage.getItem('submissionTime');
    
    if (formJustSubmitted === 'true') {
      const timeSince = Date.now() - parseInt(submissionTime || 0);
      if (timeSince < 300000) { // 5 minutes
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = '<strong>✓ Message sent successfully!</strong>Thank you for reaching out. We\'ll get back to you within 24 hours. <span style="display:block; margin-top:0.5rem; font-size:0.9rem; opacity:0.8;">You can continue browsing or submit another enquiry below.</span>';
        formFeedback.style.display = 'block';
        contactForm.reset();
        
        setTimeout(() => {
          sessionStorage.removeItem('formSubmitted');
          sessionStorage.removeItem('submissionTime');
        }, 1000);
      } else {
        sessionStorage.removeItem('formSubmitted');
        sessionStorage.removeItem('submissionTime');
      }
    }
    
    // Validation helper function
    function validateForm() {
      const errors = [];
      
      // Name validation
      const name = document.getElementById('name');
      if (!name.value.trim()) {
        errors.push('Name is required');
        name.classList.add('error');
      } else {
        name.classList.remove('error');
      }
      
      // Email validation
      const email = document.getElementById('email');
      const emailValue = email.value.trim();
      if (!emailValue) {
        errors.push('Email address is required');
        email.classList.add('error');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        errors.push('Please enter a valid email address');
        email.classList.add('error');
      } else {
        email.classList.remove('error');
      }
      
      // Help type validation
      const helpType = document.getElementById('help-type');
      if (!helpType.value) {
        errors.push('Please select how we can help you');
        helpType.classList.add('error');
      } else {
        helpType.classList.remove('error');
      }
      
      // Message validation
      const message = document.getElementById('message');
      if (!message.value.trim()) {
        errors.push('Message is required');
        message.classList.add('error');
      } else {
        message.classList.remove('error');
      }
      
      // Privacy checkbox validation
      const privacyCheckbox = document.querySelector('input[name="privacy-agree"]');
      if (!privacyCheckbox.checked) {
        errors.push('You must agree to the Privacy Policy');
        privacyCheckbox.parentElement.classList.add('error');
      } else {
        privacyCheckbox.parentElement.classList.remove('error');
      }
      
      return errors;
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Validate form
      const errors = validateForm();
      
      if (errors.length > 0) {
        // Show validation errors
        formFeedback.className = 'form-feedback error';
        formFeedback.innerHTML = '<strong>✗ Please fix the following errors:</strong><ul style="margin: 0.5rem 0 0 1.25rem; padding: 0;">' + 
          errors.map(err => '<li>' + err + '</li>').join('') + 
          '</ul>';
        formFeedback.style.display = 'block';
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Focus first error field
        const firstErrorField = contactForm.querySelector('.error');
        if (firstErrorField && firstErrorField.focus) {
          firstErrorField.focus();
        }
        
        return false;
      }

      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');
      
      // Disable submit button during processing
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      // Hide any previous messages
      formFeedback.style.display = 'none';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success
          sessionStorage.setItem('formSubmitted', 'true');
          sessionStorage.setItem('submissionTime', Date.now().toString());
          
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = '<strong>✓ Message sent successfully!</strong>Thank you for reaching out. We\'ll get back to you within 24 hours. <span style="display:block; margin-top:0.5rem; font-size:0.9rem; opacity:0.8;">Feel free to continue browsing the site.</span>';
          formFeedback.style.display = 'block';
          
          contactForm.reset();
          formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
        } else {
          // Server error
          const data = await response.json().catch(() => ({}));
          formFeedback.className = 'form-feedback error';
          formFeedback.innerHTML = '<strong>✗ Submission failed</strong><p style="margin: 0.5rem 0 0 0;">' + (data.error || 'Please try again or email us directly at <a href="mailto:hello@lt.solutions">hello@lt.solutions</a>') + '</p>';
          formFeedback.style.display = 'block';
          formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } catch (error) {
        // Network error
        formFeedback.className = 'form-feedback error';
        formFeedback.innerHTML = '<strong>✗ Connection error</strong><p style="margin: 0.5rem 0 0 0;">Please check your internet connection and try again, or email us at <a href="mailto:hello@lt.solutions">hello@lt.solutions</a></p>';
        formFeedback.style.display = 'block';
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } finally {
        // Re-enable submit button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      }
      
      return false;
    });
    
    // Clear error styling on input
    const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea, .form-checkbox');
    formInputs.forEach(input => {
      input.addEventListener('input', function() {
        this.classList.remove('error');
      });
      
      input.addEventListener('change', function() {
        this.classList.remove('error');
      });
    });
  }
});

// =====================================================
// Scroll Progress Indicator (LS-2030)
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
  const scrollProgress = document.querySelector('.scroll-progress');
  const scrollBar = document.querySelector('.scroll-progress__bar');
  const scrollIndicator = document.querySelector('.scroll-progress__indicator');

  if (scrollProgress && scrollBar && scrollIndicator) {
    let ticking = false;

    function updateScrollProgress() {
      // Calculate scroll percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate percentage (0-100)
      const maxScroll = documentHeight - windowHeight;
      const scrollPercent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      
      // Clamp between 0 and 100
      const clampedPercent = Math.min(Math.max(scrollPercent, 0), 100);
      
      // Update bar height (fills from bottom)
      scrollBar.style.height = `${clampedPercent}%`;
      
      // Update indicator position (moves from top to bottom)
      const trackHeight = 120; // matches CSS height
      const indicatorPosition = (clampedPercent / 100) * trackHeight;
      scrollIndicator.style.top = `${indicatorPosition}px`;
      
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    }

    // Listen to scroll events
    window.addEventListener('scroll', requestTick, { passive: true });

    // Initial update
    updateScrollProgress();
  }

  // Insights Carousel
  const insightsCarousel = document.querySelector('.insights-carousel__track');
  if (insightsCarousel) {
    const cards = insightsCarousel.querySelectorAll('.insight-preview-card');
    const dots = document.querySelectorAll('.insights-carousel__dots .carousel-dot');
    let currentIndex = 0;
    let autoRotateInterval;

    function showCard(index) {
      // Remove active class from all cards and dots
      cards.forEach(card => card.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Add active class to current card and dot
      cards[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }

    function nextCard() {
      const nextIndex = (currentIndex + 1) % cards.length;
      showCard(nextIndex);
    }

    function startAutoRotate() {
      autoRotateInterval = setInterval(nextCard, 5000); // Change every 5 seconds
    }

    function stopAutoRotate() {
      clearInterval(autoRotateInterval);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showCard(index);
        stopAutoRotate();
        startAutoRotate(); // Restart auto-rotate after manual interaction
      });
    });

    // Start auto-rotation
    startAutoRotate();

    // Pause on hover
    insightsCarousel.addEventListener('mouseenter', stopAutoRotate);
    insightsCarousel.addEventListener('mouseleave', startAutoRotate);
  }
});
