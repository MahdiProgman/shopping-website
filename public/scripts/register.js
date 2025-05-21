const showPasswordBtns = document.querySelectorAll(".show-password-btn");
const passwordField = document.getElementById("password");
const repeatPasswordField = document.getElementById("repeat-password");
const notyf = new Notyf({
  duration: 3000,
  ripple: true,
  position: {
    x: "left",
    y: "top",
  },
});
const form = document.querySelector("form");

showPasswordBtns.forEach((showPasswordBtn) => {
  showPasswordBtn.addEventListener("click", () => {
    if (showPasswordBtn.parentElement.children[1].type == "password") {
      showPasswordBtn.parentElement.children[1].type = "text";
      showPasswordBtn.children[0].src = "/assets/icons/closed.svg";
    } else {
      showPasswordBtn.parentElement.children[1].type = "password";
      showPasswordBtn.children[0].src = "/assets/icons/eye.svg";
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passwordField.value != repeatPasswordField.value) {
    notyf.error("رمز عبور و تکرار رمز عبور با یکدیگر مطابقت ندارند");
  } else {
    form.submit();
  }
});
