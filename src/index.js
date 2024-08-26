const { ApolloServer } = require('apollo-server');
const mongoose= require('mongoose')
require('dotenv').config();

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const dbUrl = process.env.MONGODB
const options = {
  connectTimeoutMS: 30000,  // Optional: Increase connection timeout
  socketTimeoutMS: 45000,    // Optional: Increase socket timeout
  bufferCommands: false,
  autoIndex: false,
};
const server = new ApolloServer( {
  typeDefs,
  resolvers
})

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, options);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB()
server.listen({port: 5000}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

