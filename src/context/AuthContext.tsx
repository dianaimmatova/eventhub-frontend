import { createContext, useState, type ReactNode } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    login: () => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children} : {children: ReactNode}) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') !== null)
    
    function login() {
        setIsLoggedIn(true)
    }

    function logout() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>{children}</AuthContext.Provider>
    )
}