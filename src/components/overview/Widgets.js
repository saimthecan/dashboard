import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "@themesberg/react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";

export const CircleChartWidget = (props) => {
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

  // Ürün isimlerine göre renkler tanımlayın
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F7464A", "#49A9EA", "#BDC3C7"];

  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        data: products.map((product) => product.price),
        backgroundColor: colors.slice(0, products.length),
      },
    ],
  };

 const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom', // Legend'ı alt kısma taşı
      },
    },
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-center" style={{ height: '300px' }}> 
          <Pie data={data} options={options} />
        </div>
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

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F7464A", "#49A9EA", "#BDC3C7"];

  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        data: products.map((product) => product.price),
        backgroundColor: colors.slice(0, products.length),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Aspect ratio korumayı devre dışı bırak
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    layout: {
      padding: {
        bottom: 50 // Alt kısımda yeterli boşluk bırak
      }
    }
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
          <Pie data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

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