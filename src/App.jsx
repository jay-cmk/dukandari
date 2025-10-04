import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
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
import EmployeeForm from "./pages/Employee/EmployeeForm";
import CustomerDetails from "./pages/Employee/Customer/CustomerDetails";
import OutletDetails from "./pages/Outlets/OutletsDetails";


export default function App() {
  const [user, setUser] = useState(false); // 👈 auth state

  return (
     <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={user ? <Layout><Dashboard/></Layout> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/employee" element={<Layout><Employee/></Layout>} />
        <Route path="/outlets" element={<Layout><Outlets/></Layout>} />
        <Route path="/outletsForm" element={<Layout><OutletForm/></Layout>} />
        <Route path="/employee-form" element={<Layout><EmployeeForm/></Layout>} />
        <Route path="/outlets/edit/:id" element={<Layout><OutletForm mode="edit"/></Layout>} />
        <Route path="/employee/edit/:id" element={<Layout><EmployeeForm mode="edit"/></Layout>} />
        <Route path="/employee/:id" element={<Layout><CustomerDetails /></Layout>} />
        <Route path="/outlets/:id" element={<Layout><OutletDetails /></Layout>} />



        
        {/* <Route path="/dashboard" element={<Layout><Dashboard/></Layout>} /> */}


        
        {/* Add more routes with Layout for authenticated pages */}
        {/* <Route path="/profile" element={<Layout><Profile /></Layout>} /> */}
        {/* <Route path="/settings" element={<Layout><Settings /></Layout>} /> */}
      </Routes>
    </Router>
  );
}


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './app.css'

// import Layout from "./components/Layout";
// import Employee from "./pages/Employee/Employee";
// import Dashboard from "./pages/Dashboard/Dashboard";
//  import Signup from "./UserAuth/Signup";
//  import Login from "./UserAuth/Login";

// function App() {
//   const user = false; // 🔥 replace with your actual auth state (context, redux, etc.)

//   // helper for protected pages
//   const requireAuth = (component) => {
//     if (!user) {
//       toast.error("Please log in first!");
//       return <Navigate to="/login" replace />;
//     }
//     return component;
//   };

//   return (
//     <Router>
//       {/* Toast container should be included once */}
//       <ToastContainer position="top-right" autoClose={3000} />

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         {/* Protected Routes with toast */}
//         <Route
//           path="/"
//           element={requireAuth(<Layout><Dashboard /></Layout>)}
//         />
//         <Route
//           path="/dashboard"
//           element={requireAuth(<Layout><Dashboard /></Layout>)}
//         />
//         <Route
//           path="/employee"
//           element={requireAuth(<Layout><Employee /></Layout>)}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
