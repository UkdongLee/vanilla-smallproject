// bring photos by saved file
const body = document.querySelector("body");

const numOfphoto = 3;

function showPhoto(genedNumber) {
    const photo = new Image();
    photo.src = `images/${genedNumber}.jpg`;
    photo.classList.add("bgPhoto");
    body.appendChild(photo);
}


function genNumber() {
    const randomNumber = Math.floor(Math.random() * numOfphoto + 1);
    return randomNumber;
}

function init() {
    showPhoto(genNumber());
}

init();


// bring photos by random url
// const body = document.querySelector('body');

// function showPhoto() {
//     const image = new Image();
//     image.src = `https://source.unsplash.com/random`;
//     image.classList.add('randomPhoto');
//     body.appendChild(image);
// }

// function init() {
//     showPhoto();
// }

// init();