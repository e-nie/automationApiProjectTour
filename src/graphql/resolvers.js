const mongoose = require('mongoose');
const User = require('../models/User')
const Comment = require('../models/Comment')
const generateId = require('../utils/generateId')

module.exports = {

  Query: {
    async usersGetAll(_, {amount}) {
      return await User.find().sort({createdAt: -1}).limit(amount)
    },
    async userGetById(_, {userId}) {
      return await User.findById(new mongoose.Types.ObjectId(userId))
    },
    async commentGetAll(_, {amount}) {
      return await Comment.find().sort({createdAt: -1}).limit(amount)
    },
    async commentGetById(_, {commentId}) {
      return await Comment.findById(new mongoose.Types.ObjectId(commentId))
    }
  },

  Mutation: {

    async userCreate(_, {userInput: {firstName, lastName}}) {
      const userId = generateId()
      const createdUser = new User({
        _id: userId,
        firstName: firstName,
        lastName: lastName,
      });

      const res = await createdUser.save();

      return {
        id: res.id,
        ...res._doc
      }
    },

    async userUpdateById(_, {userInput: {userId, firstName, lastName}}) {
      const objectId = new mongoose.Types.ObjectId(userId)
      const wasUpdated = (await User.updateOne(
        {_id: objectId},
        {firstName: firstName, lastName: lastName})).modifiedCount;
      if (wasUpdated > 0) {
        const updatedUser = await User.findById(objectId);
        return updatedUser;
      } else {
        console.log('User update failed or no changes were made');
      }
    },

    async userDeleteById(_, {userId}) {
      const objectId = new mongoose.Types.ObjectId(userId)
      const wasDeleted = (await User.deleteOne(
        {_id: objectId})).deletedCount;
      return wasDeleted;
    },


  async commentCreate(_, {commentInput: {user: {userId}, rating, title, description}}) {

   const objectId = new mongoose.Types.ObjectId(userId)
    const commentId = generateId();
    const createdComment =
      new Comment({
        _id: commentId,
        user: objectId,
        //user: objectId,
        createdAt: new Date().toISOString(),
        rating: rating,
        title: title,
        description: description,
      });

    const res = await createdComment.save();
    return {
      id: res.id,
      ...res._doc
    }
  },

  async commentUpdateById(_, {commentId, commentInput: {rating, title, description}}) {
    const wasUpdated = (await Comment.updateOne(
      {_id: mongoose.Types.ObjectId(commentId)},
      {firstName: firstName, lastName: lastName})).modifiedCount;
    return wasUpdated;
  },

  async commentDeleteById(_, {ID}) {
    const wasDeleted = (await Comment.deleteOne(
      {_id: mongoose.Types.ObjectId(commentId)})).deletedCount;
    return wasDeleted;
  },
}
}
