import { getPool, terminatePool, CrudDaoImpl } from "../service/DBService";
import { User, UserImpl, UserEntity } from "../model/User"

export class UserRepository extends CrudDaoImpl<User, UserEntity> {

    constructor() {
        super("user");
    }

    get(email: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            getPool().query(`SELECT * FROM ${this.tableName} WHERE email = ?`, email, (error, results) => {
                if (error) reject(error);
                resolve(results[0]);
            });
        });
    }

}
