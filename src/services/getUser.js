const User = require("./../models/User.js");

const getUser = async (userID) => {
  return await User.findById(userID, "username firstName lastName updatedAt");
};

module.exports = getUser;
