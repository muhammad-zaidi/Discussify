const User = require('../models/user')
const Chat = require('../models/chat')
const Message = require('../models/message')


exports.sendMessage = async (req, res) => {
    console.log("sendMessage body: ", req.body)

    const { content, chatId, currentUserEmail } = req.body

    if (!content || !chatId) {
        console.log("Invalid data passed into request")
        return res.sendStatus(400)
    }
    try {
        const currentUser = await User.findOne({"email": currentUserEmail})
        let newMessage = {
            sender: currentUser._id,
            content: content,
            chat: chatId,
        }

        let message = await Message.create(newMessage)

        message = await message.populate("sender", "name").execPopulate()
        message = await message.populate("chat").execPopulate()
        message = await User.populate(message, {
            path: "chat.users",
            select: "name email"
        })

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message,
        })

        res.json(message)
    } catch (error) {
        console.log("sendMessage ERROR: ", error)
    }

}