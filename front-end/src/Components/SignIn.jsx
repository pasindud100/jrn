// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function SignIn() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // Use useNavigate hook

//   const handleSignIn = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a POST request to the backend for user authentication
//       const response = await axios.post(
//         "http://localhost:8000/api/auth/sign-in",
//         {
//           username,
//           password,
//         }
//       );

//       if (response.data.token) {
//         // Store the JWT token in localStorage
//         localStorage.setItem("token", response.data.token);
//         // Redirect to the dashboard after successful login
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error signing in", error);
//       alert("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-blue-950 lg:bg-black h-screen">
//       <div className="flex items-center justify-center h-full text-white relative">
//         <div className="w-[500px] h-[600px] bg-blue-950 opacity-70 rounded-lg hidden lg:inline relative left-20">
//           <div className="flex flex-col justify-between h-full p-8">
//             <h1 className="text-3xl font-semibold relative top-2">
//               <span className="text-5xl font-bold bg-gradient-to-r from-red-800 via-red-400 to-red-800 bg-clip-text text-transparent">
//                 JRN{" "}
//               </span>
//               Roofing..
//             </h1>
//             <p className="text-3xl font-thin relative">
//               <span className="text-4xl font-bold ml-2 bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-600 bg-clip-text text-transparent">
//                 Welcome!
//               </span>
//               <br />
//               Log in to streamline your operations. Choose your role to get
//               started.
//             </p>
//           </div>
//         </div>
//         <div className="w-[430px] text-black bg-white rounded-md opacity-70 lg:opacity-70 relative right-0 lg:right-48 bottom-8 py-4 px-10">
//           <h3 className="text-center text-2xl font-bold mb-2">Sign In</h3>
//           <Form className="flex flex-col gap-4" onSubmit={handleSignIn}>
//             <Form.Group controlId="username">
//               <Form.Label className="block mb-1 text-sm font-medium text-gray-700">
//                 User Name
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 name="username"
//                 placeholder="user name"
//                 className="p-2 w-full border border-gray-300 rounded-md"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="password">
//               <Form.Label className="block mb-1 text-sm font-medium text-gray-700">
//                 Password
//               </Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 placeholder="*********"
//                 className="p-2 w-full border border-gray-300 rounded-md"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button
//               className="py-2 bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700 rounded-lg text-white"
//               type="submit"
//             >
//               Sign In
//             </Button>
//           </Form>
//           <div className="flex gap-2 text-sm mt-4">
//             <span>If you don't have an account?</span>
//             <Link to="/sign-up" className="text-blue-500">
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignIn;

//*************************************************** */

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const SignIn = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8000/api/auth/sign-in", {
//         username,
//         password,
//       });
//       localStorage.setItem("token", response.data.token); // Save token
//       alert("sign in success");
//       navigate("/"); // Redirect to dashboard
//     } catch (err) {
//       console.error(err.response.data.message);
//       alert("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//       <button type="submit">Sign In</button>
//     </form>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import "./Signin.css";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignIn({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cashier"); 
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/sign-in", {
        username,
        password,
        role
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      console.error(err);
      setModalMessage("Invalid credentials. Please try again.");
      setShowModal(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-blue-950 lg:bg-black h-screen">
      <div className="flex items-center justify-center h-full text-white relative">
        <div className="w-[500px] h-[600px] bg-blue-950 opacity-70 rounded-lg hidden lg:inline relative left-20">
          <div className="flex flex-col justify-between h-full p-8 mt-4">
            <h1 className="text-3xl font-semibold relative  top-1">
              <span className="text-5xl font-bold bg-gradient-to-r from-red-800 via-red-400 to-red-800 bg-clip-text text-transparent"> JRN{" "} </span><br/><span className="ml-7"> Roofing..</span>
            </h1>
            <p className="text-3xl font-thin relative">
              <span className="text-4xl font-bold ml-2 bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-600 bg-clip-text text-transparent"> Welcome! </span>
              <br /> Log in to streamline your operations. Choose your role to get started.
            </p>
          </div>
        </div>
        <div className="w-[430px] text-black bg-white rounded-md opacity-70 lg:opacity-70 relative right-0 lg:right-48 bottom-8 py-4 px-10">
          <h3 className="text-center text-2xl font-bold mb-2">Sign In</h3>
          <Form className="flex flex-col gap-4" onSubmit={handleSignIn}>
            <Form.Group controlId="username">
              <Form.Label className="mb-1 text-sm font-medium text-gray-700"> User Name </Form.Label>
              <Form.Control type="text" name="username" placeholder="user name" className="p-2 w-full border border-gray-300 rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="mb-1 text-sm font-medium text-gray-700"> Password </Form.Label>
              <div className="relative">
                <Form.Control type={showPassword ? "text" : "password"} name="password" placeholder="*********" className="p-2 w-full border border-gray-300 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? (<FaEyeSlash size={20} />) : (<FaEye size={20} />)}
                </div>
              </div>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label className="mb-1 text-sm font-medium text-gray-700"> Role </Form.Label>
              <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="cashier">Cashier</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group> 
            <Button className="py-2 bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700 rounded-lg text-white" type="submit"> Sign In </Button>
          </Form>
          
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Logon Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignIn;