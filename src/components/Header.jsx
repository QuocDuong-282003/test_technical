import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBookOpen, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/DetialContext/CartContext'; // Chỉ import hook cần thiết

const Header = () => {
    const { cart } = useCart();
    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
            <div className="container">
                <NavLink to="/" className="navbar-brand fw-bold text-primary d-flex align-items-center">
                    <FaBookOpen className="me-2" />
                    AI-Edu Platform
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#main-navbar-nav"
                    aria-controls="main-navbar-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="main-navbar-nav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">Trang chủ</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/favorites" className="nav-link">Yêu thích</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/history" className="nav-link">Lịch sử</NavLink>
                        </li>
                        <li className="nav-item position-relative ms-lg-2">
                            <NavLink to="/cart" className="nav-link">
                                <FaShoppingCart size="1.2rem" />
                                {totalItemsInCart > 0 && (
                                    <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle border border-light">
                                        {totalItemsInCart}
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
