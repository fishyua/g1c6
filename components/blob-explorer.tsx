'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ListFoldedBlobResult } from '@vercel/blob'
import { DataTable } from '@/components/wrapped/data-table'
import { DataTableColumnHeader } from './wrapped/data-table-column-header'
import { useRouter } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { formatFileSize, pathToName } from '@/lib/utils'

interface BlobObject {
  path: string
  name: string
  size?: number
}

export const columns: ColumnDef<BlobObject>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader title="名称" column={column} />,
  },
  {
    accessorKey: 'size',
    header: ({ column }) => <div className="text-right">体积</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          {row.getValue('size') ? formatFileSize(row.getValue('size') as number) : '--'}
        </div>
      )
    },
  },
  {
    id: 'type',
    header: '类型',
    cell: ({ row }) => (row.getValue('size') ? '文件' : '文件夹'),
  },
]

interface BlobExplorerProps {
  blobs: ListFoldedBlobResult | null
  onNavRequest: (data: BlobObject) => void
}

export default function BlobExplorer({ blobs, onNavRequest }: BlobExplorerProps) {
  const conv: BlobObject[] = blobs
    ? [
        ...blobs.folders.map<BlobObject>((v) => ({ path: v, name: pathToName(v) })),
        ...blobs.blobs
          .filter((v) => v.size > 0)
          .map<BlobObject>((v) => ({
            path: v.pathname,
            name: pathToName(v.pathname),
            size: v.size,
          })),
      ]
    : []
  return (
    <DataTable
      columns={columns}
      data={conv}
      onRowClicked={(data) => onNavRequest && onNavRequest(data)}
    />
  )
}
