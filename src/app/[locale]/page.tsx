import { redirect } from 'next/navigation'

import { PAGE } from '@/constants'

const Home = () => {
  redirect(PAGE.SEARCH)
}

export default Home
