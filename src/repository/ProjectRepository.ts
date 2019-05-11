import { getPool, OkPacket, CrudDao, CrudDaoImpl } from "../service/DBService";
import { Project, ProjectEntity } from "../model/Project";

export class ProjectRepository extends CrudDaoImpl<Project, ProjectEntity> {

    constructor() {
        super("project");
    }

}