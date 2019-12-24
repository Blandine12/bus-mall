'use strict';

console.log('js linked!');

var left = document.getElementById('left');
var middle = document.getElementById('middle');
var right = document.getElementById('right');
var imageHolder = document.getElementById('image-holder');
var totalClicks = -1;

var allProducts = [];

function Product(name, imageUrl, timesClicked, imageViews) {
  this.name = name;
  this.imageUrl = imageUrl;

  if(timesClicked) {
    this.timesClicked = timesClicked;
  }
  else {
    this.timesClicked = 0;
  }

  if(imageViews) {
    this.imageViews =imageViews;
  }
  else{
    this.imageViews = 0;
  }

  allProducts.push(this);
}

function productNameArray() {
  var answer = [];
  for(var i = 0; i < allProducts.length; i++) {
    answer[i] = allProducts[i].name;
  }
  return answer;
}

// https://www.w3schools.com/jsref/jsref_random
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function numberOfViews() {
  var answer =[];
  for(var i = 0; i < allProducts.length; i++) {
    answer[i] = allProducts[i]. imageViews;
  }
  return answer;
}

function numberOfVotes() {
  var answer = [];
  for(var i = 0; i < allProducts.length; i++) {
    answer[i] = allProducts[i]. timesClicked;
  }
  return answer;
}

// verify product in localStorage
var productString = localStorage.getItem('localProduct');

if (productString) {
  console.log('high');
  // if so, create product instance
  var productArray = JSON.parse(productString);
  // turn no product into product
  for(var i = 0; i < productArray.length; i++) {
    console.log('good');

    new Product(productArray[i].name,productArray[i].imageUrl,
      productArray[i].timesClicked, productArray[i].imageViews);
  }
}
else{
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
}


// generate a random index num
function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

var previouslyDisplayed = [];
function displayImages (){

  totalClicks = totalClicks + 1;

  console.log(totalClicks);
  if(totalClicks >= 25) {

    var stringifyAllProducts = JSON.stringify(allProducts);
    localStorage.setItem('localProduct', stringifyAllProducts);

    imageHolder.removeEventListener('click', handleClick);

    makeList();
    renderChart();
  }
  else {
    var aboutToDisplay = [];

    for (var i =0; i < 3; i++) {
      var nextImageIndex = getRandomIndex();
      while(previouslyDisplayed.includes(nextImageIndex) ||aboutToDisplay.includes(nextImageIndex)){
        nextImageIndex = getRandomIndex();
      }
      aboutToDisplay[i] = nextImageIndex;
    }

    left.src = allProducts[aboutToDisplay[0]].imageUrl;
    allProducts[aboutToDisplay[0]].imageViews++;

    middle.src = allProducts[aboutToDisplay[1]].imageUrl;
    allProducts[aboutToDisplay[1]].imageViews++;

    right.src = allProducts[aboutToDisplay[2]].imageUrl;
    allProducts[aboutToDisplay[2]].imageViews++;

    previouslyDisplayed = aboutToDisplay;
  }

}
displayImages();

function handleClick(event) {
  if (event.target.id === 'image-holder'){
    // alert('please click an image');
  }

  if(event.srcElement.src){
    for( var i = 0; i < allProducts.length; i++ ) {
      if (event.srcElement.src.endsWith(allProducts[i].imageUrl)){
        allProducts[i].timesClicked++;
        //console.log(event.srcElement.src, allProducts[i].timesClicked, allProducts[i].name);
      }
    }

    displayImages();
  }
}

imageHolder.addEventListener('click', handleClick);

function makeList() {
  var listContainer = document.getElementsByTagName('ul')[0];
  for(var i = 0; i < allProducts.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent =`${allProducts[i].name}: ${allProducts[i].timesClicked} vote ${allProducts[i].imageViews} views.`;
    listContainer.appendChild(listItem);
  }
}

function renderChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNameArray(),
      datasets: [{
        label: '# of Views',
        data: numberOfViews(),
        backgroundColor: getRandomColor(),
      },
      {
        label: '# of votes',
        data: numberOfVotes(),
        backgroundColor: getRandomColor(),
        borderWidth: 1,
      },
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
