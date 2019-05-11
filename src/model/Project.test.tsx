import { Project, ProjectEntity, ProjectImpl, ProjectEntityImpl } from "./Project";

describe("Project Model Test Suite", () => {

    test("should identify project as projectimpl when properties match", async () => {

        const project: Project = {
            name: "MindSphere",
            companyId: 10
        }

        expect(ProjectImpl.isOf(project)).toBe(true);
    });

    test("should identify ProjectEntity as ProjectEntityImpl when properties match", async () => {

        const project: ProjectEntity = {
            id: 1,
            name: "MindSphere",
            companyId: 10
        }

        expect(ProjectEntityImpl.isOf(project)).toBe(true);

    });

});