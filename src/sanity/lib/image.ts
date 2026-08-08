import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export const safeUrlFor = (source: any, fallback: string = ''): string => {
  if (!source) return fallback;
  if (typeof source === 'string') return source;
  try {
    const url = builder.image(source).url();
    return url || fallback;
  } catch (err) {
    return fallback;
  }
}
