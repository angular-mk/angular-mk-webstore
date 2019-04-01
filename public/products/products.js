// Get Products

var wrapper = $('#target');

/* FORMAT
  div (col-sm-4)
    div (item)
      img (thumbnail)
      h4 name
      div item-info
        Price Quantity
*/

$.get('/products/api', function(data) {
  if (!data) {
    // No Data
    wrapper.html("<h1>No Data</h1>");
    return;
  }

  // Append HTML
  for (var i = 0; i < data.length; i++) {
    wrapper.append(formatBox(data[i]));
  }

  // Add Handler
  var items = $("#target div .item");
  items.click(function(action) {
    if ($(action.target).attr('href')) {
      window.location.href = $(action.target).attr('href');
    }
  });
});

function formatBox(object) {

  var output = '<div class="col-sm-4"><div class="item">';
  output += '<img class="thumbnail" src="' + object.thumbnail + '" href="/products/' + object._id +  '" /> ';
  output += '<h4 class="name">' + object.name + '</h4>';
  output += '<div class="item-info">'
  output += '<span class="price">' + object.price + 'USD </span>';

  if (object.quantity <= 0) {
    output += '<span class="quantity outofstock">Out of Stock</span>';
  } else {
    output += '<span class="quantity"> Q: ' + object.quantity + '</span>';
  }

  return (output + "</div></div></div>");
}
