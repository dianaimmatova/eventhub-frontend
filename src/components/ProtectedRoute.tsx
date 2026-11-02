import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


function ProtectedRoute({children} : {children: ReactNode}) {
    const auth = useContext(AuthContext)

    return !auth?.isLoggedIn ? <Navigate to="/login" /> : <>{children}</>
    
}

export default ProtectedRoute;