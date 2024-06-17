import { Request, Response } from "express";
import { removeProjectService } from "../../services/project/removeProjectService";

export async function removeProjectController(request: Request, response: Response) {
    try {
        const projectId: string  = request.params.projectId;
        const responseService = await removeProjectService(projectId);

        if (!responseService.success) {
            return response.status(400).send(responseService.messages);
        }
        
        return response.status(200).send(responseService);
    } catch (error) {
        console.log(`server error on route delete project/remove/:id :: ${error}`);
        return response.status(500).send("internal server error");
    }
}
