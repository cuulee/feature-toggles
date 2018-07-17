# feature-toggles

Low-level feature toggle tools for Node and browsers.

## Install

```
npm install --save @paralleldrive/feature-toggles
```

## Use it

```js
import {
  getActiveFeatures,
  getCurrentActiveFeatures,
  isActive
} from '@paralleldrive/feature-toggles';

const initialFeatures = [
  {
    name: 'comments',
    isActive: true
  },
  {
    name: 'ratings',
    isActive: false
  },
  {
    name: 'faq',
    isActive: false
  }
];

const activeFeatures = getActiveFeatures(initialFeatures);

const getIsCommentsActive = isActive('comments');
const getIsRatingsActive = isActive('ratings');
const getIsFAQActive = isActive('faq');

// Update active features with query
const query = { ft: 'ratings' };
const currentActiveFeatures = getCurrentActiveFeatures({
  initialFeatures: activeFeatures,
  query
});

const isCommentsActive = getIsCommentsActive(currentActiveFeatures); // true
const isRatingsActive = getIsRatingsActive(currentActiveFeatures); // true ( enabled via query object )
const isFAQActive = getIsFAQActive(currentActiveFeatures); // false
```

## API

### Interfaces

#### Feature

```js
interface Feature {
  name: String,
  isActive: false,
  dependencies?: [...String]
}
```

### Functions

#### getActiveFeatures

`([...Feature]) => [...String]`

Takes an array of feature objects and returns an array of active feature names.

#### getQueryFeatures

`(query = {}) => [...String]`

Takes a [query object](https://nodejs.org/api/url.html) and returns an array of enabled feature names.

```js
const query = { ft='foo,bar,help' }
getQueryFeatures(query); // ['foo', 'bar', 'help']
```

#### mergeFeatures

`(...[...String]) => [...String]`

Merge feature names without duplicating.

```js
const currentFeatures = ['foo', 'bar', 'baz'];
mergeFeatures(currentFeatures, ['fish', 'bar', 'cat']); // ['foo', 'bar', 'baz', 'fish', 'cat']
```

#### removeFeatures

`([...String], [...String]) => [...String]`

Removes feature names

```js
const currentFeatures = ['foo', 'bar', 'baz', 'cat'];
removeFeatures(currentFeatures, ['fish', 'bar', 'cat']); // ['foo', 'baz']
```

#### isActive

`(String, [...String]) => boolean`

Returns true if a feature name is in the array else it returns false.

```js
const currentFeatures = ['foo', 'bar', 'baz'];
isActive('bar', currentFeatures); // true
isActive('cat', currentFeatures); // false
```

#### getReqQueryFeatures

`(req = {}) => [...String]`

Takes a [req object](https://expressjs.com/en/api.html#req.query) and returns an array of enabled feature names.

```js
const req = {
  query:{
    ft='foo,bar,help'
  }
};

getReqQueryFeatures(req); // ['foo', 'bar', 'help']
```

#### getBrowserQueryFeatures

Takes a `window.location.search` string and returns an array of active feature names. If search is not provided will grab the global `window.location.search` if available.

`(search?) => [...String]`

```js
const search = '?ft=foo,bar,baz';

getBrowserQueryFeatures(search); // ['foo', 'bar', 'baz']
```

#### getCurrentActiveFeatures

Takes an array of initialFeatures, a req object, and a `window.location.search` string and returns an array of active Features. If search is not provided will grab the global `window.location.search` if available.

`({ initialFeatures = [...String], req? , search? }) => [...String])]`

```js
const initialFeatures = ['cat', 'bar'];
const req = {
    query:{
      ft='fiz,bat,help'
    }
  };
const search = '?ft=foo,bar,baz';

getCurrentActiveFeatures({ initialFeatures, req, search }); // ['cat', 'bar', 'fiz', 'bat', 'help', 'foo', 'baz']
getCurrentActiveFeatures({ initialFeatures }); // -> parses the `window.location.search` string if present if not -> ['cat', 'bar']
```
