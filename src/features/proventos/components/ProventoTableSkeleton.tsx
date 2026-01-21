import { Skeleton } from '@/components/ui/skeleton'

interface ProventoTableSkeletonProps {
  rows?: number
}

const ProventoTableSkeleton = ({ rows = 10 }: ProventoTableSkeletonProps) => {
  return (
    <div className="rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-12" />
              </th>
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-10" />
              </th>
              <th className="px-4 py-3 text-right">
                <Skeleton className="h-4 w-20 ml-auto" />
              </th>
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-24" />
              </th>
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-14" />
              </th>
              <th className="px-4 py-3 text-right">
                <Skeleton className="h-4 w-14 ml-auto" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProventoTableSkeleton
