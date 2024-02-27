const User = require('./../models/User.js')

const getUserTech = async (userID) => {
    return await User.findById(userID, "createdAt updatedAt")
}

module.exports = getUserTech