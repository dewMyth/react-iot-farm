import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({component : Component, ...rest}) => {
    
    const { currentUser } = useAuth()

    return (
        <div>
            <Route
            {...rest}
            render={props => {
               return currentUser ? <Component {...props} /> : <Redirect to="/login"/>
            }}
            ></Route>
        </div>
    )
}

export default PrivateRoute
