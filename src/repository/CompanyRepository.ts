import { getPool, OkPacket, CrudDaoImpl } from "../service/DBService";
import { Company, CompanyEntity } from "../model/Company";

export class CompanyRepository extends CrudDaoImpl<Company, CompanyEntity> {

    constructor() {
        super("company");
    }

}