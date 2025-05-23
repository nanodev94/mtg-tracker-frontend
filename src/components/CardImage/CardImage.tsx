import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { useLocale } from 'next-intl'
import clsx from 'clsx'

import { PAGE } from '@/constants'
import { getCard } from '@/domain/cards'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import { Link } from '@/i18n/navigation'
import { selectCardById } from '@/redux/slices/cardSlice'
import { selectSet } from '@/redux/slices/setSlice'
import { selectUserCardAmount } from '@/redux/slices/userSlice'
import { Treatment } from '@/types'
import { getImageUrl } from '@/utils/images'

interface Props {
  cardId: number
  className?: string
  height?: number
  width?: number
  isLink?: boolean
  hoverEffect?: boolean
  showAmount?: boolean
}

const CardImage = ({
  cardId,
  className,
  height,
  width,
  isLink,
  hoverEffect,
  showAmount,
}: Props) => {
  const dispatch = useAppDispatch()
  const locale = useLocale()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const card = useAppSelector((state) => selectCardById(state, cardId))
  const set = useAppSelector((state) => selectSet(state, card?.setId ?? -1))
  const defaultCount = useAppSelector((state) =>
    selectUserCardAmount(state, card?.id ?? -1, Treatment.DEFAULT)
  )
  const foilCount = useAppSelector((state) =>
    selectUserCardAmount(state, card?.id ?? -1, Treatment.FOIL)
  )

  useEffect(() => {
    if (!card) {
      dispatch(getCard.initiate({ locale, id: cardId }))
    }
  }, [card, cardId, dispatch, locale])

  if (!card || !set) return null

  const imageUrl = getImageUrl(locale, card.setNumber, set.code, card.types)

  const handleError = () => {
    setError(true)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  return (
    <Link
      aria-disabled={isLink}
      className={clsx(!isLink && 'pointer-events-none')}
      href={`${PAGE.SEARCH}/${cardId}`}
    >
      <div
        className={clsx(
          'w-full aspect-5/7 rounded-xl overflow-hidden relative',
          error && 'bg-black',
          hoverEffect && 'transition-all duration-300 hover:scale-105'
        )}
      >
        {!error && loading ? (
          <div className='bg-gray-200 animate-pulse w-full h-full rounded' />
        ) : null}
        <CldImage
          alt={card.name}
          className={clsx(className, 'w-full')}
          height={height ?? 350}
          onError={handleError}
          onLoad={handleLoad}
          src={imageUrl}
          width={width ?? 250}
        />
        {showAmount && (defaultCount || foilCount) ? (
          <div className='flex gap-4 bg-gray-700 rounded-t-xl py-1 px-2 absolute right-16 bottom-0'>
            <div className='flex gap-1'>
              <Image
                alt='.'
                height={15}
                priority
                src='/images/dot.svg'
                width={15}
              />
              <span className='font-bold'>{defaultCount}</span>
            </div>
            <div className='flex gap-1'>
              <Image
                alt='.'
                height={15}
                priority
                src='/images/star.svg'
                width={15}
              />
              <span className='font-bold'>{foilCount}</span>
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export default CardImage
