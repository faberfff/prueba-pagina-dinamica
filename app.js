const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');

const mongodb = 'mongodb://127.0.0.1:27017/cantera2';  


mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected', mongodb))
      .catch(err => console.log(err));


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/user', require('./routes/create-user'));
app.use('/user', require('./routes/delete-user'));
app.use('/user', require('./routes/total-change-user'));
app.use('/user', require('./routes/partial-change-user'));

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
