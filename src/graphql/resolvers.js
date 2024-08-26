const { mergeResolvers } = require("@graphql-tools/merge");
const userResolvers = require("../modules/users/resolvers/index");
const commentResolvers = require("../modules/comments/resolvers/index");

const resolvers = mergeResolvers([userResolvers, commentResolvers]);

module.exports = resolvers;
