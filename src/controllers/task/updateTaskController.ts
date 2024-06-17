import { Request, Response } from "express";
import { validationUpdateTaskSchema } from "../../validationSchemas/task.schema";
import { updateTaskService } from "../../services/task/updateTaskService";

export async function updateTaskController(request: Request, response: Response) {
    try {
        const validate = validationUpdateTaskSchema.safeParse(request.body);
        if (validate.error) return response.status(400).send({errors: validate.error?.errors});
        const { title, description, status } = request.body;
        const taskId = request.params.id;
        const userId = request.user.id;
        
        const responseService = await updateTaskService(taskId, { title, description, status }, userId );
        if (!responseService.success) return response.status(400).send(responseService.messages);
       
        return response.status(200).send(responseService);
    } catch (error) {
        console.log(`server error on route put task/update/:id :: ${error}`);
        return response.status(500).send("internal server error");
    }
}
