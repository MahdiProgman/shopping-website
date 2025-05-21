const notyf = new Notyf({
  duration: 3000,
  ripple: true,
  position: {
    x: "left",
    y: "top",
  },
});
const showPasswordBtn = document.getElementById("show-password-btn");

showPasswordBtn.addEventListener("click", () => {
  if (showPasswordBtn.parentElement.children[1].type == "password") {
    showPasswordBtn.parentElement.children[1].type = "text";
    showPasswordBtn.children[0].src = "/assets/icons/closed.svg";
  } else {
    showPasswordBtn.parentElement.children[1].type = "password";
    showPasswordBtn.children[0].src = "/assets/icons/eye.svg";
  }
});
