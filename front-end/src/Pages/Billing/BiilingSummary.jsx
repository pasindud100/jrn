import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Dropdowns from "../../Components/Dropdowns";

const summaryData = {
  timePeriod: "TODAY",
  sales: "17",
  revenue: "LKR 147,370",
  newCustomers: 15,
};

function BillingSummary({ setActiveKey }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);

  // fetch invoices when first lode the page..
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/invoices");
        console.log("Fetched Transactions:", response.data); 
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error.message);
      }
    };

    fetchInvoices();
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // to get resent 5 transactions
  const recentTransactions = filteredTransactions.slice(0, 5);

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            JRN
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/billing" }}>
            Billing
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Overview</Breadcrumb.Item>
        </Breadcrumb>
        <div className="position-relative mb-3">
          <Form.Control
            type="text"
            placeholder="Search transaction"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 rounded-md ps-5 border border-black-300"
          />
        </div>
      </div>

      <Card className="mx-2">
        <Row className="text-center bg-light p-2 rounded-lg">
          <Col lg={3} md={6} sm={12}>
            <Card className="shadow-md rounded-lg p-4 transition-transform duration-200 hover:scale-105">
              <h5>
                <Dropdowns />
              </h5>
            </Card>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <Card className="shadow-md rounded-lg p-4 transition-transform duration-200 hover:scale-105">
              <h5 className="text-blue-600 font-semibold">Sales</h5>
              <p className="text-4xl font-bold">{summaryData.sales}</p>
            </Card>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <Card className="shadow-md rounded-lg p-4 transition-transform duration-200 hover:scale-105">
              <h5 className="text-green-600 font-semibold">Revenue</h5>
              <p className="text-4xl font-bold">{summaryData.revenue}</p>
            </Card>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <Card className="shadow-md rounded-lg p-4 transition-transform duration-200 hover:scale-105">
              <h5 className="text-yellow-600 font-semibold">New Customers</h5>
              <p className="text-4xl font-bold">{summaryData.newCustomers}</p>
            </Card>
          </Col>
        </Row>
      </Card>

      <div className="flex justify-between items-center mx-2 mt-10 mb-2">
        <h5 className="">Recent Transactions</h5>
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={() => setActiveKey("BillingInvoice")}
          >
            New Invoice
          </Button>
        </div>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Customer Name</th>
            <th>Date & Time</th>
            <th>Subtotal</th>
            <th>Discount</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.map((transaction, i) => (
            <tr key={transaction._id}>
              <td>{`INVO-${String(i + 1).padStart(2, "0")}`}</td>
              <td>{transaction.customerName || "Unknown"}</td>
              <td>{`${transaction.date || "N/A"} ${
                transaction.time || "N/A"
              }`}</td>
              <td>{`LKR ${transaction.totals?.subtotal || 0}`}</td>
              <td>{`LKR ${transaction.totals?.totalDiscount || 0}`}</td>
              <td>{`LKR ${transaction.totals?.grandTotal || 0}`}</td>
              <td>{transaction.status || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-2">
        <Button
          variant="primary"
          onClick={() => setActiveKey("AllTrasnsactions")}
        >
          All Transactions
        </Button>
      </div>
    </div>
  );
}

export default BillingSummary;
