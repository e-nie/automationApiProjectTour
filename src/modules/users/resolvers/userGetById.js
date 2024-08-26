const User = require("../Model");

const userGetById = async (_, {userId}) => {
  return await User.findById(new mongoose.Types.ObjectId(userId))
}

module.exports = userGetById;
