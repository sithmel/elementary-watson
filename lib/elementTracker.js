import getPosition from './getPosition'

const notEqual = (obj1, obj2) =>
  Object.keys(obj1).some((key) => obj1[key] !== obj2[key])

export default class ElementTracker {
  constructor (element) {
    this.element = element
    this.callback = null
    this._cache = null
    this._requestAnimationFrameId = null

    // these functions will be bound (and unbound) to events
    this._stepFunction = this._step.bind(this)
    this._loopFunction = this._loop.bind(this)
    this._stopLoopFunction = this._unscheduleCheck.bind(this)

    this._mutationObserver = new MutationObserver(this._stepFunction)
  }

  _startCheckingPosition () {
    // DOM changed
    this._mutationObserver.observe(document.body, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    })

    // css animation running
    document.body.addEventListener('animationstart', this._loopFunction)
    document.body.addEventListener('animationend', this._stopLoopFunction)

    // window resizing
    window.addEventListener('resize', this._stepFunction)
  }

  _stopCheckingPosition () {
    // DOM changed
    this._mutationObserver.disconnect()

    // css animation running
    document.body.removeEventListener('animationstart', this._loopFunction)
    document.body.removeEventListener('animationend', this._stopLoopFunction)

    // window resizing
    window.removeEventListener('resize', this._stepFunction)
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
    this._startCheckingPosition()
  }

  stop () {
    this.callback = null
    this._cache = null
    this._unscheduleCheck()
    this._stopCheckingPosition()
  }

  getPosition () {
    return getPosition(this.element)
  }
}
