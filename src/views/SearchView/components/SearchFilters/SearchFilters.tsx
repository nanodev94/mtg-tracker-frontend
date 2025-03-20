'use client'

import { useForm } from 'react-hook-form'
import { useLocale, useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { ARTISTS } from '@/constants/cardData/artists'
import { COLORS } from '@/constants/cardData/colors'
import { KEYWORDS } from '@/constants/cardData/keywords'
import { RARITIES } from '@/constants/cardData/rarities'
import { SUBTYPES } from '@/constants/cardData/subtypes'
import { TREATMENTS } from '@/constants/cardData/treatments'
import { TYPES } from '@/constants/cardData/types'
import { getCards } from '@/domain/cards'
import { useAppDispatch } from '@/globalHooks/redux'
import { type Filters, setFilters } from '@/redux/slices/searchSlice'
import { generateOptions } from '@/utils/select'

import { type FilterData, filtersSchema } from './zodSchema'

const SearchFilters = () => {
  const dispatch = useAppDispatch()
  const locale = useLocale()

  const t = useTranslations('search.filters')
  const tColors = useTranslations('cardData.colors')
  const tTypes = useTranslations('cardData.types')
  const tSubtypes = useTranslations('cardData.subtypes')
  const tRarities = useTranslations('cardData.rarities')
  const tKeywords = useTranslations('cardData.keywords')
  const tTreatments = useTranslations('cardData.treatments')

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FilterData>({
    resolver: zodResolver(filtersSchema),
  })

  const onSubmit = (data: FilterData) => {
    const filters: Filters = {
      name: data.name !== '' ? data.name : undefined,
      sortBy: data.sortBy?.value,
      colors: data.colors?.map((color) => color.value),
      types: data.types?.map((type) => type.value),
      subtypes: data.subtypes?.map((subtype) => subtype.value),
      rarities: data.rarities?.map((rarity) => rarity.value),
      keywords: data.keywords?.map((keyword) => keyword.value),
      artists: data.artists?.map((artist) => artist.value),
      treatments: data.treatments?.map((treatment) => treatment.value),
      setIds: data.setIds?.map((setId) => parseInt(setId.value)),
    }

    dispatch(setFilters(filters))
    dispatch(getCards.initiate({ locale, params: filters }))
  }

  return (
    <div className='w-full'>
      <span className='text-2xl font-bold underline'>{t('title')}</span>
      <form
        className='flex flex-col gap-3 mt-4 w-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          error={errors.name?.message}
          id='name'
          label={t('name')}
          type='text'
          {...register('name')}
        />
        <span>{t('sortBy')}</span>
        <Select control={control} name='sortBy' options={[]} />
        <span>{t('colors')}</span>
        <Select
          closeMenuOnSelect={false}
          control={control}
          isMulti
          name='colors'
          options={generateOptions([...COLORS], tColors)}
        />
        <span>{t('types')}</span>
        <Select
          closeMenuOnSelect={false}
          control={control}
          isMulti
          name='types'
          options={generateOptions([...TYPES], tTypes)}
        />
        <span>{t('subtypes')}</span>
        <Select
          closeMenuOnSelect={false}
          control={control}
          isMulti
          name='subtypes'
          options={generateOptions([...SUBTYPES], tSubtypes)}
        />
        <span>{t('rarities')}</span>
        <Select
          closeMenuOnSelect={false}
          control={control}
          isMulti
          name='rarities'
          options={generateOptions([...RARITIES], tRarities)}
        />
        <span>{t('keywords')}</span>
        <Select
          closeMenuOnSelect={false}
          control={control}
          isMulti
          name='keywords'
          options={generateOptions([...KEYWORDS], tKeywords)}
        />
        <span>{t('artists')}</span>
        <Select
          closeMenuOnSelect={false}
          control={control}
          isMulti
          name='artists'
          options={generateOptions([...ARTISTS])}
        />
        <span>{t('treatments')}</span>
        <Select
          closeMenuOnSelect={false}
          control={control}
          isMulti
          name='treatments'
          options={generateOptions([...TREATMENTS], tTreatments)}
        />
        <span>{t('sets')}</span>
        <Select
          closeMenuOnSelect={false}
          control={control}
          isMulti
          name='setIds'
          options={[]}
        />
        <Button rounded>{t('apply')}</Button>
      </form>
    </div>
  )
}

export default SearchFilters
