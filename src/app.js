const createError = require('http-errors');
const express = require('express');
const cors = require('cors'); 
const logger = require('morgan');
const compression = require("compression");
const helmet = require("helmet");


const courseRouter = require('./routes/course');

const app = express();



 /*
 helmet can set appropriate HTTP headers that help protect 
 your app from well-known web vulnerabilities
 */
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
/*
compression: For a high-traffic website in production you 
wouldn't use this middleware. Instead, you would
 use a reverse proxy like Nginx.
*/
 // Compress all routes
 app.use(compression());
app.use(courseRouter);

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
