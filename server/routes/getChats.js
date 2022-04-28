const User = require('../models/user')
const Chat = require('../models/chat')

exports.getChats = async (req, res) => {
    console.log("getChats: ", req.query)
    const currentUserEmail = req.query.email
    try {
        const currentUser = await User.findOne({'email': currentUserEmail})

        Chat.find({ users: { $elemMatch: { $eq: currentUser._id} } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name email",
                })
                res.status(200).send(results)
            })
    } catch (error) {
        console.log("getChats ERROR: ", error)
    }
}