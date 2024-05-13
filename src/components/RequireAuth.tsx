import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "@/context/AuthContext.tsx";

const RequireAuth = () => {
    const {isAuthenticated} = useContext(AuthContext)
    const location = useLocation();

    return (
        <>
            {isAuthenticated() ? (
                <Outlet/>
            ) : (
                <Navigate to="/" state={{from: location}} replace/>
            )}
        </>
    )
}

export default RequireAuth;