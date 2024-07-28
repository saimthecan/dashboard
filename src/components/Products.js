import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddProductModal from "./overview/AddProductModal";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const token = useSelector((state) => state.user.token);

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
      const response = await axios.delete(
        `http://127.0.0.1:5000/product/${selectedProductId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Product deleted successfully:", response.data);
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/product",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Product added successfully:", response.data);
      fetchProducts();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
     <Card
  border="light"
  className="shadow-sm"
  style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}
>
  <Table
    responsive
    className="align-items-center table-flush"
    style={{ borderRadius: "10px", marginTop: "20px" }}
  >
    <thead className="thead-light">
      <tr>
        <th scope="col" style={{ width: '30%' }}>
          Product Name
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            style={{ marginLeft: "10px" }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add New
          </Button>
        </th>
        <th scope="col" style={{ width: '30%' }}>Description</th>
        <th scope="col" style={{ width: '20%' }}>Price</th>
        <th scope="col" style={{ width: '20%' }}>Delete</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => (
        <tr key={index}>
          <td style={{ textAlign: 'left' }}>{product.name}</td>
          <td style={{ textAlign: 'left' }}>{product.description}</td>
          <td style={{ textAlign: 'left' }}>${product.price}</td>
          <td style={{ textAlign: 'left' }}>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => {
                setSelectedProductId(product._id.$oid);
                setShowModal(true);
              }}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</Card>


      <AddProductModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSubmit={handleAddProduct}
      />

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
