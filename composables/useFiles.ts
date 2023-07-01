export type ThumbnailFormat = 'jpg' | 'png' | 'webp' | 'tiff'
export type ThumbnailFit = 'cover' | 'contain' | 'inside' | 'outside'
export interface ThumbnailOptions {
  width?: number
  height?: number
  quality?: number
  fit?: ThumbnailFit
  format?: ThumbnailFormat
  withoutEnlargement?: boolean
}

export default function useFiles() {
  const config = useRuntimeConfig()

  function fileUrl(fileId: string) {
    return `${config.public.directusUrl}/assets/${fileId}`
  }

  function getExtension(filename: string) {
    return filename.split('.').pop()
  }

  const getThumbnail = (fileId: string, options?: ThumbnailOptions): string => {
    const url = new URL(`${config.public.directusUrl}/assets/${fileId}`)
    if (options) {
      if (options.width) {
        url.searchParams.append('width', options.width.toFixed(0))
      }
      if (options.height) {
        url.searchParams.append('height', options.height.toFixed(0))
      }
      if (options.quality) {
        url.searchParams.append('quality', options.quality.toFixed(0))
      }
      if (options.withoutEnlargement) {
        url.searchParams.append('withoutEnlargement', 'true')
      }
      if (options.fit) {
        url.searchParams.append('fit', options.fit)
      }
      if (options.format) {
        url.searchParams.append('format', options.format)
      }
    }
    return url.href
  }

  return {
    fileUrl,
    getThumbnail,
    getExtension,
  }
}
