'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import Button from '@/components/Button'
import { PAGE } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import { Link } from '@/i18n/navigation'
import { reset, selectUser } from '@/redux/slices/userSlice'

/*
const LOCALE_OPTIONS: SelectOption[] = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
]
*/

const Header = () => {
  const t = useTranslations('header')
  const dispatch = useAppDispatch()
  // const locale = useLocale()
  // const router = useRouter()
  // const pathname = usePathname()

  // TODO: check close session button when user has session and reload page
  const userData = useAppSelector(selectUser)

  const sections = [
    { href: PAGE.SEARCH, label: t('sections.search') },
    { href: PAGE.SETS, label: t('sections.sets') },
  ]

  /*
  const localeDefaultValue = LOCALE_OPTIONS.find(
    (option) => option.value === locale
  )

  const handleLocaleChange = (newValue: SingleValue<SelectOption>) => {
    router.replace({ pathname }, { locale: newValue?.value })
  }
  */

  const handleCloseSession = () => {
    dispatch(reset())
  }

  return (
    <header className='bg-header p-4 flex items-center justify-between gap-4 sticky top-0 z-50'>
      <div className='flex items-center gap-6'>
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
        {userData ? (
          <Button onClick={handleCloseSession} rounded>
            {t('closeSession')}
          </Button>
        ) : (
          <Link href={PAGE.LOGIN}>
            <Button rounded>{t('signIn')}</Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
