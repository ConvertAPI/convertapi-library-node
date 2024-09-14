/* eslint-disable no-console */

// set your api secret or token
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

// Retrieve user information
// https://www.convertapi.com/doc/user

convertapi.getUser()
  .then(function(info) {
    console.log("Name: " + info.FullName);
  })
  .catch(function(e) {
    console.error(e.toString());
  });
