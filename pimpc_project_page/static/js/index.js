window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

})

// Project-page section navigation and restrained scroll ambience.
document.addEventListener('DOMContentLoaded', function() {
    const railLinks = Array.from(document.querySelectorAll('.section-rail a'));
    const observedSections = railLinks
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && observedSections.length) {
        const sectionObserver = new IntersectionObserver(function(entries) {
            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;
            railLinks.forEach(link => {
                link.classList.toggle('is-active', link.getAttribute('href') === '#' + visible.target.id);
            });
        }, { rootMargin: '-25% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] });
        observedSections.forEach(section => sectionObserver.observe(section));
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealBlocks = Array.from(document.querySelectorAll(
        '.method-equation-card, .bottleneck-grid article, .split-system > div, ' +
        '.interactive-method-figure, .iteration-flow article, .consensus-panel, ' +
        '.acceleration-grid article, .comparison-only, .example-card'
    ));

    revealBlocks.forEach(block => block.classList.add('reveal-block'));
    if (reducedMotion || !('IntersectionObserver' in window)) {
        revealBlocks.forEach(block => block.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
        revealBlocks.forEach(block => revealObserver.observe(block));
    }

    const ambient = document.querySelector('.ambient-layer');
    if (!reducedMotion && ambient) {
        const starOne = ambient.querySelector('.star-one');
        const starTwo = ambient.querySelector('.star-two');
        const arrows = ambient.querySelector('.ambient-arrow');
        const rocket = ambient.querySelector('.ambient-rocket');
        let ticking = false;

        function updateAmbient() {
            const y = window.scrollY;
            starOne.style.transform = `translate3d(${Math.sin(y / 260) * 16}px, ${y * 0.025}px, 0) rotate(${y * 0.025}deg)`;
            starTwo.style.transform = `translate3d(${Math.cos(y / 300) * 18}px, ${-y * 0.018}px, 0) rotate(${-y * 0.02}deg)`;
            arrows.style.transform = `translate3d(${(y * 0.045) % 150}px, 0, 0)`;
            rocket.style.transform = `translate3d(${-((y * 0.035) % 120)}px, ${Math.sin(y / 180) * 12}px, 0) rotate(-12deg)`;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateAmbient);
                ticking = true;
            }
        }, { passive: true });
        updateAmbient();
    }
});
