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
    
    // Smooth scrolling for anchor links (single implementation)
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

    // Slideshow functionality
    let slideIndex = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds
    
    function showSlides() {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Remove active class from all dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Increment slide index
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }

        // Show current slide and activate corresponding dot
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active";
        }
    }

    function startSlideshow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(showSlides, slideDuration);
    }

    function currentSlide(n) {
        clearInterval(slideInterval);
        slideIndex = n - 1;
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Remove active class from all dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Show selected slide and activate corresponding dot
        if (slides[slideIndex]) {
            slides[slideIndex].style.display = "block";
        }
        if (dots[slideIndex]) {
            dots[slideIndex].className += " active";
        }
        
        // Restart the slideshow after manual navigation
        startSlideshow();
    }

    // Initialize first slide and start slideshow
    currentSlide(1);
    startSlideshow();

    // Video autoplay functionality
    const videoElement = document.querySelector('video');
    if (videoElement) {
        // Try to autoplay the HTML5 video
        const playPromise = videoElement.play();
        
        // Handle autoplay restrictions
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay was prevented, show controls instead
                videoElement.controls = true;
            });
        }
    }

    // YouTube Player API with autoplay (single implementation)
    if (document.querySelector('.video-slide iframe[src*="youtube.com"]')) {
        let player;
        
        function onYouTubeIframeAPIReady() {
            player = new YT.Player(document.querySelector('.video-slide iframe'), {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                },
                playerVars: {
                    'autoplay': 1,
                    'mute': 1,
                    'controls': 0,
                    'rel': 0, // Don't show related videos at end
                    'modestbranding': 1 // Less YouTube branding
                }
            });
        }

        function onPlayerReady(event) {
            event.target.playVideo();
        }

        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.UNSTARTED) {
                player.setOptions({
                    playerVars: {
                        'controls': 1
                    }
                });
            }
        }

        // Load YouTube API script dynamically
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
});
