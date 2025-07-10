import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useLocalStorage('edu_cart', []);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                toast.error('Sản phẩm này đã có trong giỏ hàng!');
                return prevCart;
            } else {
                toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            toast.success("Đã xoá sản phẩm khỏi giỏ hàng.");
            return prevCart.filter(item => item.id !== productId);
        });
    };

    const updateCartQuantity = (productId, newQuantity) => {
        setCart(prevCart => {
            if (newQuantity <= 0) {
                return prevCart.filter(item => item.id !== productId);
            }
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };
    const clearCart = () => {
        setCart([]); // Đơn giản là đặt giỏ hàng thành một mảng rỗng
    };

    const value = { cart, addToCart, removeFromCart, updateCartQuantity, clearCart };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext); 