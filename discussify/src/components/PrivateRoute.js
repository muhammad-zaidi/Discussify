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
                currentUser ?<Redirect to='/login' /> : <Component {...props} /> 
            }}
        >    
        </Route>
    )
}
