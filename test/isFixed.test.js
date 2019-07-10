/* eslint-env browser, mocha */
/* global assert */
import isFixed from '../lib/isFixed'

describe('isFixed', () => {
  let canvas

  beforeEach(() => {
    canvas = document.createElement('div')
    document.body.appendChild(canvas)
  })

  afterEach(() => {
    document.body.removeChild(canvas)
  })

  it('should be false for element that is not fixed', () => {
    const element = document.createElement('div')
    canvas.appendChild(element)
    const result = isFixed(element)
    assert.isFalse(result)
  })
  it('should be true for a fixed element', () => {
    const fixedElement = document.createElement('div')
    fixedElement.style.position = 'fixed'
    canvas.appendChild(fixedElement)
    const result = isFixed(fixedElement)
    assert.isTrue(result)
  })
  it('should be true for an element with a fixed ancestor', () => {
    const element = document.createElement('div')
    canvas.style.position = 'fixed'
    canvas.appendChild(element)
    const result = isFixed(element)
    assert.isTrue(result)
  })
  it('should ignore svg', () => {
    const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg1.setAttribute('width', '100')
    svg1.setAttribute('height', '100')
    const cir1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    svg1.appendChild(cir1)
    canvas.appendChild(svg1)
    const result = isFixed(cir1)
    assert.isFalse(result)
  })
})
