const showPasswordBtns = document.querySelectorAll('.show-password-btn');

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