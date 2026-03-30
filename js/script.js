// Add handler functions at the top of your script.js

function handleERPClick(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('ERP button clicked!');
    setTimeout(function() {
        openModal('erp');
    }, 10);
}

function handleDataClick(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Data button clicked!');
    setTimeout(function() {
        openModal('data');
    }, 10);
}

function handleFinanceClick(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Finance button clicked!');
    setTimeout(function() {
        openModal('finance');
    }, 10);
}

function handleProductsClick(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Products button clicked!');
    setTimeout(function() {
        openModal('products');
    }, 10);
}

function handleNetsuiteClick(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('NetSuite button clicked!');
    setTimeout(function() {
        openModal('netsuite');
    }, 10);
}

function handleAIClick(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('AI button clicked!');
    setTimeout(function() {
        openModal('ai');
    }, 10);
}

// Also add this for extra safety
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.mobile-safe-btn');
    buttons.forEach(btn => {
        if (btn) {
            btn.style.pointerEvents = 'auto';
            btn.style.touchAction = 'manipulation';
        }
    });
});

// Service Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            serviceCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Enhanced Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('nav ul');
const body = document.body;

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    body.classList.remove('menu-open');
}

if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when navigation links are clicked
if (navMenu) {
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (navMenu && mobileToggle &&
        !navMenu.contains(event.target) &&
        !mobileToggle.contains(event.target)) {
        closeMobileMenu();
    }
});

// Trust Section Slideshow
class TrustSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.trust-slide');
        this.dots = document.querySelectorAll('.trust-dot');
        this.prevBtn = document.querySelector('.trust-prev');
        this.nextBtn = document.querySelector('.trust-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.previousSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        // Start auto-play
        this.startAutoPlay();
        // Pause on hover (carousel + side arrows)
        const slideshow = document.querySelector('.trust-slideshow');
        const carousel = document.querySelector('.trust-carousel');
        slideshow?.addEventListener('mouseenter', () => this.stopAutoPlay());
        slideshow?.addEventListener('mouseleave', () => this.startAutoPlay());
        carousel?.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel?.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goToSlide(index) {
        this.slides[this.currentSlide]?.classList.remove('active');
        this.dots[this.currentSlide]?.classList.remove('active');
        this.dots[this.currentSlide]?.setAttribute('aria-selected', 'false');
        this.currentSlide = index;
        this.slides[this.currentSlide]?.classList.add('active');
        this.dots[this.currentSlide]?.classList.add('active');
        this.dots[this.currentSlide]?.setAttribute('aria-selected', 'true');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Case Study Slideshow
class CaseStudySlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.case-slide');
        this.dots = document.querySelectorAll('.case-dot');
        this.prevBtn = document.querySelector('.case-prev');
        this.nextBtn = document.querySelector('.case-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.previousSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        // Start auto-play
        this.startAutoPlay();
        // Pause on hover
        const slideshow = document.querySelector('.case-study-slideshow');
        slideshow?.addEventListener('mouseenter', () => this.stopAutoPlay());
        slideshow?.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide]?.classList.remove('active');
        this.dots[this.currentSlide]?.classList.remove('active');
        // Update current slide
        this.currentSlide = index;
        // Add active class to new slide and dot
        this.slides[this.currentSlide]?.classList.add('active');
        this.dots[this.currentSlide]?.classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 7000);
    }

    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Initialize slideshows
document.addEventListener('DOMContentLoaded', function() {
    new TrustSlideshow();
    new CaseStudySlideshow();
});

// Modal functionality
const modal = document.getElementById('consultation-modal');
const consultationBtn = document.getElementById('consultation-btn');
const getStartedBtn = document.getElementById('get-started-btn');
const bottomConsultBtn = document.getElementById('bottom-consult-btn');
const erpConsultBtn = document.getElementById('erp-consult-btn');
const dataConsultBtn = document.getElementById('data-consult-btn');
const financeConsultBtn = document.getElementById('finance-consult-btn');
const productsConsultBtn = document.getElementById('products-consult-btn');
const netsuiteConsultBtn = document.getElementById('netsuite-consult-btn');
const aiConsultBtn = document.getElementById('ai-consult-btn');
const inventoryConsultBtn = document.getElementById('inventory-consult-btn');
const orderConsultBtn = document.getElementById('order-consult-btn');
const fulfillmentConsultBtn = document.getElementById('fulfillment-consult-btn');
const purchaseConsultBtn = document.getElementById('purchase-consult-btn');
const repricingConsultBtn = document.getElementById('repricing-consult-btn');
const warehouseConsultBtn = document.getElementById('warehouse-consult-btn');
const dropshippingConsultBtn = document.getElementById('dropshipping-consult-btn');
const closeModal = document.querySelector('.close-modal');
const closeConfirmation = document.getElementById('close-confirmation');
const bookingForm = document.getElementById('booking-form');
const confirmationMsg = document.getElementById('confirmation-message');

