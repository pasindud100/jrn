// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Modal,
//   Form,
//   Table,
// } from "react-bootstrap";

// function UserHandle() {
//   const [employees, setEmployees] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showGrantAccessModal, setShowGrantAccessModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentEmployee, setCurrentEmployee] = useState({
//     employeeId: "",
//     name: "",
//     telephone: "",
//     email: "",
//     role: "",
//     address: {
//       city: "",
//       street: "",
//       postalCode: "",
//     },
//   });
//   const [newUser, setNewUser] = useState({
//     username: "",
//     password: "",
//     role: "user",
//   });
//   const [userAccessList, setUserAccessList] = useState([]);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = () => {
//     axios
//       .get("http://localhost:8000/api/employees")
//       .then((response) => {
//         setEmployees(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleAddEmployee = () => {
//     setIsEditing(false);
//     setCurrentEmployee({
//       employeeId: "",
//       name: "",
//       telephone: "",
//       email: "",
//       role: "",
//       address: {
//         city: "",
//         street: "",
//         postalCode: "",
//       },
//     });
//     setShowModal(true);
//   };

//   const handleEditEmployee = (employee) => {
//     setIsEditing(true);
//     setCurrentEmployee(employee);
//     setShowModal(true);
//   };

//   const handleSaveEmployee = () => {
//     if (isEditing) {
//       axios
//         .put(
//           `http://localhost:8000/api/employees/${currentEmployee._id}`,
//           currentEmployee
//         )
//         .then(() => {
//           fetchEmployees();
//           setShowModal(false);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     } else {
//       axios
//         .post("http://localhost:8000/api/employees", currentEmployee)
//         .then(() => {
//           fetchEmployees();
//           setShowModal(false);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   };

//   const handleDeleteEmployee = (id) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       axios
//         .delete(`http://localhost:8000/api/employees/${id}`)
//         .then(() => {
//           fetchEmployees();
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   };

//   const handleGrantAccess = (employee) => {
//     setCurrentEmployee(employee);
//     setShowGrantAccessModal(true);
//   };

//   const handleGrantAccessSubmit = () => {
//     const userWithAccess = {
//       username: newUser.username,
//       password: newUser.password,
//       role: newUser.role,
//       status: "active",
//     };

//     axios
//       .post("http://localhost:8000/api/auth/sign-up", userWithAccess)
//       .then(() => {
//         setUserAccessList((prevList) => [...prevList, userWithAccess]);
//         setShowGrantAccessModal(false);
//         setNewUser({ username: "", password: "", role: "user" });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleAddressChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prevState) => ({
//       ...prevState,
//       address: {
//         ...prevState.address,
//         [name]: value,
//       },
//     }));
//   };

//   const handleNewUserChange = (event) => {
//     const { name, value } = event.target;
//     setNewUser((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h1>Employee List</h1>
//           <Button variant="primary" onClick={handleAddEmployee}>
//             Add Employee
//           </Button>
//           <Table striped bordered hover className="mt-3">
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Name</th>
//                 <th>Telephone</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>City</th>
//                 <th>Street</th>
//                 <th>Postal Code</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((emp) => (
//                 <tr key={emp._id}>
//                   <td>{emp.employeeId}</td>
//                   <td>{emp.name}</td>
//                   <td>{emp.telephone}</td>
//                   <td>{emp.email}</td>
//                   <td>{emp.role}</td>
//                   <td>{emp.address.city}</td>
//                   <td>{emp.address.street}</td>
//                   <td>{emp.address.postalCode}</td>
//                   <td>
//                     <Button
//                       variant="warning"
//                       onClick={() => handleEditEmployee(emp)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleDeleteEmployee(emp._id)}
//                     >
//                       Delete
//                     </Button>
//                     <Button
//                       variant="success"
//                       onClick={() => handleGrantAccess(emp)}
//                     >
//                       Grant Access
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>

//           <h2>Granted Access Users</h2>
//           <Table striped bordered hover className="mt-3">
//             <thead>
//               <tr>
//                 <th>Username</th>
//                 <th>Role</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userAccessList.map((user, index) => (
//                 <tr key={index}>
//                   <td>{user.username}</td>
//                   <td>{user.role}</td>
//                   <td>{user.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {isEditing ? "Edit Employee" : "Add Employee"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formEmployeeId">
//               <Form.Label>Employee ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="employeeId"
//                 value={currentEmployee.employeeId}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={currentEmployee.name}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formTelephone">
//               <Form.Label>Telephone</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="telephone"
//                 value={currentEmployee.telephone}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={currentEmployee.email}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formRole">
//               <Form.Label>Role</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="role"
//                 value={currentEmployee.role}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Role</option>
//                 <option value="Cashier">Cashier</option>
//                 <option value="Owner">Owner</option>
//                 <option value="Admin">Admin</option>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formCity">
//               <Form.Label>City</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="city"
//                 value={currentEmployee.address.city}
//                 onChange={handleAddressChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formStreet">
//               <Form.Label>Street</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="street"
//                 value={currentEmployee.address.street}
//                 onChange={handleAddressChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formPostalCode">
//               <Form.Label>Postal Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="postalCode"
//                 value={currentEmployee.address.postalCode}
//                 onChange={handleAddressChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSaveEmployee}>
//             {isEditing ? "Update Employee" : "Save Employee"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal
//         show={showGrantAccessModal}
//         onHide={() => setShowGrantAccessModal(false)}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Grant Access</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formUsername">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="username"
//                 value={newUser.username}
//                 onChange={handleNewUserChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 value={newUser.password}
//                 onChange={handleNewUserChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formRole">
//               <Form.Label>Role</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="role"
//                 value={newUser.role}
//                 onChange={handleNewUserChange}
//               >
//                 <option value="cashier">User</option>
//                 <option value="cashier">owner</option>
//                 <option value="admin">Admin</option>
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowGrantAccessModal(false)}
//           >
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleGrantAccessSubmit}>
//             Grant Access
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }

