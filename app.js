require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const passport = require('passport');

require('./app_api/database/db');

require('./app_api/config/passport')

const homeRouter = require('./app_server/routes/home');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const aboutRouter = require('./app_server/routes/about');
const roomsRouter = require('./app_server/routes/rooms');
const newsRouter = require('./app_server/routes/news');
const mealsRouter = require('./app_server/routes/meals');
const contactRouter = require('./app_server/routes/contact');
const apiRouter = require('./app_api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// register handlebars partials (https://www.npmjs.com/package/hbs)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// allow CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/about', aboutRouter);
app.use('/rooms', roomsRouter);
app.use('/news', newsRouter);
app.use('/meals', mealsRouter);
app.use('/contact', contactRouter);
app.use('/api', apiRouter);

app.use(function(err, req, res, next) {
  if ( err.name === 'UnauthorizedError') {
    res
      .status(404)
      .json({ "message": err.name + ": " + err.message});
  }
}); 

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
