import React, { useState } from "react";
import { Card, Table, Button, Modal, Form, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function User() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    email: "",
    tele: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [users, setUsers] = useState([
    {
      id: "01",
      name: "Wickramasinghe",
      role: "Cashier",
      email: "wik@gmail.com",
      tele: "123 456 7890",
    },
    {
      id: "02",
      name: "Sirisena",
      role: "Manager",
      email: "siri@gmail.com",
      tele: "098 765 4321",
    },
  ]);
  const [duplicateError, setDuplicateError] = useState("");

  const handleModalOpen = (action, item = null) => {
    setModalAction(action);
    setFormData(
      action === "Add"
        ? { id: "", name: "", role: "", email: "", tele: "" }
        : item || { id: "", name: "", role: "", email: "", tele: "" }
    );
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDuplicateError("");
  };

  const handleFormSubmit = () => {
    const isDuplicate = users.some(
      (user) =>
        user.name === formData.name &&
        user.role === formData.role &&
        user.email === formData.email &&
        user.tele === formData.tele &&
        user.id !== formData.id
    );

    if (isDuplicate) {
      setDuplicateError("This user already exists!");
      return;
    }
    setDuplicateError("");

    if (modalAction === "Add") {
      setUsers([...users, { ...formData, id: Date.now().toString() }]);
    } else if (modalAction === "Edit") {
      setModalAction("Save");
      setUsers(
        users.map((user) => (user.id === formData.id ? { ...formData } : user))
      );
    } else if (modalAction === "Delete") {
      setUsers(users.filter((user) => user.id !== formData.id));
    }

    handleModalClose();
  };

  return (
    <div className="px-2">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            JRN
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active
            linkAs={Link}
            linkProps={{ to: "/user" }}
          >
            users{" "}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="mb-2 d-flex justify-content-between">
        <h5>All Users</h5>
        <Button variant="primary" onClick={() => handleModalOpen("Add")}>
          Add User
        </Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{user.tele}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleModalOpen("Edit", user)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleModalOpen("Delete", user)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {duplicateError && (
        <div
          className="p-3 position-fixed top-20 start-50 translate-middle"
          style={{ zIndex: 2000 }}
        >
          <div className="text-white toast show bg-danger">
            <div className="toast-body">{duplicateError}</div>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === "Delete"
              ? "Confirm Delete"
              : modalAction + " User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === "Delete" ? (
            <p>Are you sure? Do you want to delete this user!!</p>
          ) : (
            <Form>
              {/* User Name */}
              <Form.Group className="mb-3">
                <Form.Label>Enter User Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={modalAction === "Delete"} // Disabled in "Delete" mode
                />
              </Form.Group>

              {/* User Role */}
              <Form.Group className="mb-3">
                <Form.Label>User Role</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  disabled={modalAction === "Delete"} // Disabled in "Delete" mode
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={modalAction === "Delete"} // Disabled in "Delete" mode
                />
              </Form.Group>

              {/* Telephone */}
              <Form.Group className="mb-3">
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                  type="tel"
                  value={formData.tele}
                  onChange={(e) =>
                    setFormData({ ...formData, tele: e.target.value })
                  }
                  disabled={modalAction === "Delete"} // Disabled in "Delete" mode
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {modalAction === "Delete" ? (
            <Button variant="primary" onClick={() => handleFormSubmit()}>
              Yes
            </Button>
          ) : (
            <Button variant="primary" onClick={() => handleFormSubmit()}>
              {modalAction === "Edit" ? "Save" : "Add"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default User;
