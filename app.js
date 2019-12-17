'use strict';

console.log('js linked!');

// var imageElements = document.getElementsByTagName('img');
var left = document.getElementById('left');
var middle = document.getElementById('middle');
var right = document.getElementById('right');
var imageHolder = document.getElementById('image-holder');

var allProducts = [];

function Product(name, imageUrl) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  allProducts.push(this);

}




new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('boots', 'img/boots.jpg');
new Product('bathroom','img/bathroom.jpg');
new Product('breakfast','img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

console.log(allProducts);

function displayImages (){
  var displayedImages = [];
  displayedImages[0] = getRandomIndex();
  displayedImages[1] = getRandomIndex();

  while(displayedImages[0] === displayedImages[1]) {
    displayedImages[1] = getRandomIndex();
  }

  displayedImages[2] = getRandomIndex();
  while (displayedImages[0] === displayedImages[2] || displayedImages[1] === displayedImages[2]) {
    displayedImages[2] = getRandomIndex();
  }

  left.src = allProducts[displayedImages[0]].imageUrl;
  middle.src = allProducts[displayedImages[1]].imageUrl;
  right.src = allProducts[displayedImages[2]].imageUrl;
}
displayImages();

// generate a random index num

function getRandomIndex() {
  var randomIndex = Math.floor(Math.random() * allProducts.length);
  return randomIndex;
}

function handleClick(event) {
  console.log('pic was clicked');
  if (event.target.id === 'image-holder'){
    alert('please click an image');
  }
  for( var i = 0; i < allProducts.length; i++ ) {
    if (event.srcElement.src.endsWith(allProducts[i] .imageUrl)){
      allProducts[i].timesClicked++;
      console.log(event.srcElement.src, allProducts[i].timesClicked, allProducts[i].name);

    }
  }

  displayImages();
}




var totalClicks = 0;

if(totalClicks >= 25) {

  console.log(totalClicks);
}


imageHolder.addEventListener('click', handleClick);
