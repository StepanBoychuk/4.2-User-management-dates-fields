const User = require("./../models/User.js");

const deleteUser = async (userID) => {
  await User.findByIdAndUpdate(userID, {
    ["tech.deleted_at"]: new Date().toUTCString(),
  });
};

module.exports = deleteUser;
