
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./app.css";
import Signup from "./UserAuth/Signup";
import Login from "./UserAuth/Login";
import Layout from "./components/Layout";
import Employee from "./pages/Employee/Employee";
import Dashboard from "./pages/Dashboard/Dashboard";
import OutletForm from "./pages/Outlets/OutletsForm";
import Outlets from "./pages/Outlets/Outlets";
import General from "./pages/Settings/General/General";
import EmployeeForm from "./pages/Employee/EmployeeForm";
import CustomerDetails from "./pages/Employee/Customer/CustomerDetails";
import OutletDetails from "./pages/Outlets/OutletsDetails";
import CreateNewUserRole from "./pages/Settings/General/CreateNewUserRole";
import CategoryBrand from "./pages/Inventry/CategoryBrand";
import Department from "./pages/Department/Department";
import InventorySettings from "./pages/Settings/Inventry/InventrySetting";
import SalesSetting from "./pages/Settings/sales/SalesSetting";
import Contact from "./pages/Contact/Contact";
import ContactForm from "./pages/Contact/ContactForm";
import Recipe from "./pages/Inventry/Recipe";
import CreateNewRecipe from "./pages/Inventry/CreateNewRecipe";
import Product from "./pages/Inventry/product/Product";
import ProductForm from "./pages/Inventry/product/ProductForm";
import { setUser } from "./redux/features/auth/authSlice";
import Stock from "./pages/Inventry/Stock/Stock";
import Sales from "./pages/Settings/sales/Sales";
import OpeningStock from "./pages/Inventry/product/OpeningStock";
import MaterialConsuption from './pages/Inventry/MaterialConsuption/MaterialConsuption';
import Bank from "./pages/BankAndCash/Bank/Bank";
import CreateNewBank from "./pages/BankAndCash/Bank/CreateNewBank";
import Payment from './pages/BankAndCash/Payment/Payment';
import CreateNewPayment from "./pages/BankAndCash/Payment/CreateNewPayment";
import ViewDetails from "./pages/BankAndCash/Bank/ViewDetails";
import Expence from "./pages/BankAndCash/Expence/Expence";
import CreateNew from "./components/CreateNew";
import CreateNewExpence from "./pages/BankAndCash/Expence/CreateNewExpence";
import Estimate from "./pages/Sales/Estimate/Estimate";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Redux state

  // Restore user from localStorage on page reload
 const [loading, setLoading] = useState(true); // loading state to prevent redirect flash

  // Restore user from localStorage on page reload
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUser({ token })); // restore Redux
    }
    setLoading(false);
  }, [dispatch]);

  // ProtectedRoute
  const ProtectedRoute = ({ children }) => {
    if (loading) return null; // or spinner
    if (!user?.token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* ==================== AUTH ROUTES ==================== */}
        <Route path="/" element={user ? <Layout><Dashboard /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ==================== DASHBOARD ==================== */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } />

        {/* ==================== CONTACT ==================== */}
        <Route path="/contact" element={<ProtectedRoute><Layout><Contact /></Layout></ProtectedRoute>} />
        <Route path="/contactForm" element={<ProtectedRoute><Layout><ContactForm /></Layout></ProtectedRoute>} />

        {/* ==================== EMPLOYEE ==================== */}
        <Route path="/employee" element={<ProtectedRoute><Layout><Employee /></Layout></ProtectedRoute>} />
        <Route path="/employee/:id" element={<ProtectedRoute><Layout><CustomerDetails /></Layout></ProtectedRoute>} />
        <Route path="/employee-form" element={<ProtectedRoute><Layout><EmployeeForm /></Layout></ProtectedRoute>} />
        <Route path="/employee/edit/:id" element={<ProtectedRoute><Layout><EmployeeForm mode="edit" /></Layout></ProtectedRoute>} />

        {/* ==================== OUTLETS ==================== */}
        <Route path="/branch" element={<ProtectedRoute><Layout><Outlets /></Layout></ProtectedRoute>} />
        <Route path="/outlets/:id" element={<ProtectedRoute><Layout><OutletDetails /></Layout></ProtectedRoute>} />
        <Route path="/outletsForm" element={<ProtectedRoute><Layout><OutletForm /></Layout></ProtectedRoute>} />
        <Route path="/outlets/edit/:id" element={<ProtectedRoute><Layout><OutletForm mode="edit" /></Layout></ProtectedRoute>} />

        {/* ==================== SETTINGS ==================== */}
        <Route path="/setting/general" element={<ProtectedRoute><Layout><General /></Layout></ProtectedRoute>} />
        <Route path="/general/createNewUserRole" element={<ProtectedRoute><Layout><CreateNewUserRole /></Layout></ProtectedRoute>} />
        <Route path="/general/editUserRole/:id" element={<ProtectedRoute><Layout><CreateNewUserRole /></Layout></ProtectedRoute>} />
        <Route path="/setting/inventory" element={<ProtectedRoute><Layout><InventorySettings /></Layout></ProtectedRoute>} />
        <Route path="/setting/sales" element={<ProtectedRoute><Layout><Sales/></Layout></ProtectedRoute>} />

        {/* ==================== INVENTORY ==================== */}
        <Route path="/categorybrand" element={<ProtectedRoute><Layout><CategoryBrand /></Layout></ProtectedRoute>} />
        <Route path="/inventory/department" element={<ProtectedRoute><Layout><Department /></Layout></ProtectedRoute>} />
        <Route path="/inventory/recipe/createNewRecipe" element={<ProtectedRoute><Layout><CreateNewRecipe /></Layout></ProtectedRoute>} />
        <Route path="/recipe" element={<ProtectedRoute><Layout><Recipe /></Layout></ProtectedRoute>} />
        <Route path="/Product" element={<ProtectedRoute><Layout><Product /></Layout></ProtectedRoute>} />
        <Route path="/openingStock" element={<ProtectedRoute><Layout><OpeningStock/></Layout></ProtectedRoute>} />
        <Route path="/materialconsumption" element={<ProtectedRoute><Layout><MaterialConsuption/></Layout></ProtectedRoute>} />
        <Route path="/product/stock" element={<ProtectedRoute><Layout><Stock/></Layout></ProtectedRoute>} />
        <Route path="/product-form" element={<ProtectedRoute><Layout><ProductForm /></Layout></ProtectedRoute>} />

         {/* ==================== Bank And Cash ==================== */}
        <Route path="/bank" element={<ProtectedRoute><Layout><Bank/></Layout></ProtectedRoute>} />
        <Route path="/createNewBank" element={<ProtectedRoute><Layout><CreateNewBank/></Layout></ProtectedRoute>} />
        <Route path="/viewDetails" element={<ProtectedRoute><Layout><ViewDetails/></Layout></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Layout><Payment/></Layout></ProtectedRoute>} />
        <Route path="/createNewPayment" element={<ProtectedRoute><Layout><CreateNewPayment/></Layout></ProtectedRoute>} />
        <Route path="/expense" element={<ProtectedRoute><Layout><Expence/></Layout></ProtectedRoute>} />
        <Route path="/createNewExpence" element={<ProtectedRoute><Layout><CreateNewExpence/></Layout></ProtectedRoute>} />

       


      </Routes>
    </Router>
  );
}
