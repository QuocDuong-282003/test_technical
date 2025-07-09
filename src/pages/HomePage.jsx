import React, { useState, useEffect, useMemo } from 'react';
import { fetchProducts, fetchSuggestions } from '../api';
import { useHistory } from '../context/DetialContext/HistoryContext';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import ProductDetailModal from '../components/ProductDetailModal';

const HomePage = () => {
    const { addToHistory } = useHistory();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');

    const [suggestions, setSuggestions] = useState([]);
    const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
    const [suggestionError, setSuggestionError] = useState(null);
    const [hasClickedSuggest, setHasClickedSuggest] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts().then(response => {
            setProducts(response.data);
            setIsLoading(false);
        });
    }, []);

    const handleGetSuggestions = () => {
        setHasClickedSuggest(true);
        setIsSuggestionLoading(true);
        setSuggestionError(null);
        setSuggestions([]);
        fetchSuggestions('user123')
            .then(response => setSuggestions(response.data))
            .catch(error => setSuggestionError(error.message))
            .finally(() => setIsSuggestionLoading(false));
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(p => {
                if (priceFilter === 'all') return true;
                const [min, max] = priceFilter.split('-');
                if (max) return p.price >= parseInt(min) && p.price <= parseInt(max);
                return p.price >= parseInt(min);
            });
    }, [products, searchTerm, priceFilter]);

    const handleShowDetail = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        addToHistory(product.id);
    };

    const renderSuggestionList = () => {
        if (isSuggestionLoading) {
            return Array.from({ length: 2 }).map((_, i) => (
                <div key={`suggest-skeleton-${i}`} className="col-md-6 mb-4">
                    <SkeletonCard />
                </div>
            ));
        }
        if (suggestionError) {
            return (
                <div className="col">
                    <div className="alert alert-danger">{suggestionError}</div>
                </div>
            );
        }
        if (hasClickedSuggest && suggestions.length === 0) {
            return (
                <div className="col">
                    <div className="alert alert-info">Rất tiếc, chúng tôi không tìm thấy gợi ý nào phù hợp lúc này.</div>
                </div>
            );
        }
        return suggestions.map(product => (
            <div key={product.id} className="col-md-6 mb-4">
                <ProductCard product={product} onShowDetail={handleShowDetail} />
            </div>
        ));
    };

    const renderProductList = (list, loading, skeletonCount) => {
        if (loading) {
            return Array.from({ length: skeletonCount }).map((_, i) => (
                <div key={`product-skeleton-${i}`} className="col-sm-6 col-lg-4 col-xl-3 mb-4">
                    <SkeletonCard />
                </div>
            ));
        }
        if (list.length === 0) {
            return (
                <div className="col">
                    <div className="alert alert-info">Không có sản phẩm nào phù hợp với tiêu chí của bạn.</div>
                </div>
            );
        }
        return list.map(product => (
            <div key={product.id} className="col-sm-6 col-lg-4 col-xl-3 mb-4">
                <ProductCard product={product} onShowDetail={handleShowDetail} />
            </div>
        ));
    };

    return (
        <div className="w-100">
            {/* Gợi ý từ AI */}
            <div className="bg-light py-5">
                <div className="container">
                    <div className="p-4 p-md-5 rounded-3 suggestion-box">
                        <h2 className="display-6">Gợi ý từ AI dành cho bạn</h2>
                        <p>Dựa trên lịch sử xem và các khoá học bạn đã thích.</p>
                        <button
                            className="btn btn-success btn-lg"
                            onClick={handleGetSuggestions}
                            disabled={isSuggestionLoading}
                        >
                            {isSuggestionLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                                    Đang tìm...
                                </>
                            ) : (
                                "Tìm khoá học phù hợp"
                            )}
                        </button>
                        <div className="row mt-4">{renderSuggestionList()}</div>
                    </div>
                </div>
            </div>

            {/* Tất cả khoá học */}
            <div className="container py-5">
                <h2 className="mb-4">Tất cả Khoá học</h2>
                <div className="row g-3 my-3">
                    <div className="col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm theo tên..."
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            onChange={e => setPriceFilter(e.target.value)}
                        >
                            <option value="all">Tất cả mức giá</option>
                            <option value="0-500000">Dưới 500K</option>
                            <option value="500000-1000000">500K - 1 triệu</option>
                            <option value="1000000-Infinity">Trên 1 triệu</option>
                        </select>
                    </div>
                </div>
                <div className="row">{renderProductList(filteredProducts, isLoading, 8)}</div>
            </div>

            <ProductDetailModal
                product={selectedProduct}
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </div>
    );
};

export default HomePage;
