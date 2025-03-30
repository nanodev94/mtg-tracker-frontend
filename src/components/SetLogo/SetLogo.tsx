'use client'

import { CldImage } from 'next-cloudinary'
import clsx from 'clsx'

import { PAGE } from '@/constants'
import type { Set } from '@/domain/@types'
import { Link } from '@/i18n/navigation'
import { getSetUrl } from '@/utils/images'

interface Props {
  hasHoverEffect?: boolean
  set?: Set
}

const SetLogo = ({ hasHoverEffect, set }: Props) => {
  // TODO: add loader
  if (!set) return 'loading...'

  const setUrl = getSetUrl(set.code)

  return (
    <Link
      className={clsx(!hasHoverEffect && 'pointer-events-none')}
      href={`${PAGE.SETS}/${set.id}`}
    >
      <div
        className={clsx(
          hasHoverEffect &&
            'cursor-pointer hover:bg-amber-400 transition-all duration-500',
          'p-4 aspect-5/7 flex flex-col items-center justify-center'
        )}
      >
        <CldImage alt='' height={50} src={setUrl.symbol} width={50} />
        <CldImage alt={set.name} height={50} src={setUrl.name} width={250} />
      </div>
    </Link>
  )
}

export default SetLogo
