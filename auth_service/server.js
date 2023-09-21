'use strict';
 
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Constants
const PORT = 8083;
const HOST = '0.0.0.0';
 
// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


let privateKey = fs.readFileSync('private.key');

app.post('/encode', (req, res) => {
  const { username, password } = req.body;

  // Authenticate the user
  if (username === 'username' && password === 'password') {
    // If authenticated, generate a JWT token
    const token = jwt.sign({ username: username }, privateKey);
    console.log(token);
    res.send(token);
  } else {
    res.status(401).send('Authentication failed');
  }
});

app.get('/decode', (req, res) => {
  const token = req.header('Authorization').split(' ')[1]; // Extract the token part from the Authorization header

  // Verify and decode the JWT token
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      res.status(401).send('JWT verification failed');
    } else {
      res.send(decoded);
    }
  });
});
 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});