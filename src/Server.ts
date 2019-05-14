import { ApolloServer, gql } from "apollo-server";
import { CompanyRepository } from "./repository/CompanyRepository";
import { CompanyImpl, CompanyEntityImpl } from "./model/Company";
import { ProjectRepository } from "./repository/ProjectRepository";
import { Project, ProjectEntity, ProjectImpl, ProjectEntityImpl } from "./model/Project";
import { Team, TeamEntity, TeamImpl, TeamEntityImpl } from "./model/Team";
import { TeamRepository } from "./repository/TeamRepository";
import { getStoreKeyName } from "apollo-utilities";

const companyRepo = new CompanyRepository();
const projectRepo = new ProjectRepository();
const teamRepo = new TeamRepository();

const typeDefs = gql(`

     input ProjectInput {
         name: String!
         companyId: ID!
     }

     input TeamInput {
         name: String!
         sprint: String
         goal: String
         companyId: ID!
         projectId: ID!
     }

     type Company {
         id: ID!
         name: String!
         logo: String
     }

     type Project {
         id: ID!
         name: String!
         companyId: ID!
     }

     type Team {
         id: ID!
         name: String!
         sprint: String
         goal: String
         companyId: ID!
         projectId: ID!
     }

     type Query {             
         getCompany(id: ID!): Company!
         getAllCompanies: [Company!]!
         getCompanyWith(field: String!, value: String!): [Company]!
         getProject(id: ID!): Project!
         getAllProjects: [Project!]!
         getProjectWith(field: String!, value: String!): [Project]!
         getTeam(id: ID!): Team!
         getAllTeams: [Team!]!      
         getTeamWith(field: String!,value: String!): [Team]!
     }     

     type Mutation {

         ### Company Mutations

         newCompany(name: String!, logo: String): Company!
         updateCompany(id: ID!, name: String!, logo: String ): Company!         

         ### Project Mutations

         newProject(input: ProjectInput!): Project!
         updateProject(id: ID!, input: ProjectInput!): Project!
         deleteProject(id: ID!): Boolean!

         ### TEAM mutations

         newTeam(input: TeamInput!): Team!
         updateTeam(id: ID!, input: TeamInput!): Team!
         deleteTeam(id: ID!): Boolean!

     }

`);

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

        async getTeam(_, {id}) {
            return await teamRepo.get(id);
        },

        async getAllTeams() {
            return await teamRepo.getAll();
        },

        async getTeamWith(_, {field, value}) {
            return await teamRepo.getWith(field, value);
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

        async newTeam(_, {input}) {
            const response = await teamRepo.save(input);
            return await teamRepo.get(response.insertId);
        },

        async updateTeam(_, {id, input}) {
            const response = await teamRepo.update(id, input);
            return await teamRepo.get(id);
        },

        async deleteTeam(_, {id}) {
            const response = await teamRepo.del(id);
            return response.affectedRows == 1;
        }

    }

};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server
    .listen()
    .then((resp) => {
        console.log(resp);
    });