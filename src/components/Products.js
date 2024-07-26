import React, { useEffect, useState, useCallback } from "react";
import { Col, Row, Card, Table, Button, Modal } from "@themesberg/react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddProductModal from './overview/AddProductModal';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const token = useSelector(state => state.user.token);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/myproducts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/product/${selectedProductId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Product deleted successfully:', response.data);
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/product", product, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Product added successfully:', response.data);
      fetchProducts();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      <Card border="light" className="shadow-sm" style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
        <Card.Header>
          <Row className="align-items-center justify-content-between">
            <Col>
              <h5>Product Overview</h5>
            </Col>
            <Col className="text-right">
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                <FontAwesomeIcon icon={faPlus} /> Add New Product
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Table responsive className="align-items-center table-flush" style={{ borderRadius: "10px" }}>
          <thead className="thead-light">
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.owner}</td>
                <td>
                  <FontAwesomeIcon icon={faTimes} onClick={() => {
                    setSelectedProductId(product._id.$oid); // _id doğru bir şekilde alınıyor
                    setShowModal(true);
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <AddProductModal show={showAddModal} handleClose={() => setShowAddModal(false)} handleSubmit={handleAddProduct} />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
