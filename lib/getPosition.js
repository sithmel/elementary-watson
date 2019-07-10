const isFixed = require('./isFixed')

const getPosition = (targetElement) => {
  let { x, y, width, height } = targetElement.getBoundingClientRect()
  const isTargetFixed = isFixed(targetElement)

  if (!isTargetFixed) {
    x = x + window.scrollX
    y = y + window.scrollY
  }

  return { x, y, width, height, isFixed: isTargetFixed }
}

module.exports = getPosition
