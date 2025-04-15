const websiteAdvertiseSwiper = new Swiper('main > .website-advertise > .swiper', {
    autoplay: {
        delay: 2500,
    },
    navigation: {
        nextEl: 'main > .website-advertise > .swiper .swiper-button-next',
        prevEl: 'main > .website-advertise > .swiper .swiper-button-prev'
    }
})