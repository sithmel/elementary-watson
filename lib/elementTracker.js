const getPosition = require('./getPosition')

class ElementTracker {
  constructor (element) {
    this.element = element
    this.callback = null
  }

  start (callback) {
    if (this.callback) throw new Error('You are already tracking this element. To change callback you should stop tracking')
    this.callback = callback
  }

  stop () {
    this.callback = null
  }
}

module.exports = ElementTracker
