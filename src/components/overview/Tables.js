import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from "@themesberg/react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

export const PageVisitsTable = () => {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/myproducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [token]);

  const TableRow = (props) => {
    const { name, description, price, owner } = props;

    return (
      <tr>
        <th scope="row">{name}</th>
        <td>{description}</td>
        <td>${price}</td>
        <td>{owner}</td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Product Overview</h5>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <TableRow key={`product-${index}`} {...product} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
