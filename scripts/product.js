const imagesBtn = document.querySelectorAll('.images-list > .image-btn');
const imageViewer = document.querySelector('.image-viewer');
const closeImageBtn = document.querySelector('.image-viewer .close-image-btn');
const imageViwerImage = document.querySelector('.image-viewer img');
const showMoreBtn = document.querySelector('.description-and-specifications .description .show-more-btn');
const textOfDescription = document.querySelector('.description-and-specifications .description p');

showMoreBtn.addEventListener('click', () => {
    if(!showMoreBtn.classList.contains('on')){
        showMoreBtn.classList.add('on');
        textOfDescription.style.maxHeight = '1000px';
        showMoreBtn.children[0].innerText = 'مشاهده کمتر';
    } else {
        showMoreBtn.classList.remove('on');
        textOfDescription.style.maxHeight = '80px';
        showMoreBtn.children[0].innerText = 'مشاهده بیشتر';
    }
});

imagesBtn.forEach(imageBtn => {
    imageBtn.addEventListener('click', ()=> {
        imageViewer.children[1].src =  imageBtn.children[0].src;
        imageViewer.classList.add('on');
        overlay.classList.remove('hidden');

        closeImageBtn.addEventListener('click', (e)=> {
            imageViewer.classList.remove('on');
            overlay.classList.add('hidden');
        }, { once : true });
    });
});