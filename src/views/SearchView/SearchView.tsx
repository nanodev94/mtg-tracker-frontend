'use client'

import { useAppSelector } from '@/globalHooks/redux'
import { selectCards } from '@/redux/slices/cardSlice'

import CardItem from './components/CardItem'
import SearchFilters from './components/SearchFilters'

const SearchView = () => {
  const cards = useAppSelector(selectCards)

  return (
    <div className='bg-red-600 flex p-4'>
      <div className='flex-1/5'>
        <SearchFilters />
      </div>
      <div className='grid grid-cols-5 flex-4/5 w-full h-fit gap-6 pl-6'>
        {cards.slice(0, 15).map((card) => (
          <CardItem
            cardId={card.id}
            key={card.id}
            name={card.name}
            setId={card.setId}
            setNumber={card.setNumber}
            types={card.types}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchView
