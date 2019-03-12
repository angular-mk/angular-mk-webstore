var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MongoStore = require('connect-mongo')(session);

var port = 8080;

var dburl = "mongodb://dev-user:devuser123@ds029224.mlab.com:29224/angular-mk-store";

// Express Session Setup
var opt = {
  secret: 'some secret',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({
    url: dburl
  }),
  cookie: { maxAge: 6000000 },
  useNewUrlParser: true
}

app.use(session(opt));

app.use(passport.initialize());
app.use(passport.session());

// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// MongoDB Connection
mongoose.connect(dburl, function(){
  console.log('Connected to Database');
});

// Homepage
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
  res.send("Hello World.");
});

// 404 Error Handling
app.get('*', function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
