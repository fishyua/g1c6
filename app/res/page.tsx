import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FileIcon } from '@radix-ui/react-icons'

export default function Page() {
  return (
    <>
      <Breadcrumb className="py-2 px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>materials</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>history</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead className="text-right">大小</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="flex leading-none">
              <FileIcon className="mr-2" />
              <div className="flex flex-col space-y-2">
                <p>1.1 中华文明的起源与早期国家.pptx</p>
                <div className="flex gap-2">
                  <Badge>tag1</Badge>
                  <Badge>tag2</Badge>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right text-muted-foreground">--</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
