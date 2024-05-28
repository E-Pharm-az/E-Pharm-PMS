import { Route, Routes } from "react-router-dom";
import Login from "@/views/auth/Login.tsx";
import NotFound from "@/views/NotFound.tsx";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import RequireAuth from "@/views/auth/RequireAuth.tsx";
import PersistLogin from "@/views/auth/PersistLogin.tsx";
import Products from "@/views/product/Products.tsx";
import Dashboard from "@/views/Dashboard.tsx";
import AddProduct from "@/views/product/AddProduct.tsx";
import Orders from "@/views/Orders.tsx";
import Staff from "@/views/staff/Staff.tsx";
import Analytics from "@/views/Analytics.tsx";
import AddStaff from "@/views/staff/AddStaff.tsx";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="staff" element={<Staff />} />
            <Route path="add-staff" element={<AddStaff />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
