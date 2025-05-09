const notyf = new Notyf({
  duration: 3000,
  ripple: true,
  position: {
    x: 'left',
    y: 'top'
  }
});
const websiteAdvertiseSwiper = new Swiper(
  "main > .website-advertise > .swiper",
  {
    autoplay: {
      delay: 3500,
    },
    navigation: {
      nextEl: "main > .website-advertise > .swiper .swiper-button-next",
      prevEl: "main > .website-advertise > .swiper .swiper-button-prev",
    },
    pagination: {
      el: "main > .website-advertise > .swiper .swiper-pagination",
    },
  }
);

const categoriesSwiper = new Swiper("main > .categories > .swiper", {
  autoplay: {
    delay: 3500,
  },
  navigation: {
    nextEl: "main > .categories > .swiper .swiper-button-next",
    prevEl: "main > .categories > .swiper .swiper-button-prev",
  },
  pagination: {
    el: `main > .categories > .swiper .swiper-pagination`,
  },
  spaceBetween: 5,
  breakpoints: {
    1024: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 2,
    },
  },
});

if(window.isLoggedInNow) {
  notyf.success('شما با موفقیت وارد شدید');
}