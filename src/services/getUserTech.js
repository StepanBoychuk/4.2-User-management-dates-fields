const User = require('./../models/User.js');

const getUserTech = async(userID) => {
    const user = await User.findById(userID)
    return user.tech
}

module.exports = getUserTech