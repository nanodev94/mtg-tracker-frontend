import z from 'zod'

import { selectOptionValidation } from '@/utils/zodValidations'

export const filtersSchema = z.object({
  name: z.string().optional(),
  sortBy: selectOptionValidation.optional(),
  colors: z.array(selectOptionValidation).optional(),
  types: z.array(selectOptionValidation).optional(),
  subtypes: z.array(selectOptionValidation).optional(),
  rarities: z.array(selectOptionValidation).optional(),
  keywords: z.array(selectOptionValidation).optional(),
  artists: z.array(selectOptionValidation).optional(),
  treatments: z.array(selectOptionValidation).optional(),
  setIds: z.array(selectOptionValidation).optional(),
  page: z.coerce.number().optional(),
  resultsPerPage: z.coerce.number().optional(),
  sortField: z.string().optional(),
  sortDir: z.string().optional(),
})

export type FilterData = z.infer<typeof filtersSchema>
