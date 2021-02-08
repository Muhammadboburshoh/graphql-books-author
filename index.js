const { ApolloServer, gql } = require("apollo-server")

const { users, books } = require("./data")

const typeDefs = gql(`
  type Query {
    version: Float!
    users: [User!]!
    books: [Book!]!
  }
  type Book {
    id: Int!
    name: String!
    price: Int
    author: User!
  }
  type User {
    id: Int!
    username: String!
    age: Int
    books: [Book!]!
  }
`)



const resolvers = {
  Query: {
    version: () => 1.2,
    users: () => users,
    books: () => books,
  },
  User: {
    books: (global) => books.filter(book => book.userId === global.id),
  },
  Book: {
    author: (global) => users.find(user => user.id === global.userId),
  },
}

const server = new ApolloServer({
  resolvers: resolvers,
  typeDefs: typeDefs,
})

server.listen(4000, () => console.log(4000))