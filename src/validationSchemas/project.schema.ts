import { z } from 'zod';

export const validationSchema = z.object({
  name: z.string().max(50).refine(name => name.trim().length > 0, {
    message: "O nome do projeto não deve conter apenas espaços"
  }),
  description: z.string().max(255).refine(description => description.trim().length > 0, {
    message: "A descrição do projeto não deve conter apenas espaços"
  })
})

export const validationUpdateProjectSchema = z.object({
  name: z.string().max(50).refine(name => name.trim().length > 0, {
    message: "O nome do projeto não deve conter apenas espaços"
  }).optional(),
  description: z.string().max(255).optional(),
})

export type INewProject  = z.infer<typeof validationSchema>;
export type IUpdateProject  = z.infer<typeof validationUpdateProjectSchema>;