import z from 'zod'

import { selectOptionValidation } from '@/utils/zodValidations'

export const headerSchema = z.object({
  locale: selectOptionValidation,
})

export type HeaderData = z.infer<typeof headerSchema>
