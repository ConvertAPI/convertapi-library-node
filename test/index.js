import { expect } from 'chai';
import ConvertAPI from '../src';
import fs from 'fs';

const api = ConvertAPI(process.env.CONVERT_API_SECRET);

describe('ConvertAPI', () => {
  it('should assign secret', () => {
    const expectedVal = process.env.CONVERT_API_SECRET;
    expect(api.secret).to.equal(expectedVal);
  });

  it ('should upload file', async () => {
    const stream = fs.createReadStream('./examples/files/test.docx');
    const result = await api.client.upload(stream, 'test.docx');

    expect(result).to.be.a('string');
  });

  it ('should convert file to pdf', async () => {
    const params = { File: './examples/files/test.docx' };
    const result = await api.convert('pdf', params, 'docx');

    expect(result.file.url).to.be.a('string');

    const files = await result.saveFiles('/tmp');

    expect(files[0]).to.be.a('string');
  });

  it('should convert url to pdf', async () => {
    const params = { Url: 'http://convertapi.com' };
    const result = await api.convert('pdf', params, 'web');

    expect(result.file.url).to.be.a('string');

    const files = await result.saveFiles('/tmp');

    expect(files[0]).to.be.a('string');
  });
});
