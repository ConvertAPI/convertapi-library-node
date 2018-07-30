/* eslint-disable no-console */

// set your api secret
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

// Short example of conversions chaining, the PDF pages extracted and saved as separated JPGs and then ZIP'ed
// https://www.convertapi.com/doc/chaining

var dir = require('os').tmpdir();

console.log("Converting PDF to JPG and compressing result files with ZIP\n");

var jpgResultPromise = convertapi.convert('jpg', { File: './examples/files/test.pdf' });

convertapi.convert('zip', { Files: jpgResultPromise }).then(function(zipResult) {
  zipResult.saveFiles(dir).then(function(files) {
    console.log("Files saved to\n" + files);
  });
});
