const User = require('../models/user')
const Chat = require('../models/chat')


exports.createGroupChat = async (req, res) => {
    console.log("createGroupChat body: ", req.body)
    const currentUserEmail = req.body.email
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({message: "Please fill out all fields"})
    }

    let users = JSON.parse(req.body.users)

    if (users.length < 2) {
        return res.status(400).send("More than 2 users required for group chat")
    }
    const currentUser = await User.findOne({'email': currentUserEmail})
    users.push(currentUser)

   try {
       const groupChat = await Chat.create({
           chatName: req.body.name,
           users: users,
           isGroupChat: true,
           groupAdmin: currentUser,
       })

       const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
       .populate("users", "-password")
       .populate("groupAdmin", "-password")
 
     res.status(200).json(fullGroupChat)
   } catch (error) {
       console.log("createGroupChat ERROR: ", error)
   }
}