/* eslint-disable no-console */

// set your api secret or token
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

// Example of saving Word docx to PDF and to PNG
// https://www.convertapi.com/docx-to-pdf
// https://www.convertapi.com/docx-to-png

var dir = require('os').tmpdir();

// Upload to the API only once
var upload = convertapi.upload('./examples/files/test.docx');

convertapi.convert('pdf', { File: upload })
  .then(function(result) {
    return result.saveFiles(dir);
  })
  .then(function(files) {
    console.log("The PDF saved to\n" + files);
  })
  .catch(function(e) {
    console.error(e.toString());
  });

// Reuse the same uploaded file
convertapi.convert('png', { File: upload })
  .then(function(result) {
    return result.saveFiles(dir);
  })
  .then(function(files) {
    console.log("The PNG saved to\n" + files);
  })
  .catch(function(e) {
    console.error(e.toString());
  });
