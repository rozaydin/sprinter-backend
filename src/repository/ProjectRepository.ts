import { getPool, OkPacket, CrudDao, CrudDaoImpl } from "../service/DBServiceMysql";
import { Project, ProjectEntity } from "../model/Project";

export class ProjectRepository extends CrudDaoImpl<Project, ProjectEntity> {

    constructor() {
        super("project");
    }

}