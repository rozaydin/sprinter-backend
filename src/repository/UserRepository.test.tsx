
import { UserRepository } from "./UserRepository";
import { CompanyRepository } from "./CompanyRepository";
import { TeamRepository } from "./TeamRepository";
import { ProjectRepository } from "./ProjectRepository";
import { UserImpl } from "../model/User";
import { terminatePool } from "../service/DBServiceMysql";
import { Company, CompanyEntity, CompanyImpl } from "../model/Company";
import { Project, ProjectEntity, ProjectImpl } from "../model/Project";
import { Team, TeamEntity, TeamImpl } from "../model/Team";

const userRepo = new UserRepository();
const companyRepo = new CompanyRepository();
const teamRepo = new TeamRepository();
const projectRepo = new ProjectRepository(); 

const ids = {
    companyId: -1,
    teamId: -1,
    projectId: -1
};

beforeAll(async () => {
    const companyInsert = await companyRepo.save(new CompanyImpl("Siemens A.S.", "dummy-logo"));
    ids.companyId = companyInsert.insertId;
    const projectInsert = await projectRepo.save(new ProjectImpl("MindSphere", ids.companyId));
    ids.projectId = projectInsert.insertId;
    const teamInsert = await teamRepo.save(new TeamImpl("Team 7", "44", "implement all", ids.companyId, ids.projectId));
    ids.teamId = teamInsert.insertId;
});

afterAll(async () => {    
    await userRepo.clear();
    await teamRepo.del(ids.teamId);
    await projectRepo.del(ids.projectId);
    await companyRepo.del(ids.companyId);
    await terminatePool();    
});

beforeEach(async () => {    
    await userRepo.clear();
});

describe("User Repository Test Suite", () => {

    test("should save a user to db", async () => {

        const user = new UserImpl("Ridvan Ozaydin", "ridvanozaydin_1@gmail.com", "password", "image", "0555", "developer", ids.teamId, ids.projectId, ids.companyId);
        const result = await userRepo.save(user);
        await userRepo.del(result.insertId);
        expect(result.affectedRows).toBe(1);
    });

    test("should reject a save with duplicate email", async () => {
        
        const user1 = new UserImpl("Ridvan Ozaydin", "ridvanozaydin@gmail.com", "password", "image", "0555", "developer", ids.teamId, ids.projectId, ids.companyId);
        const user2 = new UserImpl("Ridvan Ozaydin", "ridvanozaydin@gmail.com", "password", "image", "0555", "developer", ids.teamId, ids.projectId, ids.companyId);

        const result1 = await userRepo.save(user1);
        expect(result1.affectedRows).toBe(1);
        expect(userRepo.save(user2)).rejects.toBeTruthy();
    });

    test("should retrieve saved record from DB", async () => {
        // save user
        const notSavedUser = new UserImpl("Ridvan Ozaydin", "ridvanozaydin_2@gmail.com", "password", "image", "0555", "developer", ids.teamId, ids.projectId, ids.companyId);
        await userRepo.save(notSavedUser);
        // retrieve saved user from db
        const user = await userRepo.getWith("email","ridvanozaydin_2@gmail.com");
        expect(user[0]).toMatchObject(notSavedUser);
    });

});

