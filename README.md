# ElementaryWatson
The ultimate in DOM Element tracking!
You can use it to get the position of a DOM element and to track whether this position changes.

## Compatibility
This library uses es2015 and esm.
You might need to provide transpilation when using it in your projects.

## Testing on browserstack
```sh
export BROWSERSTACK_USERNAME=<browserstack-username>

export BROWSERSTACK_KEY=<browserstack-access-key>

npm run test:browserstack
```

## How to use
You can get the position of a DOM element:
```js
import ElementaryWatson from 'elementary-watson'
const elementaryWatson = new ElementaryWatson(DOMElement)

const { x, y, height, width, isFixed } = elementaryWatson.getPosition()
```
isFixed is true when the position of the DOM element is relative to the browser viewport. Otherwise the position is relative to the document.
You can track the position of a DOMElement:
```js
elementaryWatson.start(({ x, y, height, width, isFixed }) => {
  // ...
})
```
The callback is called only when the position changes.
You can stop listening to changes using:
```js
elementaryWatson.stop()
```
