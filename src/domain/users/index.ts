import { api } from '@/domain'

import type { AddUserCardDto } from './dtos/addUserCard.dto'
import type {
  GetUserCardsDto,
  GetUserCardsQueryParams,
} from './dtos/getUserCards.dto'
import type { PostLoginBody, PostLoginDto } from './dtos/postLogin.dto'
import type { PostRegisterBody, PostRegisterDto } from './dtos/postRegister.dto'
import type { RemoveUserCardDto } from './dtos/removeUserCard.dto'

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
    getUserCards: builder.query<GetUserCardsDto, GetUserCardsQueryParams>({
      query: (params) => ({
        url: '/users/cards',
        params,
      }),
    }),
    addUserCard: builder.query<
      AddUserCardDto,
      { cardId: number; treatment: string }
    >({
      query: ({ cardId, treatment }) => ({
        url: `/users/addCard/${cardId}/${treatment}`,
        method: 'PUT',
      }),
    }),
    removeUserCard: builder.query<
      RemoveUserCardDto,
      { cardId: number; treatment: string }
    >({
      query: ({ cardId, treatment }) => ({
        url: `/users/removeCard/${cardId}/${treatment}`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  postLogin,
  postRegister,
  getUserCards,
  addUserCard,
  removeUserCard,
} = usersApi.endpoints
