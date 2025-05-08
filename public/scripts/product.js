const imagesBtn = document.querySelectorAll('.images-list > .image-btn');
const imageViewer = document.querySelector('.image-viewer');
const closeImageBtn = document.querySelector('.image-viewer .close-image-btn');
const imageViwerImage = document.querySelector('.image-viewer img');
const showMoreBtn = document.querySelector('.description-and-specifications .description .show-more-btn');
const textOfDescription = document.querySelector('.description-and-specifications .description p');
const writeCommentBtn = document.querySelector('.comments-section .rate-and-submit-comment .write-comment-btn');
const submitCommentBox = document.querySelector('.submit-comment-box');
const closeSubmitCommentBox = document.querySelector('.submit-comment-box .header .close-box');
const addNewPositivePointBtn = document.querySelector('.submit-comment-box .positive-points .input button');
const addNewNegetivePointBtn = document.querySelector('.submit-comment-box .negetive-points .input button');

showMoreBtn.addEventListener('click', () => {
    if(!showMoreBtn.classList.contains('on')){
        showMoreBtn.classList.add('on');
        textOfDescription.classList.add('open');
    } else {
        showMoreBtn.classList.remove('on');
        textOfDescription.classList.remove('open');
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

writeCommentBtn.addEventListener('click', ()=> {
    submitCommentBox.classList.add('on');
    overlay.classList.remove('hidden');

    overlay.addEventListener('click', ()=> {
        submitCommentBox.classList.remove('on');
        overlay.classList.add('hidden');
    });
});

closeSubmitCommentBox.addEventListener('click', ()=> {
    submitCommentBox.classList.remove('on');
    overlay.classList.add('hidden');
});

addNewPositivePointBtn.addEventListener('click', ()=> {
    if(addNewPositivePointBtn.parentElement.children[0].value.length > 3) {
        const newPositivePoint = document.createElement('li')
        const liContent = `
            <div class="text">
                <img src="/assets/icons/plus-green.png" />
                <span>${addNewPositivePointBtn.parentElement.children[0].value}</span>
            </div>
            <button class="delete-btn">
                <img src="/assets/icons/trash.png" />
            </button>
        `;
        
        addNewPositivePointBtn.parentElement.children[0].value = "";

        newPositivePoint.innerHTML = liContent;

        addNewPositivePointBtn.parentElement.parentElement.children[1].appendChild(newPositivePoint);

        newPositivePoint.children[1].addEventListener('click', ()=> {
            addNewPositivePointBtn.parentElement.parentElement.children[1].removeChild(newPositivePoint);
        })

    }
});

addNewNegetivePointBtn.addEventListener('click', ()=> {
    if(addNewNegetivePointBtn.parentElement.children[0].value.length > 3) {
        const newNegetivePoint = document.createElement('li')
        const liContent = `
            <div class="text">
                <img src="/assets/icons/minus-red.png" />
                <span>${addNewNegetivePointBtn.parentElement.children[0].value}</span>
            </div>
            <button class="delete-btn">
                <img src="/assets/icons/trash.png" />
            </button>
        `;
        
        addNewNegetivePointBtn.parentElement.children[0].value = "";

        newNegetivePoint.innerHTML = liContent;

        addNewNegetivePointBtn.parentElement.parentElement.children[1].appendChild(newNegetivePoint);

        newNegetivePoint.children[1].addEventListener('click', ()=> {
            addNewNegetivePointBtn.parentElement.parentElement.children[1].removeChild(newNegetivePoint);
        })

    }
});