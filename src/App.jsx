// *********************************************** START **********************************************************
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


import Home from "./pages/Home";
import './app.css'
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
import CreateNewUserRole from "./pages/Settings/CreateNewUserRole";
import Department from "./pages/Department/Department";
import InventorySettings from "./pages/Settings/Inventry/InventrySetting";
import SalesSetting from "./pages/Settings/sales/SalesSetting";


export default function App() {
  const [user, setUser] = useState(false); 
  return (
    
    <Router>
      
      <ToastContainer position="top-right" autoClose={3000} />

      
      <Routes>

        {/* ==================== AUTHENTICATION ROUTES ==================== */}


        <Route path="/" element={user ? <Layout><Dashboard/></Layout> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />



        {/* ==================== DASHBOARD ROUTES ==================== */}
        
        
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />


        {/* ==================== EMPLOYEE MANAGEMENT ROUTES ==================== */}
        
        
        <Route path="/employee" element={<Layout><Employee/></Layout>} />
        <Route path="/employee/:id" element={<Layout><CustomerDetails /></Layout>} />
        <Route path="/employee-form" element={<Layout><EmployeeForm/></Layout>} />
        <Route path="/employee/edit/:id" element={<Layout><EmployeeForm mode="edit"/></Layout>} />



        {/* ==================== OUTLET MANAGEMENT ROUTES ==================== */}
        
       
        <Route path="/outlets" element={<Layout><Outlets/></Layout>} />
        <Route path="/outlets/:id" element={<Layout><OutletDetails /></Layout>} />
        <Route path="/outletsForm" element={<Layout><OutletForm/></Layout>} />
        <Route path="/outlets/edit/:id" element={<Layout><OutletForm mode="edit"/></Layout>} />

        {/* ==================== SETTINGS ROUTES ==================== */}
        
        
        <Route path="/settings/general" element={<Layout><General /></Layout>} />
        <Route path="/settings/general/createNewUserRole" element={<Layout><CreateNewUserRole/></Layout>} />
        <Route path="/settings/general/editUserRole/:id" element={<Layout><CreateNewUserRole /></Layout>} />
        <Route path="/employee/edit/:id" element={<Layout><EmployeeForm mode="edit"/></Layout>} />
        <Route path="/employee/:id" element={<Layout><CustomerDetails /></Layout>} />
        <Route path="/outlets/:id" element={<Layout><OutletDetails /></Layout>} />
        <Route path="/inventory/category-brand" element={<Layout><CategoryBrand/></Layout>} />
        <Route path="/inventory/department" element={<Layout><Department/></Layout>} />
        <Route path="/settings/inventory" element={<Layout><InventorySettings/></Layout>} />
        <Route path="/settings/sales" element={<Layout><SalesSetting/></Layout>} />






        
        
      </Routes>
    </Router>
  );
}