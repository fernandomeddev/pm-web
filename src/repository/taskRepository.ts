import { BaseCrud } from "mongo-base-crud";
import { Singleton } from "typescript-singleton";
import { ProjectDto } from "../dtos/ProjectDto";
import { TaskDto } from "../dtos/TaskDto";

const dbName = process.env.DB_NAME || 'app_poduct_manager_bko'
export class TaskRepository extends BaseCrud<TaskDto> {
    static instance() {
        const instance = Singleton.getInstance('TaskRepository', TaskRepository, 'tasks', dbName)
        return instance
    }

    public async findByName(name: string): Promise<ProjectDto | undefined> {
        const records: ProjectDto[] = await this.findAll({ name });
        if (records.length === 0) {
            return undefined;
        }
        return records[0];
    }

    public async findById(id: string): Promise<ProjectDto | undefined> {
        const records: ProjectDto[] = await this.findAll({ id });
        if (records.length === 0) {
            return undefined;
        }
        const project = records[0];
        return project
    }

}
