document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const journey = document.querySelector('.journey');
        if (journey) {
            const rect = journey.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.2) {
                document.body.classList.add('bg-black');
            } else {
                document.body.classList.remove('bg-black');
            }
        }
    });


    const openMenu = () => {
        document.querySelector('.overlay').classList.add('open');
        document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
        document.querySelector('.overlay').classList.remove('open');
        document.body.style.overflow = 'auto';
    };

    const menuBtn = document.querySelector('.menubtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openMenu();
        });
    }

    const closeBtn = document.querySelector('.closebtn');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    
    const backdrop = document.querySelector('.backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            if(e.target === backdrop) {
                closeMenu();
            }
        });
    }


    const tabItems = document.querySelectorAll('.list li[data-tab], .account[data-tab]');
    const tabContents = document.querySelectorAll('.tab');

    const activateTab = (tabId) => {
        tabItems.forEach(item => item.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        const activeItem = Array.from(tabItems).find(item => item.getAttribute('data-tab') === tabId);
        const activeContent = document.querySelector(`.tab[data-content="${tabId}"]`);

        if (activeItem) activeItem.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    };

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            activateTab(tabId);
        });
    });

    const icons = document.querySelectorAll('.icon');
    const accountBtn = icons.length > 1 ? icons[icons.length - 1] : null;
    if (accountBtn) {
        accountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            activateTab('account');
            openMenu();
        });
    }


    const heroVideo = document.querySelector('.herovideo');
    const pauseBtn = document.querySelector('.pausebtn');
    const pauseIcon = document.querySelector('.pause-icon');
    const playIcon = document.querySelector('.play-icon');

    if (heroVideo && pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            if (heroVideo.paused) {
                heroVideo.play();
                if(pauseIcon) pauseIcon.style.display = 'block';
                if(playIcon) playIcon.style.display = 'none';
            } else {
                heroVideo.pause();
                if(pauseIcon) pauseIcon.style.display = 'none';
                if(playIcon) playIcon.style.display = 'block';
            }
        });
    }
    

    document.querySelectorAll('.journeycard').forEach(card => {
        const video = card.querySelector('.journeyvideo');
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