// export default UserHandle;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Table,
  Dropdown,
} from "react-bootstrap";

function UserHandle() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showGrantAccessModal, setShowGrantAccessModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    employeeId: "",
    name: "",
    telephone: "",
    email: "",
    role: "",
    address: {
      city: "",
      street: "",
      postalCode: "",
    },
  });
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [userAccessList, setUserAccessList] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8000/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchEmployees();
    fetchUserAccessList();
  }, []);

  const fetchUserAccessList = () => {
    axios
      .get("http://localhost:8000/api/users") // backend API for fetching users
      .then((response) => setUserAccessList(response.data))
      .catch((error) =>
        console.error("Failed to fetch granted access users:", error)
      );
  };

  const handleAddEmployee = () => {
    setIsEditing(false);
    setCurrentEmployee({
      employeeId: "",
      name: "",
      telephone: "",
      email: "",
      role: "",
      address: {
        city: "",
        street: "",
        postalCode: "",
      },
    });
    setShowModal(true);
  };

  const handleEditEmployee = (employee) => {
    setIsEditing(true);
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const [loading, setLoading] = useState(false);

  const handleSaveEmployee = () => {
    setLoading(true);
    const apiEndpoint = isEditing
      ? `http://localhost:8000/api/employees/${currentEmployee._id}`
      : "http://localhost:8000/api/employees";

    const method = isEditing ? axios.put : axios.post;

    method(apiEndpoint, currentEmployee)
      .then(() => {
        fetchEmployees();
        setShowModal(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:8000/api/employees/${id}`)
        .then(() => fetchEmployees())
        .catch((error) => console.error(error));
    }
  };
  const handleGrantAccess = (employee) => {
    setCurrentEmployee(employee); // Set the selected employee
    setNewUser({
      ...newUser,
      role: employee.role,
    });
    setShowGrantAccessModal(true);
  };
  const handleGrantAccessSubmit = () => {
    const userWithAccess = {
      username: newUser.username,
      password: newUser.password,
      role: newUser.role,
    };

    axios
      .post("http://localhost:8000/api/auth/sign-up", userWithAccess) // adjust api url
      .then((response) => {
        fetchUserAccessList(); // refresh the user list
        setShowGrantAccessModal(false);
        setNewUser({ username: "", password: "", role: "" });
      })
      .catch((error) => console.error("Failed to grant access:", error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmployee((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGrantAccessEdit = (user) => {
    setNewUser({
      username: user.username,
      password: user.password,
      role: user.role,
    });
    setShowGrantAccessModal(true); // show modal to edit the user
  };

  // handle delete user access
  const handleDeleteUserAccess = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8000/api/users/${userId}`)
        .then(() => {
          fetchUserAccessList(); // refresh list
        })
        .catch((error) => console.error("Failed to delete user:", error));
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Employee List</h1>
          <Button variant="primary" onClick={handleAddEmployee}>
            Add Employee
          </Button>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Telephone</th>
                <th>Email</th>
                <th>Role</th>
                <th>City</th>
                <th>Street</th>
                <th>Postal Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.employeeId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.telephone}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.address.city}</td>
                  <td>{emp.address.street}</td>
                  <td>{emp.address.postalCode}</td>

                  <td>
                    <Dropdown drop="start">
                      <Dropdown.Toggle variant="secondary">
                        <i className="bi bi-three-dots-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleGrantAccess(emp)}>
                          <i className="bi bi-trash-fill me-2"></i>
                          Grant Access
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEditEmployee(emp)}>
                          <i className="bi bi-pencil-fill me-2"></i>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDeleteEmployee(emp._id)}
                          className="text-danger"
                        >
                          <i className="bi bi-trash-fill me-2"></i>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h2>Granted Access Users</h2>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {userAccessList.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <Dropdown drop="start">
                      <Dropdown.Toggle variant="secondary">
                        <i className="bi bi-three-dots-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleGrantAccessEdit(user)}
                        >
                          <i className="bi bi-pencil-fill me-2"></i> Update
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDeleteUserAccess(user._id)}
                          className="text-danger"
                        >
                          <i className="bi bi-trash-fill me-2"></i> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Employee" : "Add Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmployeeId">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                name="employeeId"
                value={currentEmployee.employeeId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentEmployee.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTelephone">
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                type="text"
                name="telephone"
                value={currentEmployee.telephone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentEmployee.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={currentEmployee.role}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                <option value="Cashier">Cashier</option>
                <option value="Owner">Owner</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={currentEmployee.address.city}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={currentEmployee.address.street}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group controlId="formPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={currentEmployee.address.postalCode}
                onChange={handleAddressChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEmployee}>
            {isEditing ? "Update Employee" : "Save Employee"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showGrantAccessModal}
        onHide={() => setShowGrantAccessModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Grant Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleNewUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleNewUserChange}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={newUser.role}
                onChange={handleNewUserChange}
              >
                <option value="cashier">Cashier</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowGrantAccessModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleGrantAccessSubmit}>
            Grant Access
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserHandle;
