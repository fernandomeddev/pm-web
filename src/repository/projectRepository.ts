import { BaseCrud } from "mongo-base-crud";
import { Singleton } from "typescript-singleton";
import { ProjectDto } from "../dtos/ProjectDto";

const dbName = process.env.DB_NAME || 'app_poduct_manager_bko'
export class ProjectRepository extends BaseCrud<ProjectDto> {
    static instance() {
        const instance = Singleton.getInstance('ProjectRepository', ProjectRepository, 'projects', dbName)
        return instance
    }

    //Opcao de busca por alias
    public async findByAlias(projectAlias: string): Promise<ProjectDto | undefined> {
        const records: ProjectDto[] = await this.findAll({ projectAlias });
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
