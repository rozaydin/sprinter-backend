import { CrudDaoImpl } from "../service/DBServicePostgres";
import { Company, CompanyEntity } from "../model/Company";

export class CompanyRepository extends CrudDaoImpl<Company, CompanyEntity> {

    constructor() {
        super("company");
    }

}