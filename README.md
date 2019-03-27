# ConvertAPI Node.js Client

[![npm version](https://badge.fury.io/js/convertapi.svg)](https://badge.fury.io/js/convertapi)
[![Build Status](https://travis-ci.org/ConvertAPI/convertapi-node.svg)](https://travis-ci.org/ConvertAPI/convertapi-node)
[![dependencies Status](https://david-dm.org/ConvertAPI/convertapi-node/status.svg)](https://david-dm.org/ConvertAPI/convertapi-node)
[![devDependencies Status](https://david-dm.org/ConvertAPI/convertapi-node/dev-status.svg)](https://david-dm.org/ConvertAPI/convertapi-node?type=dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Convert your files with our online file conversion API

[The ConvertAPI](https://convertapi.com) helps converting various file formats. Creating PDF and Images from various sources like Word, Excel, Powerpoint, images, web pages or raw HTML codes. Merge, Encrypt, Split, Repair and Decrypt PDF files. And many others files manipulations. In just few minutes you can integrate it into your application and use it easily.

## Requirements

Node.js v6.0 and later.

## Installation

```sh
npm install convertapi --save
```

## Usage

The package needs to be configured with your account's secret key which is available at https://www.convertapi.com/a

Require it with the key's value:

```javascript
var convertapi = require('convertapi')('your-api-secret');
```

Or using ES modules:

```javascript
import convertapiPackage from 'convertapi';

const convertapi = convertapiPackage('your-api-secret');
```

### File conversion

Example to convert file to PDF. All supported formats and options can be found
[here](https://www.convertapi.com).

```javascript
convertapi.convert('pdf', { File: '/path/to/my_file.docx' })
  .then(function(result) {
    // get converted file url
    console.log("Converted file url: " + result.file.url);

    // save to file
    return result.file.save('/path/to/save/file.pdf');
  })
  .then(function(file) {
    console.log("File saved: " + file);
  });
```

Other result operations:

```javascript
// save all result files to folder
result.saveFiles('/path/to/save/files').then(function(files) {
  console.log("Files saved: " + files);
});

// get conversion cost
console.log("Conversion cost: " + result.conversionCost);
```

#### Convert file url

```javascript
var resultPromise = convertapi.convert('pdf', { File: 'https://website/my_file.docx' });
```

#### Specifying from format

```javascript
var resultPromise = convertapi.convert('pdf', { File: 'https://website/my_file' }, 'docx');
```

#### Additional conversion parameters

ConvertAPI accepts extra conversion parameters depending on converted formats. All conversion
parameters and explanations can be found [here](https://www.convertapi.com).

```javascript
var resultPromise = convertapi.convert(
  'pdf',
  {
    File: '/path/to/my_file.docx',
    PageRange: '1-10',
    PdfResolution: '150',
  }
);
```

### User information

You can always check remaining seconds amount by fetching [user information](https://www.convertapi.com/doc/user).

```javascript
convertapi.getUser().then(function(info) {
  console.log("Seconds left: " + info.SecondsLeft);
});
```

### More examples

You can find more advanced examples in the [examples/](https://github.com/ConvertAPI/convertapi-node/tree/master/examples) folder.

## Development Commands

- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm run test:only` - Run tests without linting or coverage.
- `npm run test:watch` - You can even re-run tests on file changes!
- `npm run test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/ConvertAPI/convertapi-node. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

ConvertAPI Node.js Client is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
