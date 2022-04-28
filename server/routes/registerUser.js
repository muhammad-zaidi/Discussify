const User = require('../models/user')

exports.registerUser = async (req, res) => {
    console.log("registerUser: ", req.body)
    
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    try {
        const checkUserExist = await User.findOne({ email })

    if (checkUserExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    })

    return res.status(200).json(user)
    } catch (error) {
        console.log("registerUser ERROR: ", error)
    }
}