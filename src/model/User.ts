export interface User {
    name: string;
    email: string;
    password: string;
    image: string;
    mobile: string;
    role: string;
    teamId: number;
    projectId: number,
    companyId: number;    
}

export interface UserEntity extends User {
    id: number;    
}

export class UserImpl implements User {

    name: string;
    email: string;
    password: string;
    image: string;
    mobile: string;
    role: string;
    teamId: number;
    projectId: number;
    companyId: number;

    constructor(name, email, password, image, mobile, role, teamId, projectId, companyId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.image = image;
        this.mobile = mobile;
        this.role = role;
        this.teamId = teamId;
        this.projectId = projectId;
        this.companyId = companyId;
    }

}

export class UserEntityImpl implements UserEntity {

    id: number;
    name: string;
    email: string;
    password: string;
    image: string;
    mobile: string;
    role: string;
    teamId: number;
    projectId: number;
    companyId: number;

    constructor(id: number, name: string, email: string, password: string, image: string, mobile: string, role: string, teamId: number, projectId: number, companyId: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.image = image;
        this.mobile = mobile;
        this.role = role;
        this.teamId = teamId;
        this.projectId = projectId;
        this.companyId = companyId;
    }
}