
const isFixed = (element) => {
  while (element !== null) {
    if (window.getComputedStyle(element).position === 'fixed') {
      return true
    }
    element = element.parentElement
  }
  return false
}

module.exports = isFixed
