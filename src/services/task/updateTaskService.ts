import { TaskDto } from "../../dtos/TaskDto";
import { IResult } from "../../interfaces/IResult";
import { ITask } from "../../interfaces/ITask";
import { TaskRepository } from "../../repository/taskRepository";
import { IUpdateTask } from "../../validationSchemas/task.schema";

export async function updateTaskService(taskId: string, modifications: IUpdateTask, userId: string): Promise<IResult<ITask | null>> {
    const taskRepository = TaskRepository.instance();
    const task: ITask | null = await taskRepository.getById(taskId);
    if (!task) {
        return {
            success: false,
            messages: ['Tarefa não encontrada.']
        }
    };

    const updatedData: TaskDto = {
        ...task,
        ...modifications,
        completedBy: modifications.status === 'completed' ? userId : undefined,
        updatedAt: new Date(),
    }

    const taskUpdated = await taskRepository.save(updatedData);
    if (!taskUpdated.id) {
        return {
            success: false,
            messages: ['Não foi possível atualizar a tarefa. Tente novamente.']
        }
    }

    return {
        success: true,
        data: updatedData
    }
}