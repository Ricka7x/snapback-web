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
});
