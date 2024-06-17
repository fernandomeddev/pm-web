import { ProjectDto } from "../../dtos/ProjectDto";
import { IResult } from "../../interfaces/IResult";
import { ProjectRepository } from "../../repository/projectRepository";
import { INewProject } from "../../validationSchemas/project.schema";
import { IProject } from "../../interfaces/IProject";

export async function updateProjectService(projectId: string, modifications: INewProject): Promise<IResult<IProject | null>>{
    const projectRepository = ProjectRepository.instance();
    const project: ProjectDto | null = await projectRepository.getById(projectId);
    if (!project) {
        return {
            success: false,
            messages: ['Projeto não encontrado.']
        }
    }

    const updatedData: ProjectDto = {
        ...project,
        ...modifications,
        updatedAt: new Date(),
    }
    
    const projectUpdated = await projectRepository.save(updatedData);
    if (!projectUpdated.id) {
        return {
            success: false,
            messages: ['Não foi possível atualizar o projeto. Tente novamente.']
        }
    }     
    return {
        success: true,
        data: updatedData,
    }
}