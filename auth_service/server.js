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
    res.send({
      "meta": {},
      "data": {
        "token": token
      }
    });
  } else {
    res.status(401).send('Authentication failed');
  }
});

app.get('/decode', (req, res) => {
  try {
    console.log('hello');
    const authorizationHeader = req.header('Authorization');

    // Check if the Authorization header is missing
    if (!authorizationHeader) {
      res.status(401).send('Authorization header missing');
      return; // Exit the handler
    }

    // Check if the Authorization header starts with 'Bearer '
    if (!authorizationHeader.startsWith('Bearer ')) {
      res.status(401).send('Bearer token missing');
      return; // Exit the handler
    }

    const token = authorizationHeader.split(' ')[1]; // Extract the token part from the Authorization header

    // Verify and decode the JWT token
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        // Log the error
        console.error('JWT verification failed:', err);

        // Send a 401 Unauthorized response
        res.status(401).send('JWT verification failed');
      } else {
        console.log(decoded.username);
        res.set({
          'X-Username': decoded.username,
          'X-iat': decoded.iat
        })
        res.send();
      }
    });
  } catch (error) {
    // Handle other errors, if any
    console.error('An error occurred:', error);
    res.status(500).send('Internal server error');
  }
});

 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});