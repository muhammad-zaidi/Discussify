const { chats } = require('./testData')

exports.chat = async (req, res) => {
    console.log("posts: ", req.params)
    res.send(JSON.stringify(chats))
}