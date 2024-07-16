import React, {useState} from "react";
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
} from "./Widgets";
import { PageVisitsTable } from "./Tables";
import { trafficShares } from "../../data/charts";
import AddProductModal from './AddProductModal';
import axios from 'axios';
import { useSelector } from "react-redux";


const Overview = () => {
  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);
  const token = useSelector(state => state.user.token);

  const addProduct = async (product) => {
    console.log('Product to add:', product);
   
    try {
      const response = await axios.post("http://127.0.0.1:5000/product", product, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

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
        <Col xs={12} sm={6} xl={9} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget title="My Products" data={trafficShares} />
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
