import fs from 'fs';
import path from 'path';

const URI_REGEXP = /^https?:/i;
const DEFAULT_URL_FORMAT = 'url';

export const detectFormat = (params) => {
  if (params.Url) {
    return DEFAULT_URL_FORMAT;
  }

  let resource;

  if (params.File) {
    resource = params.File;
  } else if (params.Files) {
    [resource] = params.Files;
  }

  return path.extname(resource).substring(1);
};

export const buildFileParam = (api, value) => {
  if (URI_REGEXP.test(value)) {
    return value;
  }

  const stream = fs.createReadStream(value);
  const fileName = path.basename(value);

  return api.client.upload(stream, fileName);
};

export default {};
