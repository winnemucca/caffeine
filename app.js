// requirements
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    swig = require('swig'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var phantom=require('node-phantom-simple');

// routers
var apiRoutes = require('./routes/api');
var routes = require('./routes/index');
var caffeineRoutes = require('./routes/caffeine');

// instance of express
var app = express();

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/caffeine';
mongoose.connect(mongoUri, function (err, db) {
  if (err) {
    console.log(err);
  }
  console.log("connected!");
});

// connect to mongoose
// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/caffeine');


// view engine setup
swig = new swig.Swig();
app.engine('html',swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// routes
app.use('/', routes);
app.use('/api',apiRoutes);
// app.use('/caffeine',caffeineRoutes);
// app.use('templates/:templateid', routes);


// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;