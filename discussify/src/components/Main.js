import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

export const Main = () => {
    const [chats, setChats] = useState([])
    const { currentUser } = useAuth()
    console.log(JSON.stringify(currentUser))
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
