// script.js

// 1. Scroll Reveal Animations
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll('.reveal');
    
    // Initial hero reveal mapping (delay handling by CSS inline styles)
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach(el => el.classList.add('active'));

    // Intersection Observer for scroll triggers
    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% is visible
    };

    const observer = new IntersectionObserver(revealOnScroll, options);

    reveals.forEach(reveal => {
        // Skip hero ones as they trigger on load
        if (!reveal.closest('.hero')) {
            observer.observe(reveal);
        }
    });

    // 2. Hero Animation Sequence Loop
    const heroAnimation = document.getElementById('hero-animation');
    
    if (heroAnimation) {
        setInterval(() => {
            const currentState = heroAnimation.getAttribute('data-state');
            heroAnimation.setAttribute('data-state', currentState === 'messy' ? 'snapped' : 'messy');
        }, 3000); // Toggle every 3 seconds
    }

    // 3. Workspaces Demo Interactivity
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoVisual = document.getElementById('workspace-visual');
    
    // Layout configurations for the demo
    const layouts = {
        morning: {
            winA: { top: '10%', left: '10%', width: '40%', height: '80%' },
            winB: { top: '10%', left: '55%', width: '35%', height: '40%' },
            winC: { top: '55%', left: '55%', width: '35%', height: '35%' }
        },
        deepwork: {
            winA: { top: '0', left: '0', width: '100%', height: '100%', borderRadius: '0' },
            winB: { top: '50%', left: '50%', width: '0%', height: '0%', opacity: 0 },
            winC: { top: '50%', left: '50%', width: '0%', height: '0%', opacity: 0 }
        },
        meetings: {
            winA: { top: '5%', left: '5%', width: '60%', height: '90%' },
            winB: { top: '5%', left: '70%', width: '25%', height: '50%' },
            winC: { top: '60%', left: '70%', width: '25%', height: '35%' }
        }
    };

    const applyLayout = (layoutKey) => {
        const layout = layouts[layoutKey];
        if (!layout) return;

        const winA = demoVisual.querySelector('.win-a');
        const winB = demoVisual.querySelector('.win-b');
        const winC = demoVisual.querySelector('.win-c');

        Object.assign(winA.style, { ...layout.winA, opacity: layout.winA.opacity ?? 1, borderRadius: layout.winA.borderRadius ?? '8px' });
        Object.assign(winB.style, { ...layout.winB, opacity: layout.winB.opacity ?? 1, borderRadius: layout.winB.borderRadius ?? '8px' });
        Object.assign(winC.style, { ...layout.winC, opacity: layout.winC.opacity ?? 1, borderRadius: layout.winC.borderRadius ?? '8px' });
    };

    // Apply default layout
    applyLayout('morning');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update selected state
            demoTabs.forEach(t => t.setAttribute('aria-selected', 'false'));
            tab.setAttribute('aria-selected', 'true');
            
            // Apply new layout
            const target = tab.getAttribute('data-target');
            applyLayout(target);

            // Update text (optional flourish)
            const title = document.getElementById('demo-title');
            const desc = document.getElementById('demo-desc');
            
            if (target === 'morning') {
                title.textContent = "Morning Focus";
                desc.textContent = "Start your day organizing emails and calendar before jumping into deep work.";
            } else if (target === 'deepwork') {
                title.textContent = "Deep Work";
                desc.textContent = "Fullscreen code editor block out all distractions for intense focus sessions.";
            } else if (target === 'meetings') {
                title.textContent = "Meetings";
                desc.textContent = "Main presentation on the left, reference notes and chat snapped to the right.";
            }
        });
    });

    // 4. Video Modal Logic
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

        // Close on background click
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });
    }
});
