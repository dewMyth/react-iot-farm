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
            .doc(registeredUser.user.uid)
            .set({
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

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
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
        logout,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


