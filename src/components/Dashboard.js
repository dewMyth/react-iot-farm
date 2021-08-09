import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router";

const Dashboard = () => {

    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth();
    const history = useHistory()

    const handleLogout = () => {
        setError('');
        try{
            logout();
            history.push('/login')
        }catch{
            setError('cannot logout')
        }
    }

    return (
        <div>
            <Button variant="link" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Dashboard
