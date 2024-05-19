import { Route, Routes } from "react-router-dom";
import Login from "@/views/Login.tsx";
import NotFound from "@/views/NotFound.tsx";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import RequireAuth from "@/components/require-auth.tsx";
import PersistLogin from "@/components/persist-login.tsx";
import Products from "@/views/Products.tsx";
import Dashboard from "@/views/Dashboard.tsx";
import AddProduct from "@/views/AddProduct.tsx";
import Orders from "@/views/Orders.tsx";
import Team from "@/views/Team.tsx";
import Analytics from "@/views/Analytics.tsx";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="team" element={<Team />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
