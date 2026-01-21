import { Skeleton } from '@/components/ui/skeleton'

interface TransacaoTableSkeletonProps {
  rows?: number
}

const TransacaoTableSkeleton = ({ rows = 10 }: TransacaoTableSkeletonProps) => {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 sm:p-4">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="text-left p-3 sm:p-4">
                <Skeleton className="h-4 w-12" />
              </th>
              <th className="text-left p-3 sm:p-4">
                <Skeleton className="h-4 w-14" />
              </th>
              <th className="text-right p-3 sm:p-4">
                <Skeleton className="h-4 w-20 ml-auto" />
              </th>
              <th className="text-right p-3 sm:p-4">
                <Skeleton className="h-4 w-16 ml-auto" />
              </th>
              <th className="text-right p-3 sm:p-4">
                <Skeleton className="h-4 w-20 ml-auto" />
              </th>
              <th className="text-right p-3 sm:p-4">
                <Skeleton className="h-4 w-14 ml-auto" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="p-3 sm:p-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="p-3 sm:p-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </td>
                <td className="p-3 sm:p-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="p-3 sm:p-4">
                  <Skeleton className="h-4 w-12 ml-auto" />
                </td>
                <td className="p-3 sm:p-4">
                  <Skeleton className="h-4 w-20 ml-auto" />
                </td>
                <td className="p-3 sm:p-4">
                  <Skeleton className="h-4 w-24 ml-auto" />
                </td>
                <td className="p-3 sm:p-4">
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

export default TransacaoTableSkeleton
