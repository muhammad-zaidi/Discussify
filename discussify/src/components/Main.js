import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Main = () => {
    const [chats, setChats] = useState([])
    const getChat = async() => {
       try {
        const data = await axios.get('/chat')
        setChats(data)
       } catch (error) {
           console.log("ERROR: ", error)
       }
    }

    useEffect(() => {
        getChat()
    }, [])
    return (
        <div>
            Main Page!
        </div>
    )
}
