import React, { useState } from 'react';
import { useCart } from '../../context/DetialContext/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const formatPrice = (price) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handlePlaceOrder = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        toast('Đặt hàng thành công! Cảm ơn bạn đã tin tưởng AI-Edu Platform.');
        clearCart();
        navigate('/');
    };

    if (cart.length === 0) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                <div className="alert alert-warning p-5 text-center w-100">
                    <h2 className="mb-3">Giỏ hàng của bạn đang trống!</h2>
                    <p>Vui lòng thêm sản phẩm vào giỏ hàng để tiến hành thanh toán.</p>
                    <Link to="/" className="btn btn-primary">Khám phá các khoá học</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light py-5">
            <div className="container">
                <h2 className="mb-4 text-center">Hoàn tất Đơn hàng</h2>
                <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handlePlaceOrder}>
                    <div className="row">
                        {/* Thông tin người dùng */}
                        <div className="col-lg-7 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h4 className="card-title">Thông tin nhận hàng</h4>
                                    <p className="text-muted">Vui lòng điền đầy đủ thông tin để chúng tôi có thể hỗ trợ bạn tốt nhất.</p>
                                    <hr />
                                    <div className="mb-3">
                                        <label htmlFor="formFullName" className="form-label">Họ và tên</label>
                                        <input type="text" className="form-control" id="formFullName" required />
                                        <div className="invalid-feedback">Vui lòng nhập họ và tên.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formEmail" className="form-label">Địa chỉ Email</label>
                                        <input type="email" className="form-control" id="formEmail" placeholder="email@gmail.com" required />
                                        <div className="invalid-feedback">Vui lòng nhập địa chỉ email hợp lệ.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formPhone" className="form-label">Số điện thoại</label>
                                        <input type="tel" className="form-control" id="formPhone" placeholder="09xxxxxxxx" pattern="0[0-9]{9}" required />
                                        <div className="invalid-feedback">Vui lòng nhập số điện thoại hợp lệ (10 chữ số, bắt đầu bằng số 0).</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tóm tắt đơn hàng */}
                        <div className="col-lg-5">
                            <div className="card shadow-sm sticky-top" style={{ top: '100px' }}>
                                <div className="card-body">
                                    <h4 className="card-title">Đơn hàng của bạn</h4>
                                    <hr />
                                    {cart.map(item => (
                                        <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-truncate" style={{ maxWidth: '70%' }}>{item.name}</span>
                                            <span className="text-muted">{formatPrice(item.price)}</span>
                                        </div>
                                    ))}
                                    <hr />
                                    <div className="d-flex justify-content-between fw-bold fs-5">
                                        <span>Tổng cộng</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mt-4 fs-5">
                                        Xác nhận Đặt hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
