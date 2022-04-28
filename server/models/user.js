const mongoose = require("mongoose")

const user = mongoose.Schema(
    {
        uid: {type: String, unique: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", user)

module.exports = User
