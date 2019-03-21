const express = require('express');
const http = require('http');

const port = process.argv[2] || 3000;
const hostname = '0.0.0.0';

var app = express();

app.get("/", function(req, res) {
  res.send("Hello. This is / on node application");
});

app.get("/api", function(req, res) {
  res.send("Hello. This is /api.");
});

app.post("/api", function(req, res) {
  res.send("Hello. This is /post");
});

var server = http.createServer(app);
server.listen(port, hostname, function() {
  console.log("Server is listening on port " + port);
});
