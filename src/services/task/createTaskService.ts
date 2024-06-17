import slugify from "slugify";
import { IResult } from "../../interfaces/IResult";
import { ITask } from "../../interfaces/ITask";
import { TaskRepository } from "../../repository/taskRepository";
import { INewTask } from "../../validationSchemas/task.schema";
import { TaskDto } from "../../dtos/TaskDto";
import { ProjectRepository } from "../../repository/projectRepository";

export async function createTaskService(data: INewTask, projectId: string, userId: string): Promise<IResult<ITask | null>>{
    const projectRepository = ProjectRepository.instance();
    const project = await projectRepository.findById(projectId);
    if (!project) {
        return {
            success: false,
            messages: ['Projeto não encontrado.']
        }
    }

    const taskAlias = slugify(data.title, { lower: true });
    const newTaskData: TaskDto = {
        ...data,
        projectId,
        createdBy: userId,
        status: 'pending',
        taskAlias,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const taskRepository = TaskRepository.instance();
    const taskCreated = await taskRepository.save(newTaskData);
    if (!taskCreated.id) {
        return {
            success: false,
            messages: ['Não foi possível criar a tarefa. Tente novamente.']
        }
    }

    if (!project.tasks?.find(task => task.taskId === taskCreated.id)) {
        project.tasks?.push({ taskId: taskCreated.id });
        await projectRepository.save(project);
    }
    
    newTaskData.id = taskCreated.id;
    return {
        success: true,
        data: newTaskData,
    }
}