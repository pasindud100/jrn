import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Dropdown,
  DropdownButton,
  Table,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Breadcrumb,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Install using npm install uuid

const Page1 = () => {
  const [selectedColor, setSelectedColor] = useState("All Colors");
  const [selectedGauge, setSelectedGauge] = useState("All Gauges");
  const [heading, setHeading] = useState("AVAILABLE STOCK");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAction, setModalAction] = useState(""); // "Add", "Update", or "Delete"
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    qty: "",
    unit: "",
    color: "",
    gauge: "",
    reorderLevel: "",
  });
  const [stock, setStock] = useState([
    {
      id: "01",
      name: "Tile Roofing",
      qty: 1000,
      unit: "Ft",
      color: "Blue",
      gauge: "0.47",
      reorderLevel: 1500,
    },
    {
      id: "02",
      name: "Gutter",
      qty: 0,
      unit: "Ft",
      color: "Autom Red",
      gauge: "0.35",
      reorderLevel: 200,
    },
    {
      id: "03",
      name: "End Cap",
      qty: 250,
      unit: "Nos",
      color: "Green",
      gauge: "0.30",
      reorderLevel: 100,
    },
    {
      id: "04",
      name: "Ridge Cover",
      qty: 0,
      unit: "Ft",
      color: "Chocolate Brown",
      gauge: "0.25",
      reorderLevel: 300,
    },
  ]);
  const [duplicateError, setDuplicateError] = useState("");

  const productNames = [
    "Normal Roofing",
    "Tile Roofing",
    "Gutter",
    "Barge Flashing",
    "Down Pipe",
    "Ridge Cover",
    "Valley Gutter",
    "Valance Board",
    "Wall Flashing",
    "Nozzles",
    "End Cap",
    "Bracket",
  ];
  const units = ["Ft", "Nos"];
  const colors = ["Autom Red", "Blue", "Chocolate Brown", "Green", "Meroon"];
  const gauges = ["0.47", "0.35", "0.30", "0.25", "0.20"];

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleGaugeChange = (gauge) => {
    setSelectedGauge(gauge);
  };

  const handleModalOpen = (action, item = null) => {
    setModalAction(action);
    if (action === "Add") {
      setFormData({
        id: uuidv4(),
        name: "",
        qty: "",
        unit: "",
        color: "",
        gauge: "",
        reorderLevel: "",
      });
    } else if (action === "Update" || action === "Delete") {
      setFormData(item);
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDuplicateError("");
  };

  const handleFormSubmit = () => {
    const isDuplicate = stock.some(
      (item) =>
        item.name === formData.name &&
        item.color === formData.color &&
        item.gauge === formData.gauge &&
        item.id !== formData.id
    );

    if (isDuplicate) {
      setDuplicateError(
        "This product already exists! You can update that particular product."
      );
      return;
    }

    setDuplicateError("");

    if (modalAction === "Add") {
      setStock([...stock, formData]);
    } else if (modalAction === "Update") {
      setStock(
        stock.map((item) => (item.id === formData.id ? { ...formData } : item))
      );
    } else if (modalAction === "Delete") {
      setStock(stock.filter((item) => item.id !== formData.id));
    }

    handleModalClose();
  };

  const handleCardClick = (type) => {
    setSelectedColor("All Colors");
    setSelectedGauge("All Gauges");

    if (type === "Out Of Stocks") {
      setHeading("OUT OF STOCKS ITEMS");
    } else if (type === "Re-Order Items") {
      setHeading("RE-ORDER ITEMS");
    } else {
      setHeading("AVAILABLE STOCK");
    }
  }; const filteredStock = stock.filter((item) => {
    const matchesHeading =
      heading === "AVAILABLE STOCK"
        ? true
        : heading === "OUT OF STOCKS ITEMS"
          ? item.qty === 0
          : heading === "RE-ORDER ITEMS"
            ? item.qty < item.reorderLevel
            : true;

    const matchesColor =
      selectedColor === "All Colors" ? true : item.color === selectedColor;

    const matchesGauge =
      selectedGauge === "All Gauges" ? true : item.gauge === selectedGauge;

    const searchByName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const searchByColor = item.color.toLowerCase().includes(searchTerm.toLowerCase());

    // combine all conditions
    return (
      matchesHeading &&
      matchesColor &&
      matchesGauge &&
      (searchByName || searchByColor)
    );
  });

  return (
    <div className="px-3">

      <div className="d-flex align-items-center justify-content-between">

        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            JRN
          </Breadcrumb.Item>

          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/inventory" }}>
            Inventory
          </Breadcrumb.Item>

          <Breadcrumb.Item active>Stock Details</Breadcrumb.Item>
        </Breadcrumb>

        <h3 className="text-center">Inventory Management</h3>

        <div className="mb-3 position-relative">
          <Form.Control
            type="text"
            placeholder="Search by name or color"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md w-80 ps-5 border-black-300"
          />
        </div>

      </div>




      <div >
        <Card className="mx-2 mb-3">
          <Row className="justify-around p-2 text-center rounded-lg bg-light d-flex">

            {/* <Col lg={3} md={6} sm={12}>
        <Card className="p-4 transition-transform duration-200 rounded-lg shadow-md cursor-pointer h-100 hover:scale-105">
        </Card>
      </Col> */}

            <Col lg={3} md={6} sm={12}>
              <Card border="info" className="p-4 transition-transform duration-200 rounded-lg shadow-md cursor-pointer d-flex justify-content-center align-items-center h-100 hover:scale-105"
                onClick={() => handleCardClick("Available Stock")}
              >
                <h5 className="font-semibold text-blue-600">Available Stock</h5>
              </Card>
            </Col>

            <Col lg={3} md={6} sm={12}>
              <Card border="info" className="p-4 transition-transform duration-200 rounded-lg shadow-md cursor-pointer h-100 hover:scale-105"
                onClick={() => handleCardClick("Out Of Stocks")}
              >
                <h5 className="font-semibold text-green-600">Out of Stocks</h5>
                <p className="text-4xl font-bold">{stock.filter((item) => item.qty === 0).length}</p>
              </Card>
            </Col>

            <Col lg={3} md={6} sm={12}>
              <Card border="info" className="p-4 transition-transform duration-200 rounded-lg shadow-md cursor-pointer h-100 hover:scale-105"
                onClick={() => handleCardClick("Re-Order Items")}
              >
                <h5 className="font-semibold text-yellow-600">Re-Order Items</h5>
                <p className="text-4xl font-bold">{stock.filter((item) => item.qty < item.reorderLevel).length}</p>
              </Card>
            </Col>

          </Row>
        </Card>
      </div>


      {/* Stock Table */}
      <div>
        <h5 className="mb-3">{heading}</h5>

        <div className="gap-2 mb-4 d-flex">
          <DropdownButton
            id="color-dropdown"
            title={selectedColor}
            onSelect={handleColorChange}
          >
            <Dropdown.Item eventKey="All Colors">All Colors</Dropdown.Item>
            {colors.map((color, index) => (
              <Dropdown.Item key={index} eventKey={color}>
                {color}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <DropdownButton
            id="gauge-dropdown"
            title={selectedGauge}
            onSelect={handleGaugeChange}
          >
            <Dropdown.Item eventKey="All Gauges">All Gauges</Dropdown.Item>
            {gauges.map((gauge, index) => (
              <Dropdown.Item key={index} eventKey={gauge}>
                {gauge}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>

        <Table bordered hover>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Color</th>
              <th>Gauge</th>
              <th>Re-Order Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.unit}</td>
                <td>{item.color}</td>
                <td>{item.gauge}</td>
                <td>{item.reorderLevel}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleModalOpen("Update", item)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleModalOpen("Delete", item)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="gap-2 d-flex justify-content-end">
          <Button variant="primary" onClick={() => handleModalOpen("Add")}>
            Add new product
          </Button>
        </div>
      </div>

      {/* Render Toast for Error */}
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
          <Modal.Title>{modalAction} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === "Delete" ? (
            <p>Are you sure you want to delete this product?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                >
                  <option value="">Select Product Name</option>
                  {productNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.qty}
                  onChange={(e) =>
                    setFormData({ ...formData, qty: parseInt(e.target.value) })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                >
                  <option value="">Select Unit</option>
                  {units.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                >
                  <option value="">Select Color</option>
                  {colors.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gauge</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.gauge}
                  onChange={(e) =>
                    setFormData({ ...formData, gauge: e.target.value })
                  }
                >
                  <option value="">Select Gauge</option>
                  {gauges.map((gauge, index) => (
                    <option key={index} value={gauge}>
                      {gauge}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Re-Order Level</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.reorderLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reorderLevel: parseInt(e.target.value),
                    })
                  }
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
            <Button
              variant="primary"
              onClick={() => handleFormSubmit()}
            >
              Yes
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => handleFormSubmit()}
            >
              {modalAction === "Update" ? "Save" : "Add"}
            </Button>
          )}
        </Modal.Footer>

      </Modal>
    </div>
  );
};

export default Page1;

