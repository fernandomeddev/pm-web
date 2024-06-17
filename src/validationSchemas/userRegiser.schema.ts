import { z } from 'zod';

export const validationSchema = z.object({
  name: z.string().refine(name => name.trim().length > 0, {
    message: "O nome não deve conter apenas espaços"
  }),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Reporta o erro no campo confirmPassword;
})
export type IUserRegister = z.infer<typeof validationSchema>;