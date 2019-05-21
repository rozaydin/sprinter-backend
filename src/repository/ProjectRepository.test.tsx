import { Project, ProjectEntity, ProjectImpl, ProjectEntityImpl } from "../model/Project";
import { ProjectRepository } from "./ProjectRepository";
import { CompanyRepository } from "./CompanyRepository";
import { terminatePool } from "../service/DBServiceMysql";

const projectRepo = new ProjectRepository();
const companyRepo = new CompanyRepository();

const ids = {
    companyId: -1
};

beforeAll(async () => {
    const result = await companyRepo.save({name: "test-company", logo: "some logo"});    
    ids.companyId = result.insertId;
});

afterAll(async () => {
    await projectRepo.clear();    
    await companyRepo.del(ids.companyId);
    await terminatePool();
});

beforeEach(async () => {
    await projectRepo.clear();    
})

describe("Project Service Test Suite", () => {

    test("save project to db", async () => {

        const project: Project = {
            name: "test project",
            companyId: ids.companyId
        };

        const result = await projectRepo.save(project);
        expect(result.affectedRows).toBe(1);

    });

    test("should update saved project", async ()=> {

        const project: Project = {
            name: "test project",
            companyId: ids.companyId
        };

        const result = await projectRepo.save(project);
        expect(result.affectedRows).toBe(1);

        const retrieved = await projectRepo.get(result.insertId);
        retrieved.name = "updated project";
        const updateResult = await projectRepo.update(retrieved.id, retrieved);
        expect(updateResult.affectedRows).toBe(1);

    })

});