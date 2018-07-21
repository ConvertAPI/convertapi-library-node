import { assert } from 'chai';
import ConvertAPI from '../src';

const api = ConvertAPI(process.env.CONVERT_API_SECRET);

describe('ConvertAPI', () => {
  it('should assign secret', () => {
    const expectedVal = process.env.CONVERT_API_SECRET;
    assert(api.secret === expectedVal, 'Secret not assigned');
  });

  it('should convert', async () => {
    const params = { Url: 'http://convertapi.com' };
    const result = await api.convert('pdf', params, 'web');

    console.log(result);
  })
});
