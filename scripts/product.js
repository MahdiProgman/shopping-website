const imagesBtn = document.querySelectorAll('.images-list > .image-btn');
const imageViewer = document.querySelector('.image-viewer');
const closeImageBtn = document.querySelector('.image-viewer .close-image-btn');
const imageViwerImage = document.querySelector('.image-viewer img');

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