'use client'

import BlobExplorer from '@/components/blob-explorer'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ListFoldedBlobResult } from '@vercel/blob'
import { joinURL } from 'ufo'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const pagePath = '/res'

export default function Page({ params: { path = [] } }: PageProps) {
  const router = useRouter()

  const pathWithPrefix = ['/', ...path]

  const [blobs, setBlobs] = useState<ListFoldedBlobResult | null>(null)

  useEffect(() => {
    fetchBlobs(path.join('/') + (path.length > 0 ? '/' : ''))
  }, [path])

  const fetchBlobs = async (path: string) => {
    const resp = await fetch(`/api/list?prefix=${encodeURIComponent(path)}`)
    if (!resp.ok) throw new Error('无法获取 blobs')
    const result: ListFoldedBlobResult = await resp.json()
    setBlobs(result)
  }

  return (
    <>
      <Breadcrumb className="py-2 px-4">
        <BreadcrumbList>
          {pathWithPrefix.map((val, i) => (
            <Fragment key={i}>
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {i == pathWithPrefix.length - 1 ? (
                  <BreadcrumbPage children={val} />
                ) : (
                  <BreadcrumbLink children={val} />
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      {blobs && (
        <BlobExplorer
          blobs={blobs}
          onNavRequest={(data) => {
            if (!data.size) router.push(joinURL(pagePath, data.path))
          }}
        />
      )}
    </>
  )
}

interface PageProps {
  params: { path: string[] }
}
