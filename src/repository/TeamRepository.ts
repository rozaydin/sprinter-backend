import { CrudDaoImpl } from "../service/DBServicePostgres";
import { Team, TeamEntity, TeamImpl, TeamEntityImpl } from "../model/Team";

export class TeamRepository extends CrudDaoImpl<Team, TeamEntity> {

    constructor() {
        super("team");
    }

}