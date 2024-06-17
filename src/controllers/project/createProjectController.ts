import { Request, Response } from "express";
import { createProjectService } from "../../services/project/createProjectService";
import { validationSchema } from "../../validationSchemas/project.schema";

export async function createProjectController(request: Request, response: Response) {
    try {
        const validate = validationSchema.safeParse(request.body);
        if (validate.error) return response.status(400).send({ errors: validate.error?.errors });
        const { name, description } = request.body;
        if (!request.user) return response.status(401).send("Unauthorized");
        const userId = request.user.id;

        const responseService = await createProjectService({ name, description }, userId);
        if (!responseService.success) return response.status(400).send(responseService.messages);

        return response.status(200).send(responseService);
    } catch (error) {
        console.log(`server error on route post project/Create :: ${error}`);
        return response.status(500).send("internal server error");
    }
}
