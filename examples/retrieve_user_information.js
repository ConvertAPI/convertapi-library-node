/* eslint-disable no-console */

// set your api token
var convertapi = require('../lib')(process.env.API_TOKEN);

// Retrieve user information
// https://www.convertapi.com/doc/user

convertapi.getUser()
  .then(function(info) {
    console.log("Name: " + info.FullName);
  })
  .catch(function(e) {
    console.error(e.toString());
  });
