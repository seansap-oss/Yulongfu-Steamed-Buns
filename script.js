/* =============================================
   YULONGFU — Interactive JavaScript
   Carousel, Testimonial Slider, Scroll Effects
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Header Scroll Effect ─────────────────────
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ─── Mobile Menu Toggle ──────────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('-translate-x-full');
    mobileMenuBtn.classList.toggle('open');
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('-translate-x-full');
      mobileMenuBtn.classList.remove('open');
    });
  });

  // ─── Hero Carousel ───────────────────────────
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentHeroSlide = 0;
  let heroInterval;

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.remove('active');
      heroDots[i].classList.remove('bg-sand', 'opacity-100');
      heroDots[i].classList.add('bg-sand/30');
    });
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('bg-sand');
    heroDots[index].classList.remove('bg-sand/30');
    currentHeroSlide = index;
  }

  function nextHeroSlide() {
    const next = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(next);
  }

  function prevHeroSlide() {
    const prev = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(prev);
  }

  function startHeroCarousel() {
    heroInterval = setInterval(nextHeroSlide, 4000);
  }

  function stopHeroCarousel() {
    clearInterval(heroInterval);
  }

  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopHeroCarousel();
      showHeroSlide(parseInt(dot.dataset.dot));
      startHeroCarousel();
    });
  });

  showHeroSlide(0);
  startHeroCarousel();

  // ─── Testimonial Slider ──────────────────────
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialSlides = testimonialTrack ? testimonialTrack.children : [];
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    if (!testimonialTrack) return;
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    testimonialDots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('bg-vermilion');
        dot.classList.remove('bg-ink/20');
      } else {
        dot.classList.remove('bg-vermilion');
        dot.classList.add('bg-ink/20');
      }
    });
    currentTestimonial = index;
  }

  function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(next);
  }

  function prevTestimonial() {
    const prev = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
    showTestimonial(prev);
  }

  function startTestimonialSlider() {
    testimonialInterval = setInterval(nextTestimonial, 6000);
  }

  function stopTestimonialSlider() {
    clearInterval(testimonialInterval);
  }

  if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopTestimonialSlider();
      nextTestimonial();
      startTestimonialSlider();
    });

    prevBtn.addEventListener('click', () => {
      stopTestimonialSlider();
      prevTestimonial();
      startTestimonialSlider();
    });
  }

  testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopTestimonialSlider();
      showTestimonial(parseInt(dot.dataset.dot));
      startTestimonialSlider();
    });
  });

  showTestimonial(0);
  startTestimonialSlider();

  // ─── Active Nav Link on Scroll ───────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('text-vermilion');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('text-vermilion');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ─── Reveal on Scroll ────────────────────────
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-top, .menu-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Stats Counter Animation ─────────────────
  const statElements = document.querySelectorAll('.text-4xl.font-bold');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/(\d+)/);

        if (match) {
          const num = parseInt(match[1]);
          let current = 0;
          const increment = Math.ceil(num / 30);
          const prefix = text.substring(0, text.indexOf(match[1]));
          const suffix = text.substring(text.indexOf(match[1]) + match[1].length);

          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            el.textContent = prefix + current + suffix;
          }, 30);
        }

        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statElements.forEach(el => statObserver.observe(el));

  // ─── Smooth Scroll for Anchor Links ──────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
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

  // ─── Keyboard Navigation for Sliders ─────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      stopTestimonialSlider();
      prevTestimonial();
      startTestimonialSlider();
    } else if (e.key === 'ArrowRight') {
      stopTestimonialSlider();
      nextTestimonial();
      startTestimonialSlider();
    }
  });

  // ─── Touch Swipe for Testimonials ────────────
  let touchStartX = 0;
  let touchEndX = 0;

  if (testimonialTrack) {
    testimonialTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        stopTestimonialSlider();
        if (diff > 0) {
          nextTestimonial();
        } else {
          prevTestimonial();
        }
        startTestimonialSlider();
      }
    }, { passive: true });
  }

  // ─── Parallax Effect for Hero ────────────────
  const hero = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
      const floatingElements = hero.querySelectorAll('.hero-slide.active > div:first-child');
      floatingElements.forEach(el => {
        el.style.transform = `scale(1.05) translateY(${scrolled * 0.05}px)`;
      });
    }
  }, { passive: true });

});
