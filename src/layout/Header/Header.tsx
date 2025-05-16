'use client'

import { FaUser } from 'react-icons/fa'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { PAGE } from '@/constants'
import { Link } from '@/i18n/navigation'

/*
const LOCALE_OPTIONS: SelectOption[] = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
]
*/

const Header = () => {
  const t = useTranslations('sections')
  // const locale = useLocale()
  // const router = useRouter()
  // const pathname = usePathname()

  const sections = [
    { href: PAGE.SEARCH, label: t('search') },
    { href: PAGE.SETS, label: t('sets') },
  ]

  /*
  const localeDefaultValue = LOCALE_OPTIONS.find(
    (option) => option.value === locale
  )

  const handleLocaleChange = (newValue: SingleValue<SelectOption>) => {
    router.replace({ pathname }, { locale: newValue?.value })
  }
  */

  return (
    <header className='bg-header p-4 flex items-center justify-between gap-4 sticky top-0 z-50'>
      <div className='flex items-center gap-4'>
        <Image alt='App Icon' height={40} src='/favicon.webp' width={40} />
        {sections.map(({ href, label }) => (
          <Link
            className='text-xl font-bold hover:text-red-500 transition-all duration-300'
            href={href}
            key={label}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className='flex items-center justify-end gap-4 grow'>
        {/* <Search /> */}
        {/*
        <Select
          defaultValue={localeDefaultValue}
          onChange={handleLocaleChange}
          options={LOCALE_OPTIONS}
        />
        */}
        <button className='cursor-pointer bg-red-500 p-4 rounded-full'>
          <FaUser size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header
