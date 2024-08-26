const User = require("../Model");
const generateId = require('../../../utils/generateId');

const userCreate =   async (_, {userInput: {firstName, lastName}}) =>{
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
}

module.exports = userCreate;
