const express = require('express')
const { chat } = require('./routes/chat')
const dotenv = require("dotenv")
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()
dotenv.config()

connectDB()
app.use(cors())
app.get('/chat', chat)

app.listen(3001, () => {
    console.log('Running server on port 3001')
})