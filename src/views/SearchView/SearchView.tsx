'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLocale } from 'next-intl'

import CardImage from '@/components/CardImage'
import { getCards } from '@/domain/cards'
import type { GetCardsQueryParams } from '@/domain/cards/dtos/getCards.dto'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import {
  selectCards,
  selectCardsEndReached,
  selectCardsStatus,
} from '@/redux/slices/cardSlice'
import { selectFilters, setPage } from '@/redux/slices/searchSlice'

import SearchFilters from './components/SearchFilters'

const SearchView = () => {
  const { ref, inView } = useInView()
  const locale = useLocale()

  const dispatch = useAppDispatch()
  const cards = useAppSelector(selectCards)
  const endReached = useAppSelector(selectCardsEndReached)
  const loading = useAppSelector(selectCardsStatus)
  const reduxFilters = useAppSelector(selectFilters)

  useEffect(() => {
    if (
      cards.length > 0 &&
      reduxFilters.page !== undefined &&
      inView &&
      !endReached &&
      loading === 'idle'
    ) {
      const newPage = reduxFilters.page + 1
      const filters: GetCardsQueryParams = {
        ...reduxFilters,
        name: reduxFilters.name !== '' ? reduxFilters.name : undefined,
        colors: reduxFilters.colors?.map((option) => option.value),
        types: reduxFilters.types?.map((option) => option.value),
        subtypes: reduxFilters.subtypes?.map((option) => option.value),
        rarities: reduxFilters.rarities?.map((option) => option.value),
        keywords: reduxFilters.keywords?.map((option) => option.value),
        artists: reduxFilters.artists?.map((option) => option.value),
        treatments: reduxFilters.treatments?.map((option) => option.value),
        setIds: reduxFilters.setIds?.map((setId) => parseInt(setId.value)),
        page: newPage,
      }

      dispatch(setPage(newPage))
      dispatch(getCards.initiate({ locale, params: filters }))
    }
  }, [inView])

  return (
    <div className='bg-red-600 flex p-4'>
      <div className='flex-1/5 hidden md:inline'>
        <SearchFilters />
      </div>
      <div className='flex-4/5 w-full h-fit gap-6 pl-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {cards.map((card) => (
          <CardImage cardId={card.id} isLink key={card.id} />
        ))}
        <div ref={ref} />
      </div>
    </div>
  )
}

export default SearchView
