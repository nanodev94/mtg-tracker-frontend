'use client'

import { useTranslations } from 'next-intl'

import ManaIndicator from '@/components/ManaIndicator'
import RarityIndicator from '@/components/RarityIndicator'
import type { Set } from '@/domain/@types'
import { Color, Rarity } from '@/types'

interface Props {
  set?: Set
}

const SetData = ({ set }: Props) => {
  const t = useTranslations('setDetails')

  // TODO: add loader
  if (!set) return 'loading...'

  return (
    <div className='flex flex-col gap-2'>
      <span>{`${t('code')} ${set.code}`}</span>
      <span>{`${t('name')} ${set.name}`}</span>
      <span>{`${t('releasedAt')} ${set.releasedAt.toLocaleString()}`}</span>
      <span>{`${t('arts')} ${set.artCardsCount}`}</span>
      <span>{`${t('tokens')} ${set.tokenCardsCount}`}</span>
      <span>{`${t('total')} ${set.totalCards}`}</span>
      <div className='flex gap-8 px-4'>
        <div className='flex flex-col'>
          {[
            { color: Color.WHITE, count: set.whiteCardsCount },
            { color: Color.BLUE, count: set.blueCardsCount },
            { color: Color.BLACK, count: set.blackCardsCount },
            { color: Color.RED, count: set.redCardsCount },
            { color: Color.GREEN, count: set.greenCardsCount },
            { color: '', count: set.colorlessCardsCount },
          ].map(({ color, count }) => (
            <div className='flex gap-1' key={color}>
              <ManaIndicator mana={`[${color}]`} />
              <span>{count}</span>
            </div>
          ))}
          <div className='flex gap-1'>
            <div className='size-6 border-2 rounded-full text-black flex items-center justify-center bg-land' />
            <span>{set.landCardsCount}</span>
          </div>
        </div>
        <div className='flex flex-col'>
          {[
            { rarity: Rarity.COMMON, count: set.commonCardsCount },
            { rarity: Rarity.UNCOMMON, count: set.uncommonCardsCount },
            { rarity: Rarity.RARE, count: set.rareCardsCount },
            { rarity: Rarity.MYTHIC, count: set.mythicCardsCount },
          ].map(({ rarity, count }) => (
            <div className='flex items-center gap-1' key={rarity}>
              <RarityIndicator rarity={rarity} />
              <span>{count}</span>
            </div>
          ))}
        </div>
      </div>
      <span>{`${t('extra')} ${set.extraCards}`}</span>
    </div>
  )
}

export default SetData
