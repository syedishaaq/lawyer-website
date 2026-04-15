/* =============================================
   JUSTICE & CO. — JavaScript
   Scroll animations, stat counters, FAQ, nav
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    const handleHeaderScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('nav-mobile');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
    });

    // Close mobile nav on link click
    navMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
        });
    });

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offset = header.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = () => {
        // About section
        const aboutImage = document.querySelector('.about-image-wrap');
        const aboutContent = document.querySelector('.about-content');
        if (aboutImage) { aboutImage.classList.add('fade-in-left'); fadeObserver.observe(aboutImage); }
        if (aboutContent) { aboutContent.classList.add('fade-in-right'); fadeObserver.observe(aboutContent); }

        // Practice area cards
        document.querySelectorAll('.practice-card').forEach((card, i) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${i * 0.1}s`;
            fadeObserver.observe(card);
        });

        // Stats
        document.querySelectorAll('.stat-item').forEach((stat, i) => {
            stat.classList.add('fade-in');
            stat.style.transitionDelay = `${i * 0.15}s`;
            fadeObserver.observe(stat);
        });

        // Team cards
        document.querySelectorAll('.team-card').forEach((card, i) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${i * 0.15}s`;
            fadeObserver.observe(card);
        });

        // Testimonial cards
        document.querySelectorAll('.testimonial-card').forEach((card, i) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${i * 0.15}s`;
            fadeObserver.observe(card);
        });

        // Contact
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form');
        if (contactInfo) { contactInfo.classList.add('fade-in-left'); fadeObserver.observe(contactInfo); }
        if (contactForm) { contactForm.classList.add('fade-in-right'); fadeObserver.observe(contactForm); }

        // FAQ items
        document.querySelectorAll('.faq-item').forEach((item, i) => {
            item.classList.add('fade-in');
            item.style.transitionDelay = `${i * 0.08}s`;
            fadeObserver.observe(item);
        });

        // Section headers
        document.querySelectorAll('.section-header').forEach(header => {
            header.classList.add('fade-in');
            fadeObserver.observe(header);
        });

        // Results text
        const resultsText = document.querySelector('.results-text');
        if (resultsText) { resultsText.classList.add('fade-in-left'); fadeObserver.observe(resultsText); }
    };

    animateElements();

    // ===== ANIMATED STAT COUNTERS =====
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let statsCounted = false;

    const countUp = (el) => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsCounted) {
                statsCounted = true;
                statNumbers.forEach(num => countUp(num));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const resultsSection = document.getElementById('results');
    if (resultsSection) statsObserver.observe(resultsSection);

    // ===== FAQ ACCORDION =====
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked if not already active
            if (!isActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ===== FORM HANDLING =====
    const form = document.getElementById('consultation-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('btn-submit');
            const originalText = submitBtn.textContent;
            
            // Visual feedback
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                submitBtn.textContent = '✓ Request Sent Successfully';
                submitBtn.style.background = '#2D8B4E';
                submitBtn.style.color = '#FFF';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    form.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ===== PARALLAX SUBTLE EFFECT ON HERO =====
    const heroBg = document.querySelector('.hero-bg-img');
    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `scale(${1.05 + scrolled * 0.0002}) translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    console.log('Justice & Co. — Landing Page Initialized');
});
