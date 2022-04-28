const User = require('../models/user')

exports.loginUser = async (req, res) => {
    console.log("loginUser: ", req.body)
    
    const { email, password } = req.body 
    try {
        const user = await User.findOne({ email })

        return res.status(200).json(user)
    } catch (error) {
        console.log("loginUser ERROR: ", error)
    }
}