import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import './app.css'
import Signup from "./UserAuth/Signup";
import Login from "./UserAuth/Login";
import Layout from "./components/Layout";
import Employee from "./pages/Employee/Employee";
import Dashboard from "./pages/Dashboard/Dashboard";
import Outlets from './pages/Outlets/Outlets';
import OutletForm from "./pages/Outlets/OutletsForm";

export default function App() {
  const [user, setUser] = useState(false); // 👈 auth state

  return (
     <Router>
      <Routes>
        <Route path="/" element={user ? <Layout><Dashboard/></Layout> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/employee" element={<Layout><Employee/></Layout>} />
        <Route path="/outlets" element={<Layout><Outlets/></Layout>} />
        <Route path="/outletsForm" element={<Layout><OutletForm/></Layout>} />
        {/* <Route path="/dashboard" element={<Layout><Dashboard/></Layout>} /> */}


        
        {/* Add more routes with Layout for authenticated pages */}
        {/* <Route path="/profile" element={<Layout><Profile /></Layout>} /> */}
        {/* <Route path="/settings" element={<Layout><Settings /></Layout>} /> */}
      </Routes>
    </Router>
  );
}
