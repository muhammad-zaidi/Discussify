const User = require('../models/user')

exports.searchUser = async (req, res) => {
    console.log("searchUser: ", req.query)
    const currentUserEmail = req.query.email

    const currentUser = await User.findOne({ 'email': currentUserEmail })
    console.log(currentUser)
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {}

    const users = await User.find(keyword).find({ _id: { $ne: currentUser._id} })
    res.send(users)
}