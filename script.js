/* =============================================
   YULONGFU — Interactive JavaScript
   Carousel, Testimonial Slider, Scroll Effects
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Header Scroll Effect ─────────────────────
  const header = document.getElementById('site-header');
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
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('open');
    if (mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px') {
      mobileMenu.style.maxHeight = '0px';
    } else {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('open');
      mobileMenu.style.maxHeight = '0px';
    });
  });

  // ─── Hero Carousel ───────────────────────────
  const heroSlides = document.querySelectorAll('#hero-carousel .carousel-slide');
  const heroDots = document.querySelectorAll('.carousel-dot');
  let currentHeroSlide = 0;
  let heroInterval;

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
      heroDots[i].classList.remove('active-dot');
    });
    heroSlides[index].classList.add('active');
    heroSlides[index].style.opacity = '1';
    heroDots[index].classList.add('active-dot');
    currentHeroSlide = index;
  }

  function nextHeroSlide() {
    const next = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(next);
  }

  function startHeroCarousel() {
    heroInterval = setInterval(nextHeroSlide, 4000);
  }

  function stopHeroCarousel() {
    clearInterval(heroInterval);
  }

  // Dot click navigation
  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopHeroCarousel();
      showHeroSlide(parseInt(dot.dataset.index));
      startHeroCarousel();
    });
  });

  startHeroCarousel();

  // ─── Testimonial Slider ──────────────────────
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const reviewDots = document.querySelectorAll('.review-dot');
  const prevReviewBtn = document.getElementById('prev-review');
  const nextReviewBtn = document.getElementById('next-review');
  let currentReview = 0;
  let reviewInterval;

  function showReview(index) {
    testimonialSlides.forEach((slide, i) => {
      slide.classList.remove('active');
      reviewDots[i].classList.remove('active');
    });
    testimonialSlides[index].classList.add('active');
    reviewDots[index].classList.add('active');
    currentReview = index;
  }

  function nextReview() {
    const next = (currentReview + 1) % testimonialSlides.length;
    showReview(next);
  }

  function prevReview() {
    const prev = (currentReview - 1 + testimonialSlides.length) % testimonialSlides.length;
    showReview(prev);
  }

  function startReviewSlider() {
    reviewInterval = setInterval(nextReview, 6000);
  }

  function stopReviewSlider() {
    clearInterval(reviewInterval);
  }

  nextReviewBtn.addEventListener('click', () => {
    stopReviewSlider();
    nextReview();
    startReviewSlider();
  });

  prevReviewBtn.addEventListener('click', () => {
    stopReviewSlider();
    prevReview();
    startReviewSlider();
  });

  reviewDots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopReviewSlider();
      showReview(parseInt(dot.dataset.index));
      startReviewSlider();
    });
  });

  startReviewSlider();

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
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ─── Reveal on Scroll ────────────────────────
  const revealElements = document.querySelectorAll('.menu-card, .reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ─── Stats Counter Animation ─────────────────
  const statElements = document.querySelectorAll('.font-serif.text-3xl');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text);

        if (!isNaN(num)) {
          let current = 0;
          const increment = Math.ceil(num / 30);
          const suffix = text.replace(num.toString(), '');

          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
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

  // ─── Parallax Effect for Hero ────────────────
  const hero = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
      const floatingCard = hero.querySelector('.animate-float');
      if (floatingCard) {
        floatingCard.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
    }
  }, { passive: true });

  // ─── Keyboard Navigation for Sliders ─────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      stopReviewSlider();
      prevReview();
      startReviewSlider();
    } else if (e.key === 'ArrowRight') {
      stopReviewSlider();
      nextReview();
      startReviewSlider();
    }
  });

  // ─── Touch Swipe for Testimonials ────────────
  let touchStartX = 0;
  let touchEndX = 0;

  const testimonialTrack = document.getElementById('testimonial-track');

  if (testimonialTrack) {
    testimonialTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        stopReviewSlider();
        if (diff > 0) {
          nextReview();
        } else {
          prevReview();
        }
        startReviewSlider();
      }
    }, { passive: true });
  }

});
