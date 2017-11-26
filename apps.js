//copy/pasted Scott's skeletal structure for the page.
var allProducts = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Product(name, path) {
  //collects properties of each product into an object
  this.name = name;
  this.picture = path;
  this.votes = 0;
}

for (var i = 0; i < productNames.length; i++){
  allProducts.push(new Product (productNames[i], 'url(assets/' + productNames[i] + '.jpg)'));
}

var productRank = {
  //holds most of the fuctionality for the survey
  images: [document.getElementById('0'), document.getElementById('1'), document.getElementById('2')],
  total: 0,
  myChart: null,
  indecies: [],

  getRandomIndexs: function() {
    //returns array of three random and unique indexes of allProduct array
    var ind = [];
    var num = 0;
    for (var j = 0; j < 3; j++){
      do {
        num = Math.floor(allProducts.length * Math.random());
      } while (ind.includes(num));
      ind.push(num);
    }
    return ind;
  },

  displayImages: function() {
    //displays the images
    for (i in this.images) {
      this.images[i].style.backgroundImage = allProducts[this.indecies[i]].picture;
    }
  },
  disableImages: function() {
    //at survey end, disables the buttons
    for (i in this.images) {
      this.images[i].disabled = true;
    }
  },

  tallyClicks: function(targetId) {
    //changed name of button Id attributes to match index in indecies array
    allProducts[this.indecies[parseInt(targetId)]].votes++;
  },

  displayResults: function(event) {
    //puts survey results into chart format
    event.preventDefault();
    var chr = document.getElementById('chart');
    chr.style.visibility = 'visible';
    productRank.myChart = new Chart(ctx, {
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
              stepSize: 1,
            }
          }]
        }
      }
    });
  },

  showButton: function() {
    //reveals button to display results
    var button = document.getElementById('display');
    button.style.visibility = 'visible';
    button.addEventListener('click', this.displayResults);
  },

  onClick: function(event) {
    //with each input on survey, stores results, primes question, checks if survey is complete
    locStore.pars();
    var targt = event.target.id;
    productRank.tallyClicks(targt);
    productRank.total++;
    productRank.indecies = productRank.getRandomIndexs();
    productRank.displayImages();
    locStore.saveData();
    if (productRank.total >= 25){
      productRank.disableImages();
      productRank.showButton();
    }
  },
};

var locStore = {
  //holds functionality for interacting with local storage
  clicks: 0, //currently unused

  pars: function () {
    //makes allProducts match stored array - if stored array exists
    this.clicks = localStorage.getItem ('clicks');
    var local = JSON.parse (localStorage.getItem('stuff'));
    if (local) {
      for (i in allProducts){
        allProducts[i].votes = local[i];
      }
    }
    localStorage.clear();
  },

  saveData: function () {
    //puts data into storage
    var current = allProducts.map(function(x) {return x.votes;});
    current = JSON.stringify (current);
    localStorage.setItem ('stuff', current);
    this.clicks++;
    localStorage.setItem ('clicks', this.clicks);
  },
};

var ctx = document.getElementById('myChart').getContext('2d');
for (i in productRank.images){
  productRank.images[i].addEventListener('click', productRank.onClick);
}

productRank.indecies = productRank.getRandomIndexs();//initialize survey
productRank.displayImages();
