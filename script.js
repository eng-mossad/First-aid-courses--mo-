// Enhanced First Aid Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav__links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('service__grid') || 
                    entry.target.classList.contains('doctors__grid') ||
                    entry.target.classList.contains('payment__grid')) {
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animation = `fadeInUp 0.6s ease-out forwards`;
                            item.style.animationDelay = `${index * 0.1}s`;
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service__container, .about__container, .why__container, .doctors__container, .payment__container').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Floating buttons animation
    const floatingButtons = document.querySelectorAll('.floating-btn');
    floatingButtons.forEach((btn, index) => {
        btn.style.animationDelay = `${index * 0.5}s`;
        
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Service cards hover effect
    document.querySelectorAll('.service__card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Doctors cards 3D effect
    document.querySelectorAll('.doctors__card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Typing effect for main heading
    const mainHeading = document.querySelector('.header__container h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        mainHeading.style.borderRight = '3px solid #fb923c';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    mainHeading.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Add statistics section if needed
    const statsSection = document.createElement('section');
    statsSection.className = 'section__container stats__container';
    statsSection.innerHTML = `
        <h2 class="section__header">إحصائيات النجاح</h2>
        <div class="stats__grid">
            <div class="stats__card">
                <div class="stats__number" data-target="500">0</div>
                <h4>متدرب تخرج</h4>
            </div>
            <div class="stats__card">
                <div class="stats__number" data-target="50">0</div>
                <h4>دورة تدريبية</h4>
            </div>
            <div class="stats__card">
                <div class="stats__number" data-target="95">0</div>
                <h4>نسبة النجاح %</h4>
            </div>
            <div class="stats__card">
                <div class="stats__number" data-target="5">0</div>
                <h4>سنوات خبرة</h4>
            </div>
        </div>
    `;

    // Insert stats section after about section
    const aboutSection = document.querySelector('#about').parentElement;
    if (aboutSection && aboutSection.nextElementSibling) {
        aboutSection.parentNode.insertBefore(statsSection, aboutSection.nextElementSibling);
    }

    // Animate counters when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stats__number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Particle effect for header
    function createParticles() {
        const header = document.querySelector('header');
        if (!header) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            header.appendChild(particle);
        }
    }

    createParticles();

    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #12ac8e, #fb923c);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Add loading animation
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="medical-cross">
                <div class="cross-horizontal"></div>
                <div class="cross-vertical"></div>
            </div>
            <h3>جاري التحميل...</h3>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #12ac8e, #0d846c);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1
;
        transition: opacity 0.1s ease;
    `;

    document.body.appendChild(loader);

    // Hide loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 50);
        }, 10);
    });

    // Add CSS for new elements
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .stats__container {
            background: linear-gradient(135deg, #12ac8e, #0d846c);
            color: white;
            text-align: center;
        }

        .stats__grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .stats__card {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease;
        }

        .stats__card:hover {
            transform: translateY(-10px) scale(1.05);
        }

        .stats__number {
            font-size: 3rem;
            font-weight: 800;
            color: #fb923c;
            margin-bottom: 0.5rem;
            display: block;
        }

        .stats__card h4 {
            font-size: 1.2rem;
            font-weight: 600;
            color: white;
        }

        .loader-content {
            text-align: center;
            color: white;
        }

        .medical-cross {
            width: 60px;
            height: 60px;
            position: relative;
            margin: 0 auto 1rem;
            animation: spin 2s linear infinite;
        }

        .cross-horizontal,
        .cross-vertical {
            position: absolute;
            background: #fb923c;
            border-radius: 4px;
        }

        .cross-horizontal {
            width: 60px;
            height: 12px;
            top: 24px;
            left: 0;
        }

        .cross-vertical {
            width: 12px;
            height: 60px;
            top: 0;
            left: 24px;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .particle {
            animation: float 3s ease-in-out infinite !important;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.7;
            }
            50% {
                transform: translateY(-10px) translateX(-10px);
                opacity: 1;
            }
            75% {
                transform: translateY(-30px) translateX(5px);
                opacity: 0.5;
            }
        }

        .animate-in {
            animation: fadeInUp 1s ease-out forwards;
        }

        @media (max-width: 768px) {
            .stats__grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }
            
            .stats__card {
                padding: 1.5rem;
            }
            
            .stats__number {
                font-size: 2rem;
            }
        }
    `;
    document.head.appendChild(additionalStyles);

    // Add smooth reveal animation for sections
    const revealElements = document.querySelectorAll('.service__card, .doctors__card, .payment__card');
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Add interactive hover effects for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(251, 146, 60, 0.5)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(251, 146, 60, 0.3)';
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn, .service__btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    console.log('Enhanced First Aid Website loaded successfully! 🏥✨');
});

// Add custom cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(251, 146, 60, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
});

// Add hover effect for interactive elements
document.addEventListener('mouseenter', (e) => {
    if (e.target.matches('a, button, .btn, .service__card, .doctors__card')) {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(18, 172, 142, 0.7)';
        }
    }
}, true);

document.addEventListener('mouseleave', (e) => {
    if (e.target.matches('a, button, .btn, .service__card, .doctors__card')) {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(251, 146, 60, 0.5)';
        }
    }
}, true);

