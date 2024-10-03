import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import PersistLogin from "@/components/auth/PersistLogin.tsx";
import RequireAuth from "@/components/auth/RequireAuth.tsx";
import Login from "@/components/auth/Login.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import { RemoveTrailingSlash } from "@/components/RemoveTrailingSlash.tsx";
import OnboardingLayout from "@/layouts/OnboardingLayout.tsx";
import { AnimatePresence } from "framer-motion";
import Welcome from "@/pages/onboarding/Welcome.tsx";
import ConfirmEmail from "@/pages/onboarding/ConfirmEmail.tsx";
import Account from "@/pages/onboarding/Account.tsx";
import Pharmacy from "@/pages/onboarding/Pharmacy.tsx";
import InviteStaff from "@/pages/onboarding/InviteStaff.tsx";
import Complete from "@/pages/onboarding/Complete.tsx";
import Products from "@/pages/product/Products.tsx";
import Dashboard from "@/pages/home/Dashboard.tsx";
import NewProduct from "@/pages/product/NewProduct.tsx";
import Orders from "@/pages/order/Orders.tsx";

// Hello wolrd

function App() {
  return (
    <>
      <RemoveTrailingSlash />
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route element={<PersistLogin />}>
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
            <Route index element={<Navigate to="/login" />} />
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="products/new" element={<NewProduct />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
