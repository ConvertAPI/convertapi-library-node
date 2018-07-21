/* eslint-disable no-console */
const convertapi = require('../lib')(process.env.CONVERT_API_SECRET);

if (convertapi.secret)
  console.log("Convert API Node.js client configured");
else
  console.log("Convert API Node.js client not configured");
