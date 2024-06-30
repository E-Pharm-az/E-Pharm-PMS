import {Navigate, Route, Routes} from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import PersistLogin from "@/components/auth/PersistLogin.tsx";
import RequireAuth from "@/components/auth/RequireAuth.tsx";
import Dashboard from "@/components/Dashboard.tsx";
import Orders from "@/components/Orders.tsx";
import Products from "@/components/product/Products.tsx";
import AddProduct from "@/components/product/AddProduct.tsx";
import Staff from "@/components/staff/Staff.tsx";
import AddStaff from "@/components/staff/AddStaff.tsx";
import Analytics from "@/components/Analytics.tsx";
import Login from "@/components/auth/Login.tsx";
import NotFound from "@/components/NotFound.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import {RemoveTrailingSlash} from "@/components/RemoveTrailingSlash.tsx";

function App() {
  return (
    <>
      <RemoveTrailingSlash />
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Navigate to="/login" />} />
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
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
