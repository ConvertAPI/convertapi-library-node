/* eslint-disable no-console */

// set your api secret or token
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

// Example of saving Word docx to PDF using OpenOffice converter
// https://www.convertapi.com/doc-to-pdf/openoffice

var dir = require('os').tmpdir();
var upload = convertapi.upload('./examples/files/test.docx');

convertapi.convert('pdf', { File: upload, converter: 'openoffice' })
  .then(function(result) {
    return result.saveFiles(dir);
  })
  .then(function(files) {
    console.log("The PDF saved to\n" + files);
  })
  .catch(function(e) {
    console.error(e.toString());
  });
