//copy/pasted Scott's skeletal structure for the page.
var allProducts = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

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
  images: [document.getElementById('button1'), document.getElementById('button2'), document.getElementById('button3')],
  total: 0,
  myChart: null,
  indecies: [],//will hold the three indecies of products in allProducts for each iteration

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
    for (i in this.images){
      this.images[i].style.backgroundImage = allProducts[this.indecies[i]].picture;
    }
  },
  disableImages: function() {
    for (i in this.images){
      this.images[i].disabled = true;
    }
  },

  tallyClicks: function(elementId) {
    if (elementId === 'button1'){
      allProducts[this.indecies[0]].votes++;
    } else if (elementId === 'button2'){
      allProducts[this.indecies[1]].votes++;
    } else if (elementId === 'button3'){
      allProducts[this.indecies[2]].votes++;
    } else console.log('error in tallyClicks method');
  },

  displayResults: function(event) {
    // sorts by votes - highest vote first. Then builds chart.
    event.preventDefault();
    //productRank.sortResults();
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
    button.addEventListener('click', this.displayResults);
  },

  onClick: function(event) {
    event.preventDefault();
    locStore.pars();
    var targt = event.target;
    console.log(targt);
    targt = targt.id;
    productRank.indecies = productRank.getRandomIndexs();
    productRank.displayImages();
    console.log('indecies', productRank.indecies);
    productRank.tallyClicks(targt);
    productRank.total++;
    locStore.saveData();
    if (productRank.total >= 25){//TODO increase after testing
      productRank.disableImages();
      productRank.showButton();
    }
  },
};

var locStore = {
  local: null,
  current: null,
  clicks: 0,

  pars: function () {
    //makes allProducts match stored array - if stored array exists
    this.clicks = localStorage.getItem ('clicks');
    this.local = JSON.parse (localStorage.getItem('stuff'));
    if (this.local) {
      for (i in allProducts){
        allProducts[i].votes = this.local[i];
      }
    }
    localStorage.clear();
  },

  saveData: function () {
    this.current = allProducts.map(function(x) {return x.votes;});
    this.current = JSON.stringify (this.current);
    localStorage.setItem ('stuff', this.current);
    localStorage.setItem ('clicks', this.clicks++);
    this.curret = null;
  },
};

var ctx = document.getElementById('myChart').getContext('2d');
for (i in productRank.images){
  productRank.images[i].addEventListener('click', productRank.onClick);
}

productRank.indecies = productRank.getRandomIndexs();
productRank.displayImages();
