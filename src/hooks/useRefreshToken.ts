import {useContext} from "react";
import apiClient from "../services/api-client.ts";
import {jwtDecode} from "jwt-decode";
import AuthContext, {TokenPayload, TokenResponse} from "@/context/AuthContext.tsx";

const useRefreshToken = () => {
    const {setAuth} = useContext(AuthContext);

    const refresh = async () => {
        const response = await apiClient.get<TokenResponse>("/auth/refresh-token", {withCredentials: true});
        const decodedToken = jwtDecode<TokenPayload>(response.data.token);

        setAuth(() => {
            return {
                tokenResponse: response.data,
                id: decodedToken.jti,
                companyId: 1,
                email: decodedToken.email,
                firstname: decodedToken.sub
            };
        });

        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;
