/* eslint-env browser, mocha */
/* global assert */
import ElementTracker from '../lib/elementTracker'

describe('ElementTracker', () => {
  let canvas

  beforeEach(() => {
    document.body.style.margin = 0
    document.body.style.padding = 0

    canvas = document.createElement('div')
    canvas.style.height = '2000px'
    document.body.appendChild(canvas)
  })

  afterEach(() => {
    document.body.removeChild(canvas)
  })

  it('is an object', () => {
    assert.typeOf(new ElementTracker(), 'object')
  })

  it('is an object with element attribute', () => {
    const element = document.createElement('div')
    canvas.appendChild(element)
    const elementTracker = new ElementTracker(element)
    assert.equal(elementTracker.element, element)
  })

  it('is throwing an error when calling track twice', () => {
    const element = document.createElement('div')
    canvas.appendChild(element)
    const elementTracker = new ElementTracker(element)
    elementTracker.start(() => {})
    assert.throws(() => {
      elementTracker.start(() => {})
    }, 'You are already tracking this element. To change callback you should stop tracking')
  })
})
