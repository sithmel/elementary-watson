/* eslint-env browser, mocha */
/* global assert */
import getPosition from '../lib/getPosition'

describe('getPosition', () => {
  let canvas

  beforeEach(() => {
    document.body.style.margin = 0
    document.body.style.padding = 0

    canvas = document.createElement('div')
    canvas.style.marginTop = '10px'
    canvas.style.marginLeft = '5px'
    canvas.style.padding = '0px'
    canvas.style.height = '2000px'
    document.body.appendChild(canvas)
  })

  afterEach(() => {
    document.body.removeChild(canvas)
  })

  describe('position static', () => {
    it('should return the correct position', () => {
      const target = document.createElement('div')

      target.style.height = '42px'
      target.style.width = '33px'

      canvas.appendChild(target)

      const { x, y, height, width, isFixed } = getPosition(target)

      assert.isFalse(isFixed)
      assert.equal(x, 5)
      assert.equal(y, 10)
      assert.equal(height, 42)
      assert.equal(width, 33)
    })

    it('should return the correct position when the page is scrolled', () => {
      const target = document.createElement('div')

      target.style.height = '42px'
      target.style.width = '33px'

      canvas.appendChild(target)

      window.scrollTo(0, 10)

      const { x, y, height, width, isFixed } = getPosition(target)

      assert.isFalse(isFixed)
      assert.equal(x, 5)
      assert.equal(y, 10)
      assert.equal(height, 42)
      assert.equal(width, 33)
    })

    it('should work with svg', () => {
      const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg1.setAttribute('width', '100')
      svg1.setAttribute('height', '100')
      const cir1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      cir1.setAttribute('cx', 40)
      cir1.setAttribute('cy', 30)
      cir1.setAttribute('r', 7)
      svg1.appendChild(cir1)
      canvas.appendChild(svg1)

      const { x, y, height, width, isFixed } = getPosition(cir1)

      assert.isFalse(isFixed)
      assert.equal(x, 38) // 40(centre) - 7(radius) + 5 (marginLeft of parent)
      assert.equal(y, 33) // 30(centre) - 7(radius) + 10 (marginTop of parent)

      assert.isBelow(height, 16) // IE11/edge is off by one
      assert.isAbove(height, 13)

      assert.isBelow(width, 16) // IE11/edge is off by one
      assert.isAbove(width, 13)
    })
  })

  describe('position absolute', () => {
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
  })

  describe('position fixed', () => {
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
})
