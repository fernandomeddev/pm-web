interface ITaskReference {
    taskId: string;
}

export interface ProjectDto {
    id?: string;
    projectAlias: string;
    name: string;
    description: string;
    createdBy: string;
    tasks?: ITaskReference[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}