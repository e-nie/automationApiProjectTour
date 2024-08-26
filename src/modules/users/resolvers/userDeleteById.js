const User = require("../Model");


const userDeleteById = async (_, {userId}) => {
  const objectId = new mongoose.Types.ObjectId(userId)
  const wasDeleted = (await User.deleteOne(
    {_id: objectId})).deletedCount;
  return wasDeleted;
}

module.exports = userDeleteById;
