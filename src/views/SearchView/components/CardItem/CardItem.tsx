'use client'

import { CldImage } from 'next-cloudinary'
import { useLocale } from 'next-intl'

import { PAGE } from '@/constants'
import { useAppSelector } from '@/globalHooks/redux'
import { Link } from '@/i18n/navigation'
import { selectSet } from '@/redux/slices/setSlice'
import { getImageUrl } from '@/utils/images'

interface Props {
  cardId: number
  name: string
  setId: number
  setNumber: number
  types?: string[]
}

const CardItem = ({ cardId, name, setId, setNumber, types }: Props) => {
  const locale = useLocale()
  const set = useAppSelector((state) => selectSet(state, setId))

  const imageUrl = getImageUrl(locale, setNumber, set?.code, types)

  return (
    <Link href={`${PAGE.SEARCH}/${cardId}`}>
      <div className='w-full aspect-5/7 rounded-xl bg-green-700'>
        <CldImage
          alt={name}
          className='w-full'
          height='350'
          src={imageUrl}
          width='250'
        />
      </div>
    </Link>
  )
}

export default CardItem
