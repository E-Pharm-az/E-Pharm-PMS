import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import AuthContext, {TokenPayload, TokenResponse} from "@/components/context/AuthContext.tsx";
import {FormEvent, useContext, useEffect, useRef, useState} from "react";
import apiClient from "@/services/api-client.ts";
import {jwtDecode} from "jwt-decode";
import {BsArrowRepeat} from "react-icons/bs";

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const emailRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setError("");
    }, [email, password]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await apiClient.post<TokenResponse>("/auth/login/pharma", {email, password},
                {
                    withCredentials: true,
                    headers: {'Content-Type': 'application/json'}
                });

            const decodedToken = jwtDecode<TokenPayload>(response.data.token)

            setAuth({
                tokenResponse: response.data,
                id: decodedToken.sub,
                companyId: 1,
                email: decodedToken.email,
                firstname: decodedToken.sub
            });

            setEmail("");
            setPassword("")

            navigate(from, {replace: true});
        } catch (error: any) {
            if (error?.response) {
                setError("No server response");
            } else if (error?.response?.status === 400) {
                setError("Invalid email or password");
            } else {
                setError("Login failed")
            }
            errorRef.current?.focus();
        }
        setLoading(false);
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <div>
                {loading && (
                    <div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
                        <BsArrowRepeat className="animate-spin text-blue-500 mr-2"/>
                    </div>
                )}
                {error && <div className="text-center text-red-500">{error}</div>}

                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>Enter your email below to login to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label>Email</Label>
                                <Input ref={emailRef}
                                       onChange={(e) => setEmail(e.target.value)}
                                       placeholder="name@company.com"
                                       value={email}
                                       required
                                       type="email"/>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label>Password</Label>
                                    <Link to={"/reset-password"} className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                    value={password}
                                    required
                                    type="password"/>
                            </div>
                            <Button className="w-full" type="submit">
                                Login
                            </Button>
                            <Link to={"/support"} className="underline text-sm">
                                Problem logging in? Contact support
                            </Link>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default Login;