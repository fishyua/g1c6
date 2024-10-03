import { ListBlobResultBlob } from '@vercel/blob'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface ResourceFile {
  name: string
  children?: ResourceFile[]
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pathToName(path: string) {
  return path
    .split('/')
    .filter((v) => v != '')
    .slice(-1)[0]
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function mapBlobsToFiles(blobs: ListBlobResultBlob[]) {
  const root: ResourceFile = { name: '' }
  blobs.forEach((b) => {
    const pathSegments = b.pathname.split('/')
    let currentResource: ResourceFile = root

    pathSegments.forEach((segment) => {
      const existingChild = currentResource.children?.find((child) => child.name === segment)
      if (existingChild) {
        currentResource = existingChild
      } else {
        const newChild: ResourceFile = { name: segment }
        currentResource.children = (currentResource.children || []).concat(newChild)
        currentResource = newChild
      }
    })
  })

  return root.children || []
}
