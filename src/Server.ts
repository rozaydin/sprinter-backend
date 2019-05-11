import { ApolloServer, gql } from "apollo-server";
import { CompanyRepository } from "./repository/CompanyRepository";
import { CompanyImpl, CompanyEntityImpl } from "./model/Company";

const companyRepo = new CompanyRepository();

const typeDefs = gql(`

     type Query {
         sayName: String!
     }     

     type Mutation {
         newCompany(name: String!, logo: String): Int!
     }

`);

const resolvers = {

    Query: {
        sayName: ()=> { return "Ridvan" },
    },
    //
    Mutation: {
        async newCompany(_, {name, logo}) {

            console.log("Received request!");
            console.log(name);
            console.log(logo);
            //
            const response = await companyRepo.save(new CompanyImpl(name, logo));
            return response.insertId;            
        },
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