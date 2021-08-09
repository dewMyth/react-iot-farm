import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router-dom";

import DashboardNavbar from './DashboardNavbar'

const Dashboard = () => {

    const [error, setError] = useState("")
    const {logout, currentUser} = useAuth();
    const history = useHistory()

    async function handleLogout(){ 
        setError('');
        try{
            await logout();
            history.push('/login')
        }catch{
            setError('cannot logout')
        }
    }

    return (
        <div>
            <DashboardNavbar handleLogout={handleLogout} error={error} currentUser={currentUser}/>
        </div>
    )
}

export default Dashboard
