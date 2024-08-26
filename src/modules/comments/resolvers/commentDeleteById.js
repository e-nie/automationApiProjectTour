const Comment = require("../Model");

const commentDeleteById =   async (_, {ID}) => {
  const wasDeleted = (await Comment.deleteOne(
    {_id: mongoose.Types.ObjectId(commentId)})).deletedCount;
  return wasDeleted;
}

module.exports = commentDeleteById;
