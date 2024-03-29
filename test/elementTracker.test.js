/* eslint-env browser, mocha */
/* global assert */
import sinon from 'sinon'
import ElementTracker from '../lib/elementTracker'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe('ElementTracker', () => {
  let canvas

  beforeEach(() => {
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

  it('is throwing an error when calling start twice', () => {
    const element = document.createElement('div')
    canvas.appendChild(element)
    const elementTracker = new ElementTracker(element)
    elementTracker.start(() => {})
    assert.throws(() => {
      elementTracker.start(() => {})
    }, 'You are already tracking this element. To change callback you should stop tracking')
  })

  it('calls getPosition on a given element only once', async () => {
    const callback = sinon.spy()
    const element = document.createElement('div')
    canvas.appendChild(element)
    const elementTracker = new ElementTracker(element)
    elementTracker.start(callback)
    await wait(200)
    assert.isTrue(callback.calledOnce)
    const args = callback.args[0][0]
    assert.containsAllKeys(args, ['x', 'y', 'width', 'height', 'isFixed'])
  })

  it('calls getPosition on a given element twice when the element moves', async () => {
    const callback = sinon.spy()
    const element = document.createElement('div')
    canvas.appendChild(element)
    const elementTracker = new ElementTracker(element)
    elementTracker.start(callback)
    await wait(100)
    element.style.marginTop = '20px'
    await wait(100)
    assert.isTrue(callback.calledTwice)
  })

  it('calls getPosition on a given element twice when the element is animated', async () => {
    canvas.innerHTML = `<style>
      @keyframes slidein {
        from { margin-top: 0; }
        to   { margin-top: 20px; }
      }

      .animated {
        animation: 200ms slidein;
      }
    </style>`
    const callback = sinon.spy()
    const element = document.createElement('div')
    element.className = 'animated'
    canvas.appendChild(element)
    const elementTracker = new ElementTracker(element)
    elementTracker.start(callback)
    await wait(100)
    const nPositionChanges = callback.callCount
    assert.isAbove(nPositionChanges, 1)
    await wait(200)
    assert.isAbove(callback.callCount, nPositionChanges)
  })

  it('does not call getPosition once stop has been called', async () => {
    const callback = sinon.spy()
    const element = document.createElement('div')
    canvas.appendChild(element)
    const elementTracker = new ElementTracker(element)
    elementTracker.start(callback)
    await wait(100)
    elementTracker.stop()
    element.style.marginTop = '20px'
    await wait(100)
    assert.isTrue(callback.calledOnce)
  })
})
