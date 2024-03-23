import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../@/components/ui/card.tsx";
import {Label} from "@radix-ui/react-label";
import {Input} from "../../@/components/ui/input.tsx";
import {Link} from "react-router-dom";
import {Button} from "../../@/components/ui/button.tsx";

const Login = () => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="m@example.com" required type="email" />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link to={"/"} className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" required type="password" />
                    </div>
                    <Button className="w-full" type="submit">
                        Login
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default Login;