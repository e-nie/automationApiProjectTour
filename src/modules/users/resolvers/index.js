const User = require('../Model')
const userCreate = require("./userCreate");
const userDeleteById = require("./userDeleteById");
const userGetAll = require("./userGetAll");
const userGetById = require("./userGetById");
const userUpdateById = require("./userUpdateById");

const userResolvers = {
  User: {
    comments: async ({ comments }) => Comment.find({ _id: { $in: comments } }),
  },
  Query: {
    userGetAll,
    userGetById,
  },

  Mutation: {
    userCreate,
    userUpdateById,
    userDeleteById,
  },
};

module.exports = userResolvers;
