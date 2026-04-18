export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

const loadImage = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Unable to process image. Please try another file.'))
    }

    image.src = url
  })

export const compressImageToDataUrl = async (
  file,
  {
    maxBytes = 32 * 1024,
    maxDimension = 1080,
    minQuality = 0.45,
    qualityStep = 0.08,
    maxAttempts = 12,
  } = {},
) => {
  if (!String(file?.type || '').startsWith('image/')) {
    throw new Error('Only image files are supported.')
  }

  const image = await loadImage(file)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Image compression is not supported in this browser.')
  }

  const longSide = Math.max(image.width, image.height)
  const scale = longSide > maxDimension ? maxDimension / longSide : 1

  let width = Math.max(1, Math.round(image.width * scale))
  let height = Math.max(1, Math.round(image.height * scale))
  let quality = 0.9

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    canvas.width = width
    canvas.height = height
    context.clearRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', quality)
    })

    if (!blob) {
      break
    }

    if (blob.size <= maxBytes) {
      return blobToDataUrl(blob)
    }

    if (quality > minQuality) {
      quality = Math.max(minQuality, quality - qualityStep)
      continue
    }

    width = Math.max(320, Math.round(width * 0.86))
    height = Math.max(320, Math.round(height * 0.86))
    quality = 0.88
  }

  throw new Error('Image is too detailed for email limits. Try a simpler/smaller image.')
}
