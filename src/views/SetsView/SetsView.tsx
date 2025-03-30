'use client'

import SetLogo from '@/components/SetLogo'
import { useAppSelector } from '@/globalHooks/redux'
import { selectSets } from '@/redux/slices/setSlice'

const SetsView = () => {
  const sets = useAppSelector(selectSets)

  return (
    <div className='p-12 grid grid-cols-4'>
      {sets.map((set) => (
        <SetLogo hasHoverEffect key={set.id} set={set} />
      ))}
    </div>
  )
}

export default SetsView
