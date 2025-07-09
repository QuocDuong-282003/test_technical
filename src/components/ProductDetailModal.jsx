import React from 'react';
import { Modal, Button, Row, Col, Image } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../context/DetialContext/CartContext';

const ProductDetailModal = ({ product, show, onHide }) => {
    const { addToCart } = useCart();

    if (!product || !show) return null;

    const formatPrice = (price) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    const handleAddToCartClick = () => {
        addToCart(product);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid rounded />
                    </Col>
                    <Col md={7}>
                        <h4>Mô tả chi tiết</h4>
                        <p className="text-muted">{product.longDescription}</p>
                        <div className="d-flex align-items-center mb-3">
                            <FaStar color="#ffc107" className="me-1" />
                            <span className="fw-bold">{product.rating} / 5.0</span>
                        </div>
                        <h3 className="text-primary">{formatPrice(product.price)}</h3>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
                <Button variant="primary" onClick={handleAddToCartClick}>Thêm vào giỏ hàng</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductDetailModal;