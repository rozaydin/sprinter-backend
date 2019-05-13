import { ApolloServer, gql } from "apollo-server";
import { CompanyRepository } from "./repository/CompanyRepository";
import { CompanyImpl, CompanyEntityImpl } from "./model/Company";

const companyRepo = new CompanyRepository();

const typeDefs = gql(`

     type Company {
         id: ID!
         name: String!
         logo: String
     }

     type Query {
         // Company Query Operations         
         getCompany(id: ID!): Company!
         getAllCompanies: [Company!]!
         getCompanyWith(field: String!, value: String): [Company]!
     }     

     type Mutation {
         // Company Mutations
         newCompany(name: String!, logo: String): Company!
         updateCompany(id: ID!, name: String!, logo: String ): Company!
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

        async getCompanyWith(_, {field, value}) {
            console.log(field);
            console.log(value);
            const response = await companyRepo.getWith(field, value);
            console.log(response);
            return response;
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