import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

import roof1 from "../../assets/roofing1.jpeg";
import roof2 from "../../assets/roofing2.jpeg";
import roof3 from "../../assets/roofing3.jpeg";

const talks = [
  {
    id: 1,
    title: "Secure Your Future with Amano Roofing...",
    description: "Built for Safety, Engineered for Strength!",
    img: roof1,
  },
  {
    id: 2,
    title: "Elevate Your Shelter with Amano Roofing...",
    description: "Durable Solutions for Every Weather Challenge!",
    img: roof2,
  },
  {
    id: 3,
    title: "Crafted for Perfection, Designed for You...",
    description: "Amano Roofing – Your Partner in Protection!",
    img: roof3,
  },
];

function Carousels() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Container fluid className="py-2 bg-light">
      <Row>
        <Col lg={10} md={12}>
          <div className="bg-light">
            <Carousel interval={3000} controls={true} indicators={true}>
              {talks.map((talk) => (
                <Carousel.Item key={talk.id}>
                  <Row className="d-flex align-items-center justify-content-between">
                    <Col
                      md={4}
                      className="d-flex flex-column align-items-center"
                    >
                      <img
                        src={talk.img}
                        alt={talk.title}
                        className="img-fluid rounded-lg mb-4"
                        style={{ height: "150px", objectFit: "cover" }}
                        data-aos="fade-up"
                      />
                    </Col>
                    <Col
                      md={8}
                      className="d-flex flex-column justify-content-center align-items-center"
                    >
                      <h1
                        data-aos="fade-up"
                        data-aos-duration="500"
                        className="text-3xl font-weight-bold mb-2"
                      >
                        {talk.title}
                      </h1>
                      <p
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="100"
                        className="lead text-2xl"
                      >
                        {talk.description}
                      </p>
                    </Col>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Col>

        <Col lg={2} md={12}>
          <div
            className="d-flex flex-column align-items-center  bg-gray-800 rounded shadow p-4 h-100"
            style={{ minHeight: "180px" }}
          >
            <div className="text-center text-light">
              <h2>{currentTime.toLocaleTimeString()}</h2>
              <p>{currentTime.toLocaleDateString()}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Carousels;
