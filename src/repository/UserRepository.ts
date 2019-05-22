import { CrudDaoImpl } from "../service/DBServicePostgres";
import { User, UserEntity } from "../model/User"

export class UserRepository extends CrudDaoImpl<User, UserEntity> {

    constructor() {
        super("user");
    }
}
