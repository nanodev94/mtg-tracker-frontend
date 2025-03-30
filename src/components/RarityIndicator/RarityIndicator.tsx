import clsx from 'clsx'

import { Rarity } from '@/types'

interface Props {
  rarity: string
}

const RarityIndicator = ({ rarity }: Props) => {
  return (
    <div
      className={clsx(
        rarity === Rarity.COMMON && 'bg-rarity-common',
        rarity === Rarity.UNCOMMON && 'bg-rarity-uncommon',
        rarity === Rarity.RARE && 'bg-rarity-rare',
        rarity === Rarity.MYTHIC && 'bg-rarity-mythic',
        'size-4 rounded-full border-2'
      )}
    />
  )
}

export default RarityIndicator
