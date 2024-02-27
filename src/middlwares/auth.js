const User = require("../models/User.js");
const hashPassword = require("../services/hashPassword.js");


const auth = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (user.username === login && user.password === await hashPassword(password)) {
      return next()
    }
    res.status(401).send("Unauthorized Access!")
  }catch(error){
    res.status(404).send("User not found")
  }

}


module.exports = auth;
