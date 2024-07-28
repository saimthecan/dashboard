import React, { useEffect, useState, useCallback } from "react";
import { Card, Table, Button, Modal } from "@themesberg/react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const AdminTables = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const token = useSelector((state) => state.user.token);

  // Ürünleri çekme işlevi
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      const response = await axios.delete(
        `http://127.0.0.1:5000/product/${selectedProductId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product deleted successfully:", response.data);
      setShowModal(false);
      fetchProducts(); // Ürünleri yeniden yükle
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Card border="light" className="shadow-sm">
        <Table
          responsive
          className="align-items-center table-flush"
          style={{ borderRadius: "10px", marginTop: "20px" }}
        >
          <thead className="thead-light">
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Delete</th>
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
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => {
                      setSelectedProductId(product.id);
                      // MongoDB ID, doğru formatta olmalı
                      setShowModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
