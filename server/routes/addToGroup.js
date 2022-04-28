const Chat = require('../models/chat')

exports.addToGroup = async (req, res) => {
    console.log("addToGroup body: ", req.body)
    const { chatId, userId } = req.body

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    
      if (!added) {
        res.status(404)
        throw new Error("Chat Not Found")
      } else {
        res.json(added)
      }
    
}