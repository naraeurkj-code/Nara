/**
 * Dynara Devina Jihanda – Personal Portfolio
 * Vanilla JavaScript Interactivity & Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // KPI Metrics Tracker
  // -------------------------------------------------------------------------
  const kpiMetrics = {
    cvDownloads: 0,
    projectModalViews: 0,
    contactSubmissions: 0,
    navigationClicks: 0
  };

  const trackInteraction = (type) => {
    if (kpiMetrics[type] !== undefined) {
      kpiMetrics[type]++;
      console.log(`[KPI Tracked] ${type}: ${kpiMetrics[type]}`);
      const counterEl = document.getElementById(`kpi-${type}`);
      if (counterEl) {
        counterEl.textContent = kpiMetrics[type];
      }
    }
  };

  // -------------------------------------------------------------------------
  // 1. Theme Management (Dark / Light Mode)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('dynara-portfolio-theme') || 'dark';

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('dynara-portfolio-theme', theme);
  };

  applyTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      trackInteraction('navigationClicks');
    });
  }

  // -------------------------------------------------------------------------
  // 2. Sticky Navbar Scrolled State
  // -------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // -------------------------------------------------------------------------
  // 3. Mobile Navigation Menu Toggle
  // -------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  const toggleMobileMenu = (isOpen) => {
    const shouldOpen = isOpen !== undefined ? isOpen : !mobileDrawer?.classList.contains('open');
    if (shouldOpen) {
      mobileDrawer?.classList.add('open');
      mobileMenuBtn?.classList.add('open');
      mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    } else {
      mobileDrawer?.classList.remove('open');
      mobileMenuBtn?.classList.remove('open');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    }
  };

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());

    // Close on navigation link click
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
        trackInteraction('navigationClicks');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. Smooth Scrolling & Active Section Highlighting
  // -------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.navbar .nav-link, .mobile-nav-drawer .nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Track navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackInteraction('navigationClicks');
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -50% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // -------------------------------------------------------------------------
  // 5. Back to Top Action
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      trackInteraction('navigationClicks');
    });
  }

  // -------------------------------------------------------------------------
  // 6. Animated Skill Progress Bars
  // -------------------------------------------------------------------------
  const progressBars = document.querySelectorAll('.progress-fill');
  let skillsAnimated = false;

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        progressBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) {
            bar.style.width = `${targetWidth}%`;
          }
        });
      }
    });
  }, { threshold: 0.25 });

  const skillsContainer = document.getElementById('about');
  if (skillsContainer) {
    skillsObserver.observe(skillsContainer);
  }

  // -------------------------------------------------------------------------
  // 7. Scroll-based Reveal Animations
  // -------------------------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealItems.forEach(item => revealObserver.observe(item));

  // -------------------------------------------------------------------------
  // 8. Projects Data & Modal Details
  // -------------------------------------------------------------------------
  const projectsData = {
    'portfolio': {
      title: 'Personal Portfolio Website',
      category: 'Front-End Development & Personal Branding',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Accessibility'],
      objective: 'To engineer a modern, responsive personal portfolio that establishes an authentic digital identity, showcases academic progression in Digital Business, and provides an intuitive experience for recruiters, faculty, and collaborators.',
      description: 'A comprehensive, single-page application built using pure semantic HTML5, modern CSS3 variables, and vanilla JavaScript. The architecture includes a dark purple tech visual identity, interactive dark/light theme switcher, animated competency metrics, project exploration modals, and accessible client-side form validation without external frameworks.',
      features: [
        'Pure Vanilla JS architecture without runtime framework overhead',
        'Custom Dark Purple Tech design system with smooth light mode toggle',
        'Responsive split-screen hero with interactive visual profile badge',
        'Accessible modal dialogs supporting keyboard navigation (ESC, focus trap)',
        'Client-side contact validation with real-time feedback and success notification',
        'WCAG AA compliant color contrast and semantic landmark structuring'
      ]
    },
    'dashboard': {
      title: 'Business Data Dashboard',
      category: 'Data Visualization & Business Analytics',
      technologies: ['Data Visualization', 'UI Design', 'Business Analytics', 'Metrics Modeling'],
      objective: 'To organize and present critical business performance indicators in a unified, visually structured interface that enables managers and analysts to make data-driven strategic decisions rapidly.',
      description: 'A conceptual executive dashboard interface focused on key business health metrics including customer acquisition trends, quarterly revenue pacing, conversion channel efficiency, and customer lifetime value (LTV). Designed with high-density visual hierarchy and clear cognitive chunking.',
      features: [
        'Intuitive KPI summary cards featuring growth indicators and variance tracking',
        'Revenue distribution breakdown across enterprise, mid-market, and direct channels',
        'Cohort retention and engagement timeline representation',
        'Clean tabular view with responsive layout adaptation for mobile decision-makers',
        'Designed specifically around practical digital business analysis workflows'
      ]
    },
    'landing': {
      title: 'Business Landing Page',
      category: 'Digital Marketing & Conversion Architecture',
      technologies: ['HTML5', 'CSS3', 'Responsive Design', 'Copywriting', 'UX Strategy'],
      objective: 'To conceptualize and design a high-converting digital product landing page that communicates a compelling business value proposition and guides prospective customers seamlessly through the adoption funnel.',
      description: 'An interactive modern landing page concept engineered for an emerging digital solutions venture. Incorporates persuasive typography, benefits-focused card grids, social proof integration, clear pricing tiers, and conversion-optimized call-to-action sections.',
      features: [
        'Clear, benefit-oriented value proposition headline and sub-copy structure',
        'Strategic placement of primary and secondary CTAs to optimize conversion rates',
        'Three-tier product comparison matrix with recommended tier highlighting',
        'Responsive layout adapting smoothly from ultra-wide displays to mobile viewports',
        'Speed-optimized markup ensuring immediate first-contentful paint'
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('modal-project-title');
  const projectModalDesc = document.getElementById('modal-project-desc');
  const projectModalObjective = document.getElementById('modal-project-objective');
  const projectModalTags = document.getElementById('modal-project-tags');
  const projectModalFeatures = document.getElementById('modal-project-features');
  const closeProjectModalBtn = document.getElementById('close-project-modal');

  const openProjectModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    trackInteraction('projectModalViews');

    if (projectModalTitle) projectModalTitle.textContent = data.title;
    if (projectModalDesc) projectModalDesc.textContent = data.description;
    if (projectModalObjective) projectModalObjective.textContent = data.objective;

    if (projectModalTags) {
      projectModalTags.innerHTML = '';
      data.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = tech;
        projectModalTags.appendChild(tag);
      });
    }

    if (projectModalFeatures) {
      projectModalFeatures.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat;
        projectModalFeatures.appendChild(li);
      });
    }

    projectModal?.classList.add('open');
    projectModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeProjectModalBtn?.focus();
  };

  const closeProjectModal = () => {
    projectModal?.classList.remove('open');
    projectModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.btn-view-project').forEach(button => {
    button.addEventListener('click', (e) => {
      const projectId = e.currentTarget.getAttribute('data-project');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  closeProjectModalBtn?.addEventListener('click', closeProjectModal);

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // -------------------------------------------------------------------------
  // 9. CV Download Modal & Action
  // -------------------------------------------------------------------------
  const cvModal = document.getElementById('cv-modal');
  const closeCvModalBtn = document.getElementById('close-cv-modal');
  const downloadCvPdfBtn = document.getElementById('btn-download-pdf-action');

  const openCvModal = () => {
    trackInteraction('cvDownloads');
    cvModal?.classList.add('open');
    cvModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeCvModalBtn?.focus();
  };

  const closeCvModal = () => {
    cvModal?.classList.remove('open');
    cvModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.btn-download-cv').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCvModal();
    });
  });

  closeCvModalBtn?.addEventListener('click', closeCvModal);
  cvModal?.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      closeCvModal();
    }
  });

  downloadCvPdfBtn?.addEventListener('click', () => {
    window.print();
  });

  // -------------------------------------------------------------------------
  // 10. Contact Form Validation & Success Modal
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const successModal = document.getElementById('success-modal');
  const closeSuccessModalBtn = document.getElementById('close-success-modal');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const scopeInput = document.getElementById('scope');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const scopeError = document.getElementById('scope-error');
  const messageError = document.getElementById('message-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (input, errorEl, condition, errorMsg) => {
    if (!condition) {
      input.classList.add('error');
      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.classList.add('visible');
      }
      return false;
    } else {
      input.classList.remove('error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
      return true;
    }
  };

  // Real-time input cleanup on type
  [nameInput, emailInput, scopeInput, messageInput].forEach(field => {
    field?.addEventListener('input', () => {
      field.classList.remove('error');
      const errEl = document.getElementById(`${field.id}-error`);
      if (errEl) errEl.classList.remove('visible');
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const scopeVal = scopeInput ? scopeInput.value : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      const isNameValid = validateField(
        nameInput,
        nameError,
        nameVal.length >= 2,
        'Please enter your full name (at least 2 characters).'
      );

      const isEmailValid = validateField(
        emailInput,
        emailError,
        emailRegex.test(emailVal),
        'Please provide a valid email address (e.g., name@domain.com).'
      );

      const isScopeValid = validateField(
        scopeInput,
        scopeError,
        scopeVal !== '',
        'Please select an intended project scope.'
      );

      const isMessageValid = validateField(
        messageInput,
        messageError,
        messageVal.length >= 10,
        'Please include a brief message (at least 10 characters).'
      );

      if (isNameValid && isEmailValid && isScopeValid && isMessageValid) {
        // Track KPI
        trackInteraction('contactSubmissions');

        // Reset form
        contactForm.reset();

        // Show custom success modal
        successModal?.classList.add('open');
        successModal?.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeSuccessModalBtn?.focus();
      }
    });
  }

  const closeSuccessModal = () => {
    successModal?.classList.remove('open');
    successModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeSuccessModalBtn?.addEventListener('click', closeSuccessModal);
  successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) {
      closeSuccessModal();
    }
  });

  // -------------------------------------------------------------------------
  // 11. Global Keyboard Listener (Escape key closes modals & drawer)
  // -------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal?.classList.contains('open')) closeProjectModal();
      if (cvModal?.classList.contains('open')) closeCvModal();
      if (successModal?.classList.contains('open')) closeSuccessModal();
      if (mobileDrawer?.classList.contains('open')) toggleMobileMenu(false);
    }
  });
});