// Learn More button functionality
const learnMoreBtn = document.getElementById('learn-more-btn');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', function() {
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            window.scrollTo({
                top: servicesSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

function openModal(service = '') {
    if (service) {
        document.getElementById('service-select').value = service;
    }
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Hide all floating buttons when modal opens
    const buttons = document.querySelectorAll('.mobile-safe-btn');
    buttons.forEach(btn => {
        if (btn) {
            btn.style.display = 'none';
        }
    });
    // Focus management for accessibility
    modal.focus();
    // Scroll to top of modal on mobile
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.scrollTop = 0;
    }
}

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Show all buttons again when modal closes
    const buttons = document.querySelectorAll('.mobile-safe-btn');
    buttons.forEach(btn => {
        if (btn) {
            btn.style.display = 'flex';
        }
    });
    // Reset form when closing modal
    if (bookingForm) {
        bookingForm.reset();
    }
    // Hide confirmation message if visible
    if (confirmationMsg) {
        confirmationMsg.style.display = 'none';
    }
    // Show form again
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.style.display = 'block';
    }
}

// Event listeners for modal buttons
if (consultationBtn) consultationBtn.addEventListener('click', () => openModal());
if (getStartedBtn) getStartedBtn.addEventListener('click', () => openModal());
if (bottomConsultBtn) bottomConsultBtn.addEventListener('click', () => openModal());
if (erpConsultBtn) erpConsultBtn.addEventListener('click', () => openModal('erp'));
if (dataConsultBtn) dataConsultBtn.addEventListener('click', () => openModal('data'));
if (financeConsultBtn) financeConsultBtn.addEventListener('click', () => openModal('finance'));
if (productsConsultBtn) productsConsultBtn.addEventListener('click', () => openModal('products'));
if (netsuiteConsultBtn) netsuiteConsultBtn.addEventListener('click', () => openModal('netsuite'));
if (aiConsultBtn) aiConsultBtn.addEventListener('click', () => openModal('ai'));
if (inventoryConsultBtn) inventoryConsultBtn.addEventListener('click', () => openModal('inventory'));
if (orderConsultBtn) orderConsultBtn.addEventListener('click', () => openModal('order'));
if (fulfillmentConsultBtn) fulfillmentConsultBtn.addEventListener('click', () => openModal('fulfillment'));
if (purchaseConsultBtn) purchaseConsultBtn.addEventListener('click', () => openModal('purchase'));
if (repricingConsultBtn) repricingConsultBtn.addEventListener('click', () => openModal('repricing'));
if (warehouseConsultBtn) warehouseConsultBtn.addEventListener('click', () => openModal('warehouse'));
if (dropshippingConsultBtn) dropshippingConsultBtn.addEventListener('click', () => openModal('dropshipping'));
if (closeModal) closeModal.addEventListener('click', closeModalFunc);
if (closeConfirmation) closeConfirmation.addEventListener('click', closeModalFunc);

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeModalFunc();
    }
});

// Set minimum date for calendar
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.min = minDate;
}

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Smooth scrolling to service details
document.querySelectorAll('.learn-more').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        // Check if targetId is valid before using querySelector
        if (!targetId || targetId === '#' || targetId === '') {
            console.warn('Invalid or empty href for learn-more link:', targetId);
            return; // Skip if no valid target
        }
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Hide all service details
            document.querySelectorAll('.service-detail').forEach(detail => {
                detail.style.display = 'none';
            });
            // Show the target service detail
            targetElement.style.display = 'block';
            // Scroll to the service detail
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Back button functionality
document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Hide all service details
        document.querySelectorAll('.service-detail').forEach(detail => {
            detail.style.display = 'none';
        });
        // Scroll back to services section
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// FIXED: Enhanced smooth scrolling for all navigation including footer links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Validate href before using
        if (!href || href === '#' || href === '') {
            return; // Skip invalid hrefs
        }

        // Handle service detail links (like #erp-service, #data-service, etc.)
        if (href.includes('-service')) {
            e.preventDefault();
            // Hide all service details first
            document.querySelectorAll('.service-detail').forEach(detail => {
                detail.style.display = 'none';
            });
            // Show the target service detail
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.style.display = 'block';
                // Scroll to the service detail with offset for header
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
        // Handle regular section links (like #services, #why-choose-us, etc.)
        else {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        }
    });
});

// Form submission with email functionality
if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Booking...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            company: document.getElementById('company').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            services: document.getElementById('service-select').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            timezone: document.getElementById('timezone').value,
            message: document.getElementById('message').value
        };

        try {
            console.log('Sending data:', formData);
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            // DEBUG: Check what we actually got back
            console.log('Response status:', response.status);
            console.log('Response headers:', [...response.headers]);
            const responseText = await response.text();
            console.log('Raw response:', responseText);

            // Try to parse JSON
            let result;
            try {
                result = JSON.parse(responseText);
                console.log('Parsed JSON:', result);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                console.error('Response was not JSON:', responseText);
                throw new Error('Server returned non-JSON response: ' + responseText.substring(0, 100));
            }

            if (response.ok && result.success) {
                document.getElementById('consultation-form').style.display = 'none';
                confirmationMsg.style.display = 'block';
            } else {
                throw new Error(result.error || 'Failed to send');
            }
        } catch (error) {
            console.error('Full error:', error);
            alert('Error: ' + error.message);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Platform showcase tab switcher
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.ptab');
    const screens = document.querySelectorAll('.pscreen');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            screens.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            const target = document.getElementById(this.dataset.target);
            if (target) target.classList.add('active');
        });
    });

    // Wire platform CTA buttons to open the consultation modal
    ['platform-consult-btn', 'platform-login-btn', 'platform-ops-btn', 'services-consult-btn', 'support-consult-btn'].forEach(id => {
        const btn = document.getElementById(id);
        btn?.addEventListener('click', () => {
            const modal = document.getElementById('consultation-modal');
            if (modal) modal.style.display = 'flex';
        });
    });
});
