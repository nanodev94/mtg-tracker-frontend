'use client'

import { TWITTER_DATA } from '@/constants'
import { Link } from '@/i18n/navigation'

const Footer = () => {
  return (
    <footer>
      <span>
        @Copyright 2025 -{' '}
        <Link href={TWITTER_DATA.site} target='_blank'>
          {TWITTER_DATA.creator}
        </Link>
      </span>
    </footer>
  )
}

export default Footer
