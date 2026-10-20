/* eslint-disable no-console */

// set your api token
var convertapi = require('../lib')(process.env.API_TOKEN);

// Example of converting the first page of a PDF to a JPG thumbnail.
// https://www.convertapi.com/pdf-to-jpg

var dir = require('os').tmpdir();

convertapi.convert('jpg', {
    File: './examples/files/test.pdf',
    PageRange: 1,
    ImageHeight: 300,
    ImageWidth: 300
  })
  .then(function(jpgResult) {
    return jpgResult.saveFiles(dir);
  })
  .then(function(files) {
    console.log("The thumbnail saved to\n" + files);
  })
  .catch(function(e) {
    console.error(e.toString());
  });
