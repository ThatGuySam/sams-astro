const load = async function () {
  // let images: Record<string, () => Promise<unknown>> | undefined
  try {
    return import.meta.glob('~/assets/images/**')
  }
  catch {
    // continue regardless of error
    return undefined
  }
  // return images
}

let _images

/** */
export async function fetchLocalImages() {
  _images = _images || load()
  return await _images
}

/** */
export async function findImage(imagePath?: string) {
  if (typeof imagePath !== 'string') {
    return null
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  if (!imagePath.startsWith('~/assets')) {
    return null
  }
  // For now only consume images using ~/assets alias (or absolute)

  const images = await fetchLocalImages()
  const key = imagePath.replace('~/', '/src/')

  return typeof images[key] === 'function' ? (await images[key]()).default : null
}
