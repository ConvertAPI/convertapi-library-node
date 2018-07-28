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
    const stream = fs.createReadStream('./examples/files/test.pdf');
    const result = await api.client.upload(stream, 'test.pdf');

    expect(result).to.be.a('string');
  });

  it ('should convert file to pdf', async () => {
    const params = { File: './examples/files/test.docx' };
    const result = await api.convert('pdf', params);

    expect(result.file.url).to.be.a('string');

    const files = await result.saveFiles('/tmp');

    expect(files[0]).to.be.a('string');
  });

  it ('should convert file url to pdf', async () => {
    const params = { File: 'https://www.w3.org/TR/PNG/iso_8859-1.txt' };
    const result = await api.convert('pdf', params);

    expect(result.file.url).to.be.a('string');

    const files = await result.saveFiles('/tmp');

    expect(files[0]).to.be.a('string');
  });

  it('should convert url to pdf', async () => {
    const params = { Url: 'http://convertapi.com' };
    const result = await api.convert('pdf', params, 'web');

    expect(result.file.url).to.be.a('string');
  });

  it('should zip multiple files', async () => {
    const files = ['./examples/files/test.docx', './examples/files/test.pdf'];
    const params = { Files: files };

    const result = await api.convert('zip', params);

    expect(result.file.url).to.be.a('string');
  });

  it('should perform chained conversion', async () => {
    const params1 = { File: './examples/files/test.docx' };

    const result1 = await api.convert('pdf', params1);

    const params2 = { Files: result1.files };

    const result2 = await api.convert('zip', params2);

    expect(result2.file.url).to.be.a('string');
  });
});
