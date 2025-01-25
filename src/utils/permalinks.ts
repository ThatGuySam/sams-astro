import slugify from 'limax'

import { BLOG, SITE } from '~/config.mjs'
import { trim } from '~/utils/utils'

export const trimSlash = (s: string) => trim(trim(s, '/'))
function createPath(...params: string[]) {
  const paths = params
    .map(el => trimSlash(el))
    .filter(el => !!el)
    .join('/')
  return `/${paths}${(SITE.trailingSlash && paths) ? '/' : ''}`
}

const BASE_PATHNAME = SITE.basePathname

export function cleanSlug(text = '') {
  return trimSlash(text)
    .split('/')
    .map(slug => slugify(slug))
    .join('/')
}

export const POST_PERMALINK_PATTERN = trimSlash(BLOG?.post?.permalink || '/%slug%')

export const BLOG_BASE = cleanSlug(BLOG?.list?.pathname)
export const CATEGORY_BASE = cleanSlug(BLOG?.category?.pathname || 'category')
export const TAG_BASE = cleanSlug(BLOG?.tag?.pathname) || 'tag'

/** */
export const getCanonical = (path = ''): string | URL => new URL(path, SITE.origin)

/** */
export function getPermalink(slug = '', type = 'page'): string {
  let permalink: string

  switch (type) {
    case 'category':
      permalink = createPath(CATEGORY_BASE, trimSlash(slug))
      break

    case 'tag':
      permalink = createPath(TAG_BASE, trimSlash(slug))
      break

    case 'post':
      permalink = createPath(trimSlash(slug))
      break

    case 'page':
    default:
      permalink = createPath(slug)
      break
  }

  return definitivePermalink(permalink)
}

/** */
export const getHomePermalink = (): string => getPermalink('/')

/** */
export const getBlogPermalink = (): string => getPermalink(BLOG_BASE)

/** */
export function getAsset(path: string): string {
  return `/${
    [BASE_PATHNAME, path]
      .map(el => trimSlash(el))
      .filter(el => !!el)
      .join('/')}`
}

/** */
function definitivePermalink(permalink: string): string {
  return createPath(BASE_PATHNAME, permalink)
}
