// require the express module
const express = require("express");

// initialize express app
const app = express();

// create endpoints/route handlers
app.get("/", (req, res) => {
  res.send("Hello World");
});

// listen on a port
app.listen(5000);

// ROUTE HANDLING
// app.get() - GET requests
// app.post() - POST requests
// app.put() - PUT requests
// app.delete() - DELETE requests
// app.all() - all requests

// The request and response objects are the same as the ones from nodeJS
// request object represents the HTTP request properties for the request query string, url parameter, body, HTTP headers, etc.
// response object represents the HTTP response that the Express app sends when it receives an HTTP request

// With Express data can be parsed from the request body using the body-parser middleware

// MIDDLEWARE
// Middleware functions are functions that have access to the request and response objects
// Express has built-in middleware but also allows you to create custom middleware
// Middleware functions can execute any code, make changes to the request and response objects, end the request-response cycle, and call the next middleware function in the stack

// Some other nodeJS frameworks: Sails, Meteor, Hapi, Koa, Loopback, NestJS
// Express gives full control of request and response objects
