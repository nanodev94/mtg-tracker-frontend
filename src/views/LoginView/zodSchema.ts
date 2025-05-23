import z from 'zod'

export const loginSchema = z.object({
  email: z.string().nonempty().max(150).email(),
  password: z.string().nonempty().max(150),
})

export type LoginData = z.infer<typeof loginSchema>
