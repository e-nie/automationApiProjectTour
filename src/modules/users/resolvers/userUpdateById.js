const User = require("../Model");

const userUpdateById = async (_, {userInput: {userId, firstName, lastName}}) => {
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
}

module.exports = userUpdateById;
