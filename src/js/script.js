// script.js — Snapback Landing Page
import { gsap } from "gsap";

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

    // 3. GSAP Sample Animation
    gsap.to('.hero', { y: -20, opacity: 1, duration: 1, ease: 'power2.out' });

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

    // 6. Advanced Save Workspace Mockup Animation
    const workflowMock = document.getElementById('save-workflow-mock');
    const typewriterEl = document.getElementById('typewriter-name');
    const saveBtnMock = document.getElementById('mock-save-btn');
    const savedNameResult = document.getElementById('saved-name-result');
    const mockTitle = document.getElementById('mock-title');

    if (workflowMock && typewriterEl && saveBtnMock) {
        let sequenceRunning = false;
        const nameToType = "Morning Focus";

        const typeEffect = (text, i = 0) => {
            return new Promise(resolve => {
                if (i < text.length) {
                    typewriterEl.textContent += text.charAt(i);
                    setTimeout(() => resolve(typeEffect(text, i + 1)), 100);
                } else {
                    resolve();
                }
            });
        };

        const runWorkflowSequence = async () => {
            if (sequenceRunning) return;
            sequenceRunning = true;

            // Step 0: Ensure in edit mode and reset
            workflowMock.setAttribute('data-view', 'edit');
            typewriterEl.textContent = "";
            saveBtnMock.style.transform = "scale(1)";
            saveBtnMock.style.backgroundColor = "";

            // Wait for reveal
            if (!workflowMock.classList.contains('active')) {
                sequenceRunning = false;
                setTimeout(runWorkflowSequence, 1000);
                return;
            }

            await new Promise(r => setTimeout(r, 1000));

            // Step 1: Typing animation
            await typeEffect(nameToType);
            await new Promise(r => setTimeout(r, 800));

            // Step 2: Click animation
            saveBtnMock.style.transform = "scale(0.95)";
            saveBtnMock.style.backgroundColor = "var(--primary-hover)";
            await new Promise(r => setTimeout(r, 200));
            saveBtnMock.style.transform = "scale(1)";
            
            await new Promise(r => setTimeout(r, 400));

            // Step 3: Transition to list view
            workflowMock.setAttribute('data-view', 'list');
            if (savedNameResult) savedNameResult.textContent = nameToType;
            
            await new Promise(r => setTimeout(r, 4000)); // Show the result for a while

            // Reset for loop
            sequenceRunning = false;
            runWorkflowSequence();
        };

        // Start when section becomes active
        const workflowObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runWorkflowSequence();
                workflowObserver.disconnect();
            }
        }, { threshold: 0.2 });
        workflowObserver.observe(workflowMock);
    }

    // 7. Pixel-Perfect Workspace Shortcuts Animation
    const hotkeysMock = document.getElementById('hotkeys-animation-mock');
    const row1 = document.getElementById('px-row-1');
    const row2 = document.getElementById('px-row-2');
    const recordingDisplay = document.getElementById('px-hotkey-recording');
    
    if (hotkeysMock && row1 && row2 && recordingDisplay) {
        let hotkeysSequenceRunning = false;

        const runHotkeysSequence = async () => {
            if (hotkeysSequenceRunning) return;
            hotkeysSequenceRunning = true;

            // Reset state: Row 1 active, Row 2 normal
            row1.classList.add('active-row');
            row2.classList.remove('active-row');
            recordingDisplay.classList.remove('shortcut-listening');
            // right half
            recordingDisplay.innerHTML = '<span class="px-key">^</span><span class="px-key">⌥</span><span class="px-key">→</span>';

            if (!hotkeysMock.classList.contains('active')) {
                hotkeysSequenceRunning = false;
                setTimeout(runHotkeysSequence, 1000);
                return;
            }

            await new Promise(r => setTimeout(r, 2000));

            // Step 1: Switch focus to Row 2
            row1.classList.remove('active-row');
            row2.classList.add('active-row');
            
            await new Promise(r => setTimeout(r, 1000));

            // Step 2: Simulate "listening" for a new shortcut
            recordingDisplay.classList.add('shortcut-listening');
            recordingDisplay.innerHTML = '<span class="px-key">?</span>';
            
            await new Promise(r => setTimeout(r, 1200));

            // Step 3: Set final shortcut
            recordingDisplay.classList.remove('shortcut-listening');
            recordingDisplay.innerHTML = '<span class="px-key">^</span><span class="px-key">⌥</span><span class="px-key">D</span>';
            
            await new Promise(r => setTimeout(r, 4000));

            // Reset for loop
            hotkeysSequenceRunning = false;
            runHotkeysSequence();
        };

        const hotkeysObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runHotkeysSequence();
                hotkeysObserver.disconnect();
            }
        }, { threshold: 0.2 });
        hotkeysObserver.observe(hotkeysMock);
    }
});
