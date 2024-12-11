// import React from "react";
// import { Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";

// function SignUp() {

//   return (
//     <div className="bg-blue-950 lg:bg-black h-screen">
//       <div className="flex items-center justify-center h-full text-white relative">
//         <div className="w-[500px] h-[600px] bg-blue-950 opacity-70 rounded-lg hidden lg:inline  relative left-20">
//           <div className=" flex flex-col justify-between h-full p-8">
//             <h1 className="text-3xl font-semibold relative top-2">
//               {" "}
//               <span className="text-5xl font-bold bg-gradient-to-r from-red-800 via-red-400 to-red-800 bg-clip-text text-transparent">
//                 JRN{" "}
//               </span>
//               Roofing..
//             </h1>
//             <p className=" text-3xl font-thin relative ">
//               {" "}
//               <span className="text-4xl font-bold ml-2 bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-600 bg-clip-text text-transparent">
//                 Hi!!!
//               </span>
//               <br />
//               Sign Up with admin provided username and password. Choose your
//               role to get started."{" "}
//             </p>
//           </div>
//         </div>
//         <div className=" w-[430px]  text-black bg-white rounded-md opacity-70 lg:opacity-70  relative right-0 lg:right-48  bottom-8 py-4 px-10">
//           <h3 className="text-center text-2xl font-bold mb-2">Sign Up</h3>
//           <Form className="flex flex-col gap-4">
//             <Form.Group controlId="username">
//               <Form.Label className="block mb-1 text-sm font-medium text-gray-700">
//                 User Name
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 name="username"
//                 placeholder="user name"
//                 className="p-2 w-full border border-gray-300 rounded-md"
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
//                 required
//               />
//             </Form.Group>
//             <Button
//               className="py-2 bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700 rounded-lg text-white"
//               type="submit"
//             >
//               Sign Up
//             </Button>
//           </Form>
//           <div className="flex gap-2 text-sm mt-4">
//             <span>Have an account?</span>
//             <Link to="/" className="text-blue-500">
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

import React, { useState } from "react";
import "./Signin.css";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State for modal message

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/sign-up",
        {
          username,
          password,
          role,
        }
      );
      console.log(response.data);
      setModalMessage("Successfully registered, Please sign in."); // Set modal message when user registered
      setShowModal(true); // Show modal on success
      navigate("/sign-in");
    } catch (error) {
      setModalMessage("User  name already exists."); // Set modal message when user exists
      setShowModal(true);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <div className="bg-blue-950 lg:bg-black h-screen">
      <div className="flex items-center justify-center h-full text-white relative">
        <div className="w-[500px] h-[600px] bg-blue-950 opacity-70 rounded-lg hidden lg:inline relative left-20">
          <div className="flex flex-col justify-between h-full p-8">
            <h1 className="text-3xl font-semibold relative top-2">
              <span className="text-5xl font-bold bg-gradient-to-r from-red-800 via-red-400 to-red-800 bg-clip-text text-transparent">
                JRN
              </span>
              Roofing..
            </h1>
            <p className="text-3xl font-thin relative">
              <span className="text-4xl font-bold ml-2 bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-600 bg-clip-text text-transparent">
                Hi!!!
              </span>
              <br />
              Sign Up with admin provided username and password. Choose your
              role to get started.
            </p>
          </div>
        </div>
        <div className="w-[430px] text-black bg-white rounded-md opacity-70 lg:opacity-70 relative right-0 lg:right-48 bottom-8 py-4 px-10">
          <h3 className="text-center text-2xl font-bold mb-2">Sign Up</h3>
          <Form className="flex flex-col gap-4" onSubmit={handleSignUp}>
            <Form.Group controlId="username">
              <Form.Label className="block mb-1 text-sm font-medium text-gray-700">
                User Name
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="user name"
                className="p-2 w-full border border-gray-300 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </Form.Label>
              <div className="relative">
                <Form.Control
                  type={showPassword ? "text" : "password"} // Toggle input type
                  name="password"
                  placeholder="*********"
                  className="p-2 w-full border border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                  onClick={togglePasswordVisibility} // toggle visibility on click
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </div>
            </Form.Group>
            <Button
              className="py-2 bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700 rounded-lg text-white"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
          <div className="flex gap-2 text-sm mt-4">
            <span>Have an account?</span>
            <Link to="/" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Logon Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignUp;
