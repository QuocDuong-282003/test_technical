import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import toast from "react-hot-toast";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => { // SỬA: children viết thường
    const [favorites, setFavorites] = useLocalStorage('edu_favorites', []);

    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            if (prev.includes(productId)) {
                toast.error('Đã xoá khỏi danh sách yêu thích!');
                return prev.filter(id => id !== productId);
            } else {
                toast.success('Đã thêm vào danh sách yêu thích!');
                return [...prev, productId];
            }
        });
    };

    const isFavorite = (productId) => favorites.includes(productId);

    const value = { favorites, toggleFavorite, isFavorite };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);