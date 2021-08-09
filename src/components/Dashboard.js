import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router";

import DashboardNavbar from './DashboardNavbar'

const Dashboard = () => {

    const [error, setError] = useState("")
    const {logout} = useAuth();
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
            <DashboardNavbar handleLogout={handleLogout} error={error} />
        </div>
    )
}

export default Dashboard
