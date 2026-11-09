/* eslint-disable no-console */

// set your api token
var convertapi = require('../lib')(process.env.API_TOKEN);

// Example of converting Web Page URL to PDF file
// https://www.convertapi.com/html-to-pdf

var dir = require('os').tmpdir();
var fromFormat = 'html';
var conversionTimeout = 180;

var params = {
  Url: 'https://cdn.convertapi.com/public/files/demo',
  FileName: 'web-example'
};

convertapi.convert('pdf', params, fromFormat, conversionTimeout)
  .then(function(result) {
    return result.saveFiles(dir);
  })
  .then(function(files) {
    console.log("The web page PDF saved to\n" + files);
  })
  .catch(function(e) {
    console.error(e.toString());
  });
