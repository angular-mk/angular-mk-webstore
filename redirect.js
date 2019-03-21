const express = require("express");
const http = require("http")
const app = express();

app.get('*', function(req, res) {
  console.log("New Redirect.");
  res.redirect('https://angularmk.xyz' + req.url);
});

http.createServer(app).listen(3001);
