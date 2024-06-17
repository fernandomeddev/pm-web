import { Request, Response } from "express";
import { listTasksService } from "../../services/task/listTasksService";

export async function listTaskController(request: Request, response: Response) {
    try {
        const projectId: string  = request.params.projectId;

        const responseService = await listTasksService(projectId);
        if (!responseService.success) return response.status(400).send(responseService.messages);

        return response.status(200).send(responseService);
    } catch (error) {
        console.log(`server error on route get task/list :: ${error}`);
        return response.status(500).send("internal server error");
    }
}
