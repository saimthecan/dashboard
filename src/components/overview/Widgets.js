import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faPaperclip,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Col, Row, Card, Image, Button } from "@themesberg/react-bootstrap";
import {  SalesValueChartphone } from "./Charts";
import { Pie } from "react-chartjs-2";
import { Line } from 'react-chartjs-2';

import Profile1 from "../../assets/img/team/profile-picture-1.jpg";
import ProfileCover from "../../assets/img/profile-cover.jpg";

import axios from "axios";
import { useSelector } from "react-redux";

export const ProfileCardWidget = () => {
  return (
    <Card border="light" className="text-center p-0 mb-4">
      <div
        style={{ backgroundImage: `url(${ProfileCover})` }}
        className="profile-cover rounded-top"
      />
      <Card.Body className="pb-5">
        <Card.Img
          src={Profile1}
          alt="Neil Portrait"
          className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
        />
        <Card.Title>Neil Sims</Card.Title>
        <Card.Subtitle className="fw-normal">
          Senior Software Engineer
        </Card.Subtitle>
        <Card.Text className="text-gray mb-4">New York, USA</Card.Text>

        <Button variant="primary" size="sm" className="me-2">
          <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Connect
        </Button>
        <Button variant="secondary" size="sm">
          Send Message
        </Button>
      </Card.Body>
    </Card>
  );
};

export const ChoosePhotoWidget = (props) => {
  const { title, photo } = props;

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
            <Image fluid rounded src={photo} />
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file" />
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Choose Image</div>
                  <div className="text-gray small">
                    JPG, GIF or PNG. Max size of 800K
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const CircleChartWidget = (props) => {
  const [products, setProducts] = useState([]);
  const username = useSelector((state) => state.user.username);
  console.log("widgetname", username);
  const token = useSelector((state) => state.user.token);
  console.log("widget", token);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/myproducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("widgetdata", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchUserProducts();
  }, [token]);

  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        data: products.map((product) => product.price),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#F7464A",
          "#49A9EA",
          "#BDC3C7",
        ], // Renklerinizi burada ayarlayabilirsiniz
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false  // Bu satır etiketleri gizler
      }
    }
  };
  

  const { title = [] } = props;

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xs={12}
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <Pie data={data} options={options} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>
            {products.map((product, index) => (
              <h6 key={index} className="fw-normal text-gray">
                {product.name} - ${product.price}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidget = (props) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const token = useSelector(state => state.user.token);
 

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/myproducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("widgetdata", response.data);
        setProducts(response.data);
        const totalValue = response.data.reduce((sum, product) => sum + Number(product.price), 0);
        setTotal(totalValue); // Toplam fiyatı hesapla ve güncelle
        
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchUserProducts();
  }, [token]);

  const data = {
    labels: products.map(product => product.name),
    datasets: [{
      label: 'Sales Values',
      data: products.map(product => product.price),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center">
        <div className="d-block">
          <h5 className="fw-normal mb-2">Total Sales Value</h5>
          <h3>${total}</h3>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <Line data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidgetPhone = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-md-flex flex-row align-items-center flex-0">
        <div className="d-block mb-3 mb-md-0">
          <h5 className="fw-normal mb-2">{title}</h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon
              icon={percentageIcon}
              className={`${percentageColor} me-1`}
            />
            <span className={percentageColor}>{percentage}%</span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">
            Month
          </Button>
          <Button variant="primary" size="sm" className="me-3">
            Week
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChartphone />
      </Card.Body>
    </Card>
  );
};
