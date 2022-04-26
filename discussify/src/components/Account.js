import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export const Account = () => {
    const { currentUser } = useAuth()
    return (
        <div>
            Account
        </div>
    )
}
