const gql = require('graphql-tag');
const {ApolloServer} = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        createdAt: Int!
    }
    type Settings {
        user: User!
        theme: String!
    }

    input NewSettingsInput {
        user: ID!
        theme: String!
    }

    type Query {
        me: User!
        settings(user: ID!): Settings!
    }

    type Mutation {
        settings(input: NewSettingsInput!): Settings!
    }
`;

const resolvers = {
    Query: {
        me: () => {
            return {
                id: 1,
                username: 'johndoe',
                createdAt: 1234567890
            };
        },
        settings: (_, {user}) => {
            return {
                user,
                theme: 'dark'
            };
        }
    },

    Mutation: {
        settings: (_, {input}) => {
            return input
        }
    },

    Settings: {
        user() {
            return {
                id: 1,
                username: 'johndoe',
                createdAt: 1234567890
            };
        }
    }

}


const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});