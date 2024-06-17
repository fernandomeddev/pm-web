import { IResult } from "../../interfaces/IResult";
import { ITask } from "../../interfaces/ITask";
import { TaskRepository } from "../../repository/taskRepository";

export async function removeTaskService(taskId: string): Promise<IResult<null>> {
    const taskRepository = TaskRepository.instance();
    const task: ITask | null = await taskRepository.getById(taskId);
    if (!task) {
        return {
            success: false,
            messages: ['Tarefa não encontrada.']
        }
    }
    await taskRepository.delete(taskId);
    
    return {
        success: true,
        messages: [`Tarefa ${task.title}, Removida com sucesso`],
    }
}