const User = require('../models/user')
const Chat = require('../models/chat')
const Message = require('../models/message')


exports.allMessages = async (req, res) => {
    console.log("allMessages body: ", req.body)
    try {
        const messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name email")
          .populate("chat")
        res.json(messages)
      } catch (error) {
        res.status(400)
        throw new Error(error.message)
      }
}