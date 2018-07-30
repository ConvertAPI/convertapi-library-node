/* eslint-disable no-console */

// set your api secret
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

// Example of extracting first page from PDF and then chaining conversion PDF page to JPG.
// https://www.convertapi.com/pdf-to-extract
// https://www.convertapi.com/pdf-to-jpg

var dir = require('os').tmpdir();

convertapi
  .convert('extract', {
    File: './examples/files/test.pdf',
    PageRange: 1
  }).then(function(pdfResult) {

    convertapi.convert('jpg', {
      File: pdfResult.file,
      ScaleImage: true,
      ScaleProportions: true,
      ImageHeight: 300,
      ImageWidth: 300
    }).then(function(jpgResult) {

      jpgResult.saveFiles(dir).then(function(files) {
        console.log("The thumbnail saved to\n" + files);
      });

    });
  });

