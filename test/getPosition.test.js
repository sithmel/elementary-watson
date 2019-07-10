/* eslint-env browser, mocha */
/* global assert */
import getPosition from '../lib/getPosition'

describe('getPosition', () => {
  let canvas

  beforeEach(() => {
    canvas = document.createElement('div')
    canvas.style.height = '2000px'
    document.body.appendChild(canvas)
  })

  afterEach(() => {
    document.body.removeChild(canvas)
  })

  it('should return the correct position', () => {
    const target = document.createElement('div')

    target.style.position = 'absolute'
    target.style.top = '12px'
    target.style.left = '20px'
    target.style.height = '42px'
    target.style.width = '33px'

    canvas.appendChild(target)

    const { x, y, height, width, isFixed } = getPosition(target)

    assert.isFalse(isFixed)
    assert.equal(x, 20)
    assert.equal(y, 12)
    assert.equal(height, 42)
    assert.equal(width, 33)
  })

  it('should return the correct position when the page is scrolled', () => {
    const target = document.createElement('div')

    target.style.position = 'absolute'
    target.style.top = '12px'
    target.style.left = '20px'
    target.style.height = '42px'
    target.style.width = '33px'

    canvas.appendChild(target)

    window.scrollTo(0, 10)

    const { x, y, height, width, isFixed } = getPosition(target)

    assert.isFalse(isFixed)
    assert.equal(x, 20)
    assert.equal(y, 12)
    assert.equal(height, 42)
    assert.equal(width, 33)
  })

  it('should return the correct position when the target is fixed', () => {
    const target = document.createElement('div')

    target.style.position = 'fixed'
    target.style.top = '12px'
    target.style.left = '20px'
    target.style.height = '42px'
    target.style.width = '33px'

    canvas.appendChild(target)

    const { x, y, height, width, isFixed } = getPosition(target)

    assert.isTrue(isFixed)
    assert.equal(x, 20)
    assert.equal(y, 12)
    assert.equal(height, 42)
    assert.equal(width, 33)
  })

  it('should return the correct position when the target is fixed and the page is scrolled', () => {
    const target = document.createElement('div')

    target.style.position = 'fixed'
    target.style.top = '12px'
    target.style.left = '20px'
    target.style.height = '42px'
    target.style.width = '33px'

    canvas.appendChild(target)

    window.scrollTo(0, 10)

    const { x, y, height, width, isFixed } = getPosition(target)

    assert.isTrue(isFixed)
    assert.equal(x, 20)
    assert.equal(y, 12)
    assert.equal(height, 42)
    assert.equal(width, 33)
  })
})
