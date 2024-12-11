// import React from "react";
// import { Nav } from "react-bootstrap";
// import { Link, NavLink } from "react-router-dom";
// import "./NavigationBar.css";

// function NavigationBar() {
//   return (
//     <Nav className="flex flex-col justify-between h-full p-4 bg-gray-800">
//       <div className="flex flex-col gap-12">
//         <h6>
//           <Link
//             to="/"
//             className=" font-bold text-4xl bg-gradient-to-r from-red-400 via-red-600 to-red-500 bg-clip-text text-transparent"
//           >
//             JRN <br />{" "}
//             <span className="text-2xl hidden md:inline font-bold relative left-10 bottom-4 bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-600 bg-clip-text text-transparent">
//               Roofing
//             </span>
//           </Link>
//         </h6>

//         <NavLink
//           to="/billing"
//           className={({ isActive }) =>
//             `text-lg transition-all duration-300 ${
//               isActive
//                 ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
//                 : "text-white no-underline"
//             }`
//           }
//         >
//           Billing
//         </NavLink>
//         <NavLink
//           to="/inventory"
//           className={({ isActive }) =>
//             `text-lg transition-all duration-300 ${
//               isActive
//                 ? "bg-white text-gray-800 font-bold px-2 py-2 rounded-md no-underline"
//                 : "text-white no-underline"
//             }`
//           }
//         >
//           Inventory
//         </NavLink>
//         <NavLink
//           to="/report"
//           className={({ isActive }) =>
//             `text-lg transition-all duration-300 ${
//               isActive
//                 ? "bg-white text-gray-800 font-bold px-3 py-2 rounded-md no-underline"
//                 : "text-white no-underline"
//             }`
//           }
//         >
//           Reports
//         </NavLink>
//         <NavLink
//           to="/user"
//           className={({ isActive }) =>
//             `text-lg transition-all duration-300 ${
//               isActive
//                 ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
//                 : "text-white no-underline"
//             }`
//           }
//         >
//           User
//         </NavLink>
//       </div>
//       <div className="relative bottom-10">
//         <NavLink
//           to="/setting"
//           className={({ isActive }) =>
//             `text-lg transition-all duration-300 ${
//               isActive
//                 ? "bg-white text-gray-800 font-bold px-3 py-2 rounded-md no-underline"
//                 : "text-white no-underline"
//             }`
//           }
//         >
//           Setting
//         </NavLink>
//       </div>
//     </Nav>
//   );
// }

// export default NavigationBar;

import React from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  const role = localStorage.getItem("role");

  return (
    <Nav className="flex flex-col justify-between h-full p-4 bg-gray-800">
      <div className="flex flex-col gap-12">
        <h6>
          <Link
            to="/"
            className="font-bold text-4xl bg-gradient-to-r from-red-400 via-red-600 to-red-500 bg-clip-text text-transparent"
          >
            JRN <br />
            <span className="text-2xl hidden md:inline font-bold relative left-10 bottom-4 bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-600 bg-clip-text text-transparent">
              Roofing
            </span>
          </Link>
        </h6>

        {role === "admin" && (
          <>
            <NavLink
              to="/billing"
              className={({ isActive }) =>
                `text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
                    : "text-white no-underline"
                }`
              }
            >
              Billing
            </NavLink>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
                    : "text-white no-underline"
                }`
              }
            >
              Inventory
            </NavLink>
            <NavLink
              to="/report"
              className={({ isActive }) =>
                `text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
                    : "text-white no-underline"
                }`
              }
            >
              Reports
            </NavLink>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
                    : "text-white no-underline"
                }`
              }
            >
              User
            </NavLink>
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
                    : "text-white no-underline"
                }`
              }
            >
              Setting
            </NavLink>
          </>
        )}
        {role === "owner" && (
          <>
            <NavLink
              to="/billing"
              className={({ isActive }) =>
                `text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
                    : "text-white no-underline"
                }`
              }
            >
              Billing
            </NavLink>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
                    : "text-white no-underline"
                }`
              }
            >
              Inventory
            </NavLink>
            <NavLink
              to="/report"
              className={({ isActive }) =>
                `text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
                    : "text-white no-underline"
                }`
              }
            >
              Report
            </NavLink>

            <NavLink
              to="/user"
              className="text-lg transition-all duration-300 text-white no-underline disabled cursor-default opacity-50"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              User
            </NavLink>
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
                    : "text-white no-underline"
                }`
              }
            >
              Setting
            </NavLink>
          </>
        )}
        {role === "cashier" && (
          <>
            <NavLink
              to="/billing"
              className={({ isActive }) =>
                `text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-800 font-bold px-4 py-2 rounded-md no-underline"
                    : "text-white no-underline"
                }`
              }
            >
              Billing
            </NavLink>
            <NavLink
              to="/inventory"
              className="text-lg transition-all duration-300 text-white no-underline disabled cursor-default opacity-50"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Invetory
            </NavLink>
            <NavLink
              to="/report"
              className="text-lg transition-all duration-300 text-white no-underline disabled cursor-default opacity-50"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Report
            </NavLink>
            <NavLink
              to="/user"
              className="text-lg transition-all duration-300 text-white no-underline disabled cursor-default opacity-50"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              User
            </NavLink>
            <NavLink
              to="/setting"
              className="text-lg transition-all duration-300 text-white no-underline "
            >
              Setting
            </NavLink>
          </>
        )}
      </div>
    </Nav>
  );
}

export default NavigationBar;
