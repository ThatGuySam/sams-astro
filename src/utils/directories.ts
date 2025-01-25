import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __vitedirname = path.dirname(fileURLToPath(import.meta.url))

/** */
export function getProjectRootDir(): string {
  const mode = import.meta.env.MODE

  return mode === 'production' ? path.join(__vitedirname, '../') : path.join(__vitedirname, '../../')
}

const __srcFolder = path.join(getProjectRootDir(), '/src')

/** */
export function getRelativeUrlByFilePath(filepath: string): string {
  return filepath.replace(__srcFolder, '')
}
