export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded border border-[#e8e0d5] overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-[#e8e0d5]" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 bg-[#e8e0d5] rounded w-3/4" />
        <div className="h-3 bg-[#e8e0d5] rounded w-1/3" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}