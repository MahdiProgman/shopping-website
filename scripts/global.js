const greetingText = document.getElementById('greeting-text');
const greetingIcon = document.getElementById('greeting-icon');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const drawerBox = document.querySelector('.drawer');
const overlay = document.querySelector('body > .overlay');
const headerSpacer = document.querySelector('header > .spacer');
const swiperProducts = document.querySelectorAll('.swiper-products');
const topSearchesBox = document.querySelector('.top-searches');
const headerOverlay = document.querySelector('.header-overlay');
const searchInput = document.getElementById('search-input');
const time = new Date();

if (time.getHours() >= 6 && time.getHours() <= 12) {
    greetingText.innerText = 'صبح بخیر';
    greetingIcon.src = '/assets/icons/morning.png';
} else if (time.getHours() >= 12 && time.getHours() < 18) {
    greetingText.innerText = 'بعد از ظهر بخیر';
    greetingIcon.src = '/assets/icons/afternoon.png';
} else {
    greetingText.innerText = 'شب بخیر';
    greetingIcon.src = '/assets/icons/night.png';
}

menuBtn.addEventListener('click', ()=> {
    if(!drawerBox.classList.contains('on')){
        drawerBox.classList.add('on');
        overlay.classList.remove('hidden');
    }
});

closeBtn.addEventListener('click', ()=> {
    if(drawerBox.classList.contains('on')){
        drawerBox.classList.remove('on');
        overlay.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', ()=> {
    const setSpacerHeight = () => {
        headerSpacer.style.height = `${document.querySelector('header > .section-1').clientHeight}px`
    }

    window.addEventListener('resize', setSpacerHeight);

    const headerResizeObserver = new ResizeObserver(setSpacerHeight);
    headerResizeObserver.observe(document.querySelector('header > .section-1'));

    const closeDrawerMenu = () => {
        if(document.documentElement.clientWidth > 640 && drawerBox.classList.contains('on')){
            drawerBox.classList.remove('on');
            overlay.classList.add('hidden');
        }
    }

    const drawerResizeObserver = new ResizeObserver(closeDrawerMenu);
    drawerResizeObserver.observe(document.documentElement);
});

swiperProducts.forEach((value, i) => {
    new Swiper(`.sp-${i+1}`, {
        autoplay: {
            delay: 3500
        },
        navigation: {
            nextEl: `.sp-${i+1} .swiper-button-next`,
            prevEl: `.sp-${i+1} .swiper-button-prev`
        },
        pagination: {
            el: `.sp-${i+1} .swiper-pagination`
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3
            },
            640: {
                slidesPerView: 2
            }
        }
    })
});

searchInput.addEventListener('focus', ()=> {
   topSearchesBox.classList.add('on');
   headerOverlay.classList.remove('hidden'); 
});

document.addEventListener('mousedown', (e) => {
    if(!topSearchesBox.contains(e.target) && topSearchesBox.classList.contains('on')){
        topSearchesBox.classList.remove('on');
        headerOverlay.classList.add('hidden');
    }
});

document.addEventListener('touchstart', (e) => {
    if(!topSearchesBox.contains(e.target) && topSearchesBox.classList.contains('on')){
        topSearchesBox.classList.remove('on');
        headerOverlay.classList.add('hidden');
    }

    if(!drawerBox.contains(e.target) && drawerBox.classList.contains('on')){
        drawerBox.classList.remove('on');
        overlay.classList.add('hidden');
    }
});