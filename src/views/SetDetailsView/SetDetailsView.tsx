'use client'

import SetLogo from '@/components/SetLogo'
import { useAppSelector } from '@/globalHooks/redux'
import { selectSet } from '@/redux/slices/setSlice'

import SetData from './components/SetData'

interface Props {
  setId: number
}

const SetDetailsView = ({ setId }: Props) => {
  const set = useAppSelector((state) => selectSet(state, setId))

  return (
    <div className='flex gap-6 flex-col md:flex-row p-12'>
      <SetLogo set={set} />
      <SetData set={set} />
    </div>
  )
}

export default SetDetailsView
