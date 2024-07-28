import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddProductModal = ({ show, handleClose, handleSubmit }) => {
  const [product, setProduct] = useState({ name: '', description: '', price: '' });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    // Eğer giriş "name" veya "description" alanlarından biriyse, her kelimenin ilk harfini büyük yap
    if (name === "name" || name === "description") {
      const formattedValue = value.split(' ')
                                 .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                 .join(' ');
      setProduct({ ...product, [name]: formattedValue });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const submitForm = () => {
    const processedProduct = {
      ...product,
      price: parseFloat(product.price)  // price'ı float'a çevir
    };
    handleSubmit(processedProduct);
    handleClose();
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={product.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              name="price" 
              value={product.price} 
              onChange={handleChange} 
              inputMode="numeric" 
              pattern="[0-9]*"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" value={product.description} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitForm}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
