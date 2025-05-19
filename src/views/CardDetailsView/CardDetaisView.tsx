'use client'

import { useTranslations } from 'next-intl'

import CardImage from '@/components/CardImage'
import { useAppSelector } from '@/globalHooks/redux'
import { selectCardById } from '@/redux/slices/cardSlice'

import CardData from './components/CardData'

interface Props {
  cardId: number
}

const CardDetailsView = ({ cardId }: Props) => {
  const t = useTranslations('cardDetails')
  const card = useAppSelector((state) => selectCardById(state, cardId))

  return (
    <div className='p-12'>
      <div className='flex justify-center gap-4 mb-12 flex-col md:flex-row'>
        <CardImage
          cardId={cardId}
          className='flex-2/5'
          height={450}
          width={350}
        />
        <CardData card={card} className='flex-3/5' />
      </div>
      {card?.alternatives ? (
        <div className='bg-gray-700 p-8 rounded-xl'>
          <span className='text-3xl font-bold uppercase'>
            {t('alternatives')}
          </span>
          <div className='mt-8 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {card.alternatives.map((cardAlternative) => (
              <CardImage
                cardId={cardAlternative}
                hoverEffect
                isLink
                key={cardAlternative}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CardDetailsView
