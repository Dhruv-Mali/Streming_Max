import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader() {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Release Year</TableHead>
            <TableHead className="hidden md:table-cell">Duration</TableHead>
            <TableHead className="hidden md:table-cell">Age Rating</TableHead>
            <TableHead className="hidden md:table-cell">Created At</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-16 w-16 rounded-md" />
              </TableCell>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[50px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[50px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[50px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
