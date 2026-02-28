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

    // 2. Responsive Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('nav-active');
            
            if (navLinks.classList.contains('nav-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'initial';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('nav-active');
                document.body.style.overflow = 'initial';
            });
        });
    }

    // 3. Hero Animation Sequence
    const heroAnimation = document.getElementById('hero-animation');
    const shortcutOverlay = document.getElementById('shortcut-overlay');
    const shortcutKey = shortcutOverlay ? shortcutOverlay.querySelector('.key:last-child') : null;
    
    if (heroAnimation) {
        const sequence = [
            { state: 'messy', duration: 2000 },
            { state: 'shortcut-1', duration: 800, key: '1' },
            { state: 'pos-1', duration: 2500 },
            { state: 'shortcut-2', duration: 800, key: '2' },
            { state: 'pos-2', duration: 2500 },
            { state: 'shortcut-3', duration: 800, key: '3' },
            { state: 'pos-3', duration: 2500 }
        ];
        let idx = 0;

        const runSequence = () => {
            const step = sequence[idx];
            heroAnimation.setAttribute('data-state', step.state);
            
            if (step.key && shortcutKey) {
                shortcutKey.textContent = step.key;
            }

            setTimeout(() => {
                idx = (idx + 1) % sequence.length;
                runSequence();
            }, step.duration);
        };

        runSequence();
    }

    // 3. Workflow Timeline Interactivity
    const workflowSteps = document.querySelectorAll('.workflow-step');
    workflowSteps.forEach(step => {
        step.addEventListener('click', () => {
            workflowSteps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
        });
    });

    // 5. Snap Demo Animation: half → vertical-half → third → fourth
    const snapDemo = document.getElementById('snap-demo-animation');
    const snapKeys = snapDemo ? snapDemo.querySelectorAll('.floating-keys .key:last-child') : null;

    if (snapDemo) {
        const snapSequence = [
            { state: 'half', key: '←' },
            { state: 'vertical-half', key: '↑' },
            { state: 'third', key: 'D' },
            { state: 'fourth', key: 'F' }
        ];
        let snapIdx = 0;

        setInterval(() => {
            snapIdx = (snapIdx + 1) % snapSequence.length;
            const step = snapSequence[snapIdx];
            snapDemo.setAttribute('data-state', step.state);
            
            const lastKey = snapDemo.querySelector('.floating-keys .key:last-child');
            if (lastKey) lastKey.textContent = step.key;
        }, 3000);
    }

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
