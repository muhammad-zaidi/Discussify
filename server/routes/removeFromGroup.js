const Chat = require('../models/chat')

exports.removeFromGroup = async (req, res) => {
    console.log("removeFromGroup body: ", req.body)
    const { chatId, userId } = req.body

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
        $pull: { users: userId },
        },
        {
        new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

  if (!removed) {
    res.status(404)
    throw new Error("Chat Not Found")
  } else {
    res.json(removed)
  }
}