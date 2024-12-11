import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import EmailSender from "./EmailSender";

function InvoicePreview({ show, handleClose, invoiceData }) {
  const invoiceRef = useRef();

  const userId = "dilshanp5400@gmail.com"; // put actual user email
  const serviceId = "service_zk5k8nm"; // emailJS service id
  const templateId = "template_k9i0wkf"; // emailJS template id
  const publicKey = "B0On3JI3DI994F4QV"; // emailJS public key

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const handlePrint = () => {
 
    const printContent = invoiceRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .table {
              border-collapse: collapse;
              width: 100%;
            }
            .table th, .table td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            .text-center {
              text-align: center;
            }
            .mb-4 {
              margin-bottom: 1.5rem;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.onafterprint = () => {
      newWindow.close();
    };
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={invoiceRef}>
          <div className="text-center mb-4">
            <h4>JRN MODERN ROOFING (PVT)LTD</h4>
            <p>123 Main Street, Anuradapura</p>
            <p>Phone: +94 77 7866272 | Email: jrnroofing@gmail.com</p>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <div>
              <p>
                <strong>Date:</strong> {invoiceData.date}
              </p>
              <p>
                <strong>Time:</strong> {invoiceData.time}
              </p>
            </div>
            <div>
              <p>
                <strong>Invoice :</strong> {invoiceData.invoiceNumber}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h5>Customer Details</h5>
            <p>
              <strong>Name:</strong> {invoiceData.customerName}
            </p>
            <p>
              <strong>City:</strong> {invoiceData.customerCity}
            </p>
            <p>
              <strong>Telephone:</strong> {invoiceData.customerTel}
            </p>
          </div>

          <h5>Product Details</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Gauge</th>
                <th>Unit</th>
                <th>Color</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.product}</td>
                  <td>{product.gauge}</td>
                  <td>{product.unit}</td>
                  <td>{product.color}</td>
                  <td>{product.qty}</td>
                  <td>{product.uPrice}</td>
                  <td>{product.discount}%</td>
                  <td>{product.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end">
            <div>
              <p>
                <strong>Subtotal:</strong> {invoiceData.totals.subtotal.toFixed(2)}
              </p>
              <p>
                <strong>Total Discount:</strong> {invoiceData.totals.totalDiscount.toFixed(2)}
              </p>
              <p>
                <strong>Grand Total:</strong> {invoiceData.totals.grandTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex align-items-center">
        <Button variant="primary" onClick={handlePrint}>
          Print Invoice
        </Button>
        <EmailSender
          invoiceData={invoiceData}
          userId={userId}
          serviceId={serviceId}
          templateId={templateId}
          publicKey={publicKey}
        />
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InvoicePreview;