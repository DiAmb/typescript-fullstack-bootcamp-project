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
      className="rounded-lg border border-slate-300 px-3 py-2 w-full"
      placeholder="Search..."
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
    />
  )
}
