// GrantAccessModal.js
import React, { useState } from "react";
import axios from "axios";

const GrantAccess = ({ show, handleClose, employeeId, role }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleGrantAccess = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/sign-up",
        {
          username,
          password,
          role,
        }
      );
      setModalMessage("User  created successfully.");
      // reset form fields
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      // Ccll the function to refresh the employee list
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      setModalMessage("Error creating user: " + errorMessage);
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Grant Access</h2>
        <form onSubmit={handleGrantAccess}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Grant Access</button>
        </form>
        {modalMessage && <p>{modalMessage}</p>}
      </div>
    </div>
  );
};

export default GrantAccess;
