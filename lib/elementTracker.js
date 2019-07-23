import getPosition from './getPosition'

const notEqual = (obj1, obj2) =>
  Object.keys(obj1).some((key) => obj1[key] !== obj2[key])

export default class ElementTracker {
  constructor (element) {
    this.element = element
    this.callback = null
    this._cache = null
    this._requestAnimationFrameId = null
    this._mutationObserver = new MutationObserver(this._step.bind(this))
  }

  _checkCSSAnimation () {
    document.body.addEventListener('animationstart', () => {
      this._loop()
    })

    document.body.addEventListener('animationend', () => {
      this._unscheduleCheck()
    })
  }

  _scheduleCheck (func) {
    this._requestAnimationFrameId = window.requestAnimationFrame(func)
  }

  _unscheduleCheck () {
    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }

  _isChanged (pos) {
    const needsCallback = notEqual(pos, this._cache || {})
    this._cache = pos
    return needsCallback
  }

  _updatePosition () {
    const position = this.getPosition()
    if (this._isChanged(position)) this.callback(position)
  }

  _step () {
    this._unscheduleCheck()
    this._scheduleCheck(() => {
      this._updatePosition()
    })
  }

  _loop () {
    this._unscheduleCheck()
    this._scheduleCheck(() => {
      this._updatePosition()
      this._loop()
    })
  }

  start (callback) {
    if (this.callback) throw new Error('You are already tracking this element. To change callback you should stop tracking')
    this.callback = callback

    this._step()
    this._mutationObserver.observe(document.body, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    })
    this._checkCSSAnimation()
  }

  stop () {
    this.callback = null
    this._cache = null
    this._mutationObserver.disconnect()
    this._unscheduleCheck()
  }

  getPosition () {
    return getPosition(this.element)
  }
}
