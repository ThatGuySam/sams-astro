/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@astrojs/image/client" />

declare module 'astro:assets' {
  interface ImageMetadata {
    src: string
    width: number
    height: number
    format: string
  }
}
