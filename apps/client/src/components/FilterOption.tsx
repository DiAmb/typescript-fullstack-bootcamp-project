import { Link, useSearch } from '@tanstack/react-router'

type FilterOptionProps = {
  filterKey: string
  value: unknown
  name: string
}

export function FilterOption({ filterKey, value, name }: FilterOptionProps) {
  const prev = useSearch({ strict: false })

  return (
    <Link
      className="text-sm data-[status=active]:font-bold data-[status=active]:bg-slate-100 data-a block py-1 px-3 hover:bg-slate-100 rounded-md my-1"
      search={{
        ...prev,
        [filterKey]: value,
      }}
      activeOptions={{
        exact: true,
      }}
    >
      {name}
    </Link>
  )
}
