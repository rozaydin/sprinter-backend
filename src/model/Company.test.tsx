import { Company, CompanyEntity, CompanyImpl, CompanyEntityImpl } from "./Company";

describe("Company model test suite", () => {

    test("should identify object as Company when properties match", async () => {
        const company: Company = {
            name: "test company",
            logo: "some logo url"
        }

        const notCompany = {
            aye: "so true",
            lgo: "not present"
        }
        //
        expect(CompanyImpl.isOf(company)).toBe(true)
        expect(CompanyImpl.isOf(notCompany)).toBe(false);
    });

    test("should identify object as CompanyEntity when properties match", async () => {

        const companyEntity: CompanyEntity = {
            id: -1,
            name: "test name",
            logo: "some logo"
        }

        const notCompanyEntity: Company = {
            name: "some name",
            logo: "some logo"
        }
        //
        expect(CompanyEntityImpl.isOf(companyEntity)).toBe(true)
        expect(CompanyEntityImpl.isOf(notCompanyEntity)).toBe(false);
    });    

});