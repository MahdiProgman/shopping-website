const showPasswordBtns = document.querySelectorAll('.show-password-btn');
const notyf = new Notyf({
  duration: 3000,
  ripple: true,
  position: {
    x: "left",
    y: "top",
  },
});

showPasswordBtns.forEach(showPasswordBtn => {
  showPasswordBtn.addEventListener('click', () => {
    if (!showPasswordBtn.classList.contains('on')) {
    showPasswordBtn.classList.add('on');
    showPasswordBtn.parentElement.parentElement.querySelector('.left img').src = '/assets/icons/closed-eye.svg';
    showPasswordBtn.parentElement.parentElement.querySelector('.right input').type = 'text';
  } else {
    showPasswordBtn.classList.remove('on');
    showPasswordBtn.parentElement.parentElement.querySelector('.left img').src = '/assets/icons/eye.svg';
    showPasswordBtn.parentElement.parentElement.querySelector('.right input').type = 'password';
  }
  })
});

if(isUserUpdated) notyf.success('اطلاعات با موفقیت بروزرسانی شد');