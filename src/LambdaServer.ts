import { ApolloServer, gql, addErrorLoggingToSchema } from "apollo-server-lambda";
import { CompanyRepository } from "./repository/CompanyRepository";
import { CompanyImpl, CompanyEntityImpl } from "./model/Company";
import { User, UserEntity } from "./model/User";
import { ProjectRepository } from "./repository/ProjectRepository";
import { TeamRepository } from "./repository/TeamRepository";
import { UserRepository } from "./repository/UserRepository";
import { importSchema } from "graphql-import"

const companyRepo = new CompanyRepository();
const projectRepo = new ProjectRepository();
const teamRepo = new TeamRepository();
const userRepo = new UserRepository();

const typeDefs = gql(importSchema("schema.graphql"));
const resolvers = {

    Query: {
        async getCompany(_, { id }) {
            const response = await companyRepo.get(id);
            return response;
        },

        async getAllCompanies(_) {
            return await companyRepo.getAll();
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
            return await userRepo.getAll();
        },

        async getUserWith(_, { field, value }) {
            return await userRepo.getWith(field, value);
        }

    },
    //
    Mutation: {

        async newCompany(_, { name, logo }) {
            const response = await companyRepo.save(new CompanyImpl(name, logo));
            const companyEntitiy = await companyRepo.get(response.insertId);
            return companyEntitiy;
        },

        async updateCompany(_, { id, name, logo }) {
            await companyRepo.update(id, new CompanyImpl(name, logo));
            return await companyRepo.get(id);
        },

        async newProject(_, { input }) {
            const response = await projectRepo.save(input);
            return await projectRepo.get(response.insertId);
        },

        async updateProject(_, { id, input }) {
            const response = await projectRepo.update(id, input);
            return await projectRepo.get(id);
        },

        async deleteProject(_, { id }) {
            const response = await projectRepo.del(id);
            return response.affectedRows == 1;
        },

        async newTeam(_, { input }) {
            const response = await teamRepo.save(input);
            return await teamRepo.get(response.insertId);
        },

        async updateTeam(_, { id, input }) {
            const response = await teamRepo.update(id, input);
            return await teamRepo.get(id);
        },

        async deleteTeam(_, { id }) {
            const response = await teamRepo.del(id);
            return response.affectedRows == 1;
        },

        async newUser(_, { input }) {
            const response = await userRepo.save(input);
            return await userRepo.get(response.insertId);
        },

        async updateUser(_, { id, input }) {
            const response = await userRepo.update(id, input);
            return await userRepo.get(id);
        },

        async login(_, { email, password }) {
            const user = await userRepo.getWith("email", email);
            console.log(user[0]);

            if (user[0] != null) {
                if (user[0].password === password) {
                    return user[0];
                }
            }
            //
            return user[0];
        },

        async changePassword(_, { id, newPassword }) {
            const response = await userRepo.update(id, { password: newPassword } as User);
            return response.affectedRows == 1;
        }

    }

};

const server = new ApolloServer({
    typeDefs,
    resolvers
});


// export handler
const handler = server.createHandler();
export { handler };