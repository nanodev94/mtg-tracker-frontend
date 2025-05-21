'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocale, useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { RESULTS_PER_PAGE } from '@/constants'
import { COLORS, RARITIES } from '@/constants/cardData'
import {
  getArtists,
  getCards,
  getKeywords,
  getSubtypes,
  getTreatments,
  getTypes,
} from '@/domain/cards'
import type { GetCardsQueryParams } from '@/domain/cards/dtos/getCards.dto'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import { selectArtists } from '@/redux/slices/artistsSlice'
import { reset as resetCards } from '@/redux/slices/cardSlice'
import { selectKeywords } from '@/redux/slices/keywordsSlice'
import { selectFilters, setFilters } from '@/redux/slices/searchSlice'
import { selectSets } from '@/redux/slices/setSlice'
import { selectSubtypes } from '@/redux/slices/subtypesSlice'
import { selectTreatments } from '@/redux/slices/treatmentsSlice'
import { selectTypes } from '@/redux/slices/typesSlice'
import { generateOptions, generateSetOptions } from '@/utils/select'

import { type FilterData, filtersSchema } from './zodSchema'

const SearchFilters = () => {
  const dispatch = useAppDispatch()
  const locale = useLocale()
  const reduxFilters = useAppSelector(selectFilters)

  const t = useTranslations('search.filters')
  const tColors = useTranslations('cardData.colors')
  const tKeywords = useTranslations('cardData.keywords')
  const tRarities = useTranslations('cardData.rarities')
  const tSets = useTranslations('cardData.sets')
  const tSubtypes = useTranslations('cardData.subtypes')
  const tTreatments = useTranslations('cardData.treatments')
  const tTypes = useTranslations('cardData.types')

  const artists = useAppSelector(selectArtists)
  const keywords = useAppSelector(selectKeywords)
  const sets = useAppSelector(selectSets)
  const subtypes = useAppSelector(selectSubtypes)
  const treatments = useAppSelector(selectTreatments)
  const types = useAppSelector(selectTypes)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FilterData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: { ...reduxFilters },
  })

  const onSubmit = (data: FilterData) => {
    const pagination = {
      page: 0,
      resultsPerPage: RESULTS_PER_PAGE,
      sortField: data.sortBy?.value,
      sortDir: 'ASC',
    }

    const filters: GetCardsQueryParams = {
      ...pagination,
      name: data.name !== '' ? data.name : undefined,
      colors: data.colors?.map((option) => option.value),
      types: data.types?.map((option) => option.value),
      subtypes: data.subtypes?.map((option) => option.value),
      rarities: data.rarities?.map((option) => option.value),
      keywords: data.keywords?.map((option) => option.value),
      artists: data.artists?.map((option) => option.value),
      treatments: data.treatments?.map((option) => option.value),
      setIds: data.setIds?.map((setId) => parseInt(setId.value)),
    }

    dispatch(resetCards())
    dispatch(
      setFilters({
        ...pagination,
        ...data,
      })
    )
    dispatch(getCards.initiate({ locale, params: filters }))
  }

  useEffect(() => {
    dispatch(getArtists.initiate({}))
    dispatch(getKeywords.initiate({}))
    dispatch(getSubtypes.initiate({}))
    dispatch(getTreatments.initiate({}))
    dispatch(getTypes.initiate({}))
  }, [])

  return (
    <div className='w-full'>
      <span className='text-2xl font-bold underline'>{t('title')}</span>
      <form
        className='flex flex-col gap-5 mt-4 w-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <span>{t('name')}</span>
          <Input
            error={errors.name?.message}
            id='name'
            type='text'
            {...register('name')}
          />
        </div>
        <div>
          <span>{t('sortBy')}</span>
          <Select control={control} name='sortBy' options={[]} />
        </div>
        <div>
          <span>{t('colors')}</span>
          <Select
            closeMenuOnSelect={false}
            control={control}
            isMulti
            name='colors'
            options={generateOptions(COLORS, tColors, true)}
          />
        </div>
        <div>
          <span>{t('types')}</span>
          <Select
            closeMenuOnSelect={false}
            control={control}
            isMulti
            name='types'
            options={generateOptions(types, tTypes, true)}
          />
        </div>
        <div>
          <span>{t('subtypes')}</span>
          <Select
            closeMenuOnSelect={false}
            control={control}
            isMulti
            name='subtypes'
            options={generateOptions(subtypes, tSubtypes, true)}
          />
        </div>
        <div>
          <span>{t('rarities')}</span>
          <Select
            closeMenuOnSelect={false}
            control={control}
            isMulti
            name='rarities'
            options={generateOptions(RARITIES, tRarities, true)}
          />
        </div>
        <div>
          <span>{t('keywords')}</span>
          <Select
            closeMenuOnSelect={false}
            control={control}
            isMulti
            name='keywords'
            options={generateOptions(keywords, tKeywords, true)}
          />
        </div>
        <div>
          <span>{t('artists')}</span>
          <Select
            closeMenuOnSelect={false}
            control={control}
            isMulti
            name='artists'
            options={generateOptions(artists, undefined, true)}
          />
        </div>
        <div>
          <span>{t('treatments')}</span>
          <Select
            closeMenuOnSelect={false}
            control={control}
            isMulti
            name='treatments'
            options={generateOptions(treatments, tTreatments, true)}
          />
        </div>
        <div>
          <span>{t('sets')}</span>
          <Select
            closeMenuOnSelect={false}
            control={control}
            isMulti
            name='setIds'
            options={generateSetOptions(sets, tSets)}
          />
        </div>
        <Button className='mt-5' rounded type='submit'>
          {t('apply')}
        </Button>
      </form>
    </div>
  )
}

export default SearchFilters
