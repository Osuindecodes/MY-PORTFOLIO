// Theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        const body = document.body;
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        // Check for saved theme or prefered scheme
        const currentTheme = localStorage.getItem('theme') || 
                           (prefersDarkScheme.matches ? 'dark' : 'light');
        
        // Set the initial theme
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            if (mobileThemeToggle) {
                mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Theme';
            }
        }

        // Toggle theme function
        function toggleTheme() {
            const currentTheme = body.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                body.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                if (mobileThemeToggle) {
                    mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i> Toggle Theme';
                }
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                if (mobileThemeToggle) {
                    mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Theme';
                }
                localStorage.setItem('theme', 'dark');
            }
            
            // Add rotation animation
            themeToggle.classList.add('rotate');
            setTimeout(() => {
                themeToggle.classList.remove('rotate');
            }, 1000);
        }

        // Event listeners for theme toggle
        themeToggle.addEventListener('click', toggleTheme);
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', toggleTheme);
        }

        // Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

        function toggleMobileMenu() {
            mobileMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        menuOverlay.addEventListener('click', closeMobileMenu);

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Header scroll effect
        const header = document.getElementById('header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Testimonials slider
        const testimonialsTrack = document.getElementById('testimonialsTrack');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        let currentTestimonial = 0;
        const testimonialCount = document.querySelectorAll('.testimonial-card').length;

        function showTestimonial(index) {
            testimonialsTrack.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active dot
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            testimonialDots[index].classList.add('active');
            
            currentTestimonial = index;
        }

        // Initialize dots click events
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showTestimonial(index);
            });
        });

        // Auto-rotate testimonials
        let testimonialInterval = setInterval(() => {
            let nextTestimonial = (currentTestimonial + 1) % testimonialCount;
            showTestimonial(nextTestimonial);
        }, 5000);

        // Pause auto-rotation on hover
        testimonialsTrack.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialsTrack.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                let nextTestimonial = (currentTestimonial + 1) % testimonialCount;
                showTestimonial(nextTestimonial);
            }, 5000);
        });

        // Scroll animations
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }

        function handleScrollAnimations() {
            const animatedElements = document.querySelectorAll('.hero-content, .hero-image, .skill-card, .project-card, .testimonial-card, .about-text, .about-image, .contact-item, .contact-form');

            animatedElements.forEach(el => {
                if (isElementInViewport(el)) {
                    const delay = el.getAttribute('data-delay') || 0;

                    setTimeout(() => {
                        if (el.classList.contains('hero-content') || el.classList.contains('about-text')) {
                            el.style.animation = 'slideInLeft 0.8s ease forwards';
                        } else if (el.classList.contains('hero-image') || el.classList.contains('about-image')) {
                            el.style.animation = 'slideInRight 0.8s ease forwards';
                        } else if (el.classList.contains('contact-item')) {
                            el.style.animation = 'fadeIn 0.8s ease forwards';
                        } else {
                            el.style.animation = 'fadeIn 0.8s ease forwards';
                        }

                        el.style.opacity = '1';
                        el.style.transform = 'translate(0)';
                    }, parseInt(delay));
                }
            });
        }

        // Initialize animations on page load
        window.addEventListener('load', () => {
            // Animate hero section immediately
            document.getElementById('heroContent').style.animation = 'slideInLeft 0.8s ease forwards';
            document.getElementById('heroContent').style.opacity = '1';
            document.getElementById('heroContent').style.transform = 'translateX(0)';

            document.getElementById('heroImage').style.animation = 'slideInRight 0.8s ease forwards';
            document.getElementById('heroImage').style.opacity = '1';
            document.getElementById('heroImage').style.transform = 'translateX(0)';

            // Then check for other elements on scroll
            window.addEventListener('scroll', handleScrollAnimations);
            handleScrollAnimations(); // Check on initial load
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });