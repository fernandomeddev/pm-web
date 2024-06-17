import { Request, Response } from "express";
import { listProjectsService } from "../../services/project/listProjectsService";

export async function listProjectController(request: Request, response: Response) {
    try {
        const userId = request.user.id;
        const responseService = await listProjectsService(userId);
        
        if (!responseService.success) return response.status(400).send(responseService.messages);
       
        return response.status(200).send(responseService);
    } catch (error) {
        console.log(`server error on route get project/list :: ${error}`);
        return response.status(500).send("internal server error");
    }
}
