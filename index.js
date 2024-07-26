const { ApolloServer } = require('apollo-server');
const mongoose= require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const MONGODB = 'mongodb+srv://userdb:Aa123@cluster0.rdlmtuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const server =new ApolloServer( {
  typeDefs,
  resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser: true})
  .then(() => {
    console.log("MongoDB Connection successful");
    return server.listen({port: 5000})
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })


