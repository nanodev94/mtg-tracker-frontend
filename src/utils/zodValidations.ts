import z from 'zod'

export const selectOptionValidation = z.object({
  label: z.string(),
  value: z.string(),
})
