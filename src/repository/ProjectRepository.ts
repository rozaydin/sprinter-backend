import { CrudDaoImpl } from "../service/DBServicePostgres";
import { Project, ProjectEntity } from "../model/Project";

export class ProjectRepository extends CrudDaoImpl<Project, ProjectEntity> {

    constructor() {
        super("project");
    }

}