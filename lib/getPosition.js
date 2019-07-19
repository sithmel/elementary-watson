import isFixed from './isFixed'

export default function getPosition (targetElement) {
  let { left, top, width, height } = targetElement.getBoundingClientRect() // x, y not compatible with IE11
  const isTargetFixed = isFixed(targetElement)

  let x = left
  let y = top

  if (!isTargetFixed) {
    x = x + window.pageXOffset // scrollX, scrollY not compatible with IE11
    y = y + window.pageYOffset
  }

  x = Math.round(x) // IE 11 likes decimals :sob:
  y = Math.round(y)

  return { x, y, width, height, isFixed: isTargetFixed }
}
