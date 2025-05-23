import z from 'zod'

export const registerSchema = z
  .object({
    email: z.string().nonempty().max(150).email(),
    password: z.string().nonempty().max(150),
    confirm: z.string().nonempty().max(150),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

export type RegisterData = z.infer<typeof registerSchema>
