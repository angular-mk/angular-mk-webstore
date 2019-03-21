var express = require('express');
var router = express.Router();

// Book Book Schema
const Email = require('../Schema/EmailSub.js');

router.post('/email', function(req, res) {

  Email.findOne({email: req.body.email}).exec(function(err, email) {
    if (email) {
      res.sendStatus(208);
    } else {
      var emailObj = new Email({
        email: req.body.email
      });

      emailObj.save(function(err, post) {
        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
