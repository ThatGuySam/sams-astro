import type { ImageMetadata } from 'astro'

type ImageEntry = () => Promise<{ default: ImageMetadata }>
type ImageGlobResult = Record<string, ImageEntry>

/** Load images from a directory */
async function loadImages(): Promise<ImageGlobResult | undefined> {
  let images: ImageGlobResult | undefined
  try {
    images = import.meta.glob<{ default: ImageMetadata }>('~/assets/images/**/*.{jpeg,jpg,png,gif}')
  }
  catch {
    // Do nothing if images cannot be loaded
  }
  return images
}

let _images: ImageGlobResult | undefined

/** Get all images from ~/assets/images/ */
export async function getImages() {
  _images = _images || await loadImages()
  return _images
}

/** Get image data from ~/assets/images/ */
export async function getImage(imagePath: string) {
  if (!imagePath) {
    return null
  }

  if (typeof _images === 'undefined') {
    _images = await loadImages()
  }

  if (!_images || !_images[imagePath]) {
    return null
  }

  const image = await _images[imagePath]()
  return image.default
}

/** Get image data from ~/assets/images/ */
export async function findImage(imagePath: string) {
  if (!imagePath) {
    return undefined
  }

  // For now only consume images using ~/assets alias (or absolute)
  const images = await getImages()
  const key = imagePath.replace('~/', '/src/')

  return images?.[key] ? (await images[key]()).default : undefined
}
