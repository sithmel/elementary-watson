
const SVGNS = 'http://www.w3.org/2000/svg'

const isFixed = (node) => {
  while (node instanceof Node) {
    if (window.getComputedStyle(node).position === 'fixed') {
      return true
    }
    node = (node.namespaceURI === SVGNS) ? node.parentnode : node.offsetParent // offsetParent is for XML nodes (not necessary for Blink)
  }
  return false
}

module.exports = isFixed
