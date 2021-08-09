import React, {useEffect, useState, useContext} from 'react';

import {auth, fs} from '../firebase.config'

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext) 
}



export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email,password, deviceId) => {
        return auth.createUserWithEmailAndPassword(email, password)
        .then(registeredUser => {
            fs.collection("users")
            .add({
            uid: registeredUser.user.uid,
            email:email,
            deviceId : deviceId
            })
        })
    }

    const login = (email,password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)    
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


