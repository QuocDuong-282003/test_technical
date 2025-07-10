import React from 'react';
import { useCart } from '../context/DetialContext/CartContext';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const CartPage = () => {
    const { cart, removeFromCart } = useCart();

    const formatPrice = (price) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="container py-5 text-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                <div className="alert alert-info p-5">
                    <h2 className="mb-3">Giỏ hàng của bạn đang trống</h2>
                    <p>Hãy khám phá thêm các khoá học tuyệt vời của chúng tôi!</p>
                    <Link to="/" className="btn btn-primary">Khám phá ngay</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4">Giỏ hàng của bạn</h2>
            <div className="row">
                {/* Cart Items */}
                <div className="col-lg-8">
                    {cart.map(item => (
                        <div key={item.id} className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-3 col-md-2">
                                        <img src={item.image} alt={item.name} className="img-fluid rounded" />
                                    </div>
                                    <div className="col-6 col-md-7">
                                        <h5 className="mb-1">{item.name}</h5>
                                        <p className="text-muted mb-0 fw-bold">{formatPrice(item.price)}</p>
                                    </div>
                                    <div className="col-3 col-md-3 text-end">
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <FaTrash className="me-1" /> Xoá
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title">Tóm tắt đơn hàng</h4>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tạm tính ({cart.length} sản phẩm)</span>
                                <span className="fw-bold">{formatPrice(cartTotal)}</span>
                            </div>
                            <Button
                                as={Link}
                                to="/checkout"
                                variant="primary"
                                className="w-100 mt-3 fs-5"
                            >
                                Tiến hành thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
