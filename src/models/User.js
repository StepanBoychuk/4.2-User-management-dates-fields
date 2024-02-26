const { Schema, model} = require('mongoose');
const hashPassword = require('./../services/hashPassword.js')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    tech: {
        created_at: {type: Date, default: new Date().toUTCString()},
        updated_at: {type: Date, default: new Date().toUTCString()},
        deleted_at: {type: Date, default: null},
    }
})

userSchema.pre('save', async function (next) {
    const hashedPassword = await hashPassword(this.password)
    this.password = hashedPassword
    next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
    let update = this.getUpdate();
    const password = await hashPassword(update.password)
    update.password = password
    next()
})

userSchema.pre('find', async function (next) {
    this.where({'tech.deleted_at': null})
    next()
})

userSchema.pre('findOne', async function (next) {
    this.where({'tech.deleted_at': null})
    next()
})


const User = model("User", userSchema, 'users')

module.exports = User