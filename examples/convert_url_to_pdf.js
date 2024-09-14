/* eslint-disable no-console */

// set your api secret or token
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

// Example of converting Web Page URL to PDF file
// https://www.convertapi.com/web-to-pdf

var dir = require('os').tmpdir();
var fromFormat = 'web';
var conversionTimeout = 180;

var params = {
  Url: 'https://en.wikipedia.org/wiki/Data_conversion',
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
