import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faPlus,
  faRocket,
  faTasks,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "@themesberg/react-bootstrap";
import { Button, Dropdown } from "react-bootstrap";
import {
  CircleChartWidget,
  SalesValueWidget,
  SalesValueWidgetPhone,
  CircleChartWidgetPhone 
} from "./Widgets";
import { PageVisitsTable } from "./Tables";
import { trafficShares } from "../../data/charts";
import AddProductModal from './AddProductModal';
import axios from 'axios';
import { useSelector } from "react-redux";

const Overview = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);
  const token = useSelector(state => state.user.token);

  const addProduct = async (product) => {
    console.log('Sending product:', product);  // İstek öncesi log
    try {
      const response = await axios.post("http://127.0.0.1:5000/product", JSON.stringify(product), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Product added successfully:', response.data);  // Başarılı yanıt logu
    } catch (error) {
      console.error('Error adding product:', error);  // Hata logu
      console.error('Error details:', error.response ? error.response.data : 'No response data');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2" onClick={handleModalShow}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New Products
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <AddProductModal show={modalShow} handleClose={handleModalClose} handleSubmit={addProduct} />

      <Row className="justify-content-md-center">
        <Col xs={12} lg={6} className="mb-4">
        {isMobile ? <SalesValueWidgetPhone /> : <SalesValueWidget title="Total Sales Value" />}
        </Col>
        <Col xs={12} lg={6} className="mb-4">
        {isMobile ? <CircleChartWidgetPhone /> : <CircleChartWidget title="My Products" />}
        </Col>
      </Row>

      <Row>
        <Col xs={12} className="mb-4">
          <PageVisitsTable />
        </Col>
      </Row>
    </>
  );
};

export default Overview;
