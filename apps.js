//copy/pasted Scott's skeletal structure for the page.
var allProducts = [];
var productNames = ['boots', 'chair', 'scissors']; // TODO: see the pattern here, and what you need to fill in?

function Product(name, path) {
  // TODO: Build your constructor and necessary properties.
  this.name = name;
  this.index = path;
  this.clicks = 0;
}

for (var i = 0; i < productName.length; i++){
  allProducts.push(new Product (productNames[i], i));
}
// TODO: Don't forget to build your objects. How can you do this withough having to write 14 lines of `new Product(., ., .)`?

var productRank = {
  // TODO: All the properties of the object! What do you think you need? Try to write one piece at a time and make sure it does what you want before writing a little more.
  // NOTE: A-C-P reminder... Make very intentional and iterative changes to your code, and then A-C-P.

  getRandomIndexs: function() {
    //returns array of three random and unique indexes of allProduct array
    ind = [];
    var num = 0;
    for (var j = 0; j < 3; j++){
      do {
        num = Math.floor((allProduct.length - j) * Math.random());
      } while (ind.includes(num));
      ind.push(num);
    }
    return ind;
  },

  displayImages: function() {
    // TODO: Hmm... what's going to happen here?
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

  onClick: function() {
    // TODO: Hmm... what's going to happen here?
};

productRank.imageEls.addEventListener('click', productRank.onClick);
productRank.displayImages();
