/* eslint-disable no-console */

// set your api secret or token
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

// Example of converting Web Page URL to PDF and reading file data as string
// https://www.convertapi.com/web-to-pdf

var fromFormat = 'web';
var conversionTimeout = 180;
var https = require('https');
var Stream = require('stream').Transform;
var params = {
  Url: 'https://en.wikipedia.org/wiki/Data_conversion',
  FileName: 'web-example'
};

convertapi.convert('pdf', params, fromFormat, conversionTimeout)
  .then(function(result) {
    result.files.forEach(function(resultFile) {
      console.log("Result url: " + resultFile.url);

      https.get(resultFile.url, function(response) {
        var stream = new Stream();

        response.on('data', function(chunk) {
          stream.push(chunk);
        });

        response.on('end', function() {
          var data = stream.read()

          console.log("Downloaded data size: " + data.length);
        });
      });
    });
  })
  .catch(function(e) {
    console.error(e.toString());
  });
