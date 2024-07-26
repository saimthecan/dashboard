import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "@themesberg/react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";

export const CircleChartWidget = (props) => {
  const [products, setProducts] = useState([]);
  const username = useSelector((state) => state.user);
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
        display: false, // Bu satır etiketleri gizler
      },
    },
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

export const CircleChartWidgetPhone = (props) => {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/myproducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
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
            style={{ maxWidth: "100%", height: "auto" }}
          >
            <Pie data={data} options={options} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3" style={{ fontSize: '1rem' }}>{title}</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              {products.map((product, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}>
                 <span className="dot" style={{ height: '5px', width: '5px', backgroundColor: '#000', borderRadius: '50%', marginRight: '3px' }}></span>

                  {product.name} - ${product.price}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CircleChartWidgetPhone;

export const SalesValueWidget = (props) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/myproducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        const totalValue = response.data.reduce(
          (sum, product) => sum + Number(product.price),
          0
        );
        setTotal(totalValue);
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
        label: "Product Price",
        data: products.map((product) => product.price),
        backgroundColor: products.map((product) => product.color || "#4bc0c0"),
        borderColor: products.map((product) => product.color || "#4bc0c0"),
        borderWidth: 1,
        barThickness: 50, // Min bar thickness
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500 // Bu değeri gerektiği gibi ayarlayabilirsiniz
        }
      },
      x: {
        categoryPercentage: 1.0, // Bu değeri artırarak kategoriler arasındaki boşluğu azaltabilirsiniz
        barPercentage: 0.9, // Bu değeri azaltarak her bir barın genişliğini azaltabilirsiniz
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  

  return (
    <Card
      className="bg-secondary-alt shadow-sm"
      style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}
    >
      <Card.Header className="d-flex flex-row align-items-center">
        <div className="d-block">
          <h5 className="fw-normal mb-2">Total Sales Value</h5>
          <h3>${total}</h3>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};


export const SalesValueWidgetPhone = (props) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const token = useSelector((state) => state.user.token);

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
        const totalValue = response.data.reduce(
          (sum, product) => sum + Number(product.price),
          0
        );
        setTotal(totalValue); // Toplam fiyatı hesapla ve güncelle
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
        label: "Product Price",
        data: products.map((product) => product.price),
        backgroundColor: "#4bc0c0",
        borderColor: "#4bc0c0",
        borderWidth: 1,
        barThickness: 25,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="shadow-sm" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
      <Card.Header className="d-md-flex flex-row align-items-center flex-0">
        <div className="d-block mb-3 mb-md-0">
          <h5 className="fw-normal mb-2">Total Sales Value</h5>
          <h3>${total}</h3>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};