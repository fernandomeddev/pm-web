import slugify from "slugify";
import { ProjectDto } from "../../dtos/ProjectDto";
import { IProject } from "../../interfaces/IProject";
import { IResult } from "../../interfaces/IResult";
import { ProjectRepository } from "../../repository/projectRepository";
import { INewProject } from "../../validationSchemas/project.schema";

export async function createProjectService(data: INewProject, userId: string ): Promise<IResult<IProject | null>> {
    
    const projectAlias: string = slugify(data.name, { lower: true });
    const projectRepository = ProjectRepository.instance();
    /*
    sugestao de implementacao para verificar se ja existe um projeto com o mesmo nome
    const projectWithSameName = await projectRepository.findByAlias(projectAlias);
        if (projectWithSameName) {
            return {
                success: false,
                data: null,
                messages: ['Ja existe um projeto com esse nome.']
            }
        } 
    */

    const newProject: ProjectDto = {
        ...data,
        tasks: [],
        createdBy: userId,
        projectAlias,
        updatedAt: new Date(),
        createdAt: new Date()
    };

    const project = await projectRepository.save(newProject);
    if (!project.id) {
        return {
            success: false,
            data: null,
            messages: ['Nao foi possivel criar o projeto. Tente novamente.']
        }
    }

    newProject.id = project.id;
    return {
        success: true,
        data: newProject,
    }
}
