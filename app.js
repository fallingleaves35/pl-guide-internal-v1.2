// TDH Presentation JavaScript with Tennessee State Government Branding
class PresentationController {
    constructor() {
        this.currentSlideIndex = 0;
        this.totalSlides = 8;
        this.slides = document.querySelectorAll('.slide');
        this.currentSlideElement = document.getElementById('currentSlide');
        this.totalSlidesElement = document.getElementById('totalSlides');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.init();
    }

    init() {
        // Set total slides
        this.totalSlidesElement.textContent = this.totalSlides;
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Initialize first slide
        this.updateSlide();
                
        // Add accessibility features
        this.initAccessibilityFeatures();
    }

    nextSlide() {
        if (this.currentSlideIndex < this.totalSlides - 1) {
            this.currentSlideIndex++;
            this.updateSlide();
        }
    }

    previousSlide() {
        if (this.currentSlideIndex > 0) {
            this.currentSlideIndex--;
            this.updateSlide();
        }
    }

    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlideIndex = index;
            this.updateSlide();
        }
    }

    updateSlide() {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Show current slide
        const currentSlide = document.getElementById(`slide-${this.currentSlideIndex + 1}`);
        if (currentSlide) {
            currentSlide.classList.add('active');
        }

        // Update slide counter
        this.currentSlideElement.textContent = this.currentSlideIndex + 1;

        // Update navigation buttons
        this.updateNavigationButtons();

        // Scroll to top of slide
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Track progress
        this.trackProgress();
        // ──  TOC visibility fallback  ──
const toc = document.querySelector('.toc');
if (toc) {
  toc.hidden = this.currentSlideIndex !== 0;   // MDN recommends .hidden for simple show/hide :contentReference[oaicite:1]{index=1}
}


        // Re-initialize CTA buttons if we're on the last slide
        if (this.currentSlideIndex === this.totalSlides - 1) {
            setTimeout(() => this.initCTAButtons(), 50);
        }
    }

    updateNavigationButtons() {
        // Enable/disable previous button
        if (this.currentSlideIndex === 0) {
            this.prevBtn.disabled = true;
            this.prevBtn.classList.add('btn--disabled');
        } else {
            this.prevBtn.disabled = false;
            this.prevBtn.classList.remove('btn--disabled');
        }

        // Enable/disable next button
        if (this.currentSlideIndex === this.totalSlides - 1) {
            this.nextBtn.disabled = true;
            this.nextBtn.classList.add('btn--disabled');
        } else {
            this.nextBtn.disabled = false;
            this.nextBtn.classList.remove('btn--disabled');
        }

        // Update button text for last slide
        if (this.currentSlideIndex === this.totalSlides - 1) {
            this.nextBtn.textContent = 'Complete';
        } else {
            this.nextBtn.textContent = 'Next →';
        }
    }

    handleKeydown(event) {
        switch(event.key) {
            case 'ArrowRight':
            case ' ': // Spacebar
                event.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.previousSlide();
                break;
            case 'Home':
                event.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                event.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
            case 'Escape':
                event.preventDefault();
                this.showSlideOverview();
                break;
        }
    }

    initCTAButtons() {
        // Remove any existing listeners to prevent duplicates
        const ctaButtons = document.querySelectorAll('.cta-buttons [data-action]');   // only elements that still carry the data-action attribute

ctaButtons.forEach(button => {

            // Clone button to remove all existing event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        });

        // Add fresh event listeners to the new buttons
        const newCtaButtons = document.querySelectorAll('.cta-buttons .btn');
        newCtaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const action = button.getAttribute('data-action');
                console.log('CTA button clicked:', action); // Debug log
                this.handleCTAAction(action);
            });
        });

        console.log(`Initialized ${newCtaButtons.length} CTA buttons`); // Debug log
    }

    handleCTAAction(action) {
        console.log('Handling CTA action:', action); // Debug log
        
        switch(action) {
            case 'login':
                this.showNotification(
                    'Login to Asana',
                    'Visit asana.com and use your @tn.gov email address to access your Tennessee Department of Health strategic plan projects. Look for projects labeled with TDH strategic plan goals.',
                    'primary'
                );
                break;
            case 'schedule':
                this.showNotification(
                    'Schedule Training',
                    'Contact the TDH Asana Admin team to schedule training: Jason Howes (Director of Business Intelligence) or Nathan Johnston (Innovation and Systems Manager).',
                    'secondary'
                );
                break;
            case 'contact':
                this.showNotification(
                    'Contact Support',
                    'Technical Support: Jason Howes & Nathan Johnston (Asana Admin Team) - Response: 1-2 business days. Strategic Plan Questions: Olivia Hall - Response: Same day for urgent items.',
                    'info'
                );
                break;
            default:
                this.showNotification(
                    'Tennessee Department of Health',
                    'For additional support with your strategic plan projects, contact Jason Howes, Olivia Hall, or Nathan Johnston.',
                    'info'
                );
        }
    }

    showNotification(title, message, type = 'info') {
        // Remove any existing notifications first
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create a professional notification
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const typeColors = {
            primary: '#D22730',
            secondary: '#002D72',
            info: '#7F7F7F'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <h4>${title}</h4>
                    <button class="notification-close" aria-label="Close notification">×</button>
                </div>
                <p>${message}</p>
                <div class="notification-footer">
                    <small>Office of Strategic Initiatives | Office of Quality and Performance Management</small>
                </div>
            </div>
        `;
        
        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border: 2px solid ${typeColors[type]};
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            max-width: 450px;
            min-width: 350px;
            animation: slideInNotification 0.3s ease-out;
        `;

        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            padding: 20px;
        `;

        const notificationHeader = notification.querySelector('.notification-header');
        notificationHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        `;

        const notificationTitle = notification.querySelector('h4');
        notificationTitle.style.cssText = `
            margin: 0;
            color: ${typeColors[type]};
            font-family: 'Bitter', Georgia, serif;
            font-size: 16px;
            font-weight: 600;
        `;

        const notificationClose = notification.querySelector('.notification-close');
        notificationClose.style.cssText = `
            background: none;
            border: none;
            font-size: 24px;
            color: ${typeColors[type]};
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        `;

        // Add close button functionality
        notificationClose.addEventListener('click', () => {
            notification.remove();
        });

        notificationClose.addEventListener('mouseenter', () => {
            notificationClose.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });

        notificationClose.addEventListener('mouseleave', () => {
            notificationClose.style.backgroundColor = 'transparent';
        });

        const notificationText = notificationContent.querySelector('p');
        notificationText.style.cssText = `
            margin: 0 0 12px 0;
            font-size: 14px;
            line-height: 1.5;
            color: #333;
            font-family: 'Open Sans', Arial, sans-serif;
        `;

        const notificationFooter = notification.querySelector('.notification-footer');
        notificationFooter.style.cssText = `
            border-top: 1px solid #e0e0e0;
            padding-top: 8px;
            margin-top: 8px;
        `;

        notificationFooter.querySelector('small').style.cssText = `
            color: #7F7F7F;
            font-size: 11px;
            font-style: italic;
        `;

        document.body.appendChild(notification);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutNotification 0.3s ease-in forwards';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 10000);
    }

    showSlideOverview() {
        const currentSlideNum = this.currentSlideIndex + 1;
        const slideNames = [
            'Title & Overview',
            'Your Role as Project Lead',
            'Step 1: Access Your Tasks',
            'Step 2: Create & Update Tasks',
            'Step 3: Use Comments',
            'Step 4: Track Progress',
            'Step 5: Access Support',
            'Key Takeaways'
        ];
        
        this.showNotification(
            'Navigation Guide',
            `Currently on slide ${currentSlideNum}: "${slideNames[this.currentSlideIndex]}" (${Math.round((currentSlideNum / this.totalSlides) * 100)}% complete). Use arrow keys, spacebar, or navigation buttons to move between slides. Press Home/End for first/last slide.`,
            'info'
        );
    }

    trackProgress() {
        const progress = ((this.currentSlideIndex + 1) / this.totalSlides) * 100;
        
        // Create or update progress bar if it exists
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${progress}%;
                height: 4px;
                background: linear-gradient(90deg, #D22730 0%, #002D72 100%);
                z-index: 1000;
                transition: width 0.3s ease;
                box-shadow: 0 2px 4px rgba(210, 39, 48, 0.3);
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = `${progress}%`;
        }
    }

    initAccessibilityFeatures() {
        // Add ARIA labels and roles for better accessibility
        this.slides.forEach((slide, index) => {
            slide.setAttribute('role', 'tabpanel');
            slide.setAttribute('aria-labelledby', `slide-${index + 1}-heading`);
            slide.setAttribute('aria-hidden', index !== this.currentSlideIndex);
            
            const heading = slide.querySelector('h1');
            if (heading) {
                heading.id = `slide-${index + 1}-heading`;
            }
        });

        // Add navigation landmarks
        const navControls = document.querySelector('.navigation-controls');
        if (navControls) {
            navControls.setAttribute('role', 'navigation');
            navControls.setAttribute('aria-label', 'Slide navigation');
        }

        // Update ARIA attributes when slides change
        const originalUpdateSlide = this.updateSlide;
        this.updateSlide = () => {
            originalUpdateSlide.call(this);
            this.slides.forEach((slide, index) => {
                slide.setAttribute('aria-hidden', index !== this.currentSlideIndex);
            });
        };
    }
}

