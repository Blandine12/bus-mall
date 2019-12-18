'use strict';

console.log('js linked!');

// var imageElements = document.getElementsByTagName('image-elements');
var left = document.getElementById('left');
var middle = document.getElementById('middle');
var right = document.getElementById('right');
var imageHolder = document.getElementById('image-holder');
var totalClicks = -1;

var allProducts = [];

function Product(name, imageUrl) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  this.imageViews = 0;
  allProducts.push(this);

}

function productNameArray() {
  var answer = [];
  for(var i = 0; i < allProducts.length; i++) {
    answer[i] = allProducts[i].name;
  }
  return answer;
}


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
    answer[i] = allProducts[i]. imageViews++;
  }
  return answer;
}

function numberOfVotes() {
  var answer = [];
  for(var i = 0; i < allProducts.length; i++) {
    answer[i] = allProducts[i]. timesClicked++;
  }
  return answer;
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

  left.src = allProducts[displayedImages[0]].imageUrl; allProducts[displayedImages[0]].imageViews++;

  middle.src = allProducts[displayedImages[1]].imageUrl; allProducts[displayedImages[1]].imageViews++;

  right.src = allProducts[displayedImages[2]].imageUrl; allProducts[displayedImages[2]].imageViews++;

  totalClicks = totalClicks + 1;

  console.log(totalClicks);
  if(totalClicks >= 25) {
    // console.log('Clicks done');
    // var footerEl = document.getElementsByTagName('footer')[0];
    // footerEl.textContent ='No more Chance';
    imageHolder.removeEventListener('click', handleClick);

    makeList();
    renderChart();
  }
}
displayImages();

// generate a random index num

function getRandomIndex() {
  var randomIndex = Math.floor(Math.random() * allProducts.length);
  return randomIndex;
}


function handleClick(event) {
  if (event.target.id === 'image-holder'){
    // alert('please click an image');
  }

  if(event.srcElement.src){
    for( var i = 0; i < allProducts.length; i++ ) {
      if (event.srcElement.src.endsWith(allProducts[i] .imageUrl)){
        allProducts[i].timesClicked++;
        //console.log(event.srcElement.src, allProducts[i].timesClicked, allProducts[i].name);
      }
    } displayImages();
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
