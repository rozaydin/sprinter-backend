import { getPool, terminatePool, CrudDaoImpl } from "../service/DBService";
import { User, UserImpl, UserEntity } from "../model/User"

export class UserRepository extends CrudDaoImpl<User, UserEntity> {

    constructor() {
        super("user");
    }   

}