// Additional utility functions for enhanced presentation features
class PresentationUtils {
    static addSlideTransitions() {
        // Add CSS for slide transitions if not already present
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInNotification {
                from {
                    opacity: 0;
                    transform: translateX(100%) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
            }
            
            @keyframes slideOutNotification {
                from {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%) scale(0.9);
                }
            }
            
            .btn--disabled {
                opacity: 0.5 !important;
                cursor: not-allowed !important;
            }
            
            .btn--disabled:hover {
                background: inherit !important;
                transform: none !important;
                border-color: inherit !important;
                color: inherit !important;
            }

            .notification {
                font-family: 'Open Sans', Arial, sans-serif;
            }

            .cta-buttons .btn {
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .cta-buttons .btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }

            .cta-buttons .btn:active {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    static initPrintSupport() {
        // Add print-specific functionality
        window.addEventListener('beforeprint', () => {
            // Show all slides for printing
            const slides = document.querySelectorAll('.slide');
            slides.forEach(slide => {
                slide.style.display = 'block';
                slide.style.pageBreakAfter = 'always';
            });
        });

        window.addEventListener('afterprint', () => {
            // Restore normal slide display
            const slides = document.querySelectorAll('.slide');
            slides.forEach((slide, index) => {
                if (index === presentation.currentSlideIndex) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
                slide.style.pageBreakAfter = 'auto';
            });
        });
    }

    static addFullscreenSupport() {
        // Add fullscreen toggle functionality
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'btn btn--outline btn--sm fullscreen-btn';
        fullscreenBtn.innerHTML = '⛶ Fullscreen';
        fullscreenBtn.setAttribute('aria-label', 'Toggle fullscreen mode');
        fullscreenBtn.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            background-color: white;
            border-color: #D22730;
            color: #D22730;
        `;

        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log('Error attempting to enable fullscreen:', err);
                });
                fullscreenBtn.innerHTML = '⛷ Exit Fullscreen';
                fullscreenBtn.setAttribute('aria-label', 'Exit fullscreen mode');
            } else {
                document.exitFullscreen();
                fullscreenBtn.innerHTML = '⛶ Fullscreen';
                fullscreenBtn.setAttribute('aria-label', 'Enter fullscreen mode');
            }
        });

        document.body.appendChild(fullscreenBtn);

        // Handle fullscreen change events
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                fullscreenBtn.innerHTML = '⛶ Fullscreen';
                fullscreenBtn.setAttribute('aria-label', 'Enter fullscreen mode');
            }
        });
    }

    static addKeyboardShortcuts() {
        // Create keyboard shortcuts help
        const helpBtn = document.createElement('button');
        helpBtn.className = 'btn btn--outline btn--sm help-btn';
        helpBtn.innerHTML = '❓ Help';
        helpBtn.setAttribute('aria-label', 'Show keyboard shortcuts');
        helpBtn.style.cssText = `
            position: fixed;
            top: 20px;
            left: 160px;
            z-index: 1000;
            background-color: white;
            border-color: #002D72;
            color: #002D72;
        `;

        helpBtn.addEventListener('click', () => {
            presentation.showNotification(
                'Keyboard Shortcuts',
                '→ or Space: Next slide • ←: Previous slide • Home: First slide • End: Last slide • Esc: Show current slide info • Print: Ctrl+P (shows all slides)',
                'secondary'
            );
        });

        document.body.appendChild(helpBtn);
    }

    static initSlideCounter() {
        // Enhanced slide counter with more info
        const counter = document.querySelector('.slide-counter');
        if (counter) {
            const updateCounter = () => {
                const current = presentation.currentSlideIndex + 1;
                const total = presentation.totalSlides;
                const percentage = Math.round((current / total) * 100);
                counter.innerHTML = `
                    <span>${current}</span> of <span>${total}</span>
                    <small style="color: #7F7F7F; margin-left: 8px;">(${percentage}%)</small>
                `;
            };

            // Override the original update to include enhanced counter
            const originalUpdate = presentation.updateSlide;
            presentation.updateSlide = function() {
                originalUpdate.call(this);
                updateCounter();
            };
            
            updateCounter();
        }
    }
}

// Tennessee state government specific enhancements
class TNStateEnhancements {
    static addBrandingElements() {
        // Add Tennessee state branding
        const brandingElement = document.createElement('div');
        brandingElement.className = 'tn-branding';
        brandingElement.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 12px;
            color: #7F7F7F;
            z-index: 1000;
            font-family: 'Open Sans', Arial, sans-serif;
            padding: 4px 8px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        `;
        brandingElement.textContent = 'Tennessee Department of Health';
        document.body.appendChild(brandingElement);
    }

    static trackUsageAnalytics() {
        // Basic usage tracking for state government purposes
        const analytics = {
            startTime: new Date(),
            slideViews: {},
            totalInteractions: 0,
            ctaClicks: {}
        };

        // Track slide views
        const originalUpdateSlide = presentation.updateSlide;
        presentation.updateSlide = function() {
            const slideNumber = this.currentSlideIndex + 1;
            analytics.slideViews[slideNumber] = (analytics.slideViews[slideNumber] || 0) + 1;
            analytics.totalInteractions++;
            originalUpdateSlide.call(this);
        };

        // Track CTA clicks
        const originalHandleCTA = presentation.handleCTAAction;
        presentation.handleCTAAction = function(action) {
            analytics.ctaClicks[action] = (analytics.ctaClicks[action] || 0) + 1;
            originalHandleCTA.call(this, action);
        };

        // Log summary when user leaves or closes
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Math.round((new Date() - analytics.startTime) / 1000);
            console.log('TDH Presentation Session Summary:', {
                duration: `${sessionDuration} seconds`,
                slideViews: analytics.slideViews,
                totalInteractions: analytics.totalInteractions,
                ctaClicks: analytics.ctaClicks,
                completionRate: Math.max(...Object.keys(analytics.slideViews).map(Number)) / presentation.totalSlides
            });
        });
    }
}

