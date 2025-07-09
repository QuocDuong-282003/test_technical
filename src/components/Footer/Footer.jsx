import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-auto py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5>AI-Edu Platform</h5>
                        <p className="text-muted">
                            Nền tảng giáo dục tích hợp AI, mang đến trải nghiệm học tập thông minh và cá nhân hóa.
                        </p>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5>Liên kết nhanh</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white text-decoration-none">Trang chủ</a></li>
                            <li><a href="/favorites" className="text-white text-decoration-none">Yêu thích</a></li>
                            <li><a href="/cart" className="text-white text-decoration-none">Giỏ hàng</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Kết nối với chúng tôi</h5>
                        <div>
                            <a href="#" className="text-white me-3 fs-4"><FaFacebook /></a>
                            <a href="#" className="text-white me-3 fs-4"><FaGithub /></a>
                            <a href="#" className="text-white fs-4"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col text-center border-top text-white pt-3">
                        © 2025 - Bản quyền bởi Quốc Dương
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
