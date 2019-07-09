/* eslint-env browser, mocha */
/* global assert */
import { isFixed } from '../'

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
})
