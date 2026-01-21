import { Skeleton } from '@/components/ui/skeleton'

interface AtivoTableSkeletonProps {
  rows?: number
}

const AtivoTableSkeleton = ({ rows = 10 }: AtivoTableSkeletonProps) => {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left p-4">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="text-left p-4">
                <Skeleton className="h-4 w-12" />
              </th>
              <th className="text-left p-4">
                <Skeleton className="h-4 w-10" />
              </th>
              <th className="text-right p-4">
                <Skeleton className="h-4 w-14 ml-auto" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="p-4">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-40" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-1">
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

export default AtivoTableSkeleton
