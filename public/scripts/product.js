const imagesBtn = document.querySelectorAll(".images-list > .image-btn");
const imageViewer = document.querySelector(".image-viewer");
const closeImageBtn = document.querySelector(".image-viewer .close-image-btn");
const imageViwerImage = document.querySelector(".image-viewer img");
const showMoreBtn = document.querySelector(
  ".description-and-specifications .description .show-more-btn"
);
const textOfDescription = document.querySelector(
  ".description-and-specifications .description p"
);
const writeCommentBtn = document.querySelector(
  ".comments-section .rate-and-submit-comment .write-comment-btn"
);
const submitCommentBox = document.querySelector(".submit-comment-box");
const closeSubmitCommentBox = document.querySelector(
  ".submit-comment-box .header .close-box"
);
const addNewPositivePointBtn = document.querySelector(
  ".submit-comment-box .positive-points .input button"
);
const addNewNegetivePointBtn = document.querySelector(
  ".submit-comment-box .negetive-points .input button"
);

const notyf = new Notyf({
  duration: 3000,
  ripple: true,
  position: {
    x: 'left',
    y: 'top'
  }
});

if(newCommentSubmitted) notyf.success('نظر شما با موفقیت ثبت شد');

showMoreBtn.addEventListener("click", () => {
  if (!showMoreBtn.classList.contains("on")) {
    showMoreBtn.classList.add("on");
    textOfDescription.classList.add("open");
  } else {
    showMoreBtn.classList.remove("on");
    textOfDescription.classList.remove("open");
  }
});

writeCommentBtn.addEventListener("click", () => {
  if(login_state) {
    submitCommentBox.classList.add("on");
    overlay.classList.remove("hidden");
  } else {
    notyf.error('لطفا وارد حساب خود شوید');
  }
});

closeSubmitCommentBox.addEventListener("click", () => {
  submitCommentBox.classList.remove("on");
  overlay.classList.add("hidden");
});

addNewPositivePointBtn.addEventListener("click", () => {
  if (addNewPositivePointBtn.parentElement.children[0].value.length > 3) {
    const newPositivePoint = document.createElement("li");
    const liContent = `
            <div class="text">
                <img src="/assets/icons/plus.svg" />
                <span>${addNewPositivePointBtn.parentElement.children[0].value}</span>
                <input type="hidden" name="positive_points[]" required value="${addNewPositivePointBtn.parentElement.children[0].value}" />
            </div>
            <button type="button" class="delete-btn">
                <img src="/assets/icons/trash.svg" />
            </button>
        `;

    addNewPositivePointBtn.parentElement.children[0].value = "";

    newPositivePoint.innerHTML = liContent;

    addNewPositivePointBtn.parentElement.parentElement.children[1].appendChild(
      newPositivePoint
    );

    newPositivePoint.children[1].addEventListener("click", () => {
      addNewPositivePointBtn.parentElement.parentElement.children[1].removeChild(
        newPositivePoint
      );
    });
  } else {
    notyf.error('نکته مثبت شما باید بیشتر از ۳ کاراکتر باشد');
  }
});
addNewPositivePointBtn.parentElement.children[0].addEventListener('keydown', (e) => {
  if(e.key.toLowerCase() == 'enter') {
    e.preventDefault();
    addNewPositivePointBtn.click();
  };
});

addNewNegetivePointBtn.addEventListener("click", () => {
  if (addNewNegetivePointBtn.parentElement.children[0].value.length > 3) {
    const newNegetivePoint = document.createElement("li");
    const liContent = `
            <div class="text">
                <img src="/assets/icons/minus.svg" />
                <span>${addNewNegetivePointBtn.parentElement.children[0].value}</span>
                <input type="hidden" visibled="false" name="negetive_points[]" required value="${addNewNegetivePointBtn.parentElement.children[0].value}" />
            </div>
            <button type="button" class="delete-btn">
                <img src="/assets/icons/trash.svg" />
            </button>
        `;

    addNewNegetivePointBtn.parentElement.children[0].value = "";

    newNegetivePoint.innerHTML = liContent;

    addNewNegetivePointBtn.parentElement.parentElement.children[1].appendChild(
      newNegetivePoint
    );

    newNegetivePoint.children[1].addEventListener("click", () => {
      addNewNegetivePointBtn.parentElement.parentElement.children[1].removeChild(
        newNegetivePoint
      );
    });
  } else {
    notyf.error('نکته منفی شما باید بیشتر از ۳ کاراکتر باشد');
  }
});
addNewNegetivePointBtn.parentElement.children[0].addEventListener('keydown', (e) => {
  if(e.key.toLowerCase() == 'enter') {
    e.preventDefault();
    addNewNegetivePointBtn.click();
  };
});

document.addEventListener("DOMContentLoaded", () => {
  if(addNewPositivePointBtn.parentElement.parentElement.children[1].children.length !== 0) {
    Array.from(addNewPositivePointBtn.parentElement.parentElement.children).forEach(liElement => {
      liElement.children[1].addEventListener('click', () => {
        liElement.parentElement.removeChild(liElement);
      });
    });
  }

  imagesBtn.forEach((imageBtn) => {
    imageBtn.addEventListener("click", () => {
      imageViewer.children[0].src = imageBtn.children[0].src;
      imageViewer.classList.add("on");
      overlay.classList.remove("hidden");

      closeImageBtn.addEventListener(
        "click",
        (e) => {
          imageViewer.classList.remove("on");
          overlay.classList.add("hidden");
        },
        { once: true }
      );
    });
  });
});
