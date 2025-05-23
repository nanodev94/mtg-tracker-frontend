'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import { PAGE } from '@/constants'
import { postRegister } from '@/domain/users'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import { selectUserStatus } from '@/redux/slices/userSlice'

import { type RegisterData, registerSchema } from './zodSchema'

const RegisterView = () => {
  const t = useTranslations('register')
  const dispatch = useAppDispatch()
  const locale = useLocale()

  const loading = useAppSelector(selectUserStatus)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  })

  // TODO: add push notification to inform to the user

  const onSubmit = (data: RegisterData) => {
    dispatch(
      postRegister.initiate({
        email: data.email,
        password: data.password,
        languageCode: locale,
      })
    )
  }

  return (
    <form
      className='bg-gray-700 max-w-140 m-auto mt-28 p-8 rounded-xl'
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className='block text-center text-3xl font-bold'>{t('title')}</span>
      <div className='mt-8'>
        <span>{t('email')}</span>
        <Input
          error={errors.email?.message}
          id='email'
          type='text'
          {...register('email')}
        />
      </div>
      <div className='mt-4'>
        <span>{t('password')}</span>
        <Input
          error={errors.password?.message}
          id='password'
          type='password'
          {...register('password')}
        />
      </div>
      <div className='mt-4'>
        <span>{t('confirm')}</span>
        <Input
          error={errors.confirm?.message}
          id='confirm'
          type='password'
          {...register('confirm')}
        />
      </div>
      {loading === 'loading' ? (
        <Loader className='m-4 text-center' />
      ) : (
        <Button className='mt-5 mb-12' large rounded type='submit'>
          {t('apply')}
        </Button>
      )}
      <Link
        className='text-blue-200 duration-500 hover:text-red-400'
        href={PAGE.LOGIN}
      >
        {t('login')}
      </Link>
    </form>
  )
}

export default RegisterView
