import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { getReqQueryFeatureNames } from './get-req-query-feature-names';

describe('getReqQueryFeatureNames()', async should => {
  const { assert } = should('');
  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: getReqQueryFeatureNames(),
    expected: []
  });
  {
    const req = deepFreeze({
      query: null
    });
    assert({
      given: 'incorrectly formed req object',
      should: 'return an empty array',
      actual: getReqQueryFeatureNames(req),
      expected: []
    });
  }
  {
    const req = deepFreeze({
      query: {
        ft: null
      }
    });
    assert({
      given: 'incorrectly formed req object',
      should: 'return an empty array',
      actual: getReqQueryFeatureNames(req),
      expected: []
    });
  }
  {
    const req = deepFreeze({
      something: {
        wrong: 'undefined'
      }
    });
    assert({
      given: 'incorrectly formed req object',
      should: 'return an empty array',
      actual: getReqQueryFeatureNames(req),
      expected: []
    });
  }
  {
    const req = deepFreeze({
      query: {
        ft: 'foo,bar,help'
      }
    });
    assert({
      given: 'req object with features',
      should: 'return the correct features',
      actual: getReqQueryFeatureNames(req),
      expected: ['foo', 'bar', 'help']
    });
  }
});
