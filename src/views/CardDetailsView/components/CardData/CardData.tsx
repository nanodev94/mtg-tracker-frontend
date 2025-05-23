import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import Chip from '@/components/Chip'
import Loader from '@/components/Loader'
import ManaIndicator from '@/components/ManaIndicator'
import RarityIndicator from '@/components/RarityIndicator'
import type { Card } from '@/domain/@types'
import { useAppSelector } from '@/globalHooks/redux'
import { selectSet } from '@/redux/slices/setSlice'

interface Props {
  card?: Card
  className?: string
}

const CardData = ({ card, className }: Props) => {
  const t = useTranslations('cardDetails')
  const set = useAppSelector((state) => selectSet(state, card?.setId ?? -1))

  if (!card || !set) return <Loader />

  return (
    <div
      className={clsx(
        className,
        'flex flex-col gap-2 p-8 text-lg bg-gray-700 rounded-xl'
      )}
    >
      <span>{`${t('name')} ${card.name}`}</span>
      {card.mana ? (
        <div className='flex gap-2 items-center'>
          <span>{t('mana')}</span>
          <ManaIndicator mana={card.mana} />
        </div>
      ) : null}
      <span>{`${t('set')} ${set.code}`}</span>
      {card.setNumber ? (
        <span>{`${t('setNumber')} ${card.setNumber}`}</span>
      ) : null}
      {card.rarity ? (
        <div className='flex gap-2 items-center'>
          <span>{t('rarity')}</span>
          <RarityIndicator rarity={card.rarity} />
        </div>
      ) : null}
      {card.description ? (
        <span>{`${t('description')} ${card.description}`}</span>
      ) : null}
      {card.lore ? <span>{`${t('lore')} ${card.lore}`}</span> : null}
      {card.loyalty ? <span>{`${t('loyalty')} ${card.loyalty}`}</span> : null}
      {card.power ? <span>{`${t('power')} ${card.power}`}</span> : null}
      {card.defense ? <span>{`${t('defense')} ${card.defense}`}</span> : null}
      {card.artist ? <span>{`${t('artist')} ${card.artist}`}</span> : null}
      {card.keywords ? (
        <div className='flex flex-col'>
          <span>{t('keywords')}</span>
          <div className='flex gap-2'>
            {card.keywords.map((keyword) => (
              <Chip key={keyword} text={keyword} />
            ))}
          </div>
        </div>
      ) : null}
      {card.types ? (
        <div className='flex flex-col'>
          <span>{t('types')}</span>
          <div className='flex gap-2'>
            {card.types.map((type) => (
              <Chip key={type} text={type} />
            ))}
          </div>
        </div>
      ) : null}
      {card.subtypes ? (
        <div className='flex flex-col'>
          <span>{t('subtypes')}</span>
          <div className='flex gap-2'>
            {card.subtypes.map((subtype) => (
              <Chip key={subtype} text={subtype} />
            ))}
          </div>
        </div>
      ) : null}
      {card.treatments ? (
        <div className='flex flex-col'>
          <span>{t('treatments')}</span>
          <div className='flex gap-2'>
            {card.treatments.map((treatment) => (
              <Chip key={treatment} text={treatment} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CardData
