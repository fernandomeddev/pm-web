
export interface TaskDto {
    id?: string;
    projectId: string;
    taskAlias: string;
    title: string;
    description: string;
    status: 'pending' | 'completed'
    createdBy: string; // Acrescentei usuário que criou a tarefa 
    createdAt: Date;
    updatedAt?: Date;
    completedAt?: Date;
    completedBy?: string;
}




    