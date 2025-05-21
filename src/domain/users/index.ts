import { api } from '@/domain'

import type { PostLoginBody, PostLoginDto } from './dtos/postLogin.dto'
import type { PostRegisterBody, PostRegisterDto } from './dtos/postRegister.dto'

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.query<PostLoginDto, PostLoginBody>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
    postRegister: builder.query<PostRegisterDto, PostRegisterBody>({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { postLogin, postRegister } = usersApi.endpoints
