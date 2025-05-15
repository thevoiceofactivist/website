document.addEventListener('DOMContentLoaded', function() {
            // Mobile Navigation
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const navbar = document.querySelector('.navbar');
            
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
            
            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
            
            // Header scroll effect
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
            
            // Animated counter for stats
            const statItems = document.querySelectorAll('.stat-item h3');
            
            function animateCounters() {
                statItems.forEach(item => {
                    const target = parseInt(item.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(counter);
                            current = target;
                        }
                        item.textContent = Math.floor(current).toLocaleString();
                    }, 16);
                });
            }
            
            // Intersection Observer for stats animation
            const statsSection = document.querySelector('.stats-section');
            
            if (statsSection) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateCounters();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(statsSection);
            }
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });
                });
            });
        });
