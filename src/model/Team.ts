export interface Team {
    name: string;
    sprint: string;
    goal: string;
    companyId: string;
    projectId: string;
}

export interface TeamEntity extends Team {
    id: number;
}

export class TeamImpl implements Team {

    name: string;
    sprint: string;
    goal: string;
    companyId: string;
    projectId: string;

    constructor(name, sprint, goal, companyId, projectId) {
        this.name = name;
        this.sprint = sprint;
        this.goal = goal;
        this.companyId = companyId;
        this.projectId = projectId;
    }
}

export class TeamEntityImpl implements TeamEntity {

    id: number;
    name: string;
    sprint: string;
    goal: string;
    companyId: string;
    projectId: string;

    constructor(id, name, sprint, goal, companyId, projectId) {
        this.id = id;
        this.name = name;
        this.sprint = sprint;
        this.goal = goal;
        this.companyId = companyId;
        this.projectId = projectId;
    }
}