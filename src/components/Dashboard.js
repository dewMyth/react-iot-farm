import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router-dom";

import {db, fs} from "../firebase.config"

//Bootstrap Imports
import { Container } from 'react-bootstrap'

import DashboardNavbar from './DashboardNavbar'

const Dashboard = () => {

    const [error, setError] = useState("")
    const [deviceId, setDeviceId] = useState("")
    const [liveData, setLiveData] = useState({})
    const {logout, currentUser} = useAuth();
    const history = useHistory()

    useEffect(() => {
        fs.collection('users').doc(currentUser.uid).get()
        .then(snapshot => {
            setDeviceId(snapshot.data().deviceId)
            if(deviceId === null){
                //handle here
            }
            else {
                db.ref('FirebaseIOT/Live_data/'+ snapshot.data().deviceId).on('value', (snapshot) => {
                    setLiveData(snapshot.val())
                })
            }
        }
        )
     })

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
        <React.Fragment>
            <DashboardNavbar handleLogout={handleLogout} error={error} currentUser={currentUser}/>
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight : "100vh"}}>
              <div className="w-200" style={{maxWidth:"400px"}}>
                <h1>
                    My Device = {deviceId}
                    <br/>
                    Humidity = {liveData.solar_status}
                </h1>
              </div>
              </Container>

            

        </React.Fragment>
    )
}

export default Dashboard
