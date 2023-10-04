'use strict';
 
const express = require('express');
 
// Constants
const PORT = 8082;
const HOST = '0.0.0.0';
 
// App
const app = express();
app.get('/post', (req, res) => {
  const username = req.header('X-Username'); // Access the X-Username header
  console.log(req.headers)
  console.log('Username:', username);
  res.send({
    "meta": {
    },
    "data": {
      "username": username,
      "message": 'Hello from post service mtfk'
    }
  });``
});
 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});