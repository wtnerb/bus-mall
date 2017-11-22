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
// TODO: Don't forget to build your objects. How can you do this withough having to write 14 lines of `new Product(., ., .)`?

var productRank = {
  // TODO: All the properties of the object! What do you think you need? Try to write one piece at a time and make sure it does what you want before writing a little more.
  // NOTE: A-C-P reminder... Make very intentional and iterative changes to your code, and then A-C-P.
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
    //put results into an array
    //put array into tbl build from cookie proj
    event.preventDefault();
    productRank.sortResults();
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
              max: 5,
              min: 0,
              stepSize: 1,
            }
          }]
        }
      }
    });

    //when puting into table, this made sense. Not doing that right now.s
    // var arr = [];
    // var tbl = document.getElementById('tbody');
    // for (var l = 0; l < allProducts.length; l++){
    //   arr.push(allProducts[l].name + ' ' + allProducts[l].votes);
    // }
    // arr.push('total votes ' + productRank.tot);
    // var increment = 4;
    // for (var m = 0; m < arr.length; m += increment){
    //   var rowEl = document.createElement('tr');
    //   fillRow(rowEl, arr.slice(m, m + increment));
    //   tbl.appendChild(rowEl);
    // }
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
    // TODO: Hmm... what's going to happen here?
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
// var formSubmit = document.getElementById('add-store');
// function onSubmit(event) {
//   event.preventDefault();
//   var item = new Store(event.target.storeName.value, parseInt(event.target.min.value), parseInt(event.target.max.value), event.target.avg.value);

// }
//
// formSubmit.addEventListener('submit', onSubmit);
var ctx = document.getElementById("myChart").getContext('2d');
productRank.image1.addEventListener('click', productRank.onClick);
productRank.image2.addEventListener('click', productRank.onClick);
productRank.image3.addEventListener('click', productRank.onClick);
indecies = productRank.getRandomIndexs();
productRank.displayImages(indecies);
