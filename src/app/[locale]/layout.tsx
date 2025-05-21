import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import ReduxProvider from '@/redux/Provider'
import ContextWrapper from '@/wrappers/ContextWrapper'
import SessionWrapper from '@/wrappers/SessionWrapper'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })
const APP_NAME = 'MTGTracker'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  creator: 'nanodev94',
  title: APP_NAME,
  description: 'Track your Magic The Gathering collection',
}

interface Props {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <ReduxProvider>
      <SessionWrapper>
        <ContextWrapper>
          <NextIntlClientProvider messages={messages}>
            <html lang={locale}>
              <head>
                <link href='/favicon.webp' rel='icon' sizes='any' />
              </head>
              <body className={inter.className}>
                <Header />
                <div className='grow'>{children}</div>
                <Footer />
              </body>
            </html>
          </NextIntlClientProvider>
        </ContextWrapper>
      </SessionWrapper>
    </ReduxProvider>
  )
}

export default RootLayout
