const Comment = require("../Model");
const generateId = require('../../../utils/generateId');

const commentCreate =   async (_, {commentInput: {user: {userId}, rating, title, description}}) => {

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
}

module.exports = commentCreate;
