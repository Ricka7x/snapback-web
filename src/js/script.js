// script.js — Snapback Landing Page

document.addEventListener("DOMContentLoaded", () => {

    // 1. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    
    // Hero reveals fire immediately
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach(el => el.classList.add('active'));

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        if (!reveal.closest('.hero')) {
            observer.observe(reveal);
        }
    });

    // 2. Hero Animation Sequence: messy → shortcut → snapped (grid)
    const heroAnimation = document.getElementById('hero-animation');
    
    if (heroAnimation) {
        const sequence = ['messy', 'shortcut', 'grid'];
        let idx = 0;

        setInterval(() => {
            idx = (idx + 1) % sequence.length;
            heroAnimation.setAttribute('data-state', sequence[idx]);
        }, 2200);
    }

    // 3. Workflow Timeline Interactivity
    const workflowSteps = document.querySelectorAll('.workflow-step');
    workflowSteps.forEach(step => {
        step.addEventListener('click', () => {
            workflowSteps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
        });
    });

    // 4. Setup Card Interactivity
    const setupCards = document.querySelectorAll('.setup-card');
    setupCards.forEach(card => {
        card.addEventListener('click', () => {
            setupCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // 5. Video Modal Logic
    const watchDemoBtn = document.getElementById('watch-demo-btn');
    const videoModal = document.getElementById('video-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const promoVideo = document.getElementById('promo-video');

    if (watchDemoBtn && videoModal && closeModalBtn && promoVideo) {
        watchDemoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            videoModal.classList.add('active');
            promoVideo.play();
        });

        const closeModal = () => {
            videoModal.classList.remove('active');
            promoVideo.pause();
            promoVideo.currentTime = 0;
        };

        closeModalBtn.addEventListener('click', closeModal);

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });
    }
});
