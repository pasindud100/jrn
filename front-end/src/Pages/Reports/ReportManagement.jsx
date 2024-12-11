import React, { useState } from "react";
import { Card, Nav, Tab } from "react-bootstrap";
import Report from "./report";
import Header from "../../Components/Header";

function ReportManagement({ setIsAuth }) {
  const [activeKey, setactiveKey] = useState("Report");

  return (
    <div>
      <Tab.Container activeKey={activeKey} onSelect={(r) => setactiveKey(r)}>
        <Card>
          <Card.Header>
            {" "}
            <Nav
              variant="tabs "
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex">
                <Nav.Item>
                  <Nav.Link eventKey="Report">Reports</Nav.Link>
                </Nav.Item>
              </div>
              <h3 className="d-flex pl-10 ">Report Management</h3>

              <div className="d-flex justify-content-end">
                <Nav.Item>
                  <Header setIsAuth={setIsAuth} />
                </Nav.Item>
              </div>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Tab.Content>
              <Tab.Pane eventKey="Report">
                <Report setactiveKey={setactiveKey} />
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </div>
  );
}

export default ReportManagement;
