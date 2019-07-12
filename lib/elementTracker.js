const getPosition = require('./getPosition')

const notEqual = (obj1, obj2) =>
  Object.keys(obj1).some((key) => obj1[key] !== obj2[key])

class ElementTracker {
  constructor (element) {
    this.element = element
    this.callback = null
    this._cache = null
    this._requestAnimationFrameId = null
  }

  _isChanged (pos) {
    const needsCallback = notEqual(pos, this._cache || {})
    this._cache = pos
    return needsCallback
  }

  _step () {
    this._requestAnimationFrameId = window.requestAnimationFrame(() => {
      const position = getPosition(this.element)
      if (this.isChanged(position)) this.callback(position)
      this._step()
    })
  }

  start (callback) {
    if (this.callback) throw new Error('You are already tracking this element. To change callback you should stop tracking')
    this.callback = callback
    this._step()
  }

  stop () {
    this.callback = null
    this._cache = null
    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }
}

module.exports = ElementTracker
