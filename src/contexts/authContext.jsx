import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firsebase-config";

const AuthContext = createContext();

function AuthProvider(props) {
    const [userInfo, setUserInfo] = useState({});
    const value = {userInfo, setUserInfo};
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUserInfo(user);
        })
    }, []);
    return (
        <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };