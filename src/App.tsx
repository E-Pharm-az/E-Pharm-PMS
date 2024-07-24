import { Navigate, Route, Routes } from "react-router-dom";
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
import { RemoveTrailingSlash } from "@/components/RemoveTrailingSlash.tsx";
import Welcome from "@/components/onboarding/Welcome.tsx";
import OnboardingLayout from "@/layouts/OnboardingLayout.tsx";
import Account from "@/components/onboarding/Account.tsx";
import Pharmacy from "@/components/onboarding/Pharmacy.tsx";
import InviteStaff from "@/components/onboarding/InviteStaff.tsx";
import Complete from "@/components/onboarding/Complete.tsx";
import { AnimatePresence } from "framer-motion";
import ConfirmEmail from "@/components/onboarding/ConfirmEmail.tsx";

function App() {
  return (
    <>
      <RemoveTrailingSlash />
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/onboarding/:id" element={<OnboardingLayout />}>
            <Route index element={<Welcome />} />
            <Route path="confirm-email" element={<ConfirmEmail />} />
            <Route path="account" element={<Account />} />
            <Route element={<PersistLogin />}>
              <Route path="pharmacy" element={<Pharmacy />} />
              <Route path="invite-staff" element={<InviteStaff />} />
              <Route path="complete" element={<Complete />} />
            </Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<PersistLogin />}>
            <Route index element={<Navigate to="/login" />} />
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="products" element={<Products />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="staff" element={<Staff />} />
                <Route path="add-staff" element={<AddStaff />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
