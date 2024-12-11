// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import SignIn from "./Components/SignIn";
// import SignUp from "./Components/SignUp";
// import NavigationBar from "./Components/NavigationBar";
// import BillingManagement from "./Pages/Billing/BillingManagement";
// import InventoryManagement from "./Pages/Inventory/InventoryManagement";
// import ReportManagement from "./Pages/Reports/ReportManagement";
// import UsersManagement from "./Pages/Users/UsersManagement";
// import Setting from "./Pages/Setting/SettingManagement";
// import Dashboard from "./Pages/Dashboard/Dashboard";

// function App() {
//   const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in

//   return (
//     <BrowserRouter>
//       <div className="flex h-screen">
//         {/* Side navbar */}
//         {isAuthenticated && (
//           <div className="bg-light-gray w-36 md:w-44 h-full">
//             <NavigationBar />
//           </div>
//         )}

//         {/* Main content */}
//         <div className="flex-1">
//           <div className="p4">
//             <Routes>
//               {!isAuthenticated ? (
//                 <>
//                   <Route path="/sign-in" element={<SignIn />} />
//                   <Route path="/sign-up" element={<SignUp />} />
//                   <Route path="*" element={<Navigate to="/sign-in" />} />
//                 </>
//               ) : (
//                 <>
//                   <Route path="/" element={<Dashboard />} />
//                   <Route path="/billing" element={<BillingManagement />} />
//                   <Route path="/inventory" element={<InventoryManagement />} />
//                   <Route path="/report" element={<ReportManagement />} />
//                   <Route path="/user" element={<UsersManagement />} />
//                   <Route path="/setting" element={<Setting />} />
//                   <Route path="*" element={<Navigate to="/" />} />
//                 </>
//               )}
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import SignIn from "./components/SignIn";
// import Dashboard from "./Pages/Dashboard/";

// const App = () => {
//   const isAuthenticated = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return false;

//     try {
//       const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
//       const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//       return payload.exp > currentTime; // Check if token has expired
//     } catch (err) {
//       return false;
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Redirect to SignIn if not authenticated */}
//         <Route
//           path="/"
//           element={isAuthenticated() ? <Dashboard /> : <Navigate to="/sign-in" />}
//         />
//         <Route path="/sign-in" element={<SignIn />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;import React from "react";

import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import NavigationBar from "./Components/NavigationBar";
import BillingManagement from "./Pages/Billing/BillingManagement";
import AllTrasnsactions from "./Pages/Billing/AllTrasnsactions";
import InventoryManagement from "./Pages/Inventory/InventoryManagement";
import ReportManagement from "./Pages/Reports/ReportManagement";
import UsersManagement from "./Pages/Users/UsersManagement";
import Setting from "./Pages/Setting/SettingManagement";
import Dashboard from "./Pages/Dashboard/Dashboard";

const App = () => {
  // this for track user is authenticated or not
  const [isAuth, setIsAuth] = useState(false);
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // decode jwt payload
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return payload.exp > currentTime; // Check if token has expired
    } catch (err) {
      return false;
    }
  };

  // updting authentication state
  useEffect(() => {
    if (isAuthenticated()) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Side navbar - Only show when user authenticated */}
        {isAuth && (
          <div className="bg-light-gray w-36 md:w-44 h-full">
            <NavigationBar />
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 h-screen">
          <div className="d-flex flex-column vh-100">
            <Routes>
              {/* If not authenticated user redirect to signin paga */}
              {!isAuth ? (
                <>
                  <Route
                    path="/sign-in"
                    element={<SignIn setIsAuth={setIsAuth} />}
                  />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="*" element={<Navigate to="/sign-in" />} />
                </>
              ) : (
                <>
                  <Route
                    path="/"
                    element={<Dashboard setIsAuth={setIsAuth} />}
                  />
                  <Route
                    path="/billing"
                    element={<BillingManagement setIsAuth={setIsAuth} />}
                  />
                  {/* <Route path="/all-trasnsactions" element={<AllTrasnsactions />} /> */}
                  <Route
                    path="/inventory"
                    element={<InventoryManagement setIsAuth={setIsAuth} />}
                  />
                  <Route
                    path="/report"
                    element={<ReportManagement setIsAuth={setIsAuth} />}
                  />
                  <Route
                    path="/user"
                    element={<UsersManagement setIsAuth={setIsAuth} />}
                  />
                  <Route
                    path="/setting"
                    element={<Setting />}
                    setIsAuth={setIsAuth}
                  />
                  <Route
                    path="*"
                    element={<Navigate to="/" setIsAuth={setIsAuth} />}
                  />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
