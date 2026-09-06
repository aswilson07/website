(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu functionality for responsive nav
  const createMobileMenu = () => {
    const nav = document.querySelector('.top-nav');
    if (!nav || document.querySelector('.mobile-menu-toggle')) return;

    const button = document.createElement('button');
    button.className = 'mobile-menu-toggle';
    button.setAttribute('aria-label', 'Toggle menu');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span></span><span></span><span></span>';

    const backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';

    document.body.appendChild(backdrop);
    document.body.appendChild(button);

    const navLinks = nav.querySelector('.nav-links');

    const closeMenu = () => {
      navLinks?.classList.remove('open');
      backdrop.classList.remove('active');
      button.classList.remove('active');
      button.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };

    const openMenu = () => {
      navLinks?.classList.add('open');
      backdrop.classList.add('active');
      button.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    };

    const toggleMenu = () => {
      if (navLinks?.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    button.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', closeMenu);

    // Close menu with smooth transition before navigation
    navLinks?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        // Only prevent default for same-domain links
        if (link.hostname === window.location.hostname) {
          closeMenu();
          // Small delay to allow menu animation to start
          setTimeout(() => {
            window.location.href = link.href;
          }, 50);
        }
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
        closeMenu();
      }
    });
  };

  createMobileMenu();

  // Animations (if not reduced motion)
  if (reduceMotion) return;

  document.documentElement.classList.add('js-enhanced');

  // Simple fade-in animations for key elements
  if (window.gsap) {
    // Animate hero content
    gsap.from('.hero-text h1, .page-hero h1', {
      opacity: 0,
      y: 12,
      duration: 0.8,
      ease: 'power2.out'
    });

    gsap.from('.hero-subtitle, .page-description, .hero-image, .affiliation-tags, .contact-info', {
      opacity: 0,
      y: 10,
      duration: 0.7,
      stagger: 0.08,
      delay: 0.08,
      ease: 'power2.out'
    });

    // Animate content sections
    gsap.utils.toArray('.content-section, .bio-section, .topic-section, .group-section, .person-card, .publication').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 18,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: window.ScrollTrigger ? {
          trigger: el,
          start: 'top 88%',
          once: true
        } : undefined
      });
    });

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    }
  }
})();
