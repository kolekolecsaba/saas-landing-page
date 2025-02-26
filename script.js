/**
 * MailCommerce AI Landing Page JavaScript
 * Adds interactivity and dynamic behavior to the landing page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive components
    initMobileMenu();
    initStickyHeader();
    initFaqAccordion();
    initPricingToggle();
    initAnimations();
    initVideoPopup();
    initTemplateLibrary();

    // Initialize gradient backgrounds with correct colors and settings
    new Color4Bg.BlurGradientBg({
        dom: "#how-it-works-bg",
        colors: ["#f46f57","#ab2121","#e10e0e","#EB3131"],
        loop: true
    });

    new Color4Bg.BlurGradientBg({
        dom: "#cta-bg",
        colors: ["#801300","#AE1E00","#D92800","#EB3131"],
        loop: true
    });

    // Fix popup functionality
    const signupTriggers = document.querySelectorAll('.signup-trigger');
    const videoTriggers = document.querySelectorAll('.btn-outline');
    
    signupTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const popup = document.getElementById('signup-popup');
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    videoTriggers.forEach(trigger => {
        if (trigger.textContent.includes('Watch Demo')) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const popup = document.getElementById('video-popup');
                const iframe = popup.querySelector('iframe');
                iframe.setAttribute('src', 'https://www.youtube.com/embed/YRBn9DtWPQI?autoplay=1');
                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Initialize popup close functionality
    initPopups();

    // Add hero image rotation
    initHeroImageRotation();

    // Render templates
    renderTemplates();

    // Modify renderTemplates function
    function renderTemplates() {
        const templateGrid = document.querySelector('.template-grid');
        if (!templateGrid) return;
        
        templateGrid.innerHTML = window.templateData.map(template => `
            <div class="template-card" data-category="${template.category}" style="display: ${template.category === 'welcome' ? 'block' : 'none'}">
                <div class="template-preview">
                    <img src="/imgs/templates/${template.image}" alt="${template.title}">
                    <div class="template-overlay">
                        <button class="btn btn-primary preview-btn">Preview Template</button>
                    </div>
                </div>
                <div class="template-info">
                    <h3>${template.title}</h3>
                    <p>${template.description}</p>
                    <span class="template-tag">${template.category.charAt(0).toUpperCase() + template.category.slice(1)}</span>
                </div>
            </div>
        `).join('');

        // Set welcome button as active by default
        const welcomeButton = document.querySelector('.filter-btn[data-filter="welcome"]');
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (welcomeButton && allButton) {
            allButton.classList.remove('active');
            welcomeButton.classList.add('active');
        }
    }

    // Call renderTemplates after initialization
    renderTemplates();

    // Update filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const cards = document.querySelectorAll('.template-card');
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    initTemplatePreview();
});

// Keep only these necessary functions
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');
    const body = document.body;

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        // Toggle active class on hamburger
        hamburger.classList.toggle('active');
        
        // Create mobile menu container if it doesn't exist
        let mobileMenuContainer = document.querySelector('.mobile-menu-container');
        
        if (!mobileMenuContainer) {
            mobileMenuContainer = document.createElement('div');
            mobileMenuContainer.className = 'mobile-menu-container';
            
            // Clone navigation items
            const navMenuClone = navMenu.cloneNode(true);
            const navButtonsClone = navButtons.cloneNode(true);
            
            mobileMenuContainer.appendChild(navMenuClone);
            mobileMenuContainer.appendChild(navButtonsClone);
            
            // Append to body
            body.appendChild(mobileMenuContainer);
            
            // Add event listeners to mobile menu links
            const mobileLinks = mobileMenuContainer.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    mobileMenuContainer.classList.remove('active');
                    body.classList.remove('no-scroll');
                });
            });
        }
        
        // Toggle mobile menu visibility
        mobileMenuContainer.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        body.classList.toggle('no-scroll');
    });
}

function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-toggle i');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.display = 'block';
                icon.className = 'fas fa-minus';
            } else {
                answer.style.display = 'none';
                icon.className = 'fas fa-plus';
            }
        });
    });

    // Open the first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        faqItems[0].querySelector('.faq-answer').style.display = 'block';
        faqItems[0].querySelector('.faq-toggle i').className = 'fas fa-minus';
    }
}

function initPricingToggle() {
    const pricingToggle = document.getElementById('pricing-toggle');
    if (!pricingToggle) return;

    const monthlyPrices = [49, 99, 249]; // Starter, Professional, Enterprise
    const annualPrices = [39, 79, 199];  // Annual pricing (20% less)
    
    const priceElements = document.querySelectorAll('.pricing-card .amount');
    
    // Make sure toggle is checked (annual) by default
    pricingToggle.checked = true;
    
    pricingToggle.addEventListener('change', () => {
        const isAnnual = pricingToggle.checked;
        
        priceElements.forEach((element, index) => {
            const currentPrice = parseInt(element.textContent);
            const newPrice = isAnnual ? annualPrices[index] : monthlyPrices[index];
            
            // Animate price change
            animateValue(element, currentPrice, newPrice, 500);
        });
    });
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function initAnimations() {
    // Add fade-in animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    animateOnScroll(featureCards, 'fade-in-up');
    
    // Add fade-in animation to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    animateOnScroll(testimonialCards, 'fade-in-up');
    
    // Add fade-in animation to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    animateOnScroll(pricingCards, 'fade-in-up');
    
    // Add fade-in animation to steps
    const steps = document.querySelectorAll('.step');
    animateOnScroll(steps, 'fade-in-right');
}

function animateOnScroll(elements, animationClass) {
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.classList.add('animate');
        observer.observe(element);
    });
}

function initVideoPopup() {
    const demoButtons = document.querySelectorAll('a[href="#"].btn-outline');
    const popup = document.getElementById('video-popup');
    const iframe = popup.querySelector('iframe');
    const videoUrl = 'https://www.youtube.com/embed/YRBn9DtWPQI?autoplay=1';

    demoButtons.forEach(button => {
        if (button.textContent.includes('Watch Demo')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                iframe.setAttribute('src', videoUrl);
                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
}

function initPopups() {
    const popups = document.querySelectorAll('.video-popup, .signup-popup');
    
    popups.forEach(popup => {
        const closeBtn = popup.querySelector('.video-popup-close, .popup-close');
        
        // Close on button click
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closePopup(popup);
            });
        }

        // Close on background click
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup(popup);
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                closePopup(popup);
            }
        });
    });

    function closePopup(popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset iframe src if it's a video popup
        const iframe = popup.querySelector('iframe');
        if (iframe) {
            iframe.setAttribute('src', '');
        }
        
        // Reset form if it's a signup popup
        const form = popup.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

function initTemplateLibrary() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const templates = document.querySelectorAll('.template-card');
    const showAllBtn = document.querySelector('.show-all-templates');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.dataset.filter;

            templates.forEach(template => {
                if (filterValue === 'all' || template.dataset.category === filterValue) {
                    template.style.display = 'block';
                } else {
                    template.style.display = 'none';
                }
            });
        });
    });

    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            // Find and click the "All Templates" filter button
            const allButton = document.querySelector('.filter-btn[data-filter="all"]');
            if (allButton) {
                allButton.click();
            }
        });
    }
}

// Add this new function
function initHeroImageRotation() {
    const heroImages = document.querySelectorAll('.hero-img');
    if (heroImages.length === 0) return;

    let currentImageIndex = 0;
    
    function rotateImages() {
        // Remove active class from all images
        heroImages.forEach(img => img.classList.remove('active'));
        
        // Update index
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        
        // Add active class to next image
        heroImages[currentImageIndex].classList.add('active');
    }

    // Start rotation every 2 seconds
    setInterval(rotateImages, 2000);
}

// Add CSS for animations
(function addAnimationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Animation Base Class */
        .animate {
            opacity: 0;
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        /* Fade In Up Animation */
        .fade-in-up {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate:not(.fade-in-up) {
            transform: translateY(30px);
        }
        
        /* Fade In Right Animation */
        .fade-in-right {
            opacity: 1;
            transform: translateX(0);
        }
        
        .animate:not(.fade-in-right) {
            transform: translateX(-30px);
        }
        
        /* Mobile Menu Styles */
        .mobile-menu-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            z-index: 999;
            padding: 80px 20px 20px;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            overflow-y: auto;
        }
        
        .mobile-menu-container.active {
            transform: translateX(0);
        }
        
        .mobile-menu-container .nav-menu {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .mobile-menu-container .nav-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        body.no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(styleElement);
})();

function initTemplatePreview() {
    const templateCards = document.querySelectorAll('.template-card');
    const popup = document.querySelector('.template-preview-popup');
    const popupImage = popup.querySelector('img');
    const closeBtn = popup.querySelector('.template-preview-close');

    function openPreview(templateCard) {
        const templateImage = templateCard.querySelector('.template-preview img');
        popupImage.src = templateImage.src;
        popupImage.alt = templateImage.alt;
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Card click handler
    templateCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking a button
            if (e.target.closest('.preview-btn')) return;
            openPreview(card);
        });

        // Button click handler
        const previewBtn = card.querySelector('.preview-btn');
        if (previewBtn) {
            previewBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                openPreview(card);
            });
        }
    });

    // Close handlers
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on background click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
