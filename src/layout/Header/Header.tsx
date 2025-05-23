'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import Button from '@/components/Button'
import Select from '@/components/Select'
import type { SelectOption } from '@/components/Select/Select'
import { PAGE } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { SUPPORTED_LOCALES } from '@/i18n/routing'
import { reset, selectUser } from '@/redux/slices/userSlice'

import { type HeaderData, headerSchema } from './zodSchema'

const LOCALE_OPTIONS: SelectOption[] = SUPPORTED_LOCALES.map((locale) => ({
  value: locale,
  label: locale.toUpperCase(),
}))

const Header = () => {
  const t = useTranslations('header')
  const dispatch = useAppDispatch()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  // TODO: check close session button when user has session and reload page
  const userData = useAppSelector(selectUser)

  const { control, watch } = useForm<HeaderData>({
    resolver: zodResolver(headerSchema),
    defaultValues: {
      locale: LOCALE_OPTIONS.find((option) => option.value === locale),
    },
  })

  const currentLocale = watch('locale')

  const sections = [
    { href: PAGE.SEARCH, label: t('sections.search') },
    { href: PAGE.SETS, label: t('sections.sets') },
  ]

  const handleCloseSession = () => {
    dispatch(reset())
  }

  useEffect(() => {
    if (currentLocale.value !== locale) {
      router.replace({ pathname }, { locale: currentLocale.value })
    }
  }, [currentLocale])

  return (
    <header className='bg-header p-4 flex items-center justify-between gap-4 sticky top-0 z-50'>
      <div className='flex items-center gap-6'>
        <Image alt='App Icon' height={40} src='/favicon.webp' width={40} />
        {sections.map(({ href, label }) => (
          <Link
            className={clsx(
              'text-xl font-bold hover:text-red-500 transition-all duration-300',
              pathname.includes(href) && 'text-red-500'
            )}
            href={href}
            key={label}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className='flex items-center justify-end gap-4 grow'>
        <Select control={control} name='locale' options={LOCALE_OPTIONS} />
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
