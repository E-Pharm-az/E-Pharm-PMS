import {Route, Routes} from "react-router-dom";
import Login from "@/components/Login.tsx";
import NotFound from "@/components/NotFound.tsx";
import DashboardLayout from "@/components/DashboardLayout.tsx";
import RequireAuth from "@/components/RequireAuth.tsx";
import PersistLogin from "@/components/PersistLogin.tsx";
import Products from "@/components/Products.tsx";
import Dashboard from "@/components/Dashboard.tsx";


function App() {
    return (
        <Routes>
            <Route element={<PersistLogin/>}>
                <Route element={<RequireAuth/>}>
                    <Route path="/dashboard" element={<DashboardLayout/>}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/dashboard/products" element={<Products/>}/>
                    </Route>
                </Route>
                <Route path="/" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}

export default App
