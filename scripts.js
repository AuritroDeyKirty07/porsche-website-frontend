document.addEventListener('DOMContentLoaded', () => {
            // Scroll Reveal
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const scrollElements = document.querySelectorAll('.scroll-reveal');
            scrollElements.forEach(el => {
                observer.observe(el);
            });
            
            // Navbar scroll effect
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Menu Overlay Logic
            const menuBtn = document.getElementById('menuOpenBtn');
            const menuCloseBtn = document.getElementById('menuCloseBtn');
            const menuOverlay = document.getElementById('menuOverlay');
            const menuBackdrop = document.getElementById('menuBackdrop');
            const navAccountBtn = document.getElementById('navAccountBtn');

            const openMenu = () => {
                menuOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            };

            const closeMenu = () => {
                menuOverlay.classList.remove('open');
                document.body.style.overflow = 'auto';
            };

            menuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openMenu();
            });

            menuCloseBtn.addEventListener('click', closeMenu);
            menuBackdrop.addEventListener('click', (e) => {
                if(e.target === menuBackdrop) {
                    closeMenu();
                }
            });

            // Sidebar Tab Switching Logic
            const tabItems = document.querySelectorAll('.menu-list li[data-tab], .menu-account[data-tab]');
            const tabContents = document.querySelectorAll('.tab-content');

            const activateTab = (tabId) => {
                // Remove active classes
                tabItems.forEach(item => item.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to corresponding tab and content
                const activeItem = Array.from(tabItems).find(item => item.getAttribute('data-tab') === tabId);
                const activeContent = document.getElementById('tab-' + tabId);

                if (activeItem) activeItem.classList.add('active');
                if (activeContent) activeContent.classList.add('active');
            };

            tabItems.forEach(item => {
                item.addEventListener('click', () => {
                    const tabId = item.getAttribute('data-tab');
                    activateTab(tabId);
                });
            });

            if (navAccountBtn) {
                navAccountBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    activateTab('account');
                    openMenu();
                });
            }

            // Hero Video Pause/Play Logic
            const heroVideo = document.getElementById('heroVideo');
            const heroPauseBtn = document.getElementById('heroPauseBtn');
            const pauseIcon = document.getElementById('pauseIcon');
            const playIcon = document.getElementById('playIcon');

            if (heroVideo && heroPauseBtn) {
                heroPauseBtn.addEventListener('click', () => {
                    if (heroVideo.paused) {
                        heroVideo.play();
                        pauseIcon.style.display = 'block';
                        playIcon.style.display = 'none';
                    } else {
                        heroVideo.pause();
                        pauseIcon.style.display = 'none';
                        playIcon.style.display = 'block';
                    }
                });
            }

            // Journey Section Background Scroll Logic
            const journeySection = document.getElementById('journeySection');
            if (journeySection) {
                const bgObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        // Change background when the section is at least 15% visible
                        if (entry.isIntersecting) {
                            document.body.classList.add('bg-black');
                        } else {
                            document.body.classList.remove('bg-black');
                        }
                    });
                }, { threshold: 0.15 });
                bgObserver.observe(journeySection);
            }

            // Model Cards Video Hover Logic
            document.querySelectorAll('.model-journey-card').forEach(card => {
                const video = card.querySelector('.model-journey-video');
                if (video) {
                    card.addEventListener('mouseenter', () => {
                        video.play().catch(e => console.log('Video play error:', e));
                    });
                    card.addEventListener('mouseleave', () => {
                        video.pause();
                        video.currentTime = 0;
                    });
                }
            });
        });