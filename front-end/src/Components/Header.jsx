import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { Form, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header({ setIsAuth }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Track modal state

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsAuth(false); // Update the auth state
    navigate("/sign-in", { replace: true }); // Redirect to sign-in page
  };

  const handleProfileClick = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <IoIosNotificationsOutline size={25} className="cursor-pointer" />

        {/* Profile icon with dropdown */}
        <div className="position-relative">
          <CgProfile
            size={30}
            onClick={handleProfileClick}
            className="cursor-pointer"
          />
          {/* Dropdown */}
          {isDropdownOpen && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                zIndex: "1000",
              }}
            >
              <button
                className="dropdown-item"
                onClick={() => setShowLogoutModal(true)}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Header;
