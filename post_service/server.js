'use strict';
 
const express = require('express');
 
// Constants
const PORT = 8082;
const HOST = '0.0.0.0';
 
// App
const app = express();
app.get('/post', (req, res) => {
  res.send('Hello from post service');``
});
 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});