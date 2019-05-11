import { isOf } from "../util/Util";

export interface Project {
    name: string,
    companyId: number
}

export interface ProjectEntity extends Project {
    id: number,
}

export class ProjectImpl implements Project {

    name: string;
    companyId: number;

    constructor(name, companyId) {
        this.name = name;
        this.companyId = companyId;
    }

    static isOf(object: Object) {
        return isOf(object, ["name", "companyId"]);
    }
}

export class ProjectEntityImpl implements ProjectEntity {

    id: number;
    name: string;
    companyId: number;

    constructor(id, name, companyId) {
        this.id = id;
        this.name = name;
        this.companyId = companyId;
    }

    static isOf(object: Object) {
        return isOf(object, ["id", "name", "companyId"]);
    }
}