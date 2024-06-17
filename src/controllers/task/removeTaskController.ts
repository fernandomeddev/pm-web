import { Request, Response } from "express";
import { removeTaskService } from "../../services/task/removeTaskService";

export async function removeTaskController(request: Request, response: Response) {
    try {
        const taskId: string  = request.params.id;
        const responseService = await removeTaskService(taskId);

        if (!responseService.success) {
            return response.status(400).send(responseService.messages);
        }
        
        return response.status(200).send(responseService);
    } catch (error) {
        console.log(`server error on route delete task/remove/:id :: ${error}`);
        return response.status(500).send("internal server error");
    }
}