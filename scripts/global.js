const greetingText = document.getElementById('greeting-text');
const greetingIcon = document.getElementById('greeting-icon');
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