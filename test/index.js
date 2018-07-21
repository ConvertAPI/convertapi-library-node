import { assert } from 'chai';
import ConvertAPI from '../src';

const convertapi = ConvertAPI(process.env.CONVERT_API_SECRET)

describe('ConvertAPI', () => {
  it('should assign secret', () => {
    const expectedVal = process.env.CONVERT_API_SECRET
    assert(convertapi.secret === expectedVal, 'Secret not assigned');
  });
});
