import { Request, Response } from "express";
import { updateProjectService } from "../../services/project/updateProjectService";
import { validationUpdateProjectSchema } from "../../validationSchemas/project.schema";

export async function updateProjectController(request: Request, response: Response) {
    try {
        const validate = validationUpdateProjectSchema.safeParse(request.body);
        if (validate.error) return response.status(400).send({errors: validate.error?.errors});
        const { name, description } = request.body;
        const projectId = request.params.projectId;

        const responseService = await updateProjectService(projectId, { name, description } );
        if (!responseService.success) return response.status(400).send(responseService.messages);
       
        return response.status(200).send(responseService);
    } catch (error) {
        console.log(`server error on route put project/update/:id :: ${error}`);
        return response.status(500).send("internal server error");
    }
}