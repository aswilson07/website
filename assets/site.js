(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const main = document.querySelector('main.page-content');

  if (!main || reduceMotion) return;

  document.documentElement.classList.add('js-enhanced');
  main.setAttribute('data-scroll-container', '');
  document.querySelectorAll('.elegant-title, .tag-button').forEach(el => {
    el.classList.add('animate__animated', 'animate__fadeIn');
  });

  let locoScroll = null;
  const canSmoothScroll = window.innerWidth >= 1024 && window.LocomotiveScroll;

  if (canSmoothScroll) {
    locoScroll = new LocomotiveScroll({
      el: main,
      smooth: true,
      lerp: 0.08,
      multiplier: 0.75,
      smartphone: { smooth: false },
      tablet: { smooth: false }
    });
  }

  if (window.gsap) {
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      if (locoScroll) {
        locoScroll.on('scroll', ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(main, {
          scrollTop(value) {
            return arguments.length
              ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
              : locoScroll.scroll.instance.scroll.y;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          pinType: main.style.transform ? 'transform' : 'fixed'
        });
        ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
      }
    }

    gsap.from('.site-sidebar', {
      opacity: 0,
      x: -12,
      duration: 0.7,
      ease: 'power2.out'
    });

    gsap.from('.elegant-title', {
      opacity: 0,
      y: 12,
      duration: 0.8,
      ease: 'power2.out'
    });

    gsap.from('.subtitle, .affiliations-line, .hero .muted, .profile-img', {
      opacity: 0,
      y: 10,
      duration: 0.7,
      stagger: 0.08,
      delay: 0.08,
      ease: 'power2.out'
    });

    gsap.utils.toArray('section, .publication, .person-card').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 18,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: window.ScrollTrigger ? {
          trigger: el,
          scroller: locoScroll ? main : window,
          start: 'top 88%',
          once: true
        } : undefined
      });
    });

    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
})();
