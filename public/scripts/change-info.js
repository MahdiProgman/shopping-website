const showPasswordBtns = document.querySelectorAll('.show-password-btn');
const changePasswordForm = document.getElementById('change-password-form');
const newPasswordInput = document.getElementById('new_password');
const repeatNewPasswordInput = document.getElementById('repeat_new_password');
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

changePasswordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (newPasswordInput.value !== repeatNewPasswordInput.value) {
    notyf.error('رمز عبور جدید با تکرار آن مطابقت ندارد');
  } else {
    changePasswordForm.submit();
  }
});

if(isPasswordNotMatch) notyf.error('رمز عبور وارد شده با رمز عبور فعلی شما مطابقت ندارد');
else if(isNewPasswordMatch) notyf.error('نمی توانید رمز عبور فعلی خود را به عنوان رمز عبور جدید انتخاب کنید');
else if(isNewPasswordSet) notyf.success('رمز عبور جدید با موفقیت تنظیم شد');