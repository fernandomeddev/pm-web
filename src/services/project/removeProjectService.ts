import { ProjectDto } from "../../dtos/ProjectDto";
import { IProject } from "../../interfaces/IProject";
import { IResult } from "../../interfaces/IResult";
import { ProjectRepository } from "../../repository/projectRepository";
import { TaskRepository } from "../../repository/taskRepository";

export async function removeProjectService(projectId: string): Promise<IResult<IProject | null>>   {
    const projectRepository = ProjectRepository.instance();
    const project: ProjectDto | null = await projectRepository.getById(projectId);
    if (!project) {
        return {
            success: false,
            data: null,
            messages: ['nao foi possivel remover o projeto.']
        }
    }
    if (project.tasks && project.tasks.length > 0) {
        for await (const task of project.tasks) {
            const taskRepository = TaskRepository.instance();
            await taskRepository.delete(task.taskId);
        }
    }
    await projectRepository.delete(projectId);    
    return {
        success: true,
        messages: [`projeto ${project.name} removido com sucesso`],
    }
}