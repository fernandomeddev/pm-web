import { z } from 'zod';

export const validationSchema = z.object({
    title: z.string().max(50).refine(title => title.trim().length > 0, {
        message: "O titulo não deve conter apenas espaços"
      }),
      description: z.string().max(255).refine(description => description && description.trim().length > 0, {
        message: "A descrição não deve conter apenas espaços"
      }),
});

export const validationUpdateTaskSchema = z.object({
    title: z.string().max(50).refine(title => title && title.trim().length > 0, {
        message: "O titulo não deve conter apenas espaços"
      }).optional(),
    description: z.string().max(255).refine(description => description && description.trim().length > 0, {
        message: "A descrição não deve conter apenas espaços"
      }).optional(),
    status: z.enum(['pending', 'completed']),
});

export type INewTask = z.infer<typeof validationSchema>;
export type IUpdateTask = z.infer<typeof validationUpdateTaskSchema>;