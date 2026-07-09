// BioCellR8 LLC - Professional Website JavaScript
// Smooth interactions, mobile menu, form handling, and scroll animations

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    function handleScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });
        
        // Close menu when clicking a nav link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const offset = 80; // Account for fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const animateOnScroll = (elements, className = 'animate-in') => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });
        
        elements.forEach(el => observer.observe(el));
    };
    
    // Add animation to service cards, process steps, etc.
    const animatedElements = document.querySelectorAll('.service-card, .process-step, .case-card, .testimonial-card, .stat-card');
    animateOnScroll(animatedElements);
    
    // Add subtle entrance animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .process-step, .case-card, .testimonial-card, .stat-card {
            opacity: 0;
            transform: translateY(25px);
            transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .service-card.animate-in, .process-step.animate-in, .case-card.animate-in, 
        .testimonial-card.animate-in, .stat-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .process-step {
            transition-delay: calc(var(--delay, 0) * 80ms);
        }
    `;
    document.head.appendChild(style);
    
    // Stagger process step animations
    document.querySelectorAll('.process-step').forEach((step, index) => {
        step.style.setProperty('--delay', index);
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic client-side validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#EF4444';
                    
                    // Reset border on input
                    field.addEventListener('input', function onInput() {
                        field.style.borderColor = '';
                        field.removeEventListener('input', onInput);
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                // Scroll to first invalid field
                const firstInvalid = contactForm.querySelector('[required]');
                if (firstInvalid) firstInvalid.focus();
                return;
            }
            
            // Simulate form submission (production would use fetch or form service)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span style="display:inline-flex;align-items:center;gap:8px;">
                    Sending...
                    <span class="spinner" style="width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;"></span>
                </span>
            `;
            
            // Add spinner animation
            const spinnerStyle = document.createElement('style');
            spinnerStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
            document.head.appendChild(spinnerStyle);
            
            setTimeout(() => {
                // Success state
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Show success modal
                if (successModal) {
                    successModal.classList.remove('hidden');
                    successModal.style.display = 'flex';
                }
                
                // Optional: track submission (placeholder for analytics)
                console.log('%c[BioCellR8] Contact form submitted successfully (demo)', 'color:#64748B');
            }, 1450);
        });
    }
    
    // Close modal handlers
    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
            successModal.classList.add('hidden');
        });
        
        // Close on outside click
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
                successModal.classList.add('hidden');
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
                successModal.style.display = 'none';
                successModal.classList.add('hidden');
            }
        });
    }
    
    // Keyboard accessibility for hamburger
    if (hamburger) {
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
    }
    
    // Performance: Debounce scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 10);
    }, { passive: true });
    
    // Console branding (development only)
    console.log('%c[BioCellR8] Professional website initialized successfully. All systems operational.', 'color:#00D4FF; font-size:9px');
});