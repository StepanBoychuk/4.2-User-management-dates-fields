const User = require("../models/User.js");

const getUsersList = async (page, perPage) => {
  return await User.find({}, "username firstName lastName")
    .skip(page * perPage)
    .limit(perPage);
};

module.exports = getUsersList;
