const Comment = require("../Model");

const commentGetById =   async (_, {commentId}) => {
  return await Comment.findById(new mongoose.Types.ObjectId(commentId))
}

module.exports = commentGetById;
