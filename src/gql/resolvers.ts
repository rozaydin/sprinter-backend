import { CompanyRepository } from "../repository/CompanyRepository";
import { CompanyImpl } from "../model/Company";
import { User, Role } from "../model/User";
import { ProjectRepository } from "../repository/ProjectRepository";
import { TeamRepository } from "../repository/TeamRepository";
import { UserRepository } from "../repository/UserRepository";

const companyRepo = new CompanyRepository();
const projectRepo = new ProjectRepository();
const teamRepo = new TeamRepository();
const userRepo = new UserRepository();

// Authorization
const auth_token = process.env.AUTH_TOKEN;

// resolvers
export const resolvers = {

    Query: {
        async getCompany(_, { id }, { _userId }) {
            // Authorization
            const user = await userRepo.get(_userId);
            if (user.role == Role.ADMIN || id == user.companyId) {
                const response = await companyRepo.get(id);
                return response;
            }
            else {
                return {};
            }
        },

        async getAllCompanies(_, __, { userId }) {
            // Authorization
            const user = await userRepo.get(userId);
            if (user.role == Role.ADMIN) {
                return await companyRepo.getAll();
            }
            else {
                return [];
            }
        },

        async getCompanyWith(_, { field, value }) {
            const response = await companyRepo.getWith(field, value);
            return response;
        },

        async getProject(_, { id }) {
            return await projectRepo.get(id);
        },

        async getAllProjects() {
            return await projectRepo.getAll();
        },

        async getProjectWith(_, { field, value }) {
            return await projectRepo.getWith(field, value);
        },

        async getTeam(_, { id }) {
            return await teamRepo.get(id);
        },

        async getAllTeams() {
            return await teamRepo.getAll();
        },

        async getTeamWith(_, { field, value }) {
            return await teamRepo.getWith(field, value);
        },

        async getUser(_, { id }) {
            return await userRepo.get(id);
        },

        async getAllUsers() {
            const response = await userRepo.getAll();
            console.log(response);
            return response;
        },

        async getUserWith(_, { field, value }) {
            return await userRepo.getWith(field, value);
        }

    },
    //
    Mutation: {

        async newCompany(_, { name, logo }) {
            const response = await companyRepo.save(new CompanyImpl(name, logo));
            return response.rows[0];
            // console.log(response);
            // const insertId = response.fields["id"];
            // const companyEntitiy = await companyRepo.get(insertId);
            // return companyEntitiy;
        },

        async updateCompany(_, { id, name, logo }) {
            await companyRepo.update(id, new CompanyImpl(name, logo));
            return await companyRepo.get(id);
        },

        async deleteCompany(_, { id }) {
            const response = await companyRepo.del(id);
            return response.rowCount == 1;
        },

        async newProject(_, { input }) {
            const response = await projectRepo.save(input);
            return response.rows[0];
            // const insertId = response.fields["id"];
            // return await projectRepo.get(insertId);
        },

        async updateProject(_, { id, input }) {
            return await projectRepo.get(id);
        },

        async deleteProject(_, { id }) {
            const response = await projectRepo.del(id);
            return response.rowCount == 1;
        },

        async newTeam(_, { input }) {
            const response = await teamRepo.save(input);
            return response.rows[0];
            // const insertId = response.fields["id"];
            // return await teamRepo.get(insertId);
        },

        async updateTeam(_, { id, input }) {
            await teamRepo.update(id, input);
            return await teamRepo.get(id);
        },

        async deleteTeam(_, { id }) {
            const response = await teamRepo.del(id);
            return response.rowCount == 1;
        },

        async newUser(_, { input }) {
            const response = await userRepo.save(input);
            return response.rows[0];
            // const insertId = response.fields["id"];
            // return await userRepo.get(insertId);
        },

        async updateUser(_, { id, input }) {
            return await userRepo.get(id);
        },

        async deleteUser(_, { id }) {
            const response = await userRepo.del(id);
            return response.rowCount == 1;
        },

        async login(_, { email, password }) {
            const user = await userRepo.getWith("email", email);
            console.log(user[0]);

            if (user[0] != null) {
                if (user[0].password === password) {
                    // succefful login response
                    return {
                        result: true,
                        user: user[0],
                        token: auth_token
                    }
                }
            }
            else {
                return {
                    result: false,
                    user: null,
                    token: null
                }
            }
            //
            return user[0];
        },

        async changePassword(_, { id, currPassword, newPassword }) {
            const user = await userRepo.get(id);
            if (user.password == currPassword) {
                const response = await userRepo.update(id, { password: newPassword } as User);
                return response.rowCount == 1;
            }
            else {
                return false;
            }
        }
    }
};