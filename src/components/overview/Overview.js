import React, { useEffect, useState } from "react";

import { Col, Row } from "@themesberg/react-bootstrap";

import {
  CircleChartWidget,
  SalesValueWidget,
  SalesValueWidgetPhone,
  CircleChartWidgetPhone,
} from "./Widgets";

const Overview = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
     <Row className="justify-content-md-center" style={{ marginTop: '20px' }}> 
        <Col xs={12} lg={6} className="mb-4">
          {isMobile ? (
            <SalesValueWidgetPhone />
          ) : (
            <SalesValueWidget title="Total Sales Value" />
          )}
        </Col>
        <Col xs={12} lg={6} className="mb-4">
          {isMobile ? (
            <CircleChartWidgetPhone />
          ) : (
            <CircleChartWidget title="My Products" />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Overview;
