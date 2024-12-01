import { useEffect, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import useDebounce from '../hooks/useDebounce'

export function SearchInput() {
  const [inputValue, setInputValue] = useState('')
  const debouncedInputValue = useDebounce(inputValue, 500)
  const prev = useSearch({ strict: false })
  const navigate = useNavigate()

  useEffect(() => {
    if (debouncedInputValue.length === 0) {
      navigate({
        search: {
          ...prev,
          q: undefined,
        },
      })
    } else {
      navigate({
        search: {
          ...prev,
          q: debouncedInputValue,
        },
      })
    }
  }, [navigate, prev, debouncedInputValue])

  return (
    <input
      role="search"
      className="rounded-lg border px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search products..."
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
    />
  )
}
