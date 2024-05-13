import {useContext, useEffect, useState} from "react";
import useRefreshToken from "@/hooks/useRefreshToken.ts";
import AuthContext from "@/context/AuthContext.tsx";
import {BsArrowRepeat} from "react-icons/bs";
import {Outlet} from "react-router-dom";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refreshToken = useRefreshToken();
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refreshToken();
            } catch (error) {
                console.log("Error refreshing token", error);
            } finally {
                setIsLoading(false);
            }
        }

        !auth?.tokenResponse.token && isMounted ? verifyRefreshToken() : setIsLoading(false);

        return () => {isMounted = false;}
    }, [])

    return (
        <>
            {isLoading ?
                <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-50">
                    <BsArrowRepeat className="mr-2 animate-spin text-blue-500"/>
                    <span>Loading...</span>
                </div>
                : <Outlet/>}
        </>
    );
};

export default PersistLogin;