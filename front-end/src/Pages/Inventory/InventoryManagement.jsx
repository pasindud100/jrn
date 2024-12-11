import React, { useState } from "react";
import { Card, Nav, Tab } from "react-bootstrap";
import Page1 from "./Page1";
import Page3 from "./Page3";
import Product from "./Products";
import Header from "../../Components/Header";

function InventoryManagement({ setIsAuth }) {
  const [activeKey, setactiveKey] = useState("Page1");

  return (
    <div>
      <Tab.Container activeKey={activeKey} onSelect={(r) => setactiveKey(r)}>
        <Card>
          <Card.Header>

            <Nav variant="tabs" className="d-flex justify-content-between">
              <div className="d-flex ">
                <Nav.Item>
                  <Nav.Link eventKey="Page1">Product Details</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="Page3">Raw Materials</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="Product">Product</Nav.Link>
                </Nav.Item>
              </div>

              

              <div className="flex justify-content-end">
                <Nav.Item>
                  <Header setIsAuth={setIsAuth} />
                </Nav.Item>
              </div>
            </Nav>
          </Card.Header>

          <Card.Body>
            <Tab.Content>

              <Tab.Pane eventKey="Page1">
                <Page1 setactiveKey={setactiveKey} />
              </Tab.Pane>

              <Tab.Pane eventKey="Page3">
                <Page3 setactiveKey={setactiveKey} />
              </Tab.Pane>

              <Tab.Pane eventKey="Product">
                <Product setactiveKey={setactiveKey} />
              </Tab.Pane>

            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </div>
  );
}

export default InventoryManagement;
