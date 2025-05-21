'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import { PAGE } from '@/constants'
import { postLogin } from '@/domain/users'
import { useAppDispatch, useAppSelector } from '@/globalHooks/redux'
import { selectUserStatus } from '@/redux/slices/userSlice'

import { type LoginData, loginSchema } from './zodSchema'

const LoginView = () => {
  const t = useTranslations('login')
  const dispatch = useAppDispatch()

  const loading = useAppSelector(selectUserStatus)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginData) => {
    dispatch(postLogin.initiate(data, { forceRefetch: true }))
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
      {loading === 'loading' ? (
        <Loader className='m-4 text-center' />
      ) : (
        <Button className='mt-5 mb-12' large rounded type='submit'>
          {t('apply')}
        </Button>
      )}
      <Link
        className='text-blue-200 duration-500 hover:text-red-400'
        href={PAGE.REGISTER}
      >
        {t('register')}
      </Link>
    </form>
  )
}

export default LoginView
