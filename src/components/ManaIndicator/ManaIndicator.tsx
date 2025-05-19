/* eslint-disable react/jsx-no-comment-textnodes */
import clsx from 'clsx'

import { Color } from '@/types'

interface Props {
  mana: string
}

const ColorIcon: Record<string, React.ReactNode> = {
  [Color.BLACK]: 'bg-mana-black mana-black-symbol',
  [Color.WHITE]: 'bg-mana-white mana-white-symbol',
  [Color.RED]: 'bg-mana-red mana-red-symbol',
  [Color.BLUE]: 'bg-mana-blue mana-blue-symbol',
  [Color.GREEN]: 'bg-mana-green mana-green-symbol',
}

const ManaIndicator = ({ mana }: Props) => {
  const differentManaCosts = mana.split('//')

  return (
    <div className='flex gap-2'>
      {differentManaCosts.map((mana, index) => {
        const colors = mana.slice(1, -1).split('][')

        return (
          <>
            {index !== 0 && <span>//</span>}
            <div className='flex'>
              {colors.map((color) => (
                <div
                  className={clsx(
                    ColorIcon[color] ?? 'bg-mana-colorless',
                    'size-6 border-2 rounded-full text-black flex items-center justify-center'
                  )}
                  key={color}
                >
                  {!ColorIcon[color] && <span>{color}</span>}
                </div>
              ))}
            </div>
          </>
        )
      })}
    </div>
  )
}

export default ManaIndicator
