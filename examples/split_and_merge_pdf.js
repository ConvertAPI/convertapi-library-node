/* eslint-disable no-console */

// set your api secret or token
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

// Example of extracting first and last pages from PDF and then merging them back to new PDF.
// https://www.convertapi.com/pdf-to-split
// https://www.convertapi.com/pdf-to-merge

var dir = require('os').tmpdir();

convertapi
  .convert('split', {
    File: './examples/files/test.pdf',
  })
  .then(function (result) {
    var firstPage = result.files[0];
    var lastPage = result.files[result.files.length - 1];
    var files = [firstPage, lastPage];

    return convertapi.convert('merge', { Files: files });
  })
  .then(function(result) {
    return result.saveFiles(dir);
  })
  .then(function(files) {
    console.log("The PDF saved to " + files);
  })
  .catch(function(e) {
    console.error(e.toString());
  });
