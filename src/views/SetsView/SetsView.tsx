'use client'

import SetLogo from '@/components/SetLogo'
import { useAppSelector } from '@/globalHooks/redux'
import { selectSets } from '@/redux/slices/setSlice'

const SetsView = () => {
  const sets = useAppSelector(selectSets)

  return (
    <div className='p-12 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-col-6'>
      {sets.map((set) => (
        <SetLogo hasHoverEffect key={set.id} set={set} />
      ))}
    </div>
  )
}

export default SetsView
