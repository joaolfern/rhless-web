const cacheImages = (images: string[]) => {
  images.forEach(image => {
    if (!image) return
    const imageObj = new Image()
    imageObj.src = image
    document.head.appendChild(imageObj)
  })
}

function isTouchDevice () {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     // @ts-ignore
     (navigator?.msMaxTouchPoints > 0))
}

export {
  cacheImages,
  isTouchDevice
}
