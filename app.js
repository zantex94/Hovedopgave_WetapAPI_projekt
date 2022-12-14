var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash");
const helmet = require("helmet");
  

var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customer');

var app = express();
// Passport config
require("./model/passport")(passport);

// //helmet security.
// app.use(helmet());
// // X-Powered-By preventing to tell what system it runs on.
// app.use(helmet.hidePoweredBy({setTo: 'Django/1.2.2 SVN:65334'}));
// //Referrer-Policy that refer to the http adress.
// app.use(
//   helmet.referrerPolicy({
//     policy: ["origin", "unsafe-url"],
//   })
//  );
//  // cross-site scripting extra prevention layer.
//  app.use(helmet.xssFilter());
//  //Previnting hackers from clickable attacks.
//  app.use(
//   helmet.frameguard({
//     action: "deny",
//   })
//  );
//  // strict transport secruity.
//  app.use(
//   helmet.hsts({
//     maxAge: 123456,
//     includeSubDomains: false,
//   })
//  );
//  //CSP preventing cross-site scription. if not set all HTTP response on the browser.
//  app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "script-src": ["'self'", "securecoding.com"],
//       "style-src": null,
//     },
//   })
//  );

// Body parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Required for session
app.use(
  session({
    // It holds the secret key for session
    secret: "secret",
    // force to save the session.
    resave: true,
    // save the session in a store.
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); // Login session

// Connect flash
app.use(flash()); // Flash messages stored in session



// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, 'views/Wetap customers'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use("/public", express.static("./public/"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
