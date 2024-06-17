import { Singleton } from "typescript-singleton"
import { UserDto } from "../dtos/UserDto"
import { BaseCrud } from "mongo-base-crud"

const dbName = process.env.DB_NAME || 'app_poduct_manager_bko'
export default class UserRepository extends BaseCrud<UserDto> {
  public static instanse() {
    const instanse = Singleton.getInstance('UserRepository', UserRepository, 'tb_users', dbName)
    return instanse
  }

  public async findByEmail(email: string): Promise<UserDto | undefined> {
    const records: UserDto[] = await this.findAll({ email });
    if (records.length === 0) {
      return undefined;
    }
    return records[0];
  }
}