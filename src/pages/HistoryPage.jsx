import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from '../context/DetialContext/HistoryContext';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import SkeletonCard from '../components/SkeletonCard';

const HistoryPage = () => {
    const { history, addToHistory } = useHistory();
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchProducts().then(response => {
            setAllProducts(response.data);
            setIsLoading(false);
        });
    }, []);

    const historyProducts = useMemo(() => {
        if (!history || history.length === 0) return [];
        const productMap = new Map(allProducts.map(p => [p.id, p]));
        return history.map(id => productMap.get(id)).filter(Boolean);
    }, [allProducts, history]);

    const handleShowDetail = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        addToHistory(product.id);
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Lịch sử đã xem</h2>
            <div className="row">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="col-sm-6 col-lg-4 col-xl-3 mb-4">
                            <SkeletonCard />
                        </div>
                    ))
                ) : historyProducts.length > 0 ? (
                    historyProducts.map(product => (
                        <div key={product.id} className="col-sm-6 col-lg-4 col-xl-3 mb-4">
                            <ProductCard product={product} onShowDetail={handleShowDetail} />
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <div className="alert alert-info">Lịch sử xem của bạn đang trống.</div>
                    </div>
                )}
            </div>

            <ProductDetailModal
                product={selectedProduct}
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </div>
    );
};

export default HistoryPage;
