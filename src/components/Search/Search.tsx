'use client'
import { useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = () => {
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: show results in modal
    setSearch(e.target.value)
  }

  const handleContainerClick = () => {
    searchRef.current?.focus()
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // TODO: go to search view with search name filter
      console.log(search)
    }
  }

  return (
    <div
      className='bg-white w-full flex items-center justify-center gap-2 py-2 px-3 rounded-full'
      onClick={handleContainerClick}
    >
      <FaSearch color='black' size={15} />
      <input
        className='h-full text-black w-full outline-none cursor-default'
        onChange={handleChange}
        onKeyDown={handleSearch}
        ref={searchRef}
        type='text'
        value={search}
      />
    </div>
  )
}

export default Search
