import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../context/DetialContext/FavoritesContext';
import './ProductCard.css'
const ProductCard = ({ product, onShowDetail }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const formatPrice = (price) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    return (
        <div className="card h-100 shadow-sm hover-lift">
            <img
                src={product.image}
                alt={product.name}
                className="card-img-top product-card-img"
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title flex-grow-1">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <p className="fw-bold fs-5 text-primary mb-3">{formatPrice(product.price)}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <button
                        className="btn btn-primary"
                        onClick={() => onShowDetail(product)}
                    >
                        Xem chi tiết
                    </button>
                    <button
                        className="btn btn-link text-danger p-0 favorite-btn"
                        onClick={() => toggleFavorite(product.id)}
                    >
                        {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
