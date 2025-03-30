import { CldImage } from 'next-cloudinary'

import { PAGE } from '@/constants'
import { Link } from '@/i18n/navigation'
import { getSetUrl } from '@/utils/images'

interface Props {
  setId: number
  setCode: string
  setName: string
}

const SetLogo = ({ setId, setCode, setName }: Props) => {
  const setUrl = getSetUrl(setCode)

  return (
    <Link href={`${PAGE.SETS}/${setId}`}>
      <div className='p-4 aspect-5/7 flex flex-col items-center justify-center cursor-pointer hover:bg-amber-400 transition-all duration-500'>
        <CldImage alt='' height={50} src={setUrl.symbol} width={50} />
        <CldImage alt={setName} height={50} src={setUrl.name} width={250} />
      </div>
    </Link>
  )
}

export default SetLogo
