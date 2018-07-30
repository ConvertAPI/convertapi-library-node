/* eslint-disable no-console */

// set your api secret
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

// Short example of conversions chaining, the PDF pages extracted and saved as separated JPGs and then ZIP'ed
// https://www.convertapi.com/doc/chaining

var dir = require('os').tmpdir();

console.log("Converting PDF to JPG and compressing result files with ZIP\n");

convertapi.convert('jpg', { File: './examples/files/test.pdf' }).then(function(jpgResult) {
  console.log("Conversions done. Cost " + jpgResult.conversionCost + ". Total files created: " + jpgResult.files.length);

  convertapi.convert('zip', { Files: jpgResult.files }).then(function(zipResult) {
    console.log("Conversions done. Cost " + zipResult.conversionCost + ". Total files created: " + zipResult.files.length);

    zipResult.saveFiles(dir).then(function(files) {
      console.log("Files saved to\n" + files);
    });
  });
});
