import { Request, Response } from "express";
import { validationSchema } from "../../validationSchemas/task.schema";
import { createTaskService } from "../../services/task/createTaskService";

export async function createTaskController(request: Request, response: Response) {
    try {
        const validate = validationSchema.safeParse(request.body);
        if (validate.error) return response.status(400).send({errors: validate.error?.errors});
        
        const { title, description } = request.body;
        const userId: string = request.user.id;
        const projectId: string  = request.params.projectId;
        
        const responseService = await createTaskService({ title, description }, projectId, userId);
        if (!responseService.success) return response.status(400).send(responseService.messages);

        return response.status(200).send(responseService);
    } catch (error) {
        console.log(`server error on route post task/create :: ${error}`);
        return response.status(500).send("internal server error");
    }
}