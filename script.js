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
      let isValid = true;

      formInputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        // Prevent submission if validation fails
        e.preventDefault();

        // Focus first error field
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
          firstError.focus();
        }
      }
      // If valid, allow form to submit naturally to Formspree
      // Formspree will handle the redirect and success message
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

  // Only enable flip interaction on devices with fine pointers (LS-116)
  // This prevents accidental flips on touch devices while scrolling
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (hasFinePointer) {
    flipCards.forEach(card => {
      card.addEventListener('click', function(e) {
        console.log('Card clicked!', e.target);

        // Don't flip if clicking on a link or if link is in the parent chain
        let target = e.target;
        while (target && target !== this) {
          if (target.tagName === 'A') {
            console.log('Link clicked, allowing navigation');
            // Don't prevent default - let the link work
            return;
          }
          target = target.parentElement;
        }

        // Toggle the flipped state
        this.classList.toggle('flipped');
        console.log('Card flipped! Has flipped class:', this.classList.contains('flipped'));
      });

      // Ensure links work on both sides
      const links = card.querySelectorAll('.service-card__link');
      links.forEach(link => {
        link.addEventListener('click', function(e) {
          // Stop propagation so card doesn't flip
          e.stopPropagation();
          console.log('Link clicked, navigating to:', this.href);
          // Link will navigate normally
        });
      });
    });
  } else {
    // On touch devices, keep cards unflipped to show front by default
    console.log('Touch device detected - flip cards disabled for better UX');
  }

  /* ============================================
     9B. VALUE ACCORDION (About Page)
     ============================================ */
  const valueCards = document.querySelectorAll('.value-accordion-card');
  const valueContents = document.querySelectorAll('.value-content');
  const contentContainer = document.querySelector('.values-accordion__content');

  console.log('Found value accordion cards:', valueCards.length);

  valueCards.forEach(card => {
    card.addEventListener('click', function() {
      const valueType = this.getAttribute('data-value');
      const isCurrentlyActive = this.classList.contains('active');
      console.log('Value card clicked:', valueType, 'Currently active:', isCurrentlyActive);

      // If clicking the already active card, close everything
      if (isCurrentlyActive) {
        valueCards.forEach(c => c.classList.remove('active'));
        valueContents.forEach(content => content.classList.remove('active'));
        contentContainer.classList.remove('active');
        console.log('Closing accordion');
        return;
      }

      // Otherwise, remove active from all cards
      valueCards.forEach(c => c.classList.remove('active'));

      // Remove active class from all contents
      valueContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked card
      this.classList.add('active');

      // Show the corresponding content
      const targetContent = document.querySelector(`.value-content[data-value="${valueType}"]`);
      if (targetContent) {
        targetContent.classList.add('active');
        contentContainer.classList.add('active');
        console.log('Showing content for:', valueType);
      }
    });
  });

  /* ============================================
     10. SCROLL PROGRESS INDICATOR
     ============================================ */
  const scrollProgress = document.querySelector('.scroll-progress');
  const scrollProgressBar = document.querySelector('.scroll-progress__bar');
  const scrollProgressIndicator = document.querySelector('.scroll-progress__indicator');

  if (scrollProgress && scrollProgressBar && scrollProgressIndicator) {
    let ticking = false;

    function updateScrollProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Calculate scroll percentage
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      // Update bar height (fills from bottom)
      scrollProgressBar.style.height = scrollPercentage + '%';

      // Update indicator position (moves from top to bottom)
      const indicatorPosition = (scrollPercentage / 100) * 110; // 110px = track height - indicator height
      scrollProgressIndicator.style.top = indicatorPosition + 'px';

      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    });

    // Initial update
    updateScrollProgress();
  }

  /* ============================================
     11. TESTIMONIAL CAROUSEL - Auto-rotating with manual controls
     ============================================ */
  const testimonialCarousel = document.querySelector('.testimonial-carousel');

  if (testimonialCarousel) {
    const slides = testimonialCarousel.querySelectorAll('.testimonial-slide');
    const dots = testimonialCarousel.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let autoRotateInterval;
    const rotationDelay = 6000; // 6 seconds per slide

    // Function to show a specific slide
    function showSlide(index) {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Add active class to target slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');

      currentSlide = index;
    }

    // Function to show next slide
    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    // Function to start auto-rotation
    function startAutoRotate() {
      autoRotateInterval = setInterval(nextSlide, rotationDelay);
    }

    // Function to stop auto-rotation
    function stopAutoRotate() {
      clearInterval(autoRotateInterval);
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoRotate();
        startAutoRotate(); // Restart rotation after manual change
      });
    });

    // Pause auto-rotation on hover, resume on mouse leave
    testimonialCarousel.addEventListener('mouseenter', stopAutoRotate);
    testimonialCarousel.addEventListener('mouseleave', startAutoRotate);

    // Start auto-rotation on page load
    startAutoRotate();
  }

  /* ============================================
     12. VALUE FLIP CARDS - ABOUT PAGE
     ============================================ */
  const valueFlipCards = document.querySelectorAll('.value-flip-card');

  if (valueFlipCards.length > 0) {
    valueFlipCards.forEach(card => {
      card.addEventListener('click', function() {
        // Toggle flip state
        this.classList.toggle('flipped');
      });

      // Add keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');

      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.classList.toggle('flipped');
        }
      });
    });

    console.log(`💳 ${valueFlipCards.length} value flip cards initialized`);
  }

  /* ============================================
     13. INITIALIZE EVERYTHING
     ============================================ */
  console.log('🎨 LT.Solutions - The Living Brand Experience initialized! 🚀');

});