const express = require('express');
const app = express();
const morgan = require('morgan');
const errors = require('./errors/errors');

const libraccioRoutes = require('./api/routes/libraccio');
const mondadoriRoutes = require('./api/routes/mondadori');

// Logs requests
app.use(morgan('dev'));

// Routes that handle requests
app.use('/libraccio', libraccioRoutes);
app.use('/mondadori', mondadoriRoutes);

// Handle errors
app.use((req, res, next) => {
  next(errors.notFound())
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
});

module.exports = app;