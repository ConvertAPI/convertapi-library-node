/* eslint-disable no-console */

var fs = require('fs');

// set your api secret or token
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

// Example of using readable stream to convert to pdf
// https://www.convertapi.com/docx-to-pdf

var dir = require('os').tmpdir();

// get readble stream (could be any readable stream)
var stream = fs.createReadStream('./examples/files/test.docx');

// Upload stream to the API. When uploading stream, file name must be provided.
var uploadResult = convertapi.upload(stream, 'test.docx');

convertapi.convert('pdf', { File: uploadResult })
  .then(function(result) {
    return result.saveFiles(dir);
  })
  .then(function(files) {
    console.log("The PDF saved to\n" + files);
  })
  .catch(function(e) {
    console.error(e.toString());
  });
