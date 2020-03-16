const backGroundImg = document.querySelector(".bg_photo");
const unsplashUrl = "https://source.unsplash.com/category/nature/1600x900";

function getImage() {
  let bgImg = new Image();
    bgImg.alt = "배경화면";
    bgImg.src = unsplashUrl;
    backGroundImg.appendChild(bgImg);
}

function init(){
  getImage();

}

init();


// import Unsplash from unsplash-js
//const Unsplash = require('unsplash-js').default;
// const Unsplash = require('./unsplash-js').default;
// bring photos by saved file
// Unsplash key =  Upl2_0biNmszIebhpBqo_5bjKEid6L12soYrzBk5YmA 

//https://api.unsplash.com/photos/?client_id=Upl2_0biNmszIebhpBqo_5bjKEid6L12soYrzBk5YmA
// const numOfphoto = 3;

// function showPhoto(genedNumber) {
//     const photo = new Image();
//     photo.src = `images/${genedNumber}.jpg`;
//     photo.classList.add("bgPhoto");
//     body.appendChild(photo);
// }

// function genNumber() {
//     const randomNumber = Math.floor(Math.random() * numOfphoto + 1);
//     return randomNumber;
// }

// function init() {
//     showPhoto(genNumber());
// }

// init();


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