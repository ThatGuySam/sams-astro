/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'astro:assets' {
  interface ImageMetadata {
    src: string
    width: number
    height: number
    format: string
  }
}

declare module 'astro-icon' {
  interface Props {
    name: string
    pack?: string
    title?: string
    class?: string
    optimize?: boolean
    [key: string]: any
  }

  const Icon: (props: Props) => any
  export { Icon }
}
