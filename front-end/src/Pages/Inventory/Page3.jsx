import React, { useState } from 'react'
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

function Page3() {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="px-3 " >

            <div className="d-flex align-items-center justify-content-between">

                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                        JRN
                    </Breadcrumb.Item>

                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/inventory" }}>
                        Inventory
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>Raw Materials</Breadcrumb.Item>
                </Breadcrumb>

                <h3 className="text-center">Inventory Management</h3>

                <div className="mb-3 position-relative">
                    <Form.Control
                        type="text"
                        placeholder="Search.."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-md w-80 ps-5 border-black-300"
                    />
                </div>

            </div>


            <div >
                <Card className="mx-2 mb-3">
                    <Row className="justify-around p-2 text-center rounded-lg bg-light d-flex">

                        <Col lg={3} md={6} sm={12}>
                            <Card border="info" className="p-4 transition-transform duration-200 rounded-lg shadow-md cursor-pointer d-flex justify-content-center align-items-center h-100 hover:scale-105"
                                // onClick={() => handleCardClick("Available Stock")}
                            >
                                <h5 className="font-semibold text-blue-600">Available Stock</h5>
                            </Card>
                        </Col>

                        <Col lg={3} md={6} sm={12}>
                            <Card border="info" className="p-4 transition-transform duration-200 rounded-lg shadow-md cursor-pointer d-flex justify-content-center align-items-center h-100 hover:scale-105"
                                // onClick={() => handleCardClick("Available Stock")}
                            >
                                <h5 className="font-semibold text-blue-600">Place a New Order</h5>
                            </Card>
                        </Col>

                    </Row>
                </Card>
            </div>

















        </div>
    )
}

export default Page3
