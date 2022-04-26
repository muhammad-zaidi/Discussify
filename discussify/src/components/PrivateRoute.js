import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const PrivateRoute = ({ component: Component, ...rest}) => {
    const { currentUser } = useAuth()
    console.log(JSON.stringify(currentUser))
    return (
        <Route
            {...rest}
            render={props => {
                console.log('currentUser is :', currentUser)
                return (currentUser ? <Component {...props} /> : <Redirect to='/login' />)
            }}
        >    
        </Route>
    )
}
