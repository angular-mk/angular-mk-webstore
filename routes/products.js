var express = require('express');
var router = express.Router();

var products = require('../Schema/Product.js');

router.get('/', function(req, res) {
  res.render('sites/products', {title : "Products"});
});

router.get('/api', function(req, res) {
  if (req.query.name) {
    // TODO: FINISH FIELD
  } else {
    products.find({}, function(err, products) {
      if (err) {
        res.sensStatus(500);
      } else {
        res.json(products);
      }
    });
  }
});

module.exports = router;