// Initialize the presentation when DOM is loaded
let presentation;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize main presentation controller
    presentation = new PresentationController();
    
    // Initialize utility features
    PresentationUtils.addSlideTransitions();
    PresentationUtils.initPrintSupport();
    PresentationUtils.addFullscreenSupport();
    PresentationUtils.addKeyboardShortcuts();
    PresentationUtils.initSlideCounter();
    
    // Initialize Tennessee state specific features
    TNStateEnhancements.addBrandingElements();
    TNStateEnhancements.trackUsageAnalytics();

      /* ── Make the header logo jump to the title slide ───────────── */
  const homeLogo = document.getElementById('homeLogo');
  if (homeLogo) {
    homeLogo.style.cursor = 'pointer';           // visual hint :contentReference[oaicite:0]{index=0}
    homeLogo.setAttribute('role', 'button');     // accessibility
    homeLogo.setAttribute('aria-label', 'Go to title slide');

    homeLogo.addEventListener('click', () => {
      presentation.goToSlide(0);                 // jump to Slide 1
    });
  }
  /* ───────────────────────────────────────────────────────────── */

    
    // Add some helpful console messages for developers/presenters
    console.log('🏛️ Tennessee Department of Health Presentation loaded successfully!');
    console.log('📋 Features available:');
    console.log('  • Keyboard navigation (→, ←, Space, Home, End, Esc)');
    console.log('  • Fullscreen mode (top-left button)');
    console.log('  • Keyboard shortcuts help (❓ button)');
    console.log('  • Progress tracking');
    console.log('  • Accessibility features');
    console.log('  • Print support (Ctrl+P)');
    console.log('  • Interactive CTA buttons on final slide');
    console.log('📞 Support: Jason Howes, Olivia Hall, Nathan Johnston');

    // quick TOC navigation
document.addEventListener('click', (e) => {
  const link = e.target.closest('.toc a');
  if (link) {
    e.preventDefault();
    const targetIndex = parseInt(link.dataset.slide, 10) - 1;
    if (!Number.isNaN(targetIndex)) {
      presentation.goToSlide(targetIndex);
    }
  }
});

});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PresentationController, PresentationUtils, TNStateEnhancements };
}