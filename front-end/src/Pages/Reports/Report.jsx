import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Row,
  Table,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Dropdowns from "../../Components/Dropdowns";

const summaryData = {
  timePeriod: "TODAY",
  sales: 2,
  inventory: 2,
  finance: 1,
};

const ReportsData = [
  {
    id: 1,
    period: "Week",
    type: "Inventory",
    date: "2024-12-01",
    time: "10:30",
  },
  {
    id: 2,
    period: "Month",
    type: "Sales",
    date: "2024-11-26",
    time: "13:30",
  },
  {
    id: 3,
    period: "Week",
    type: "Finance",
    date: "2024-11-28",
    time: "09:26",
  },
  {
    id: 4,
    period: "Day",
    type: "Inventory",
    date: "2024-11-22",
    time: "09:30",
  },
  {
    id: 5,
    period: "Week",
    type: "Sales",
    date: "2024-11-21",
    time: "11:43",
  },
];

const periodOptions = ["Day", "Week", "Month"];
const typeOptions = ["Finance", "Sales", "Inventory"];

function Report() {
  const [reports, setReports] = useState(ReportsData);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    period: "",
    type: "",
    date: "",
    time: "",
  });
  const [selectedReportIndex, setSelectedReportIndex] = useState(null);

  const handleModalOpen = (action, index = null) => {
    setModalAction(action);
    if (action === "Edit" && index !== null) {
      setFormData(reports[index]);
      setSelectedReportIndex(index);
    } else {
      setFormData({
        id: reports.length + 1, // assign a new id for new reports
        period: "",
        type: "",
        date: new Date().toISOString().split("T")[0], // Current date
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }), // current time in 24-hour format
      });
      setSelectedReportIndex(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = () => {
    if (modalAction === "Add") {
      setReports([...reports, formData]);
    } else if (modalAction === "Edit" && selectedReportIndex !== null) {
      const updatedReports = [...reports];
      updatedReports[selectedReportIndex] = formData;
      setReports(updatedReports);
    } else if (modalAction === "Delete" && selectedReportIndex !== null) {
      const updatedReports = reports.filter(
        (report) => report.id !== formData.id
      );
      setReports(updatedReports);
    }
    handleModalClose();
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredReports = ReportsData.filter(
    (reports) =>
      reports.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reports.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            JRN
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Reports</Breadcrumb.Item>
        </Breadcrumb>
        <div className="position-relative mb-3">
          <Form.Control
            type="text"
            placeholder="search reports"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 rounded-md ps-5 border border-black-300"
          />
        </div>
      </div>
      <Card className="mx-2">
        <Row className="text-center bg-light p-2 rounded-lg">
          <Col lg={3} md={6} sm={12} className="">
            <Card className="shadow-md rounded-lg p-4 transition-transform duration-200 hover:scale-105">
              <Dropdowns />
            </Card>
          </Col>
          <Col lg={3} md={6} sm={12} className="">
            <Card className="shadow-md rounded-lg p-4 transition-transform duration-200 hover:scale-105">
              <h5 className="text-blue-600 font-semibold">Sales</h5>
              <p className="text-4xl font-bold">{summaryData.sales}</p>
            </Card>
          </Col>
          <Col lg={3} md={6} sm={12} className="">
            <Card className="shadow-md rounded-lg p-4 transition-transform duration-200 hover:scale-105">
              <h5 className="text-green-600 font-semibold">Inventory</h5>
              <p className="text-4xl font-bold">{summaryData.inventory}</p>
            </Card>
          </Col>
          <Col lg={3} md={6} sm={12} className="">
            <Card className="shadow-md rounded-lg p-4 transition-transform duration-200 hover:scale-105">
              <h5 className="text-yellow-600 font-semibold">Finance</h5>
              <p className="text-4xl font-bold">{summaryData.finance}</p>
            </Card>
          </Col>
        </Row>
      </Card>

      <div className="flex justify-between items-center mx-2 mt-10 mb-2">
        <h5 className="">Recently Generated Reports</h5>
        <div className="flex gap-3 ">
          <Button variant="primary" onClick={() => handleModalOpen("Add")}>
            Add New Report
          </Button>
        </div>
      </div>

      <Table
        bordered
        hover
        responsive
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead>
          <tr>
            <th style={{ width: "22%" }}>Period</th>
            <th style={{ width: "22%" }}>Type</th>
            <th style={{ width: "22%" }}>Date</th>
            <th style={{ width: "22%" }}>Time</th>
            <th style={{ width: "12%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report, index) => (
            <tr key={report.id}>
              <td>{report.period}</td>
              <td>{report.type}</td>
              <td>{report.date}</td>
              <td>{report.time}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleModalOpen("Edit", index)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setFormData(report);
                    setModalAction("Delete");
                    setSelectedReportIndex(index);
                    setShowModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-2">
        <Button variant="primary">View All Reports</Button>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === "Delete"
              ? "Confirm Delete"
              : `${modalAction} Report`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === "Delete" ? (
            <p>Are you sure you want to delete this report?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Period</Form.Label>
                <Form.Select
                  value={formData.period}
                  onChange={(e) =>
                    setFormData({ ...formData, period: e.target.value })
                  }
                  disabled={modalAction === "Delete"}
                >
                  <option value="">Select Period</option>
                  {periodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  disabled={modalAction === "Delete"}
                >
                  <option value="">Select Type</option>
                  {typeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  disabled={modalAction === "Delete"}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  disabled={modalAction === "Delete"}
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
            <Button variant="primary" onClick={handleFormSubmit}>
              Yes, Delete
            </Button>
          ) : (
            <Button variant="primary" onClick={handleFormSubmit}>
              {modalAction === "Edit" ? "Save" : "Add"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Report;
