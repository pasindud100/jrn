import React, { useState } from "react";
import { Card, Nav, Tab } from "react-bootstrap";

import BillingInvoice from "./BillingInvoice";
import BiilingSummary from "./BiilingSummary";
import AllTrasnsactions from "./AllTrasnsactions";
import Header from "../../Components/Header";

const BillingManagement = ({ setIsAuth }) => {
  const [activeKey, setActiveKey] = useState("BillingSummary");

  return (
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Card>
          <Card.Header>
            <Nav
              variant="tabs"
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex">
                <Nav.Item>
                  <Nav.Link eventKey="BillingSummary">Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="BillingInvoice">Invoice</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="AllTrasnsactions">
                    All Transactions
                  </Nav.Link>
                </Nav.Item>
              </div>
              {/* <h3 className="text-center mr-5">Billing Management</h3> */}

              <div className="d-flex justify-content-end">
                <Nav.Item>
                  <Header setIsAuth={setIsAuth} />
                </Nav.Item>
              </div>
            </Nav>
          </Card.Header>
          <Card.Body className="h-full">
            <Tab.Content>
              {/* passing setActiveKey as a prop to change content smoothly.. */}
              <Tab.Pane eventKey="BillingSummary">
                <BiilingSummary setActiveKey={setActiveKey} />
              </Tab.Pane>
              <Tab.Pane eventKey="BillingInvoice">
                <BillingInvoice setActiveKey={setActiveKey} />
              </Tab.Pane>
              <Tab.Pane eventKey="AllTrasnsactions">
                <AllTrasnsactions setActiveKey={setActiveKey} />
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
  
  );
};

export default BillingManagement;

