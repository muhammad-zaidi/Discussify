const User = require('../models/user')
const Chat = require('../models/chat')

exports.postChats = async (req, res) => {
    console.log("postChats body: ", req.body)
    const { targetUserEmail, currentUserEmail } = req.body

    if (!targetUserEmail || !currentUserEmail) {
        console.log("User email not sent with request")
        return res.sendStatus(400)
    }

    const targetUser = await User.findOne({ "email": targetUserEmail})
    const currentUser = await User.findOne({ "email": currentUserEmail})

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq:currentUser._id}}},
            {users: {$elemMatch: {$eq:targetUser._id}}},
        ]
    }).populate("users", "-password").populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name email",
    })
    
    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [currentUser._id, targetUser._id]
        }

        try {
            const createdChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password")
            res.status(200).send(FullChat)
        } catch (error) {
            console.log("postChats ERROR: ", error)
        }
    }
}