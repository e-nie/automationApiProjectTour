const User = require("../Model");


const userGetAll = async (_, {amount}) => {
  return await User.find().sort({createdAt: -1}).limit(amount)
}

module.exports = userGetAll;
