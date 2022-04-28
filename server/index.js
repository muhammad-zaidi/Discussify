const express = require('express')
const bodyParser = require('body-parser')
const { getChats } = require('./routes/getChats')
const { registerUser } = require('./routes/registerUser')
const { loginUser } = require('./routes/loginUser')
const { searchUser } = require('./routes/searchUser')
const { postChats } = require('./routes/postChats')
const { createGroupChat } = require('./routes/createGroupChat')
const { renameGroupChat } = require('./routes/renameGroupChat')
const { addToGroup } = require('./routes/addToGroup')
const { removeFromGroup } = require('./routes/removeFromGroup')
const { sendMessage } = require('./routes/sendMessage')
const { allMessages } = require('./routes/allMessages')
const dotenv = require("dotenv")
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config()

connectDB()
app.use(cors())
app.get('/get-chats', getChats)
app.post('/register-user', registerUser)
app.get('/login-user', loginUser)
app.get('/search-user', searchUser)
app.post("/post-chat", postChats)
app.post("/create-group-chat", createGroupChat)
app.put("/rename-group-chat", renameGroupChat)
app.put("/add-to-group", addToGroup)
app.put("/remove-from-group", removeFromGroup)
app.post("/send-message", sendMessage)
app.get("/message/:id", allMessages)

const server = app.listen(3001, () => {
    console.log('Running server on port 3001')
})

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
})

io.on("connection", (socket) => {
    console.log("connected to socket.io")
})

socket.on("join chat", (room) => {
    socket.join(room)
    console.log("User Joined Room: " + room)
  })
  socket.on("typing", (room) => socket.in(room).emit("typing"))
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat

    if (!chat.users) return console.log("chat.users not defined")

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return

      socket.in(user._id).emit("message recieved", newMessageRecieved)
    })
  })

  socket.off("setup", () => {
    console.log("USER DISCONNECTED")
    socket.leave(userData._id)
  })