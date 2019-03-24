var express = require('express');
var router = express.Router();

var paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // Sandbox or live
  client_id: 'Ae5LINvmaErzV_v-pldC8ptoMiru1Us-JH5mcEFLtnHtEtC8NRFnzWv6wjxZ9bnEFvw2U0fMSp7o4cSg',
  client_secret: 'EN7KaRexNlfKfGV6qdftKkXbYCmFoGAE-LddFZku36Vfkw4tnsMaCbW9MlYKfl7rGYMoMVFmAOoD428a'
});

router.get('/process', function(req, res) {
  console.log("Processing Payment");
  var paymentId = req.query.paymentId;
  var payerId = { payer_id: req.query.PayerID };

  paypal.payment.execute(paymentId, payerId, function(error, payment){
    if(error){
      console.error(JSON.stringify(error));
    } else {
      if (payment.state == 'approved'){
        console.log('payment completed successfully');
        console.log(payment);
        res.sendStatus(200);
      } else {
        console.log('payment not successful');
      }
    }
  });
});

router.get('/cancel', function(req, res) {
  res.sendStatus(200);
});

router.get('/test-site', function(req, res) {
  res.render('payment.ejs');
});

router.post('/test-site', function(req, res) {

  // Build PayPal payment request
  var payReq = JSON.stringify({
    intent:'sale',
    payer:{
      payment_method:'paypal'
    },
    redirect_urls:{
      return_url:'https://angularmk.xyz/payment-api/process',
      cancel_url:'https://angularmk.xyz/payment-api/cancel'
    },
    transactions:[{
      amount:{
        total:'0.01',
        currency:'CAD'
      },
      description:'This is the payment transaction description.'
    }]
  });

  // Create Payment
  paypal.payment.create(payReq, function(error, payment){
    var links = {};

    if(error){
      console.error(JSON.stringify(error));
    } else {
      // Capture HATEOAS links
      payment.links.forEach(function(linkObj){
        links[linkObj.rel] = {
          href: linkObj.href,
          method: linkObj.method
        };
      })

      // If the redirect URL is present, redirect the customer to that URL
      if (links.hasOwnProperty('approval_url')){
        // Redirect the customer to links['approval_url'].href
        console.log("redirect to " + links['approval_url'].href);
        res.redirect(links['approval_url'].href);
      } else {
        console.error('no redirect URI present');
      }
    }
  });
});

module.exports = router;
