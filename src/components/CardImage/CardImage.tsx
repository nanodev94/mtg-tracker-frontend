import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { useLocale } from 'next-intl'
import clsx from 'clsx'

import { PAGE } from '@/constants'
import { getCard } from '@/domain/cards'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import { Link } from '@/i18n/navigation'
import { selectCardById } from '@/redux/slices/cardSlice'
import { selectSet } from '@/redux/slices/setSlice'
import { getImageUrl } from '@/utils/images'

interface Props {
  cardId: number
  className?: string
  height?: number
  width?: number
  isLink?: boolean
  hoverEffect?: boolean
}

const CardImage = ({
  cardId,
  className,
  height,
  width,
  isLink,
  hoverEffect,
}: Props) => {
  const dispatch = useAppDispatch()
  const locale = useLocale()
  const [error, setError] = useState(false)

  const card = useAppSelector((state) => selectCardById(state, cardId))
  const set = useAppSelector((state) => selectSet(state, card?.setId ?? -1))

  useEffect(() => {
    if (!card) {
      dispatch(getCard.initiate({ locale, id: cardId }))
    }
  }, [cardId])

  // TODO: Add loader
  if (!card || !set) return 'loading...'

  // TODO: Add image on load error

  const imageUrl = getImageUrl(locale, card.setNumber, set.code, card.types)

  const handleError = () => {
    setError(true)
  }

  return (
    <Link
      aria-disabled={isLink}
      className={clsx(!isLink && 'pointer-events-none')}
      href={`${PAGE.SEARCH}/${cardId}`}
    >
      <div
        className={clsx(
          'w-full aspect-5/7 rounded-xl',
          error && 'bg-black',
          hoverEffect && 'transition-all duration-300 hover:scale-105'
        )}
      >
        <CldImage
          alt={card.name}
          className={clsx(className, 'w-full')}
          height={height ?? 350}
          onError={handleError}
          src={imageUrl}
          width={width ?? 250}
        />
      </div>
    </Link>
  )
}

export default CardImage
