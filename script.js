// Testimonials Slider Class
class TestimonialsSlider {
    constructor() {
        this.currentIndex = 0;
        this.slides = document.querySelectorAll('.testimonial-item');
        this.dots = document.querySelectorAll('.dot');
        this.track = document.querySelector('.testimonials-track');
        this.autoSlideInterval = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) {
            console.warn('No testimonial slides found');
            return;
        }
        
        console.log(`Slider initialized with ${this.slides.length} slides`);
        this.startAutoSlide();
        this.addEventListeners();
        this.updateSlider(); // Initialize first slide
    }
    
    startAutoSlide() {
        // Clear any existing interval
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlider();
        
        // Reset animation flag after transition completes
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.isAnimating = true;
        this.currentIndex = index;
        this.updateSlider();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    
    updateSlider() {
        // Calculate the translation amount (25% per slide for 4 slides)
        const translateX = -(this.currentIndex * 25);
        
        // Update track position
        if (this.track) {
            this.track.style.transform = `translateX(${translateX}%)`;
        }
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update slides with active class
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });
        
        console.log(`Slide changed to index: ${this.currentIndex}`);
    }
    
    addEventListeners() {
        // Navigation arrows
        const nextBtn = document.querySelector('.testimonial-next');
        const prevBtn = document.querySelector('.testimonial-prev');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoSlide();
            });
        } else {
            console.warn('Next button not found');
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoSlide();
            });
        } else {
            console.warn('Previous button not found');
        }
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });
        
        // Pause on hover
        if (this.track) {
            this.track.addEventListener('mouseenter', () => {
                console.log('Slider paused on hover');
                clearInterval(this.autoSlideInterval);
            });
            
            this.track.addEventListener('mouseleave', () => {
                console.log('Slider resumed');
                this.startAutoSlide();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetAutoSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoSlide();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
    
    handleResize() {
        // Recalculate and update slider position on resize
        this.updateSlider();
    }
    
    // Public method to manually go to a specific slide
    goTo(index) {
        if (index >= 0 && index < this.slides.length) {
            this.goToSlide(index);
        }
    }
    
    // Public method to get current slide index
    getCurrentSlide() {
        return this.currentIndex;
    }
    
    // Public method to get total number of slides
    getTotalSlides() {
        return this.slides.length;
    }
}

// Initialize slider when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if testimonials section exists on the page
    const testimonialsSection = document.querySelector('.testimonials-section');
    
    if (testimonialsSection) {
        console.log('Testimonials section found, initializing slider...');
        
        // Small delay to ensure all elements are rendered
        setTimeout(() => {
            const slider = new TestimonialsSlider();
            
            // Make slider globally accessible for debugging
            window.testimonialsSlider = slider;
            
            console.log('Testimonials slider initialized successfully!');
        }, 100);
    } else {
        console.log('No testimonials section found on this page');
    }
});

// Alternative initialization for pages that load content dynamically
function initializeTestimonialsSlider() {
    const testimonialsSection = document.querySelector('.testimonials-section');
    
    if (testimonialsSection && !window.testimonialsSlider) {
        window.testimonialsSlider = new TestimonialsSlider();
        return true;
    }
    return false;
}

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialsSlider;
}

