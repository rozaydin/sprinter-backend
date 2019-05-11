import { CompanyRepository } from "./CompanyRepository";
import { CompanyImpl } from "../model/Company";
import { terminatePool } from "../service/DBService";

const companyService = new CompanyRepository();

afterAll(async () => {
    await companyService.clear();
    await terminatePool();
});

beforeEach(async () => {
    await companyService.clear();
})

describe("Companyservice Test Suite", () => {

    test("should save company to db", async () => {
        const company = new CompanyImpl("Siemens A.S.", "http://someurl");
        const result = await companyService.save(company)
        expect(result.affectedRows).toBe(1);
    });

    test("should retrieve all companies from db", async () => {

        const company1 = new CompanyImpl("Siemens A.S.", "http://someurl");
        const company2 = new CompanyImpl("Netas A.S.", "http://someurl");

        await companyService.save(company1);
        await companyService.save(company2);

        const results: CompanyImpl[] = await companyService.getAll();
        expect(results.length).toBe(2);
    });

    test("should update company", async () => {

        const company = new CompanyImpl("Siemens A.S.", "http://someurl");
        const okPacket = await companyService.save(company);        
        const companyEntity = await companyService.get(okPacket.insertId);
        companyEntity.name = "updated name!";
        const updateResult = await companyService.update(okPacket.insertId, companyEntity);
        expect(updateResult.affectedRows).toBe(1);
    });

    test("should delete company", async () => {
        const company = new CompanyImpl("Siemens A.S.", "http://someurl");
        const okPacket = await companyService.save(company);
        const deleteResult = await companyService.del(okPacket.insertId);
        expect(deleteResult.affectedRows).toBe(1);        
    });

});