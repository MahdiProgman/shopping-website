const greetingText = document.getElementById('greeting-text');
const greetingIcon = document.getElementById('greeting-icon');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const drawerBox = document.querySelector('header .drawer-menu .drawer');
const overlay = document.querySelector('body > .overlay');
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
})