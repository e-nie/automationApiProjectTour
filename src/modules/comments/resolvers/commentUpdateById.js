const Comment = require("../Model");

const commentUpdateById =   async (_, {commentId, commentInput: {rating, title, description}}) => {
  const wasUpdated = (await Comment.updateOne(
    {_id: mongoose.Types.ObjectId(commentId)},
    {firstName: firstName, lastName: lastName})).modifiedCount;
  return wasUpdated;
}

module.exports = commentUpdateById;
