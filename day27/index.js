const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;

// morgan middleware for logging
app.use(morgan(':method :url :status :response-time ms'));

app.get('/', (req, res) => {
  res.status(200).send('server working');
});

module.exports = app.listen(port);