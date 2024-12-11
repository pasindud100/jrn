import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import emailjs from "emailjs-com";

function EmailSender({ invoiceData, serviceId, templateId, publicKey }) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  // send email
  const sendEmail = () => {
    setSending(true);
    setStatus("Sending...");

    // formatting for better readability in the email
    const formattedProducts = invoiceData.products
      .map(
        (p) =>
          `Product: ${p.product}, Gauge: ${p.gauge}, Unit: ${p.unit}, Color: ${p.color}, Quantity: ${p.qty}, Unit Price: ${p.uPrice}, Discount: ${p.discount}, Total: ${p.total}`
      )
      .join("\n");

    // template parameters
    const templateParams = {
      invoice_number: invoiceData.invoiceNumber,
      date: invoiceData.date,
      time: invoiceData.time,
      customer_name: invoiceData.customerName,
      customer_city: invoiceData.customerCity,
      customer_phone: invoiceData.customerTel,
      products: formattedProducts,
      subtotal: invoiceData.totals.subtotal.toFixed(2),
      total_discount: invoiceData.totals.totalDiscount.toFixed(2),
      grand_total: invoiceData.totals.grandTotal.toFixed(2),
    };

    //  using EmailJS we send the email
    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      (response) => {
        setStatus("Invoice sent successfully!");
        setSending(false);
        console.log("Email sent successfully:", response);
      },
      (error) => {
        setStatus(`Failed to send email: ${error.text}`);
        setSending(false);
        console.error("Email sending error:", error);
      }
    );
  };

  return (
    <div className="email-sender">
      {!status && (
        <Button
          variant="success"
          onClick={sendEmail}
          disabled={sending}
          className="mb-3"
        >
          {sending ? "Sending..." : "Send Invoice to Owner"}
        </Button>
      )}

      {status && (
        <Alert variant={status.includes("Failed") ? "danger" : "success"}>
          {status}
        </Alert>
      )}
    </div>
  );
}

export default EmailSender;
