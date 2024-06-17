import { IProject } from "../../interfaces/IProject";
import { IResult } from "../../interfaces/IResult";
import { ProjectRepository } from "../../repository/projectRepository";

export async function listProjectsService(userId: string): Promise<IResult<IProject[] | null>>   {
    const projectRepository = ProjectRepository.instance();
    const projects: IProject[] = await projectRepository.findAll({ createdBy: userId });
    if (projects.length === 0 || !projects) {
        return {
            success: true,
            data: [],
            messages: ['Este usuário ainda não possui nenhum projeto criado.']
        }
    }
    return {
        success: true,
        data: projects,
    }
}
