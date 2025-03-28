import clsx from 'clsx'

import { Color } from '@/types'

interface Props {
  mana: string
}

const ColorIcon: Record<string, React.ReactNode> = {
  [Color.BLACK]: <span>B</span>,
  [Color.WHITE]: <span>W</span>,
  [Color.RED]: <span>R</span>,
  [Color.BLUE]: <span>B</span>,
  [Color.GREEN]: <span>G</span>,
}

const ManaIndicator = ({ mana }: Props) => {
  // TODO: fix mana in rooms
  return (
    <div className='flex'>
      {mana
        .slice(1, -1)
        .split('][')
        .map((color) => (
          <div
            className={clsx(
              !ColorIcon[color] && 'bg-mana-colorless',
              color === Color.BLACK && 'bg-mana-black',
              color === Color.WHITE && 'bg-mana-white',
              color === Color.RED && 'bg-mana-red',
              color === Color.BLUE && 'bg-mana-blue',
              color === Color.GREEN && 'bg-mana-green',
              'size-6 border-2 rounded-full text-black flex items-center justify-center'
            )}
            key={color}
          >
            {ColorIcon[color] ?? <span>{color}</span>}
          </div>
        ))}
    </div>
  )
}

export default ManaIndicator
