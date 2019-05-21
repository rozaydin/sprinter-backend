import { isOf } from "../util/Util";

export interface Company {
    name: string,
    logo: string
}

export interface CompanyEntity extends Company {
    id: number,
}

export class CompanyImpl implements Company {

    name: string;
    logo: string;

    constructor(name, logo) {
        this.name = name;
        this.logo = logo;
    }

    static isOf(object: Object) {
        return isOf(object, ["name", "logo"]);
    }
}

export class CompanyEntityImpl implements CompanyEntity {

    id: number;
    name: string;
    logo: string;

    constructor(id, name, logo) {
        this.id = id;
        this.name = name;
        this.logo = logo;
    }

    static isOf(object: Object) {
        return isOf(object, ["id", "name", "logo"]);
    }

} 