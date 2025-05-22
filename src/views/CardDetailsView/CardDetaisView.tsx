'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import Button from '@/components/Button'
import CardImage from '@/components/CardImage'
import { addUserCard, removeUserCard } from '@/domain/users'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import { selectCardById } from '@/redux/slices/cardSlice'
import { selectUser, selectUserCardAmount } from '@/redux/slices/userSlice'
import { Treatment } from '@/types'

import defaultCardIcon from '../../../public/images/dot.svg'
import foilCardIcon from '../../../public/images/star.svg'

import CardData from './components/CardData'

interface Props {
  cardId: number
}

const CardDetailsView = ({ cardId }: Props) => {
  const t = useTranslations('cardDetails')
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)
  const card = useAppSelector((state) => selectCardById(state, cardId))
  const defaultCount = useAppSelector((state) =>
    selectUserCardAmount(state, cardId, Treatment.DEFAULT)
  )
  const foilCount = useAppSelector((state) =>
    selectUserCardAmount(state, cardId, Treatment.FOIL)
  )

  const trackingOptions = [
    {
      treatment: Treatment.DEFAULT,
      icon: defaultCardIcon,
      count: defaultCount,
    },
    {
      treatment: Treatment.FOIL,
      icon: foilCardIcon,
      count: foilCount,
    },
  ]

  const handleTrackingClick = ({
    treatment,
    increase,
  }: {
    treatment: Treatment
    increase: boolean
  }) => {
    const count = treatment === Treatment.DEFAULT ? defaultCount : foilCount

    if (increase && count < 99) {
      dispatch(
        addUserCard.initiate({ cardId, treatment }, { forceRefetch: true })
      )
    } else if (!increase && count > 0) {
      dispatch(
        removeUserCard.initiate({ cardId, treatment }, { forceRefetch: true })
      )
    }
  }

  return (
    <div className='p-12'>
      <div className='flex justify-center gap-4 mb-12 flex-col md:flex-row'>
        <div className='flex flex-col gap-4'>
          <CardImage
            cardId={cardId}
            className='flex-2/5'
            height={450}
            width={350}
          />
          {user ? (
            <div className='flex justify-center gap-4'>
              {trackingOptions.map(({ treatment, icon, count }) => (
                <div
                  className='bg-gray-700 flex items-center gap-1 rounded-2xl overflow-hidden'
                  key={treatment}
                >
                  <Button
                    onClick={() =>
                      handleTrackingClick({ treatment, increase: true })
                    }
                  >
                    +
                  </Button>
                  <Image alt='.' height={20} priority src={icon} width={20} />
                  <span className='min-w-6 text-center'>{count}</span>
                  <Button
                    onClick={() =>
                      handleTrackingClick({ treatment, increase: false })
                    }
                  >
                    -
                  </Button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
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
