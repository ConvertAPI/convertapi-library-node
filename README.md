# ConvertAPI Node.js Client

[![npm version](https://badge.fury.io/js/convertapi.svg)](https://badge.fury.io/js/convertapi)
[![Build Status](https://github.com/ConvertAPI/convertapi-node/actions/workflows/main.yml/badge.svg)](https://github.com/ConvertAPI/convertapi-node/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Convert your files with our online file conversion API

[The ConvertAPI](https://convertapi.com) helps in converting various file formats. Creating PDF and Images from various sources like Word, Excel, Powerpoint, images, web pages or raw HTML codes. Merge, Encrypt, Split, Repair and Decrypt PDF files and many other file manipulations. You can integrate it into your application in just a few minutes and use it easily.

## Installation

```sh
npm install convertapi --save
```

## Usage

The package needs to be configured with your account's secret key or token which is available at https://www.convertapi.com/a

Require it with the key's value:

```javascript
var convertapi = require('convertapi')('your-api-secret-or-token');
```

Or using ES modules:

```javascript
import ConvertAPI from 'convertapi';

const convertapi = new ConvertAPI('your-api-secret-or-token');
```

You can specify additional options, like proxy configuration and timeouts, when initializing the client:

```javascript
var convertapi = require('convertapi')('your-api-secret-or-token', {
  conversionTimeout: 60,
  uploadTimeout: 60,
  downloadTimeout: 60,
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'testuser',
      password: 'secret'
    }
  },
  keepAlive: true
});
```

If using ES module:

```javascript
const convertapi = new ConvertAPI('your-api-secret-or-token', { conversionTimeout: 60 });
```

### File conversion

Convert file to PDF example. All supported file formats and options can be found
[here](https://www.convertapi.com/conversions).

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
  })
  .catch(function(e) {
    console.error(e.toString());
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

ConvertAPI accepts additional conversion parameters depending on selected formats. All conversion
parameters and explanations can be found [here](https://www.convertapi.com/conversions).

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

You can always check your conversion counts by fetching [user information](https://www.convertapi.com/doc/user).

```javascript
convertapi.getUser().then(function(info) {
  console.log("ConversionsTotal: " + info.ConversionsTotal);
  console.log("ConversionsConsumed: " + info.ConversionsConsumed);
});
```

### Error handling

```javascript
convertapi
  .convert('pdf', { File: 'https://website/my_file.docx' })
  .catch(function(e) {
    console.error(e.toString());
    console.debug(e.request);
    console.debug(e.response);
  });
```

### Alternative domain

Set `base_uri` parameter to use other service domains. Dedicated to the region [domain list](https://www.convertapi.com/doc/servers-location).

```js
var convertapi = require('../lib')(process.env.CONVERT_API_SECRET, { baseUri: 'https://eu-v2.convertapi.com/' });
```

### More examples

Find more advanced examples in the [examples/](https://github.com/ConvertAPI/convertapi-node/tree/master/examples) folder.

## Development Commands

- `npm run clean` - Remove the `lib/` directory
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
