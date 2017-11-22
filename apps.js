//copy/pasted Scott's skeletal structure for the page.
var allProducts = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var indecies = [];

function Product(name, path) {
  // TODO: Build your constructor and necessary properties.
  this.name = name;
  this.picture = path;
  this.votes = 0;
}

for (var i = 0; i < productNames.length; i++){
  allProducts.push(new Product (productNames[i], 'url(assets/' + productNames[i] + '.jpg)'));
}

var productRank = {
  image1: document.getElementById('button1'),
  image2: document.getElementById('button2'),
  image3: document.getElementById('button3'),
  clicked: 0,
  tot: 0,

  getRandomIndexs: function() {
    //returns array of three random and unique indexes of allProduct array
    var ind = [];
    var num = 0;
    for (var j = 0; j < 3; j++){
      do {
        num = Math.floor(allProducts.length * Math.random());//looks like off by one error. Isn't.
      } while (ind.includes(num));
      ind.push(num);
    }
    return ind;
  },

  displayImages: function(arr) {
    var b1 = document.getElementById('button1');
    var b2 = document.getElementById('button2');
    var b3 = document.getElementById('button3');
    b1.style.backgroundImage = allProducts[arr[0]].picture;
    b2.style.backgroundImage = allProducts[arr[1]].picture;
    b3.style.backgroundImage = allProducts[arr[2]].picture;
  },
  disableImages: function() {
    productRank.image1.removeEventListener('click', productRank.onClick);
    productRank.image2.removeEventListener('click', productRank.onClick);
    productRank.image3.removeEventListener('click', productRank.onClick);
    var b1 = document.getElementById('button1');
    var b2 = document.getElementById('button2');
    var b3 = document.getElementById('button3');
    b1.disabled = true;
    b2.disabled = true;
    b3.disabled = true;
  },

  tallyClicks: function(elementId) {
    if (elementId === 'button1'){
      allProducts[indecies[0]].votes++;
    } else if (elementId === 'button2'){
      allProducts[indecies[1]].votes++;
    } else if (elementId === 'button3'){
      allProducts[indecies[2]].votes++;
    } else console.log('error in tallyClicks method');
  },

  displayResults: function(event) {
    //sorts by votes - highest vote first. Then builds chart.
    event.preventDefault();
    productRank.sortResults();
    var chr = document.getElementById('chart');
    chr.style.visibility = 'visible';
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: allProducts.map(function(x) {return x.name;}),
        datasets: [{
          label: '# of Votes',
          data: allProducts.map(function(x) {return x.votes;}),

          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true,
              max: 10,
              min: 0,
              stepSize: 1,
            }
          }]
        }
      }
    });
  },
  sortResults: function() {
    allProducts.sort(function(a, b) {
      return b.votes - a.votes;
    });
  },

  showButton: function() {
    var button = document.getElementById('display');
    button.style.visibility = 'visible';
    button.addEventListener('click', productRank.displayResults);
  },

  onClick: function(event) {
    event.preventDefault();
    console.log(event.target);
    productRank.clicked = event.target.id;
    indecies = productRank.getRandomIndexs();
    productRank.displayImages(indecies);
    console.log('indecies', indecies);
    productRank.tallyClicks(productRank.clicked);
    productRank.tot++;
    if (productRank.tot >= 5){//TODO increase after testing
      productRank.disableImages();
      productRank.showButton();
    }
  },
};

var ctx = document.getElementById('myChart').getContext('2d');
productRank.image1.addEventListener('click', productRank.onClick);
productRank.image2.addEventListener('click', productRank.onClick);
productRank.image3.addEventListener('click', productRank.onClick);
indecies = productRank.getRandomIndexs();
productRank.displayImages(indecies);
