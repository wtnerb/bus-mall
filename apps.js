//copy/pasted Scott's skeletal structure for the page.
var allProducts = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb'];

function Product(name, path) {
  // TODO: Build your constructor and necessary properties.
  this.name = name;
  this.picture = path;
  this.clicks = 0;
}

for (var i = 0; i < productNames.length; i++){
  allProducts.push(new Product (productNames[i], 'url(assets/' + productNames[i] + '.jpg)'));
}
// TODO: Don't forget to build your objects. How can you do this withough having to write 14 lines of `new Product(., ., .)`?

var productRank = {
  // TODO: All the properties of the object! What do you think you need? Try to write one piece at a time and make sure it does what you want before writing a little more.
  // NOTE: A-C-P reminder... Make very intentional and iterative changes to your code, and then A-C-P.

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
    b1.style.size = 200;
    b2.style.backgroundImage = allProducts[arr[1]].picture;
    b2.style.size = 200;
    b3.style.backgroundImage = allProducts[arr[2]].picture;
    b3.style.size = 200;
  },

  tallyClicks: function(elementId) {
    // TODO: Hmm... what's going to happen here?
  },

  displayResults: function() {
    // TODO: Hmm... what's going to happen here?
  },

  showButton: function() {
    // TODO: Hmm... what's going to happen here?
  },

  onClick: function(event) {
    // TODO: Hmm... what's going to happen here?
  },
};
// var formSubmit = document.getElementById('add-store');
// function onSubmit(event) {
//   event.preventDefault();
//   var item = new Store(event.target.storeName.value, parseInt(event.target.min.value), parseInt(event.target.max.value), event.target.avg.value);

// }
//
// formSubmit.addEventListener('submit', onSubmit);

//productRank.imageEls.addEventListener('click', productRank.onClick);
productRank.displayImages(productRank.getRandomIndexs());
